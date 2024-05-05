"use server"

import { getAllMaterialWidthStateMaterial } from "@/service/material.service"
import { MaterialDataTable } from "@/component/dataTable/material/MaterialDataTable"

export default async function RoleManagementPage() {
    const materialData = await getAllMaterialWidthStateMaterial()

    return (
        <>
            <MaterialDataTable
                materialData={materialData}
            />
        </>
    )
}
