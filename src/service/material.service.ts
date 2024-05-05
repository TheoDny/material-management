import { prisma } from "@/lib/prisma"
import { addLog } from "@/service/log.service"
import {
    selectMaterialSmall,
    MaterialSmall,
    MaterialIncludeStateMaterial,
    selectMaterialIncludeStateMaterial,
    Characteristics,
} from "@/type/material.type"
import { undefined } from "zod"
import { filterEmptyTuple } from "@/util/diverse.util"

export const getAllMaterialWidthStateMaterial = async (): Promise<MaterialIncludeStateMaterial[]> => {
    return prisma.material.findMany({
        select: selectMaterialIncludeStateMaterial,
        where: {
            deletedAt: null,
        },
        orderBy: {
            name: "asc",
        },
    })
}

export const getAllMaterialSmall = async (): Promise<MaterialSmall[]> => {
    return prisma.material.findMany({
        select: selectMaterialSmall,
        where: {
            deletedAt: null,
        },
        orderBy: {
            name: "asc",
        },
    })
}

export const addMaterial = async (
    name: string,
    description: string,
    characteristics: Characteristics,
    stateMaterialIds: string[],
): Promise<MaterialIncludeStateMaterial> => {
    const newMaterial = await prisma.material.create({
        data: {
            name: name,
            description: description,
            characteristics: filterEmptyTuple(characteristics),
            StateMaterial: {
                connect: stateMaterialIds.map((stateMaterialId) => {
                    return {
                        id: stateMaterialId,
                    }
                }),
            },
        },
        select: selectMaterialIncludeStateMaterial,
    })

    if (!newMaterial) {
        throw new Error(`Failed to create new material (${name})`)
    }

    addLog("MATERIAL_ADD", `Ajout de l'état de matériel (${name} - ${newMaterial.id})`)

    return newMaterial
}

export const editMaterial = async (
    materialId: string,
    name: string,
    description: string,
    characteristics: Characteristics,
    stateMaterialIds: string[],
): Promise<MaterialIncludeStateMaterial> => {
    const prevMaterial = await deleteMaterial(materialId, false)

    if (!prevMaterial) {
        throw new Error(`State material (${materialId}) not found or failed to update`)
    }

    const newMaterial = await prisma.material.create({
        data: {
            name: name,
            description: description,
            characteristics: filterEmptyTuple(characteristics),
            StateMaterial: {
                connect: stateMaterialIds.map((stateMaterialId) => {
                    return {
                        id: stateMaterialId,
                    }
                }),
            },
        },
        select: selectMaterialIncludeStateMaterial,
    })

    if (!newMaterial) {
        await prisma.material.update({
            where: {
                id: materialId,
            },
            data: {
                deletedAt: null,
            },
            select: {
                id: true,
            },
        })
        throw new Error(`Failed to create the updated material (${name} - ${materialId})`)
    }

    addLog(
        "MATERIAL_EDIT",
        `Edition de l'état de matériel ${newMaterial.name} (${newMaterial.id} <= ${prevMaterial.id})`,
    )

    return newMaterial
}

export const deleteMaterial = async (
    materialId: string,
    log: boolean = true,
): Promise<MaterialSmall> => {
    const deletedMaterial = await prisma.material.update({
        where: {
            id: materialId,
        },
        data: {
            deletedAt: new Date(),
        },
        select: selectMaterialSmall,
    })

    log &&
    addLog(
        "MATERIAL_DELETE",
        `Suppression de l'état de matériel (${deletedMaterial.name} - ${materialId})`,
    )

    return deletedMaterial
}
