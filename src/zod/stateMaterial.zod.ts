import { z } from "zod"

export const addStateMaterialZod = z.object({
    name: z.string().min(1).max(48, "Le nom doit être compris entre 1 et 48 caractères"),
    description: z.string().max(96, "La description ne doit pas dépasser 96 caractères "),
})

export const editStateMaterialZod = z.object({
    stateMaterialId: z.string(),
    name: z.string().min(1).max(48, "Le nom doit être compris entre 1 et 48 caractères"),
    description: z.string().max(96, "La description ne doit pas dépasser 96 caractères "),
})

export const deleteStateMaterialZod = z.object({
    stateMaterialId: z.string(),
})