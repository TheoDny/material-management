"use client"

import { DataTable, SortingIndicator } from "@/component/dataTable/DataTable"
import { Button } from "@/component/ui/button"
import { sortDate } from "@/util/date.util"
import React, { ReactNode, useState } from "react"
import { Characteristics, MaterialFormatted, MaterialIncludeStateMaterial } from "@/type/material.type"
import { ColumnDef } from "@tanstack/react-table"
import { DialogAddEditMaterial } from "@/component/dataTable/material/dialog/DialogAddEditMaterial"
import dayjs from "dayjs"

type Props = {
    materialData: MaterialIncludeStateMaterial[]
}
export const MaterialDataTable = ({ materialData }: Props) => {
    const [materials, setMaterials] = useState<MaterialFormatted[]>(formatMaterialArray(materialData))
    const [showDialogAddEditMaterial, setShowDialogAddEditMaterial] = useState(false)
    const [selectedMaterial, setSelectedMaterial] = useState<
        | (MaterialFormatted & {
        index: number
    })
        | undefined
    >(undefined)

    const closeDialogAddEdit = () => {
        setShowDialogAddEditMaterial(false)
        setSelectedMaterial(undefined)
    }

    const afterSubmit = (material: MaterialIncludeStateMaterial, action: "edit" | "delete" | "add") => {
        switch (action) {
            case "delete":
                if (selectedMaterial) {
                    setMaterials((prevState) => {
                        const newState = prevState.slice()
                        newState.splice(selectedMaterial.index, 1)
                        return newState
                    })
                }
                break
            case "edit":
                if (selectedMaterial) {
                    setMaterials((prevState) => {
                        const newState = prevState.slice()
                        newState[selectedMaterial.index] = formatMaterialArray([material])[0]
                        return newState
                    })
                }
                break
            case "add":
                setMaterials((prevState) => {
                    const newState = prevState.slice()
                    newState.unshift(formatMaterialArray([material])[0])
                    return newState
                })
                break
        }
        closeDialogAddEdit()
    }

    const toolbar: ReactNode = (
        <Button
            size={"sm"}
            onClick={() => {
                setShowDialogAddEditMaterial(true)
            }}
        >
            Ajouter un état de matériel
        </Button>
    )
    return (
        <div>
            <DialogAddEditMaterial
                show={showDialogAddEditMaterial}
                afterSubmit={afterSubmit}
                defaultValues={selectedMaterial}
                closeDialog={closeDialogAddEdit}
            />
            <DataTable
                columns={columnsMaterial}
                data={materials}
                enableColumnVisibility={true}
                onDoubleClick={(index) => {
                    setSelectedMaterial({
                        index: index,
                        ...materials[index],
                    })
                    setShowDialogAddEditMaterial(true)
                }}
                toolbar={toolbar}
                config={{
                    filterPlaceHolder: "Filtre des états de matériel...",
                }}
            />
        </div>
    )
}

const formatMaterialArray = (materialData: MaterialIncludeStateMaterial[]): MaterialFormatted[] => {
    return materialData.map((material, index) => {
        return {
            id: material.id,
            name: material.name,
            description: material.description,
            updatedAt: dayjs(material.createdAt).format("DD/MM/YYYY HH:mm:ss"),
            characteristics: material.characteristics as Characteristics,
            StateMaterial: material.StateMaterial
        }
    })
}

const columnsMaterial: ColumnDef<MaterialFormatted>[] = [
    {
        accessorKey: "updatedAt",
        header: ({ column }) => {
            const isSorted = column.getIsSorted()
            return (
                <Button
                    size={"sm"}
                    onClick={() => column.toggleSorting(isSorted === "asc")}
                >
                    Créé
                    <SortingIndicator isSorted={isSorted} />
                </Button>
            )
        },
        sortingFn: (rowA, rowB, columnId) =>
            sortDate(rowA.getValue(columnId), rowB.getValue(columnId), "DD/MM/YYYY"),
    },
    {
        accessorKey: "name",
        header: ({ column }) => {
            const isSorted = column.getIsSorted()
            return (
                <Button
                    size={"sm"}
                    onClick={() => column.toggleSorting(isSorted === "asc")}
                >
                    Nom
                    <SortingIndicator isSorted={isSorted} />
                </Button>
            )
        },
    },
    {
        accessorKey: "description",
        header: "Description",
    },
]