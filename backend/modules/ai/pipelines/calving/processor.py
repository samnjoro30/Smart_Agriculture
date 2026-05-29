
import pandas as pd
from datetime import datetime

class CalvingDataProcessor:
    def __init__(self):
        # Average gestation for dairy cows is ~283 days
        self.avg_gestation_days = 283

    def prepare_features(self, livestock_list: list):
        """
        Converts SQLAlchemy objects into a cleaned Pandas DataFrame.
        """
        # 1. Convert list of objects to list of dicts
        data = []
        for animal in livestock_list:
            data.append({
                "id": animal.id,
                "tag": animal.tag,
                "breed": animal.breed,
                "last_insemination": animal.lastInsemination,
                "is_pregnant": animal.pregnant,
                "health_status": animal.healthStatus
            })

        df = pd.DataFrame(data)

        # 2. Data Cleaning: Handle missing insemination dates
        # If pregnant but no date, we can't predict accurately (drop or flag)
        df = df.dropna(subset=['last_insemination'])

        # 3. Feature Engineering: Days since insemination
        now = datetime.now(timezone.utc)
        df['days_since_insemination'] = df['last_insemination'].apply(
            lambda x: (now - x).days
        )

        # 4. Feature Engineering: Progress Percentage
        df['gestation_progress'] = (df['days_since_insemination'] / self.avg_gestation_days) * 100
        
        return df

    def clean_sensor_data(self, raw_data: list):
        """
        Cleans data: handles missing values from cow collars/sensors
        and converts timestamps.
        """
        df = pd.DataFrame(raw_data)
        
        # Fill missing temperatures with the median for that specific cow
        df['temperature'] = df.groupby('cow_id')['temperature'].transform(
            lambda x: x.fillna(x.median())
        )
        return df

    def engineer_features(self, df: pd.DataFrame):
        """
        Creates features like 'days_since_insemination' or 'temp_gradient'.
        """
        # Example: Cows often show a 0.5°C drop 24-48 hours before calving
        df['temp_drop'] = df['temperature'].diff()
        return df