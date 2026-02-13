export interface Options {
    /** Short and direct question. like "Delete x?" */
    message: string;
    /** additional details, like "This will remove all.." */
    details?: string;
    /** use title only if its really required */
    title?: string;
}


export const confirmDialog = (options: Options): Promise<boolean> => {
    return new Promise<boolean>((resolve, _) => {

        const message = $("<div>");
        message.append($("<div>", { class: "header" }).append(options.message));

        if (options.details) {
            message.append(
                $("<hr>"),
                $("<div>", { class: "details" }).append(options.details)
            );
        }

        const buttons: JQueryUI.ButtonOptions[] = [
            {
                text: "No",
                click: (): void => {
                    newDialog.dialog("close");
                    resolve(false);
                }
            },
            {
                text: "Yes",
                click: (): void => {
                    newDialog.dialog("close");
                    resolve(true);
                }
            }
        ];

        const newDialog = window.dialog({
            html: message,
            title: options.title,
            dialogClass: "umm-confirm " + (options.title ? "" : " no_title"),
            resizable: false,
            modal: true,
            closeOnEscape: false,
            buttons
        });

        newDialog.parent().find("button:eq(1)").css({ float: "left" });

        newDialog.closest(".ui-dialog").trigger("focus");
        newDialog.closest(".ui-dialog").on("keydown", event => {
            if (event.key === "Enter") {
                event.preventDefault();
                event.stopPropagation();
                newDialog.parent().find("button:eq(2)").trigger("click");
                return false;
            }
            if (event.key === "Escape") {
                event.preventDefault();
                event.stopPropagation();
                newDialog.parent().find("button:eq(1)").trigger("click");
                return false;
            }

            return true;
        });


        newDialog.dialog("moveToTop");
    });
}

