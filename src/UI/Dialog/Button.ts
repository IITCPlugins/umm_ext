

export const button = (label: string, click: () => void, classes?: string) => {
    return $("<button>", { text: label, click, class: "umm-mission-btn " + (classes ?? "") })
}


export const dialogButton = (label: string, callback: (event?: JQuery.Event) => void) => {
    return <JQueryUI.ButtonOptions>{
        text: label,
        click: callback,
        class: "umm-dialog-button"
    }
}

export const dialogButtonClose = (label?: string) => {
    return dialogButton(label ?? "Close", event => {
        // jquery-ui and arrow functions won't work well
        const dialog = $((event as any).currentTarget).parents(".ui-dialog").children(".ui-dialog-content");
        dialog.dialog("close")
    });
}