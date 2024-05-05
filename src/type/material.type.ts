import { Prisma } from "@prisma/client"
import { includeStateMaterialSmall, StateMaterialSmall } from "@/type/stateMaterial.type"

// ==== MaterialSmall ====
export type MaterialSmall = Prisma.MaterialGetPayload<{
    select: selectMaterialSmallType
}>

export const selectMaterialSmall = {
    id: true,
    name: true,
    description: true,
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
    name: true,
    description: true,
    createdAt: true,
    characteristics: true,
    ...includeStateMaterialSmall
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
    name: string,
    description: string,
    updatedAt: string,
    characteristics: Characteristics,
    StateMaterial: StateMaterialSmall[]
}

// ==== JSON Type ====

export type Characteristics = [string,string][]
