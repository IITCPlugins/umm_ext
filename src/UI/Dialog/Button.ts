
export const dialogButton = (label: string, callback: (event?: JQuery.Event) => void) => {
    return <JQueryUI.ButtonOptions>{
        text: label,
        click: callback,
        class: "umm-dialog-button"
    }
}

export const dialogButtonClose = () => {
    // return dialogButton("Close", function () { $(this).dialog("close") });
    return dialogButton("Close", event => {
        // jquery-ui and arrow functions won't work well
        const dialog = $((event as any).currentTarget).parents(".ui-dialog").children(".ui-dialog-content");
        dialog.dialog("close")
    });
}