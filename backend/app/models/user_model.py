from pydantic import BaseModel, EmailStr
from enum import Enum
from typing import Optional
from datetime import datetime

class RiskLevel(str, Enum):
    low = 'Low'
    medium = 'Medium'
    high = 'High'

class UserProfile(BaseModel):
    username: str
    email: EmailStr
    risk_level: RiskLevel
    rebalance_frequency: int  # Frequency in seconds
    last_rebalance_time: Optional[datetime] = None
    automatic_rebalance: bool  # To indicate auto-rebalance status (ON/OFF)
