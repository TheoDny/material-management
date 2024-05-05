import { Prisma } from "@prisma/client"
import { StateMaterialSmall } from "@/type/stateMaterial.type"
import {
    Characteristics,
    includeMaterialSavedIncludeStateMaterial,
    includeMaterialSavedSmall,
} from "@/type/materialSaved.type"

// ==== MaterialSmall ====
export type MaterialSmall = Prisma.MaterialGetPayload<{
    select: selectMaterialSmallType
}>

export const selectMaterialSmall = {
    id: true,
    actualMaterialSaved: includeMaterialSavedSmall.MaterialSaved,
}

export type selectMaterialSmallType = typeof selectMaterialSmall

export const includeMaterialSmall = {
    Material: {
        select: selectMaterialSmall,
    },
}

export type includeMaterialSmall = typeof includeMaterialSmall

// ==== MaterialIncludeStateMaterial ====
export type MaterialIncludeStateMaterial = Prisma.MaterialGetPayload<{
    select: selectMaterialIncludeStateMaterialType
}>

export const selectMaterialIncludeStateMaterial = {
    id: true,
    createdAt: true,
    updatedAt: true,
    actualMaterialSaved: includeMaterialSavedIncludeStateMaterial.MaterialSaved,
}

export type selectMaterialIncludeStateMaterialType = typeof selectMaterialIncludeStateMaterial

export const includeMaterialIncludeStateMaterial = {
    Material: {
        select: selectMaterialIncludeStateMaterial,
    },
}

export type includeMaterialIncludeStateMaterial = typeof includeMaterialIncludeStateMaterial


// ==== MaterialFormatted ====

export type MaterialFormatted = {
    id: string,
    actualMaterialSavedId: string,
    name: string,
    description: string,
    createdAt: string,
    updatedAt: string,
    characteristics: Characteristics,
    StateMaterials: StateMaterialSmall[]
}
