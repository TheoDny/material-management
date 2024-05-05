-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "LogAction" ADD VALUE 'MATERIAL_ADD';
ALTER TYPE "LogAction" ADD VALUE 'MATERIAL_EDIT';
ALTER TYPE "LogAction" ADD VALUE 'MATERIAL_DELETE';
ALTER TYPE "LogAction" ADD VALUE 'STATE_MATERIAL_ADD';
ALTER TYPE "LogAction" ADD VALUE 'STATE_MATERIAL_EDIT';
ALTER TYPE "LogAction" ADD VALUE 'STATE_MATERIAL_DELETE';

-- AlterTable
ALTER TABLE "Log" ADD COLUMN     "materialSavedId" TEXT;

-- CreateTable
CREATE TABLE "Material" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "actualMaterialSavedId" TEXT,

    CONSTRAINT "Material_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MaterialSaved" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "characteritics" JSONB NOT NULL DEFAULT '[]',
    "materialId" TEXT NOT NULL,

    CONSTRAINT "MaterialSaved_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StateMaterial" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "StateMaterial_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_MaterialSavedToStateMaterial" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Material_actualMaterialSavedId_key" ON "Material"("actualMaterialSavedId");

-- CreateIndex
CREATE UNIQUE INDEX "_MaterialSavedToStateMaterial_AB_unique" ON "_MaterialSavedToStateMaterial"("A", "B");

-- CreateIndex
CREATE INDEX "_MaterialSavedToStateMaterial_B_index" ON "_MaterialSavedToStateMaterial"("B");

-- AddForeignKey
ALTER TABLE "Log" ADD CONSTRAINT "Log_materialSavedId_fkey" FOREIGN KEY ("materialSavedId") REFERENCES "MaterialSaved"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Material" ADD CONSTRAINT "Material_actualMaterialSavedId_fkey" FOREIGN KEY ("actualMaterialSavedId") REFERENCES "MaterialSaved"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MaterialSaved" ADD CONSTRAINT "MaterialSaved_materialId_fkey" FOREIGN KEY ("materialId") REFERENCES "Material"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MaterialSavedToStateMaterial" ADD CONSTRAINT "_MaterialSavedToStateMaterial_A_fkey" FOREIGN KEY ("A") REFERENCES "MaterialSaved"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MaterialSavedToStateMaterial" ADD CONSTRAINT "_MaterialSavedToStateMaterial_B_fkey" FOREIGN KEY ("B") REFERENCES "StateMaterial"("id") ON DELETE CASCADE ON UPDATE CASCADE;
