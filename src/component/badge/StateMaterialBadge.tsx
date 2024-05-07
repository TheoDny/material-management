import { Tooltip, TooltipContent, TooltipTrigger } from "@/component/ui/tooltip"
import { Badge } from "@/component/ui/badge"
import { getContrastColor } from "@/util/diverse.util"
import * as React from "react"
import { StateMaterialSmall } from "@/type/stateMaterial.type"

type StateMaterialBadgeProps = {
    stateMaterial: StateMaterialSmall
}

export function StateMaterialBadge({ stateMaterial }: StateMaterialBadgeProps) {
    return (
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
    )
}
