


from message_broker.config import celery_bus
from sqlalchemy.ext.asyncio import AsyncSession
from config.database import AsyncSessionLocal
from .pipelines.calving.predictor import CalvingPredictor
from datetime import datetime, timedelta
import asyncio

@celery_bus.task(name="modules.ai.tasks.run_heat_prediction_task")
def run_heat_prediction_task(livestock_id: str):
    async def run():
        async with AsyncSessionLocal() as db:

        # Simulate a long-running AI task (e.g., heat prediction)
        await asyncio.sleep(10)

@celery_app.task(name="run_calving_prediction")
def run_calving_prediction(livestock_id: str):
    db = AsyncSessionLocal()
    processor = CalvingDataProcessor()
    model = CalvingModel()
    
    try:
        # 1. Fetch data
        cow = db.query(Livestock).filter(Livestock.id == livestock_id).first()
        if not cow or not cow.pregnant:
            return "Cow not found or not pregnant"

        # 2. ETL & Processing
        df = processor.prepare_features([cow])
        
        # 3. Inference
        prediction = model.predict(df)
        
        # 4. Logic to save back to DB (e.g., updating a 'notes' field or a new column)
        days_left = prediction[0]['predicted_days_left']
        print(f"Cow {cow.tag} is expected to calve in {days_left} days.")
        
        # cow.expectedCalvingDate = ... (update logic)
        # db.commit()
        
    finally:
        db.close()

@celery_bus.task(name="modules.ai.tasks.dataprocessing_task")
@celery_bus.task(name="modules.ai.tasks.process_ai_request")
@celery_bus.task(name="modules.ai.tasks.generate_response")
@celery_bus.task(name="modules.ai.tasks.generate_health_report")
@celery_bus.task(name="modules.ai.tasks.analyze_livestock_data")
