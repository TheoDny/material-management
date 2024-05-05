"use client"

import { DataTable, SortingIndicator } from "@/component/dataTable/DataTable"
import { Button } from "@/component/ui/button"
import { sortDate } from "@/util/date.util"
import React from "react"
import { StateMaterialFormatted, StateMaterialMedium } from "@/type/stateMaterial.type"
import { ColumnDef } from "@tanstack/react-table"

type Props = {
    stateMaterialData: StateMaterialFormatted[]

}
export const StateMaterialDataTable = ({stateMaterialData}:Props) => {

    return (
        <DataTable
            columns={columnsStateMaterial}
            data={stateMaterialData}
            enableColumnVisibility={true}
            config={{
                filterPlaceHolder: "Filtre des états de matériel..."
            }}
        />
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
            sortDate(rowA.getValue(columnId), rowB.getValue(columnId), "DD/MM/YYYY HH:mm:ss"),
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
