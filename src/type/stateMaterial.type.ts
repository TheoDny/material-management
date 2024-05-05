import { Prisma } from "@prisma/client"

// ==== StateMaterialSmall ====
export type StateMaterialSmall = Prisma.StateMaterialGetPayload<{
    select: selectStateMaterialSmallType
}>

export const selectStateMaterialSmall = {
    id: true,
    name: true,
    description: true,
}

export type selectStateMaterialSmallType = typeof selectStateMaterialSmall

export const includeStateMaterialSmall = {
    StateMaterial: {
        select: selectStateMaterialSmall,
    },
}

export type includeStateMaterialSmall = typeof includeStateMaterialSmall

// ==== StateMaterialMedium ====
export type StateMaterialMedium = Prisma.StateMaterialGetPayload<{
    select: selectStateMaterialMediumType
}>

export const selectStateMaterialMedium = {
    id: true,
    name: true,
    description: true,
    createdAt: true,
}

export type selectStateMaterialMediumType = typeof selectStateMaterialMedium

export const includeStateMaterialMedium = {
    StateMaterial: {
        select: selectStateMaterialMedium,
    },
}

export type includeStateMaterialMedium = typeof includeStateMaterialMedium

// ==== StateMaterialFormatted ====

export type StateMaterialFormatted = {
    id: string
    name: string
    description: string
    createdAt: string
}
