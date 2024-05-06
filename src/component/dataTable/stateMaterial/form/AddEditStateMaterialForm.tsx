"use client"
import React, { useState } from "react"
import { useForm } from "react-hook-form"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/component/ui/form"
import { Input } from "@/component/ui/input"
import { ButtonLoading } from "@/component/ui/button-loading"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import {
    addStateMaterialAction,
    deleteStateMaterialAction,
    editStateMaterialAction,
} from "@/action/stateMaterial.action"
import { addStateMaterialZod } from "@/zod/stateMaterial.zod"
import { toast } from "sonner"
import { handleErrorAction } from "@/util/error.util"
import { Button } from "@/component/ui/button"
import { useConfirm } from "@/provider/ConfirmationProvider"
import { StateMaterialFormatted } from "@/type/stateMaterial.type"
import { ColorPicker } from "@/component/ui/color-picker"

type props = {
    defaultValues?: {
        id: string
        name: string
        description: string
        color: string
    }
    afterSubmit?: (value: StateMaterialFormatted, action: "edit" | "delete" | "add") => any
    canDelete?: boolean
}

const AddEditStateMaterialForm = ({ defaultValues, afterSubmit, canDelete }: props) => {
    const [loading, setLoading] = useState(false)

    const { confirm } = useConfirm()

    const form = useForm<z.infer<typeof addStateMaterialZod>>({
        resolver: zodResolver(addStateMaterialZod),
        defaultValues,
    })

    const addStateMaterial = async (values: z.infer<typeof addStateMaterialZod>) => {
        setLoading(true)
        const response = await addStateMaterialAction(values)
        if (handleErrorAction(response, toast) && response.data) {
            afterSubmit && afterSubmit(response.data, "add")
        }
        setLoading(false)
    }

    const editStateMaterial = async (values: z.infer<typeof addStateMaterialZod>) => {
        if (!defaultValues) return console.error("Aucun stateMaterialId fourni")
        setLoading(true)
        const response = await editStateMaterialAction({ stateMaterialId: defaultValues.id, ...values })
        if (handleErrorAction(response, toast) && response.data) {
            afterSubmit && afterSubmit(response.data, "edit")
        }
        setLoading(false)
    }

    const deleteStateMaterial = async () => {
        if (!defaultValues) return console.error("Aucun stateMaterialId fourni")
        setLoading(true)
        if (
            await confirm(
                "Voulez-vous vraiment supprimer cet etat de matériel ?",
                `État: ${defaultValues.name} - ${defaultValues.description}`,
            )
        ) {
            const response = await deleteStateMaterialAction({ stateMaterialId: defaultValues.id })
            if (handleErrorAction(response, toast) && response.data) {
                // @ts-ignore
                afterSubmit && afterSubmit(response.data, "delete")
            }
        }
        setLoading(false)
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(defaultValues?.id ? editStateMaterial : addStateMaterial)}
                className="space-y-3"
            >
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Nom</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <ButtonLoading
                    className="w-full !mt-6"
                    type="submit"
                    loading={loading}
                >
                    {defaultValues ? "Modifier" : "Ajouter"}
                </ButtonLoading>
                {canDelete && defaultValues && (
                    <Button
                        className="w-full !mt-6"
                        variant={"destructive"}
                        type="button"
                        onClick={deleteStateMaterial}
                    >
                        Suppression
                    </Button>
                )}
                <FormField
                    control={form.control}
                    name="color"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Couleur</FormLabel>
                            <FormControl>
                                <ColorPicker color={field.value ?? "#D3D3D3"} setColor={field.onChange} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </form>
        </Form>
    )
}

export default AddEditStateMaterialForm
