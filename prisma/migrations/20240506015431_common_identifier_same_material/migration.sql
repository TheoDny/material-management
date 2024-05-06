/*
  Warnings:

  - A unique constraint covering the columns `[identifier,deletedAt]` on the table `Material` will be added. If there are existing duplicate values, this will fail.
  - The required column `identifier` was added to the `Material` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterTable
ALTER TABLE "Material" ADD COLUMN     "identifier" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Material_identifier_deletedAt_key" ON "Material"("identifier", "deletedAt");
