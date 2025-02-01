/*
  Warnings:

  - You are about to alter the column `positionBottom` on the `Character` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `DoublePrecision`.
  - You are about to alter the column `positionLeft` on the `Character` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `DoublePrecision`.
  - You are about to alter the column `positionRight` on the `Character` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `DoublePrecision`.
  - You are about to alter the column `positionTop` on the `Character` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `DoublePrecision`.

*/
-- AlterTable
ALTER TABLE "Character" ALTER COLUMN "positionBottom" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "positionLeft" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "positionRight" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "positionTop" SET DATA TYPE DOUBLE PRECISION;
