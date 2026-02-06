"""
Composio Service: Post tweets via Composio → Twitter integration.

Requires:
  - COMPOSIO_API_KEY in .env
  - A connected Twitter account in Composio dashboard
"""

import os
from dotenv import load_dotenv
from composio import Composio

load_dotenv()

# Must match the user_id tied to your connected Twitter account.
# Check Composio dashboard -> Connected Accounts -> "User ID" column.
DEFAULT_USER_ID = "pg-test-8e448524-361d-49b6-9176-538e26c37814"

composio = Composio(api_key=os.getenv("COMPOSIO_API_KEY"))


def post_tweet(text: str, user_id: str = DEFAULT_USER_ID) -> dict:
    """
    Post a tweet via Composio's Twitter integration.

    Args:
        text: Tweet content (max 280 chars)
        user_id: Composio user_id linked to a Twitter account

    Returns:
        Raw Composio execution result
    """
    result = composio.tools.execute(
        "TWITTER_CREATION_OF_A_POST",
        user_id=user_id,
        arguments={"text": text},
    )
    return result
