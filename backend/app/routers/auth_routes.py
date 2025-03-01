from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from services.auth_service import create_access_token

router = APIRouter()

class LoginRequest(BaseModel):
    account_id: str

@router.post("/token")
def login(request: LoginRequest):
    if not request.account_id:
        raise HTTPException(status_code=400, detail="Account ID required")
    token = create_access_token(request.account_id)
    return {"access_token": token, "token_type": "bearer"}
