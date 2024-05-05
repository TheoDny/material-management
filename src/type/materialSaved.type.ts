import { Prisma } from "@prisma/client"
import { includeStateMaterialSmall, StateMaterialSmall } from "@/type/stateMaterial.type"

// ==== MaterialSavedSmall ====
export type MaterialSavedSmall = Prisma.MaterialSavedGetPayload<{
    select: selectMaterialSavedSmallType
}>

export const selectMaterialSavedSmall = {
    id: true,
    name: true,
    description: true,
}

export type selectMaterialSavedSmallType = typeof selectMaterialSavedSmall

export const includeMaterialSavedSmall = {
    MaterialSaved: {
        select: selectMaterialSavedSmall,
    },
}

export type includeMaterialSavedSmall = typeof includeMaterialSavedSmall

// ==== MaterialSavedIncludeStateMaterial ====
export type MaterialSavedIncludeStateMaterial = Prisma.MaterialSavedGetPayload<{
    select: selectMaterialSavedIncludeStateMaterialType
}>

export const selectMaterialSavedIncludeStateMaterial = {
    id: true,
    name: true,
    description: true,
    createdAt: true,
    updatedAt: true,
    characteritics: true,
    ...includeStateMaterialSmall
}

export type selectMaterialSavedIncludeStateMaterialType = typeof selectMaterialSavedIncludeStateMaterial

export const includeMaterialSavedIncludeStateMaterial = {
    MaterialSaved: {
        select: selectMaterialSavedIncludeStateMaterial,
    },
}

export type includeMaterialSavedIncludeStateMaterial = typeof includeMaterialSavedIncludeStateMaterial


// ==== MaterialSavedFormatted ====

export type MaterialSavedFormatted = {
    id: string,
    name: string,
    description: string,
    createdAt: string,
    characteristics: Characteristics,
    StateMaterials: StateMaterialSmall[]
}

// ==== JSON Type ====

export type Characteristics = [string,string][]

