"use client"
import dayjs from "dayjs"
import { UserFormatted, UserRole } from "@/type/user.type"
import DoubleDataTable, { ConfigCustomTable } from "@/component/dataTable/DoubleDataTable"
import { ColumnDef } from "@tanstack/react-table"
import { Checkbox } from "@/component/ui/checkbox"
import { Button } from "@/component/ui/button"
import { ArrowUpDown } from "lucide-react"
import { DataTableStyle } from "@/component/dataTable/DataTable"
import { DialogAddEditUser } from "@/component/dataTable/userManagement/dialog/DialogAddEditUser"
import { ReactNode, useState } from "react"
import { setRolesAction } from "@/action/user.action"
import { toast } from "sonner"
import { RoleSmall } from "@/type/role.type"
import { handleErrorAction } from "@/util/error.util"

type props = {
    usersData: UserRole[]
    rolesData: RoleSmall[]
}
export default function UserManagementDoubleTable({ usersData, rolesData }: props) {
    const [usersDataRaw, setUsersDataRaw] = useState<UserRole[]>(usersData)
    const [showDialogAddEditUser, setShowDialogAddEditUser] = useState(false)
    const [selectedUser, setSelectedUser] = useState<(UserRole & { index: number }) | undefined>(undefined)

    const configLeft: ConfigCustomTable = {
        filterPlaceHolder: "Filtre des users...",
    }
    const classNameLeft: DataTableStyle = {
        row: "cursor-pointer",
    }
    const configRight: ConfigCustomTable = {
        filterPlaceHolder: "Filtre des roles...",
    }
    const classNameRight: DataTableStyle = {
        row: "cursor-pointer",
    }

    const setLeftSelectedWidthIndex = (index: number) => {
        setShowDialogAddEditUser(true)
        setSelectedUser({ index: index, ...usersDataRaw[index] })
    }

    const closeDialogAddEdit = () => {
        setShowDialogAddEditUser(false)
        setSelectedUser(undefined)
    }

    const toolbarLeft: ReactNode = (
        <Button
            size={"sm"}
            onClick={() => {
                setShowDialogAddEditUser(true)
            }}
        >
            Ajouter un utilisateur
        </Button>
    )

    // to align the left and right table
    const toolbarRight: ReactNode = (
        <Button
            size={"sm"}
            className={"opacity-0 cursor-default"}
        >
            Nothing button
        </Button>
    )

    const changeRoleOfUser = async (userIndex: number, roleIds: string[]) => {
        const userId = usersDataRaw[userIndex].id
        const response = await setRolesAction({
            userId: userId,
            roleIds: roleIds,
        })
        if (handleErrorAction(response, toast)) {
            setUsersDataRaw((prevState) => {
                const newState = prevState.slice()
                newState[userIndex] = response.data as UserRole
                return newState
            })
            toast.success("Roles du user modifiées")
            return true
        }
        return false
    }

    return (
        <div>
            <DialogAddEditUser
                show={showDialogAddEditUser}
                afterSubmit={(user) => {
                    selectedUser
                        ? setUsersDataRaw((prevState) => {
                              const newState = prevState.slice()
                              newState[selectedUser.index] = user
                              return newState
                          })
                        : setUsersDataRaw((prevState) => {
                              const newState = prevState.slice()
                              newState.unshift(user)
                              return newState
                          })
                    closeDialogAddEdit()
                }}
                defaultValues={
                    selectedUser && {
                        id: selectedUser.id,
                        firstname: selectedUser.firstname,
                        lastname: selectedUser.lastname,
                        email: selectedUser.email,
                        isActive: selectedUser.isActive,
                    }
                }
                closeDialog={closeDialogAddEdit}
            />
            <DoubleDataTable<UserRole, UserFormatted, RoleSmall, RoleSmall>
                dataLeft={usersDataRaw}
                formatLeft={formatUsersData}
                columnsLeft={columnsUser}
                configLeft={configLeft}
                classNameLeft={classNameLeft}
                toolbarLeft={toolbarLeft}
                enableColumnVisibilityLeft={true}
                keyLeftToRight={"Roles"}
                dataRight={rolesData}
                formatRight={formatRolesData}
                columnsRight={columnsRole}
                configRight={configRight}
                classNameRight={classNameRight}
                onDoubleClickLeft={setLeftSelectedWidthIndex}
                onChangeSelectedRight={changeRoleOfUser}
                toolbarRight={toolbarRight}
                enableColumnVisibilityRight={true}
            />
        </div>
    )
}

const formatUsersData = (usersData: UserRole[]): UserFormatted[] => {
    return usersData.map((user) => {
        return {
            id: user.id,
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email,
            isActive: user.isActive ? "Oui" : "Non",
            updatedAt: dayjs(user.updatedAt).format("DD/MM/YYYY"),
            createdAt: dayjs(user.createdAt).format("DD/MM/YYYY"),
        }
    })
}

const columnsUser: ColumnDef<UserFormatted>[] = [
    {
        id: "select",
        header: () => null,
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
            />
        ),
        size: 10,
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "firstname",
        header: ({ column }) => (
            <Button
                size={"sm"}
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
                Prenom
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
    },
    {
        accessorKey: "lastname",
        header: ({ column }) => (
            <Button
                size={"sm"}
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
                Nom
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
    },
    {
        accessorKey: "email",
        header: ({ column }) => {
            return (
                <Button
                    size={"sm"}
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Email
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
    },
    {
        accessorKey: "isActive",
        header: ({ column }) => {
            return (
                <Button
                    size={"sm"}
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Actif
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ cell }) => {
            const isActive = cell.getValue() === "Oui" ? "Active" : "Inactive"
            return <span>{isActive}</span>
        },
    },
    {
        accessorKey: "updatedAt",
        header: ({ column }) => (
            <Button
                size={"sm"}
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
                Mis à jour
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
    },
    {
        accessorKey: "createdAt",
        header: ({ column }) => (
            <Button
                size={"sm"}
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
                Créé
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
    },
]

const formatRolesData = (rolesData: RoleSmall[]): RoleSmall[] => {
    return rolesData
}

export const columnsRole: ColumnDef<RoleSmall>[] = [
    {
        id: "select",
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
            />
        ),
        size: 10,
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "name",
        header: ({ column }) => {
            return (
                <Button
                    size={"sm"}
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Nom
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
    },
    {
        accessorKey: "description",
        header: ({ column }) => {
            return (
                <Button
                    size={"sm"}
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Description
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
    },
]
