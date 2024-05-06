"use server"
import {
    addStateMaterial,
    deleteStateMaterial,
    editStateMaterial,
    getAllStateMaterialSmall,
} from "@/service/stateMaterial.service"
import { action } from "@/lib/safe-actions"
import { addStateMaterialZod, deleteStateMaterialZod, editStateMaterialZod } from "@/zod/stateMaterial.zod"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { checkPermissions } from "@/util/auth.util"

export const addStateMaterialAction = action(addStateMaterialZod,
    async ({ name, description, color }) => {
        const session = await getServerSession(authOptions)
        if (!session?.user || !checkPermissions(session, ["gestion_state_material"])) {
            throw new Error("Unauthorized")
        }

        return await addStateMaterial(name, description, color)
    })

export const editStateMaterialAction = action(editStateMaterialZod,
    async ({
               stateMaterialId,
               name,
               description,
               color,
           }) => {
        const session = await getServerSession(authOptions)
        if (!session?.user || !checkPermissions(session, ["gestion_state_material"])) {
            throw new Error("Unauthorized")
        }

        return await editStateMaterial(stateMaterialId, name, description, color)
    })

export const deleteStateMaterialAction = action(deleteStateMaterialZod,
    async ({ stateMaterialId }) => {
        const session = await getServerSession(authOptions)
        if (!session?.user || !checkPermissions(session, ["gestion_state_material"])) {
            throw new Error("Unauthorized")
        }

        return await deleteStateMaterial(stateMaterialId)
    })

export const getAllStateMaterialAction = action({}, async () => {
    return await getAllStateMaterialSmall()
})