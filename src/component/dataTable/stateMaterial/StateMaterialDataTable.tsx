"use client"

import { DataTable, SortingIndicator } from "@/component/dataTable/DataTable"
import { Button } from "@/component/ui/button"
import { sortDate } from "@/util/date.util"
import React, { ReactNode, useState } from "react"
import { StateMaterialFormatted } from "@/type/stateMaterial.type"
import { ColumnDef } from "@tanstack/react-table"
import { DialogAddEditStateMaterial } from "@/component/dataTable/stateMaterial/dialog/DialogAddEditStateMaterial"

type Props = {
    stateMaterialData: StateMaterialFormatted[]
}
export const StateMaterialDataTable = ({ stateMaterialData }: Props) => {
    const [stateMaterials, setStateMaterials] = useState<StateMaterialFormatted[]>(stateMaterialData)
    const [showDialogAddEditStateMaterial, setShowDialogAddEditStateMaterial] = useState(false)
    const [selectedStateMaterial, setSelectedStateMaterial] = useState<
        | (StateMaterialFormatted & {
        index: number
    })
        | undefined
    >(undefined)

    const closeDialogAddEdit = () => {
        setShowDialogAddEditStateMaterial(false)
        setSelectedStateMaterial(undefined)
    }

    const afterSubmit = (stateMaterial: StateMaterialFormatted, action: "edit" | "delete" | "add") => {
        switch (action) {
            case "delete":
                if (selectedStateMaterial) {
                    setStateMaterials((prevState) => {
                        const newState = prevState.slice()
                        newState.splice(selectedStateMaterial.index, 1)
                        return newState
                    })
                }
                break
            case "edit":
                if (selectedStateMaterial) {
                    setStateMaterials((prevState) => {
                        const newState = prevState.slice()
                        newState[selectedStateMaterial.index] = stateMaterial
                        return newState
                    })
                }
                break
            case "add":
                setStateMaterials((prevState) => {
                    const newState = prevState.slice()
                    newState.unshift(stateMaterial)
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
                setShowDialogAddEditStateMaterial(true)
            }}
        >
            Ajouter un état de matériel
        </Button>
    )
    return (
        <div>
            <DialogAddEditStateMaterial
                show={showDialogAddEditStateMaterial}
                afterSubmit={afterSubmit}
                defaultValues={selectedStateMaterial}
                closeDialog={closeDialogAddEdit}
            />
            <DataTable
                columns={columnsStateMaterial}
                data={stateMaterials}
                enableColumnVisibility={true}
                onDoubleClick={(index) => {
                    setSelectedStateMaterial({
                        index: index,
                        ...stateMaterials[index],
                    })
                    setShowDialogAddEditStateMaterial(true)
                }}
                toolbar={toolbar}
                config={{
                    filterPlaceHolder: "Filtre des états de matériel...",
                }}
            />
        </div>
    )
}

const columnsStateMaterial: ColumnDef<StateMaterialFormatted>[] = [
    {
        accessorKey: "createdAt",
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
    {
        accessorKey: "color",
        header: "Couleur",
        cell: ({ cell }) => (
            <div className={"rounded h-4.5 w-4.5"}
                 style={{
                     backgroundColor: cell.row.original.color,
                 }}
            />
        ),
    },
]
