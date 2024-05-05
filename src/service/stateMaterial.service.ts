import { prisma } from "@/lib/prisma"
import { addLog } from "@/service/log.service"
import {
    selectStateMaterialMedium,
    selectStateMaterialSmall,
    StateMaterialMedium,
    StateMaterialSmall,
} from "@/type/stateMaterial.type"

export const getAllStateMaterialMedium = async (): Promise<StateMaterialMedium[]> => {
    return prisma.stateMaterial.findMany({
        select: selectStateMaterialMedium,
    })
}

export const getAllStateMaterialSmall = async (): Promise<StateMaterialSmall[]> => {
    return prisma.stateMaterial.findMany({
        select: selectStateMaterialSmall,
    })
}
export const addStateMaterial = async (name: string, description: string): Promise<StateMaterialMedium> => {
    const newStateMaterial = await prisma.stateMaterial.create({
        data: {
            name: name,
            description: description,
        },
        select: selectStateMaterialMedium,
    })

    addLog("STATE_MATERIAL_ADD", `Ajout de l'état de matériel ${newStateMaterial.name} (${newStateMaterial.id})`)

    return newStateMaterial
}

export const editStateMaterial = async (
    stateMaterialId: string,
    name: string,
    description: string,
): Promise<StateMaterialMedium> => {
    const prevStateMaterial = await deleteStateMaterial(stateMaterialId, false)

    if (!prevStateMaterial) {
        throw new Error(`State material (${stateMaterialId}) not found or failed to update`)
    }

    const newStateMaterial = await prisma.stateMaterial.create({
        data: {
            name: name,
            description: description,
        },
        select: selectStateMaterialMedium,
    })

    if (!newStateMaterial) {
        await prisma.stateMaterial.update({
            where: {
                id: stateMaterialId,
            },
            data: {
                deletedAt: null,
            },
            select: {
                id: true,
            },
        })
        throw new Error(`Failed to create new state material (${name})`)
    }

    addLog("STATE_MATERIAL_EDIT", `Edition de l'état de matériel ${newStateMaterial.name} (${newStateMaterial.id} <= ${prevStateMaterial.id})`)

    return newStateMaterial
}

export const deleteStateMaterial = async (stateMaterialId: string,log: boolean = true): Promise<StateMaterialSmall> => {
    const deletedStateMaterial = await prisma.stateMaterial.update({
        where: {
            id: stateMaterialId,
        },
        data: {
            deletedAt: new Date(),
        },
        select: selectStateMaterialSmall,
    })

    log && addLog("STATE_MATERIAL_DELETE", `Suppression de l'état de matériel ${deletedStateMaterial.name} (${stateMaterialId})`)

    return deletedStateMaterial
}
