export const filters = [
    { id: 2, name: "Jasp", value: "jasp" },
    { id: 3, name: "Rock", value: "rock" },
    { id: 4, name: "Melody", value: "melody" },
    { id: 5, name: "Karoke", value: "karoke" },
]

export const filterByLanguage = [
    { id: 1, name: "Vietnam", value: "vietnam" },
    { id: 2, name: "English", value: "english" },
]

export const bgTypes = [
    'Linear',
    'Linear Repeats',
    'Radial'
]

export const colorSchemes = {
    "1": ["black", "black", "black"],
    "2": ["blue", "purple", "red"],
    "3": ["orange", "purple", "blue"],
    "4": ["orange", "red", "purple"],
}

export const generateGradient = (bgType, colorScheme) => {
    switch (bgType) {
        case "Radial": {
            return `repeating-radial-gradient(${colorScheme.join(", ")}, ${colorScheme.join(", ")} 20%)`
        }
        case "Linear Repeats": {
            return `repeating-linear-gradient(45deg, ${colorScheme.join(", ")}, ${colorScheme.join(", ")} 15%, ${colorScheme.join(", ")} 20%)`
        }
        case "Linear": {
            return `linear-gradient(${colorScheme.join(", ")})`
        }
        default:
            return "repeating-linear-gradient(#e66465)"
    }
}