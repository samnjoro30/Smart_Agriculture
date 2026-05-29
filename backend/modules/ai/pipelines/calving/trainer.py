# app/modules/ai/pipelines/calving/trainer.py
import os
import joblib
import pandas as pd
from sklearn.ensemble import RandomForestRegressor
from .processor import CalvingDataProcessor

class CalvingModelTrainer:
    def __init__(self, model_path: str = "modules/ai/artifacts/calving_model.pkl"):
        self.model_path = model_path
        self.processor = CalvingDataProcessor()
        # Using a simple, robust regressor for tabular metrics
        self.model = RandomForestRegressor(n_estimators=100, random_state=42)

    def train_model(self, historical_livestock_list: list):
        """
        Trains the model using historical records where actual birth dates are known.
        """
        if not historical_livestock_list:
            return "No data provided for training."

        # 1. Process data using your existing processor
        df = self.processor.prepare_features(historical_livestock_list)
        
        # To train, we need to know the target variable: Actual Gestation Days
        # We extract this from the historical database rows (birthDate - lastInsemination)
        actual_gestation = []
        for animal in historical_livestock_list:
            if animal.birthDate and animal.lastInsemination:
                duration = (animal.birthDate - animal.lastInsemination).days
                actual_gestation.append(duration)
            else:
                actual_gestation.append(None)
        
        df['actual_gestation_days'] = actual_gestation
        df = df.dropna(subset=['actual_gestation_days'])
        
        if df.empty:
            return "Insufficient historical data with both insemination and birth dates."

        # Target: How many days were actually left at the point of data capture
        df['actual_days_left'] = df['actual_gestation_days'] - df['days_since_insemination']

        # 2. Select Features (X) and Target (y)
        X = df[['gestation_progress', 'days_since_insemination']]
        y = df['actual_days_left']

        # 3. Fit the model
        self.model.fit(X, y)

        # 4. Save the artifact to disk
        os.makedirs(os.path.dirname(self.model_path), exist_ok=True)
        joblib.dump(self.model, self.model_path)
        
        return f"Model successfully trained and saved to {self.model_path}"