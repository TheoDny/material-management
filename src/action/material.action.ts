"use server"
import { addMaterial, deleteMaterial, editMaterial, getMaterial } from "@/service/material.service"
import { action } from "@/lib/safe-actions"
import { addMaterialZod, deleteMaterialZod, editMaterialZod, getMaterialZod } from "@/zod/material.zod"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { checkPermissions } from "@/util/auth.util"

export const addMaterialAction = action(addMaterialZod, async ({
                                                                   name,
                                                                   description,
                                                                   characteristics,
                                                                   stateMaterialIds,
                                                               }) => {
    const session = await getServerSession(authOptions)
    if (!session?.user || !checkPermissions(session, ["gestion_state_material"])) {
        throw new Error("Unauthorized")
    }

    return await addMaterial(name, description, characteristics, stateMaterialIds)
})

export const editMaterialAction = action(editMaterialZod, async ({
                                                                     materialId,
                                                                     name,
                                                                     description,
                                                                     characteristics,
                                                                     stateMaterialIds,
                                                                 }) => {
    const session = await getServerSession(authOptions)
    if (!session?.user || !checkPermissions(session, ["gestion_state_material"])) {
        throw new Error("Unauthorized")
    }

    return await editMaterial(materialId, name, description, characteristics, stateMaterialIds)
})

export const deleteMaterialAction = action(deleteMaterialZod, async ({ materialId }) => {
    const session = await getServerSession(authOptions)
    if (!session?.user || !checkPermissions(session, ["gestion_state_material"])) {
        throw new Error("Unauthorized")
    }

    return await deleteMaterial(materialId)
})

export const getMaterialAction = action(getMaterialZod, async ({ materialId }) => {

    return await getMaterial(materialId)
})