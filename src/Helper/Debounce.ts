export const debounce = (fct: (...data: any[]) => void, timeout = 10) => {
    let timer: number;
    return (...data: any[]) => {
        clearTimeout(timer);
        timer = window.setTimeout(() => { fct.apply(this, data); }, timeout);
    };
}
