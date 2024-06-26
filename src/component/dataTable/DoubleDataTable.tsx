"use client"

import { ColumnDef } from "@tanstack/react-table"
import { DataTable, DataTableStyle } from "@/component/dataTable/DataTable"

import { MutableRefObject, ReactNode, useEffect, useMemo, useRef, useState } from "react"
import useDetectWrap from "@/hook/useDetectWrap"

export type ConfigCustomTable = {
    filterPlaceHolder?: string
}

type props<L, FL, R, FR> = {
    dataLeft: L[]
    formatLeft: (data: L[]) => FL[]
    columnsLeft: ColumnDef<FL>[]
    configLeft?: ConfigCustomTable
    classNameLeft?: DataTableStyle
    toolbarLeft?: ReactNode
    enableColumnVisibilityLeft?: boolean
    keyLeftToRight: keyof L
    dataRight: R[]
    formatRight: (data: R[]) => FR[]
    columnsRight: ColumnDef<FR>[]
    configRight?: ConfigCustomTable
    classNameRight?: DataTableStyle
    onDoubleClickLeft?: (index: number) => any
    onChangeSelectedRight?: (leftIndex: number, rightIds: string[]) => Promise<boolean>
    toolbarRight?: ReactNode
    enableColumnVisibilityRight?: boolean
}

/*
 * Have to be used within a client component
 * */
export default function DoubleDataTable<
    L extends { id: string },
    FL,
    R extends { id: string },
    FR extends { id: string },
>({
      dataLeft,
      formatLeft,
      columnsLeft,
      configLeft,
      classNameLeft,
      toolbarLeft,
      enableColumnVisibilityLeft,
      keyLeftToRight,
      dataRight,
      formatRight,
      columnsRight,
      configRight,
      classNameRight,
      onDoubleClickLeft,
      onChangeSelectedRight,
      toolbarRight,
      enableColumnVisibilityRight,
  }: props<L, FL, R, FR>) {
    const [leftSelected, setLeftSelected] = useState({})
    const [rightSelected, setRightSelected] = useState({})

    const elementRef = useRef<HTMLDivElement>(null)
    const [isWrapped, setIsWrapped] = useState(false)
    useDetectWrap(setIsWrapped, elementRef)

    const isEdited: MutableRefObject<boolean> = useRef(false)

    useEffect(() => {
        const newRightSelected: { [key: string]: true } = {}
        const keys = Object.keys(leftSelected)
        if (keys.length > 0 && dataLeft.length > 0) {
            const leftSelectedRaw: L = dataLeft[parseInt(keys[0])] as L
            // check if dataLeft[keys] was deleted
            if (leftSelectedRaw) {
                ;(leftSelectedRaw[keyLeftToRight] as { id: string }[]).forEach((rightObjInLeft) => {
                    const id = rightObjInLeft.id
                    newRightSelected[id] = true
                })
            }
        }
        setRightSelected(newRightSelected)
    }, [leftSelected, dataLeft, keyLeftToRight])

    useEffect(() => {
        if (onChangeSelectedRight && isEdited.current) {
            const leftSeletedKeys = Object.keys(leftSelected)
            if (leftSeletedKeys.length > 0) {
                onChangeSelectedRight(parseInt(leftSeletedKeys[0]), Object.keys(rightSelected)).then((success) => {
                    // if the request failed, we reset the rightSelected by re-selecting the selectedLeft
                    if (!success) {
                        setLeftSelected((prev) => {
                            return { ...prev }
                        })
                    }
                })
            }

            isEdited.current = false
        }
    }, [rightSelected, leftSelected, onChangeSelectedRight])

    const formateDataLeft: FL[] = useMemo(() => formatLeft(dataLeft), [dataLeft, formatLeft])
    const formatedDataRight: FR[] = useMemo(() => formatRight(dataRight), [dataRight, formatRight])

    const handleChangeSelectedRight = (newSelected: any) => {
        isEdited.current = true
        setRightSelected(newSelected)
    }

    return (
        <div className={`flex  flex-wrap flex-row ${isWrapped ? "space-y-2" : "space-x-1"}`}>
            <DataTable
                columns={columnsLeft}
                data={formateDataLeft}
                config={{
                    enableMultiRowSelection: false,
                    onRowSelectionChange: setLeftSelected,
                    state: {
                        rowSelection: leftSelected,
                    },
                    ...configLeft,
                }}
                className={{ containerDiv: "grow-[2]", ...classNameLeft }}
                toolbar={toolbarLeft}
                onDoubleClick={onDoubleClickLeft}
                enableColumnVisibility={enableColumnVisibilityLeft}
            />
            <DataTable
                refDiv={elementRef}
                columns={columnsRight}
                data={formatedDataRight}
                config={{
                    enableRowSelection: Object.keys(leftSelected).length > 0,
                    enableMultiRowSelection: true,
                    onRowSelectionChange: handleChangeSelectedRight,
                    getRowId: (row: { id: string }) => row.id,
                    state: {
                        rowSelection: rightSelected,
                    },
                    ...configRight,
                }}
                className={classNameRight}
                enableColumnVisibility={enableColumnVisibilityRight}
                toolbar={toolbarRight}
            />
        </div>
    )
}
