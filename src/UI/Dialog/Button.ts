
export const dialogButton = (label: string, callback: (event?: Event) => void) => {
    return {
        text: label,
        "click": callback,
        class: "umm-dialog-button"
    }
}

export const dialogButtonClose = () => {
    return dialogButton("Close", event => $((event as any).target).dialog("close"));
}