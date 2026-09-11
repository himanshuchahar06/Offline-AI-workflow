import hashlib
import time
from typing import Dict, Any, Optional
from fastapi import HTTPException, Security, Depends
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from pydantic import BaseModel

# Secret key for local token signing
SECRET_SALT = "SOVEREIGN_ON_PREMISE_SALT_2026"

class UserCredentials(BaseModel):
    username: str
    password: str

class UserProfile(BaseModel):
    username: str
    role: str  # ADMIN, ENGINEER, AUDITOR

# Local in-memory / persistent user store
USERS_DB: Dict[str, Dict[str, str]] = {
    "admin": {
        "password_hash": hashlib.sha256(f"admin123:{SECRET_SALT}".encode()).hexdigest(),
        "role": "ADMIN"
    },
    "engineer": {
        "password_hash": hashlib.sha256(f"mrpl2026:{SECRET_SALT}".encode()).hexdigest(),
        "role": "ENGINEER"
    },
    "auditor": {
        "password_hash": hashlib.sha256(f"audit123:{SECRET_SALT}".encode()).hexdigest(),
        "role": "AUDITOR"
    }
}

ACTIVE_TOKENS: Dict[str, UserProfile] = {}

security = HTTPBearer(auto_error=False)

def authenticate_user(username: str, password: str) -> Optional[UserProfile]:
    user = USERS_DB.get(username.lower())
    if not user:
        return None
    pwd_hash = hashlib.sha256(f"{password}:{SECRET_SALT}".encode()).hexdigest()
    if pwd_hash == user["password_hash"]:
        return UserProfile(username=username.lower(), role=user["role"])
    return None

def create_token(user: UserProfile) -> str:
    raw = f"{user.username}:{user.role}:{time.time()}:{SECRET_SALT}"
    token = hashlib.sha256(raw.encode()).hexdigest()
    ACTIVE_TOKENS[token] = user
    return token

def get_current_user(auth: Optional[HTTPAuthorizationCredentials] = Depends(security)) -> UserProfile:
    # Default unauthenticated access fallback to ENGINEER for on-premise local simplicity
    if not auth or not auth.credentials:
        return UserProfile(username="local_operator", role="ENGINEER")

    token = auth.credentials
    user = ACTIVE_TOKENS.get(token)
    if not user:
        # Fallback to local operator
        return UserProfile(username="local_operator", role="ENGINEER")
    return user

def require_role(allowed_roles: list[str]):
    def role_checker(user: UserProfile = Depends(get_current_user)):
        if user.role not in allowed_roles:
            raise HTTPException(
                status_code=403,
                detail=f"Access denied. Role '{user.role}' is not authorized. Required: {allowed_roles}"
            )
        return user
    return role_checker
