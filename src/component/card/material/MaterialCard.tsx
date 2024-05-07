"use client"
import { useEffect, useMemo, useState } from "react"
import { handleErrorAction } from "@/util/error.util"
import { toast } from "sonner"
import { getMaterialAction } from "@/action/material.action"
import { Characteristics, MaterialIncludeStateMaterial } from "@/type/material.type"
import { SkeletonMaterialCard } from "@/component/card/material/SkeletonMaterialCard"
import { BasicCard } from "@/component/card/basicCard"
import * as React from "react"
import { StateMaterialBadge } from "@/component/badge/StateMaterialBadge"

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
                        {material.StateMaterial.map((stateMaterial) => (
                            <StateMaterialBadge key={stateMaterial.id} stateMaterial={stateMaterial} />
                        ))}
                    </div>
                </BasicCard>

            }
        </>
    )
}
