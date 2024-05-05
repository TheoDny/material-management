import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/component/ui/dialog"
import { StateMaterialFormatted } from "@/type/stateMaterial.type"
import AddEditStateMaterialForm from "@/component/dataTable/stateMaterial/form/AddEditStateMaterialForm"

type props = {
    show: boolean
    defaultValues?: {
        id: string
        name: string
        description: string
    }
    afterSubmit: (value: StateMaterialFormatted, action: "edit" | "delete" | "add") => any
    closeDialog: () => void
}

export function DialogAddEditStateMaterial({ show, defaultValues, afterSubmit, closeDialog }: props) {
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
                <AddEditStateMaterialForm
                    defaultValues={defaultValues}
                    afterSubmit={afterSubmit}
                    canDelete={true}
                />
            </DialogContent>
        </Dialog>
    )
}
