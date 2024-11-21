export const getToastColor = (type) => {
    switch (type) {
        case "success": return "var(--success)";
        case "error": return "var(--error)";
        case "info": return "var(--info)";
        case "warning": return "var(--warning)";
        default: return "var(--gray)";
    }
}

export const getPositionStyles = (pos) => {
    switch (pos) {
        case "top-left":
            return "justify-content: flex-start; align-items: flex-start;";
        case "top-right":
            return "justify-content: flex-end; align-items: flex-start;";
        case "bottom-left":
            return "justify-content: flex-start; align-items: flex-end;";
        case "bottom-right":
            return "justify-content: flex-end; align-items: flex-end;";
        case "top-center":
            return "position: absolute; top: 1rem; left: 50%; transform: translateX(-50%);";
        case "bottom-center":
            return "position: absolute; bottom: 1rem; left: 50%; transform: translateX(-50%);";
        default:
            return "justify-content: center; align-items: center;";
    }
}

export const getBoxShadow = (boxShadow) => {
    if (boxShadow === "none") {
        return "none";
    }
    if (boxShadow === "default") {
        return "0 4px 8px rgba(0, 0, 0, 0.1)";
    }
    return boxShadow
}

// Tooltip
export const getPlaceTooltip = (placement) => {
    let contentStyles = "";
    let arrowStyles = "";

    switch (placement) {
        case "top":
            contentStyles = `
                bottom: 100%;
                left: 50%;
                transform: translateX(-50%);
                margin-bottom: 0.5rem;
            `;
            arrowStyles = `
                border-width: 0.5rem 0.5rem 0 0.5rem;
                border-color: #333 transparent transparent transparent;
                bottom: -0.5rem;
                left: 50%;
                transform: translateX(-50%);
            `;
            break;
        case "bottom":
            contentStyles = `
                top: 100%;
                left: 50%;
                transform: translateX(-50%);
                margin-top: 0.5rem;
            `;
            arrowStyles = `
                border-width: 0 0.5rem 0.5rem 0.5rem;
                border-color: transparent transparent #333 transparent;
                top: -0.5rem;
                left: 50%;
                transform: translateX(-50%);
            `;
            break;
        case "left":
            contentStyles = `
                right: 100%;
                top: 50%;
                transform: translateY(-50%);
                margin-right: 0.5rem;
            `;
            arrowStyles = `
                border-width: 0.5rem 0 0.5rem 0.5rem;
                border-color: transparent transparent transparent #333;
                right: -0.5rem;
                top: 50%;
                transform: translateY(-50%);
            `;
            break;
        case "right":
            contentStyles = `
                left: 100%;
                top: 50%;
                transform: translateY(-50%);
                margin-left: 0.5rem;
            `;
            arrowStyles = `
                border-width: 0.5rem 0.5rem 0.5rem 0;
                border-color: transparent #333 transparent transparent;
                left: -0.5rem;
                top: 50%;
                transform: translateY(-50%);
            `;
            break;
        default:
            contentStyles = ""
            arrowStyles = ""
    }

    return { contentStyles, arrowStyles }
}