import * as React from "react"
import { cn } from "@/lib/utils"

import { Check, X, ChevronsUpDown } from "lucide-react"
import { Button } from "./button"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "./command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "./popover"
import { Badge } from "./badge"
import { ScrollArea } from "@/component/ui/scroll-area"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/component/ui/tooltip"
import { getContrastColor } from "@/util/diverse.util"


export type OptionType = {
    label: string;
    value: any;
    tip?: string;
    color?: string;
    key: string;
}

interface MultiSelectProps {
    options: OptionType[];
    selected: OptionType[];
    onChange: (value: OptionType[]) => void;
    className?: string;
}

function MultiSelect({ options, selected, onChange, className, ...props }: MultiSelectProps) {

    const [open, setOpen] = React.useState(false)

    const handleUnselect = (item: OptionType) => {
        onChange(selected.filter((i) => i.key !== item.key))
    }

    return (
        <Popover open={open} onOpenChange={setOpen} {...props}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className={`w-full justify-between h-full min-h-12`}
                    onClick={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                        setOpen(!open)
                    }}
                >
                    <div className="flex gap-1 flex-wrap">
                        {selected.map((item) => (
                            <Tooltip key={item.key}>
                                <TooltipTrigger>
                                    <Badge
                                        variant="secondary"
                                        key={item.key}
                                        style={item.color ? {
                                            backgroundColor: item.color,
                                            color: getContrastColor(item.color),
                                        } : {}}
                                    >
                                        {item.label}
                                        <div
                                            className="ml-1 ring-offset-background rounded-full outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                                            onMouseDown={(e) => {
                                                e.preventDefault()
                                                e.stopPropagation()
                                            }}
                                            onClick={(e) => {
                                                e.preventDefault()
                                                e.stopPropagation()
                                                handleUnselect(item)
                                            }}
                                        >
                                            <X
                                                className="h-3 w-3 text-muted-foreground hover:text-foreground"
                                            />
                                        </div>
                                    </Badge>
                                </TooltipTrigger>
                                <TooltipContent>
                                    {item.tip}
                                </TooltipContent>
                            </Tooltip>
                        ))}
                    </div>
                    <ChevronsUpDown className="h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-96 p-0">
                <Command className={className}>
                    <CommandInput placeholder="Search ..." />
                    <CommandEmpty>No item found.</CommandEmpty>
                    <CommandGroup className="max-h-64 overflow-auto">
                        <CommandList>
                            <ScrollArea className="max-h-[200px]">
                                {options.map((option) => (
                                    <CommandItem
                                        className={"border-b cursor-pointer"}
                                        key={option.key}
                                        onSelect={() => {
                                            onChange(
                                                selected.some((select) => select.key === option.key)
                                                    ? selected.filter((item) => item.key !== option.key)
                                                    : [...selected, option],
                                            )
                                            setOpen(true)
                                        }}
                                    >
                                        <Check
                                            className={cn(
                                                "mr-2 h-4 w-4",
                                                selected.some((select) => select.key === option.key) ?
                                                    "opacity-100" : "opacity-0",
                                            )}
                                        />
                                        {option.label}
                                        <div
                                            className="rounded h-4.5 w-4.5 ml-auto mr-2"
                                            style={option.color ? {
                                                backgroundColor: option.color,
                                            } : {}}
                                        >

                                        </div>
                                    </CommandItem>
                                ))}
                            </ScrollArea>
                        </CommandList>
                    </CommandGroup>
                </Command>
            </PopoverContent>
        </Popover>
    )
}

export { MultiSelect }
