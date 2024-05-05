"use client"
import React, { useEffect, useMemo, useState } from "react"
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
import { addFrontMaterialZod } from "@/zod/material.zod"
import { toast } from "sonner"
import { handleErrorAction } from "@/util/error.util"
import { Button } from "@/component/ui/button"
import { useConfirm } from "@/provider/ConfirmationProvider"
import { Characteristics, MaterialIncludeStateMaterial } from "@/type/material.type"
import { MultiSelect } from "@/component/ui/multi-select"
import { StateMaterialSmall } from "@/type/stateMaterial.type"
import { getAllStateMaterialAction } from "@/action/stateMaterial.action"
import { DynamicMultipleInput } from "@/component/ui/dynamic-multiple-input"

type props = {
    defaultValues?: {
        id: string
        name: string
        description: string
        StateMaterial: StateMaterialSmall[]
        characteristics: Characteristics
    }
    afterSubmit?: (value: MaterialIncludeStateMaterial, action: "edit" | "delete" | "add") => any
    canDelete?: boolean
}

const AddEditMaterialForm = ({ defaultValues, afterSubmit, canDelete }: props) => {
    const [loading, setLoading] = useState(false)
    const [stateMaterial, setStateMaterial] = useState<StateMaterialSmall[]>([])
    const fetchStateMaterial = useMemo(() => {
        return async () => {
            const response = await getAllStateMaterialAction({})
            if (handleErrorAction(response, toast) && response.data) {
                setStateMaterial(response.data)
            }
        }
    }, [])

    useEffect(() => {
        fetchStateMaterial()
    }, [fetchStateMaterial])

    const { confirm } = useConfirm()

    const form = useForm<z.infer<typeof addFrontMaterialZod>>({
        resolver: zodResolver(addFrontMaterialZod),
        defaultValues,
    })

    const addMaterial = async (values: z.infer<typeof addFrontMaterialZod>) => {
        setLoading(true)
        const materialToSend = {
            ...values,
            stateMaterialIds: values.StateMaterial.map((state) => state.id),
        }
        const response = await addMaterialAction(materialToSend)
        if (handleErrorAction(response, toast) && response.data) {
            afterSubmit && afterSubmit(response.data, "add")
        }
        setLoading(false)
    }

    const editMaterial = async (values: z.infer<typeof addFrontMaterialZod>) => {
        if (!defaultValues) return console.error("Aucun materialId fourni")
        setLoading(true)
        const materialToSend = {
            ...values,
            stateMaterialIds: values.StateMaterial.map((state) => state.id),
            materialId: defaultValues.id,
        }
        const response = await editMaterialAction(materialToSend)
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
                "Voulez-vous vraiment supprimer ce matériel ?",
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
                <FormField
                    control={form.control}
                    name="characteristics"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Carractèristiques</FormLabel>
                            <FormControl>
                                <DynamicMultipleInput
                                    value={field.value ?? []}
                                    onChange={field.onChange}
                                    input1={{
                                        placeholder: "Nom",
                                    }}
                                    input2={{
                                        placeholder: "Valeur",
                                    }}
                                    widthScrollArea={true}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="StateMaterial"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>États du matériel</FormLabel>
                            <FormControl>
                                <MultiSelect
                                    selected={(field.value ?? []).map((state: StateMaterialSmall) => ({
                                        label: state.name,
                                        key: state.id,
                                        tip: state.description,
                                        value: state,
                                    }))}
                                    onChange={(value => {
                                        const transformedValue = value.map((state: {
                                            value: any,
                                        }) => {
                                            return {
                                                ...state.value,
                                            }
                                        })
                                        field.onChange(transformedValue)
                                    })}
                                    options={stateMaterial.map((state) => ({
                                        label: state.name,
                                        key: state.id,
                                        tip: state.description,
                                        value: state,
                                    }))}
                                />
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
