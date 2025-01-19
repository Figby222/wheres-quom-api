/*
  Warnings:

  - The `startTime` column on the `Game` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `endTime` column on the `Game` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Game" DROP COLUMN "startTime",
ADD COLUMN     "startTime" BIGINT NOT NULL DEFAULT FLOOR(EXTRACT(EPOCH FROM CURRENT_TIMESTAMP(3))*1000),
DROP COLUMN "endTime",
ADD COLUMN     "endTime" BIGINT;
