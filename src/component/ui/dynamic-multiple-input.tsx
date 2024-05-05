import { cn } from "@/lib/utils"
import { CirclePlus, CircleMinus } from "lucide-react"
import { Input, InputProps } from "@/component/ui/input"
import { Button } from "@/component/ui/button"
import * as React from "react"
import { ScrollArea } from "@/component/ui/scroll-area"

export interface DynamicMultipleInputProps {
    value: [string, string][]
    onChange: React.Dispatch<React.SetStateAction<[string, string][]>>
    className?: string
    input1?: InputProps
    input2?: InputProps
    widthScrollArea?: boolean
}

export const DynamicMultipleInput = ({
                                         value,
                                         onChange,
                                         className,
                                         widthScrollArea,
                                         ...props
                                     }: DynamicMultipleInputProps) => {
    const handleAdd = () => {
        onChange([...value, ["", ""]])
    }

    const handleRemove = (index: number) => {
        onChange(value.filter((_: any, i: number) => i !== index))
    }

    const handleChange = (index: number, newValue: [string, string]) => {
        onChange(value.map((v: [string, string], i: number) => (i === index ? newValue : v)))
    }
    const Container = widthScrollArea ? ScrollArea : "div"

    return (
        <Container className={cn("flex flex-col max-h-80", className)} {...props}>
            {value.map((v: [string, string], i: number) => (
                <div key={i} className="flex flex-col gap-1 mb-2">
                    <div>
                        <Input
                            {...props.input1}
                            value={v[0]}
                            onChange={(e) => handleChange(i, [e.target.value, v[1]])}
                        />
                        <Input
                            className={"mt-0.5"}
                            {...props.input2}
                            value={v[1]}
                            onChange={(e) => handleChange(i, [v[0], e.target.value])}
                        />
                    </div>
                    <Button
                        type="button"
                        variant={"destructive"}
                        className="w-full"
                        size={"xs"}
                        onClick={() => handleRemove(i)}
                    >
                        <CircleMinus className="w-4.5 h-4.5" />
                    </Button>
                </div>
            ))}
            <Button
                type="button"
                onClick={handleAdd}
                size={"xs"}
                variant={"secondary"}
                className="w-full mt-1"
            >
                <CirclePlus className="w-4.5 h-4.5" />
            </Button>
        </Container>
    )
}