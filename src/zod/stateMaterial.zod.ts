import { z } from "zod"

const ColorHexRegExp = /^#([0-9a-fA-F]{3}){1,2}$/

export const addStateMaterialZod = z.object({
    name: z.string().min(1).max(48, "Le nom doit être compris entre 1 et 48 caractères"),
    description: z.string().max(96, "La description ne doit pas dépasser 96 caractères "),
    color: z.string().regex(ColorHexRegExp, {
        message: "Le format de la couleur est invalide (exemple correcte : #D3D3D3).",
    }).optional(),
})

export const editStateMaterialZod = z.object({
    stateMaterialId: z.string(),
    name: z.string().min(1).max(48, "Le nom doit être compris entre 1 et 48 caractères"),
    description: z.string().max(96, "La description ne doit pas dépasser 96 caractères "),
    color: z.string().regex(ColorHexRegExp, {
        message: "Le format de la couleur est invalide (exemple correcte : #D3D3D3).",
    }).optional(),
})

export const deleteStateMaterialZod = z.object({
    stateMaterialId: z.string(),
})