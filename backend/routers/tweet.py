"""
Tweet routes — post tweets via Composio.
"""
from fastapi import APIRouter, Query
from pydantic import BaseModel

from backend.services.composio_service import post_tweet, DEFAULT_USER_ID

router = APIRouter(prefix="/api/tweet", tags=["tweet"])


class TweetRequest(BaseModel):
    text: str
    user_id: str = DEFAULT_USER_ID


@router.post("")
def api_post_tweet(body: TweetRequest):
    """Post a tweet via Composio → Twitter."""
    result = post_tweet(text=body.text, user_id=body.user_id)
    return {"status": "posted", "result": result}
