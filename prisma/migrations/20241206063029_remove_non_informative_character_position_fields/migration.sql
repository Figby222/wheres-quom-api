/*
  Warnings:

  - You are about to drop the column `positionX` on the `Character` table. All the data in the column will be lost.
  - You are about to drop the column `positionX2` on the `Character` table. All the data in the column will be lost.
  - You are about to drop the column `positionY` on the `Character` table. All the data in the column will be lost.
  - You are about to drop the column `positionY2` on the `Character` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Character" DROP COLUMN "positionX",
DROP COLUMN "positionX2",
DROP COLUMN "positionY",
DROP COLUMN "positionY2";
