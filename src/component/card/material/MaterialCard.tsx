"use client"
import { useEffect, useMemo, useState } from "react"
import { handleErrorAction } from "@/util/error.util"
import { toast } from "sonner"
import { getMaterialAction } from "@/action/material.action"
import { Characteristics, MaterialIncludeStateMaterial } from "@/type/material.type"
import { SkeletonMaterialCard } from "@/component/card/material/SkeletonMaterialCard"
import { BasicCard } from "@/component/card/basicCard"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/component/ui/tooltip"
import { Badge } from "@/component/ui/badge"
import { getContrastColor } from "@/util/diverse.util"
import * as React from "react"

type Props = {
    id: string
}

export function MaterialCard({ id }: Props) {
    const [material, setMaterial] = useState<MaterialIncludeStateMaterial | null>(null)
    const [loading, setLoading] = useState(false)

    const fetchMaterial = useMemo(() => {
        return async () => {
            setLoading(true)
            const response = await getMaterialAction({ materialId: id })
            if (handleErrorAction(response, toast) && response.data) {
                setMaterial(response.data)
            }
            setLoading(false)
        }
    }, [id])

    useEffect(() => {
        fetchMaterial()
    }, [fetchMaterial])

    return (
        <>
            {(loading || !material) ?
                <SkeletonMaterialCard />
                :
                <BasicCard title={material?.name} description={material?.description} className={{
                    card: "w-fit min-w-64",
                }}>
                    <div className={"border-b pb-1 mb-2"}>
                        <div className={"gap-1"}>
                            {(material.characteristics as Characteristics).map(([charac, value], index) => (
                                <p key={index} className={"text-sm"}>
                                    <strong>{charac}: </strong>{value}
                                </p>
                            ))}
                        </div>
                    </div>
                    <div className="flex gap-1 flex-wrap">
                        <TooltipProvider>
                            {material.StateMaterial.map((stateMaterial) => (
                                <Tooltip key={stateMaterial.id}>
                                    <TooltipTrigger>
                                        <Badge
                                            variant="secondary"
                                            size={"sm"}
                                            style={stateMaterial.color ? {
                                                backgroundColor: stateMaterial.color,
                                                color: getContrastColor(stateMaterial.color),
                                            } : {}}
                                        >
                                            {stateMaterial.name}
                                        </Badge>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        {stateMaterial.description}
                                    </TooltipContent>
                                </Tooltip>
                            ))}
                        </TooltipProvider>
                    </div>
                </BasicCard>

            }
        </>
    )
}
