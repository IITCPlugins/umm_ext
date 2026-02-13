import { State } from "../State/State";

const NOTIFICATION_TIME = 3000;



export const bannerNotification = (state: State, message: string): void =>
    notification(`${state.getBannerName()}\n${message}`);



export const notification = (notificationText: string, presistend = false) => {
    $('.umm-notification').remove();

    notificationText = notificationText.replace(/\n/g, '<br/>');
    const notification = $("<div>", { class: "umm-notification", html: notificationText });
    $('body').append(notification);

    if (!presistend) {
        window.setTimeout(() => {
            $('.umm-notification').fadeOut(400, () => notification.remove());
        }, NOTIFICATION_TIME);
    }
}