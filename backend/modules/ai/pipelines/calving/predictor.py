import joblib # or pickle to load your trained model
import os

class CalvingPredictor:
    def __init__(self, model_path: str = "modules/ai/artifacts/calving_model.pkl"):  
        self.model_path = model_path
        self.model = self._load_model()

    
    def _load_model(self):
        if os.path.exists(self.model_path):
            return joblib.load(self.model_path)
        return None 

    def predict(self, processed_df):
        """
        Input: Processed DataFrame from processor.py
        Output: List of predictions (dates or probability)
        """
        if self.model:
            return self.model.predict(processed_df)
        
        processed_df['predicted_days_left'] = 283 - processed_df['days_since_insemination']
        return processed_df[['id', 'predicted_days_left']].to_dict('records')


    def predict_birth_window(self, processed_data: pd.DataFrame):
        """
        Returns a probability or a specific date range.
        """
        prediction = self.model.predict(processed_data)
        # Logic to return a readable result: "Likely to give birth in 48 hours"
        return prediction