export const getInitials = (firstname: string, lastname: string) => {
    return `${firstname[0]}${lastname[0]}`
}

export const filterEmptyTuple = (tupleArray: [string, string][]) => {
    return tupleArray.filter(([a, b]) => a.trim() !== "" || b.trim() !== "")
}