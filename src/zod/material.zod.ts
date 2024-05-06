import { z } from "zod"

export const addMaterialZod = z.object({
    name: z.string().min(1).max(48, "Le nom doit être compris entre 1 et 48 caractères"),
    description: z.string().max(96, "La description ne doit pas dépasser 96 caractères "),
    characteristics: z.tuple([z.string(), z.string()]).array(),
    stateMaterialIds: (z.string().cuid()).array(),
})

export const editMaterialZod = z.object({
    materialId: z.string(),
    name: z.string().min(1).max(48, "Le nom doit être compris entre 1 et 48 caractères"),
    description: z.string().max(96, "La description ne doit pas dépasser 96 caractères "),
    characteristics: z.tuple([z.string(), z.string()]).array(),
    stateMaterialIds: (z.string().cuid()).array(),
})

const frontStateMaterialZod = z.object({
        id: z.string(),
        name: z.string(),
        description: z.string(),
        color: z.string(),
    },
)

export const addFrontMaterialZod = z.object({
    name: z.string().min(1).max(48, "Le nom doit être compris entre 1 et 48 caractères"),
    description: z.string().max(96, "La description ne doit pas dépasser 96 caractères "),
    characteristics: z.tuple([z.string(), z.string()]).array(),
    StateMaterial: frontStateMaterialZod.array(),
})

export const deleteMaterialZod = z.object({
    materialId: z.string(),
})

export const getMaterialZod = z.object({
    materialId: z.string(),
})