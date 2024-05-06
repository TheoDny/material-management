import { prisma } from "@/lib/prisma"
import { addLog } from "@/service/log.service"
import {
    selectStateMaterialMedium,
    selectStateMaterialSmall,
    StateMaterialFormatted,
    StateMaterialMedium,
    StateMaterialSmall,
} from "@/type/stateMaterial.type"
import dayjs from "dayjs"

export const getAllStateMaterialFormated = async (): Promise<StateMaterialFormatted[]> => {
    const query: string = `
        SELECT id,
               name,
               description,
               to_char("createdAt", 'DD/MM/YYYY') as "createdAt",
               color
        FROM "StateMaterial"
        WHERE "deletedAt" IS NULL
        ORDER BY "name" ASC
    `
    return prisma.$queryRawUnsafe(query)
}

export const getAllStateMaterialSmall = async (): Promise<StateMaterialSmall[]> => {
    return prisma.stateMaterial.findMany({
        select: selectStateMaterialSmall,
        where: {
            deletedAt: null,
        },
        orderBy: {
            name: "asc",
        },
    })
}
export const addStateMaterial = async (name: string, description: string, color?: string): Promise<StateMaterialFormatted> => {
    const newStateMaterial = await prisma.stateMaterial.create({
        data: {
            name: name,
            description: description,
            color: color,
        },
        select: selectStateMaterialMedium,
    })

    if (!newStateMaterial) {
        throw new Error(`Failed to create new state material (${name})`)
    }

    addLog("STATE_MATERIAL_ADD", `Ajout de l'état de matériel ${newStateMaterial.name} (${newStateMaterial.id})`)

    return convertToFormatted(newStateMaterial)
}

export const editStateMaterial = async (
    stateMaterialId: string,
    name: string,
    description: string,
    color?: string,
): Promise<StateMaterialFormatted> => {
    const prevStateMaterial = await deleteStateMaterial(stateMaterialId, false)

    if (!prevStateMaterial) {
        throw new Error(`State material (${stateMaterialId}) not found or failed to update`)
    }

    const newStateMaterial = await prisma.stateMaterial.create({
        data: {
            name: name,
            description: description,
            color: color,
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
        throw new Error(`Failed to create the updated state material (${name} - ${stateMaterialId})`)
    }

    addLog(
        "STATE_MATERIAL_EDIT",
        `Edition de l'état de matériel ${newStateMaterial.name} (${newStateMaterial.id} <= ${prevStateMaterial.id})`,
    )

    return convertToFormatted(newStateMaterial)
}

export const deleteStateMaterial = async (
    stateMaterialId: string,
    log: boolean = true,
): Promise<StateMaterialSmall> => {
    const deletedStateMaterial = await prisma.stateMaterial.update({
        where: {
            id: stateMaterialId,
        },
        data: {
            deletedAt: new Date(),
        },
        select: selectStateMaterialSmall,
    })

    log &&
    addLog(
        "STATE_MATERIAL_DELETE",
        `Suppression de l'état de matériel ${deletedStateMaterial.name} (${stateMaterialId})`,
    )

    return deletedStateMaterial
}

const convertToFormatted = (stateMaterial: StateMaterialMedium): StateMaterialFormatted => {
    return {
        id: stateMaterial.id,
        name: stateMaterial.name,
        description: stateMaterial.description,
        color: stateMaterial.color,
        createdAt: dayjs(stateMaterial.createdAt).format("DD/MM/YYYY"),
    }
}
