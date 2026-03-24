export const isMobile = (): boolean => {
    return typeof android !== "undefined" && !!android;
}