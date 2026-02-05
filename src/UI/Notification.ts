
let notificationTimer: number;

export const notification = (notificationText: string, isPersistent = false) => {
    $('.umm-notification').hide();
    const notification = $('.umm-notification').text(notificationText);
    notification.html(notification.html().replace(/\n/g, '<br/>'));
    $('.umm-notification').show();

    window.clearTimeout(notificationTimer);
    if (!isPersistent) {
        notificationTimer = window.setTimeout(() => {
            $('.umm-notification').fadeOut(400);
        }, 3000);
    }
}