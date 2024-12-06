/*
  Warnings:

  - Added the required column `positionBottom` to the `Character` table without a default value. This is not possible if the table is not empty.
  - Added the required column `positionLeft` to the `Character` table without a default value. This is not possible if the table is not empty.
  - Added the required column `positionRight` to the `Character` table without a default value. This is not possible if the table is not empty.
  - Added the required column `positionTop` to the `Character` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Character" ADD COLUMN     "positionBottom" INTEGER NOT NULL,
ADD COLUMN     "positionLeft" INTEGER NOT NULL,
ADD COLUMN     "positionRight" INTEGER NOT NULL,
ADD COLUMN     "positionTop" INTEGER NOT NULL;
