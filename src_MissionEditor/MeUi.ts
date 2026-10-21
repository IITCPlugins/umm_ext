const NOTIFICATION_TIME = 3000;

export interface ConfirmOptions {
    message: string;
    details?: string;
    title?: string;
}

export const confirmDialog = ({ message, details, title }: ConfirmOptions): Promise<boolean> => {
    const prompt = [title, message, details].filter(Boolean).join("\n\n");
    return Promise.resolve(window.confirm(prompt));
};

export const notification = (text: string, persistent = false): void => {
    document.querySelectorAll(".umm-notification").forEach(element => element.remove());

    const element = document.createElement("div");
    element.className = "umm-notification";
    element.textContent = text;
    document.body.append(element);

    if (!persistent) {
        window.setTimeout(() => element.remove(), NOTIFICATION_TIME);
    }
};
