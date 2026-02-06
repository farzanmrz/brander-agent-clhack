"""
Profile routes — serve the user's X profile and posts.
"""
import json
from pathlib import Path
from fastapi import APIRouter

router = APIRouter(prefix="/api/profile", tags=["profile"])

PROFILE_PATH = Path(__file__).resolve().parent.parent / "data" / "profile.json"


def load_profile() -> dict:
    """Load profile.json from disk."""
    with open(PROFILE_PATH, "r") as f:
        return json.load(f)


@router.get("")
def get_profile():
    """Return the full profile including posts."""
    return load_profile()
