import { MaterialCard } from "@/component/card/material/MaterialCard"

export default async function MaterialPage({ params }: { params: { materialId: string } }) {
    const materialId = params.materialId
    return (
        <MaterialCard id={materialId} />
    )
}
