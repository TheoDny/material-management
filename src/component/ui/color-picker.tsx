"use client"

import { Button } from "./button"
import { Input } from "./input"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "./popover"
import { Palette } from "lucide-react"
import { cn } from "@/lib/utils"
import { getContrastColor } from "@/util/diverse.util"

export function ColorPicker({
                                color,
                                setColor,
                                className,
                            }: {
    color: string
    setColor: (color: string) => void
    className?: string
}) {
    const predefinedColor = [
        "#B22222",
        "#228B22",
        "#0000FF",
        "#FFFF00",
        "#FF00FF",
        "#800000",
        "#008000",
        "#4169E1",
        "#800080",
        "#008080",
        "#C0C0C0",
        "#808080",
        "#FFA500",
        "#A52A2A",
        "#2c0202",
        "#2E8B57",
        "#4682B4",
        "#041919",
        "#DAA520",
        "#FFC0CB",
        "#8B4513",
        "#9400D3",
        "#FFD700",
        "#7CFC00",
        "#7B68EE",
        "#FF6347",
        "#87CEEB",
        "#40E0D0",
        "#9370DB",
        "#FF4500",
        "#FFDAB9",
        "#B0E0E6",
    ]

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant={"outline"}
                    className={cn(
                        "w-full",
                        !color && "text-muted-foreground",
                        className,
                    )}
                    style={{ backgroundColor: color, color: getContrastColor(color) }}
                >
                    <div className="w-full flex items-center">
                        <Palette className="h-4 w-4 fixed" />
                        <p className="w-full">
                            {color}
                        </p>
                    </div>
                </Button>
            </PopoverTrigger>
            <PopoverContent className="flex flex-col gap-2">
                <div className="flex flex-row flex-wrap gap-2">
                    {predefinedColor.map((s) => (
                        <div
                            key={s}
                            style={{ background: s }}
                            className="rounded-md h-6 w-6 cursor-pointer active:scale-105"
                            onClick={() => setColor(s)}
                        />
                    ))}

                </div>


                <Input
                    id="custom"
                    value={color}
                    className="w-full"
                    onChange={(e: any) => setColor(e.currentTarget.value)}
                />
            </PopoverContent>
        </Popover>
    )
}