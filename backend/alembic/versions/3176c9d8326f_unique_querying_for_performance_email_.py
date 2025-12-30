"""unique querying for performance email and username

Revision ID: 3176c9d8326f
Revises: 0d87485d5f87
Create Date: 2025-09-02 00:58:28.031733

"""

from typing import Sequence, Union


from alembic import op

# revision identifiers, used by Alembic.
revision: str = "3176c9d8326f"
down_revision: Union[str, Sequence[str], None] = "0d87485d5f87"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.create_index("idx_users_email", "users", ["email"], unique=True)
    op.create_index("idx_users_username", "users", ["username"], unique=True)


def downgrade() -> None:
    op.drop_index("idx_users_email", table_name="users")
    op.drop_index("idx_users_username", table_name="users")
