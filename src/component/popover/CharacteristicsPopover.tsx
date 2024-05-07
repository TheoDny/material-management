"use client"
import { Button } from "@/component/ui/button"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/component/ui/popover"
import { Characteristics } from "@/type/material.type"
import { useState } from "react"

type characteristicsPopoverProps = {
    characteristics: Characteristics
}

export function CharacteristicsPopover({ characteristics }: characteristicsPopoverProps) {
    const [open, setOpen] = useState(false)
    return (
        <Popover open={open}>
            <PopoverTrigger asChild>
                <Button variant="outline" onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    setOpen(!open)
                }}>Carractèristiques</Button>
            </PopoverTrigger>
            <PopoverContent
                className="w-fit"
                onInteractOutside={() => {
                    setOpen(false)
                }}
                onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                }}
            >
                {
                    characteristics.map(([charac, value], index) => (
                        <p key={index} className="text-sm">
                            <strong>{charac} : </strong>
                            {value}
                        </p>
                    ))
                }

            </PopoverContent>
        </Popover>
    )
}
