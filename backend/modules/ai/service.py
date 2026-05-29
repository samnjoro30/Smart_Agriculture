
from .providers.gemini import GeminiProvider
from sqlalchemy.ext.asyncio import AsyncSession
from config.audit.logger import get_logger
from .tasks import run_heat_prediction_task

logger = get_logger("AI_SERVICE")

class AIService:
    def __init__(self, ai_provider, db: AsyncSession):
        self.ai_provider = ai_provider
        self.db = db
        self.provider = GeminiProvider()


    def generate_response(self, prompt):
        return self.ai_provider.generate_response(prompt)
    
    async def trigger_heat_prediction_info(self, livestock_id: str):
        """Long Path: AI for heat prediction."""

        run_heat_prediction_task.delay(livestock_id) 
        return {"status": "Task dispatched to worker"}
    

    async def get_health_advice(self, livestock_id: str, question: str):
        """Quick Path: Generative AI for farmer questions."""
        # 1. Get livestock data from DB
        livestock = self.db.query(Livestock).filter(Livestock.id == livestock_id).first()
        
        # 2. Format context for Gemini
        context = (
            f"Cow Tag: {livestock.tag}, Breed: {livestock.breed}, "
            f"Pregnant: {livestock.pregnant}, Health Status: {livestock.healthStatus}"
        )
        
        # 3. Call Gemini
        return await self.provider.chat(prompt=question, context=context)