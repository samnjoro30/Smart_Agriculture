# app/modules/ai/providers/gemini.py
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.prompts import ChatPromptTemplate
from config.settings import get_settings
from .base import BaseAIProvider

settings = get_settings()

class GeminiProvider(BaseAIProvider):
    def __init__(self, api_key: str, model: str = "gemini-1.5-flash"):
        self.llm = ChatGoogleGenerativeAI(
            google_api_key=settings.GOOGLE_API_KEY,
            model=model,
            temperature=0.2 # Lower temperature for more factual agricultural data
        )

    async def chat(self, prompt: str, context: Optional[str] = None) -> str:
        system_message = (
            "You are an expert Livestock AI Assistant. Use the following cow context "
            "to answer the farmer's question accurately. Context: {context}"
        )
        
        prompt_template = ChatPromptTemplate.from_messages([
            ("system", system_message),
            ("user", "{input}")
        ])

        chain = prompt_template | self.llm
        response = await chain.ainvoke({
            "context": context or "No specific history provided.",
            "input": prompt
        })

        return response.content

    async def analyze_livestock_data(self, data: dict, instruction: str) -> str:
        # This is where we pass your SQLAlchemy model data (converted to dict)
        # to Gemini for a health check or summary.
        formatted_prompt = f"Data: {data}\n\nInstruction: {instruction}"
        response = await self.llm.ainvoke(formatted_prompt)
        return response.content

    async def structured_output(self, pydantic_schema: Any, prompt: str) -> dict:
        # Uses LangChain's with_structured_output for guaranteed JSON-like responses
        structured_llm = self.llm.with_structured_output(pydantic_schema)
        response = await structured_llm.ainvoke(prompt)
        return response