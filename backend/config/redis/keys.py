from uuid import UUID


def user_profile_key(user_id: UUID) -> str:
    return f"user:{user_id}:profile"


def feed_summary_key(farm_id: UUID) -> str:
    return f"farm:{farm_id}:feed_summary"
