-- AlterTable
ALTER TABLE "Reply" ADD COLUMN     "replyToId" TEXT;

-- CreateIndex
CREATE INDEX "Reply_replyToId_idx" ON "Reply"("replyToId");

-- AddForeignKey
ALTER TABLE "Reply" ADD CONSTRAINT "Reply_replyToId_fkey" FOREIGN KEY ("replyToId") REFERENCES "Reply"("id") ON DELETE SET NULL ON UPDATE CASCADE;
