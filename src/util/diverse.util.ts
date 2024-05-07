export const getInitials = (firstname: string, lastname: string) => {
    return `${firstname[0]}${lastname[0]}`
}

export const filterEmptyTuple = (tupleArray: [string, string][]) => {
    return tupleArray.filter(([a, b]) => a.trim() !== "" || b.trim() !== "")
}

export function getContrastColor(hexColor: string) {
    let r = parseInt(hexColor.substring(1, 3), 16)
    let g = parseInt(hexColor.substring(3, 5), 16)
    let b = parseInt(hexColor.substring(5, 7), 16)

    let luminance = (0.3 * r + 0.6 * g + 0.2 * b) / 255

    return luminance > 0.7 ? "#000000" : "#FFFFFF"
}