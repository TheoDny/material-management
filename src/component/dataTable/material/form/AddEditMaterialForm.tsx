"use client"
import React, { useState } from "react"
import { useForm } from "react-hook-form"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/component/ui/form"
import { Input } from "@/component/ui/input"
import { ButtonLoading } from "@/component/ui/button-loading"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import {
    addMaterialAction,
    deleteMaterialAction,
    editMaterialAction,
} from "@/action/material.action"
import { addMaterialZod } from "@/zod/material.zod"
import { toast } from "sonner"
import { handleErrorAction } from "@/util/error.util"
import { Button } from "@/component/ui/button"
import { useConfirm } from "@/provider/ConfirmationProvider"
import { MaterialIncludeStateMaterial } from "@/type/material.type"

type props = {
    defaultValues?: {
        id: string
        name: string
        description: string
    }
    afterSubmit?: (value: MaterialIncludeStateMaterial, action: "edit" | "delete" | "add") => any
    canDelete?: boolean
}

const AddEditMaterialForm = ({ defaultValues, afterSubmit, canDelete }: props) => {
    const [loading, setLoading] = useState(false)

    const { confirm } = useConfirm()

    const form = useForm<z.infer<typeof addMaterialZod>>({
        resolver: zodResolver(addMaterialZod),
        defaultValues,
    })

    const addMaterial = async (values: z.infer<typeof addMaterialZod>) => {
        setLoading(true)
        const response = await addMaterialAction(values)
        if (handleErrorAction(response, toast) && response.data) {
            afterSubmit && afterSubmit(response.data, "add")
        }
        setLoading(false)
    }

    const editMaterial = async (values: z.infer<typeof addMaterialZod>) => {
        if (!defaultValues) return console.error("Aucun materialId fourni")
        setLoading(true)
        const response = await editMaterialAction({ materialId: defaultValues.id, ...values })
        if (handleErrorAction(response, toast) && response.data) {
            afterSubmit && afterSubmit(response.data, "edit")
        }
        setLoading(false)
    }

    const deleteMaterial = async () => {
        if (!defaultValues) return console.error("Aucun materialId fourni")
        setLoading(true)
        if (
            await confirm(
                "Voulez-vous vraiment supprimer cet etat de matériel ?",
                `État: ${defaultValues.name} - ${defaultValues.description}`,
            )
        ) {
            const response = await deleteMaterialAction({ materialId: defaultValues.id })
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
                onSubmit={form.handleSubmit(defaultValues?.id ? editMaterial : addMaterial)}
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
                        onClick={deleteMaterial}
                    >
                        Suppression
                    </Button>
                )}
            </form>
        </Form>
    )
}

export default AddEditMaterialForm
