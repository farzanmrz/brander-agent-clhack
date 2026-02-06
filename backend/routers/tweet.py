"""
Tweet routes — post tweets via Composio.
"""
import logging
from fastapi import APIRouter, HTTPException, Query
from pydantic import BaseModel

from backend.services.composio_service import post_tweet, DEFAULT_USER_ID

logger = logging.getLogger(__name__)
router = APIRouter(prefix="/api/tweet", tags=["tweet"])


class TweetRequest(BaseModel):
    text: str
    user_id: str = DEFAULT_USER_ID


@router.post("")
def api_post_tweet(body: TweetRequest):
    """Post a tweet via Composio → Twitter."""
    result = post_tweet(text=body.text, user_id=body.user_id)
    logger.info("Composio response: %s", result)

    # Check if Composio reported a failure
    if isinstance(result, dict):
        if result.get("error"):
            raise HTTPException(status_code=502, detail=f"Twitter API error: {result['error']}")
        if result.get("successful") is False and result.get("successfull") is False:
            raise HTTPException(status_code=502, detail=f"Tweet failed: {result}")

    return {"status": "posted", "result": result}
