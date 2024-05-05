import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/component/ui/dialog"
import { MaterialIncludeStateMaterial } from "@/type/material.type"
import AddEditMaterialForm from "@/component/dataTable/material/form/AddEditMaterialForm"

type props = {
    show: boolean
    defaultValues?: {
        id: string
        name: string
        description: string
    }
    afterSubmit: (value: MaterialIncludeStateMaterial, action: "edit" | "delete" | "add") => any
    closeDialog: () => void
}

export function DialogAddEditMaterial({ show, defaultValues, afterSubmit, closeDialog }: props) {
    return (
        <Dialog
            open={show}
            onOpenChange={(o) => {
                if (!o) closeDialog()
            }}
        >
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>
                        {defaultValues?.id ? "Edition d'un état de matériel" : "Ajout d'un état de matériel"}
                    </DialogTitle>
                </DialogHeader>
                <AddEditMaterialForm
                    defaultValues={defaultValues}
                    afterSubmit={afterSubmit}
                    canDelete={true}
                />
            </DialogContent>
        </Dialog>
    )
}
