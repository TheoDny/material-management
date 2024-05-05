"use server"

import { getAllStateMaterialFormated } from "@/service/stateMaterial.service"
import { StateMaterialDataTable } from "@/component/dataTable/stateMaterial/StateMaterialDataTable"

export default async function StateMaterialPage() {
    const stateMaterialData = await getAllStateMaterialFormated()

    return <StateMaterialDataTable stateMaterialData={stateMaterialData} />
}
