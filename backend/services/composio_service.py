"""
Composio Service: Post tweets via Composio → Twitter integration.

Requires:
  - COMPOSIO_API_KEY in .env
  - A connected Twitter account in Composio dashboard
"""

import os
from dotenv import load_dotenv
from composio import Composio
from composio.client.enums import Action

load_dotenv()

DEFAULT_USER_ID = "default"

composio = Composio(api_key=os.getenv("COMPOSIO_API_KEY"))


def _get_twitter_connected_account() -> str:
    """Find the active Twitter connected_account ID from Composio."""
    accounts = composio.connected_accounts.get()
    for a in accounts:
        if a.appUniqueId == "twitter" and a.status == "ACTIVE":
            return a.id
    raise ValueError("No active Twitter connected account found in Composio")


def post_tweet(text: str, user_id: str = DEFAULT_USER_ID) -> dict:
    """
    Post a tweet via Composio's Twitter integration.

    Args:
        text: Tweet content (max 280 chars)
        user_id: Composio entity_id linked to a Twitter account

    Returns:
        Raw Composio execution result
    """
    connected_account = _get_twitter_connected_account()
    result = composio.actions.execute(
        action=Action.TWITTER_CREATION_OF_A_POST,
        params={"text": text},
        entity_id=user_id,
        connected_account=connected_account,
    )
    return result
