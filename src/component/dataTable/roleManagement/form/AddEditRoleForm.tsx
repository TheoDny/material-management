import React, { useState } from "react"
import { useForm } from "react-hook-form"
import { Form, FormItem, FormLabel, FormControl, FormField, FormMessage } from "@/component/ui/form"
import { Input } from "@/component/ui/input"
import { ButtonLoading } from "@/component/ui/button-loading"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { addRoleAction, editRoleAction } from "@/action/role.action"
import { RoleFull } from "@/type/role.type"
import { addRoleZod } from "../../../../../zod/role.zod"
import { toast } from "sonner" // replace with your actual import path

type props = {
    defaultValues?: {
        id: string
        name: string
        description: string
    }
    afterSubmit: (value: RoleFull) => any
}

const AddEditRoleForm = ({ defaultValues, afterSubmit }: props) => {
    const [loading, setLoading] = useState(false)

    const form = useForm<z.infer<typeof addRoleZod>>({
        resolver: zodResolver(addRoleZod),
        defaultValues,
    })

    const addRole = async (values: z.infer<typeof addRoleZod>) => {
        setLoading(true)

        const response = await addRoleAction(values)
        if (response.validationErrors) {
            console.error(response.validationErrors)
        } else if (response.serverError) {
            console.error(response.serverError)
        } else if (!response.data) {
            console.error("Une erreur est survenue")
        } else {
            afterSubmit(response.data)
        }

        setLoading(false)
    }

    const editRole = async (values: z.infer<typeof addRoleZod>) => {
        if (!defaultValues?.id) return console.error("Aucun roleId fourni")
        setLoading(true)

        const response = await editRoleAction({ roleId: defaultValues.id, ...values })
        if (response.validationErrors) {
            console.error(response.validationErrors)
        } else if (response.serverError) {
            console.error(response.serverError)
        } else if (!response.data) {
            console.error("Une erreur est survenue")
        } else {
            afterSubmit(response.data)
        }

        setLoading(false)
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(defaultValues?.id ? editRole : addRole)}
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
            </form>
        </Form>
    )
}

export default AddEditRoleForm
