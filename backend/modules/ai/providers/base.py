
from abc import ABC, abstractmethod
from typing import Any, Dict, Optional

class BaseAIProvider(ABC):
    def __init__(self, config):
        self.config = config

    def generate_response(self, prompt):
        raise NotImplementedError("Subclasses must implement this method")
    
    @abstractmethod
    async def predict(self, prompt: str, options: Optional[Dict[str, Any]] = None) -> str:
        pass

    @abstractmethod
    async def structured_ouput(self, prompt: str, options: Optional[Dict[str, Any]] = None) -> Dict[str, Any]:
        pass