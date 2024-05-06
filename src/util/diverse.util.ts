export const getInitials = (firstname: string, lastname: string) => {
    return `${firstname[0]}${lastname[0]}`
}

export const filterEmptyTuple = (tupleArray: [string, string][]) => {
    return tupleArray.filter(([a, b]) => a.trim() !== "" || b.trim() !== "")
}

export function getContrastColor(hexColor: string) {
    // Convert hex color to RGB
    let r = parseInt(hexColor.substring(1, 3), 16)
    let g = parseInt(hexColor.substring(3, 5), 16)
    let b = parseInt(hexColor.substring(5, 7), 16)
    // Calculate relative luminance
    let luminance = (0.299 * r + 0.587 * g + 0.214 * b) / 255

    console.log(luminance, hexColor.substring(1, 3), r, hexColor.substring(3, 5), g, hexColor.substring(5, 7), b)
    // Use a threshold to determine whether to use white or black text
    return luminance > 0.7 ? "#000000" : "#FFFFFF"
}