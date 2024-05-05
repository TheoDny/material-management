/*
  Warnings:

  - You are about to drop the column `materialSavedId` on the `Log` table. All the data in the column will be lost.
  - You are about to drop the column `actualMaterialSavedId` on the `Material` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Material` table. All the data in the column will be lost.
  - You are about to drop the `MaterialSaved` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_MaterialSavedToStateMaterial` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `description` to the `Material` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Material` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Log" DROP CONSTRAINT "Log_materialSavedId_fkey";

-- DropForeignKey
ALTER TABLE "Material" DROP CONSTRAINT "Material_actualMaterialSavedId_fkey";

-- DropForeignKey
ALTER TABLE "MaterialSaved" DROP CONSTRAINT "MaterialSaved_materialId_fkey";

-- DropForeignKey
ALTER TABLE "_MaterialSavedToStateMaterial" DROP CONSTRAINT "_MaterialSavedToStateMaterial_A_fkey";

-- DropForeignKey
ALTER TABLE "_MaterialSavedToStateMaterial" DROP CONSTRAINT "_MaterialSavedToStateMaterial_B_fkey";

-- DropIndex
DROP INDEX "Material_actualMaterialSavedId_key";

-- AlterTable
ALTER TABLE "Log" DROP COLUMN "materialSavedId",
ADD COLUMN     "materialId" TEXT;

-- AlterTable
ALTER TABLE "Material" DROP COLUMN "actualMaterialSavedId",
DROP COLUMN "updatedAt",
ADD COLUMN     "characteristics" JSONB NOT NULL DEFAULT '[]',
ADD COLUMN     "deletedAt" TIMESTAMP(3),
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL;

-- DropTable
DROP TABLE "MaterialSaved";

-- DropTable
DROP TABLE "_MaterialSavedToStateMaterial";

-- CreateTable
CREATE TABLE "_MaterialToStateMaterial" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_MaterialToStateMaterial_AB_unique" ON "_MaterialToStateMaterial"("A", "B");

-- CreateIndex
CREATE INDEX "_MaterialToStateMaterial_B_index" ON "_MaterialToStateMaterial"("B");

-- AddForeignKey
ALTER TABLE "Log" ADD CONSTRAINT "Log_materialId_fkey" FOREIGN KEY ("materialId") REFERENCES "Material"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MaterialToStateMaterial" ADD CONSTRAINT "_MaterialToStateMaterial_A_fkey" FOREIGN KEY ("A") REFERENCES "Material"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MaterialToStateMaterial" ADD CONSTRAINT "_MaterialToStateMaterial_B_fkey" FOREIGN KEY ("B") REFERENCES "StateMaterial"("id") ON DELETE CASCADE ON UPDATE CASCADE;
