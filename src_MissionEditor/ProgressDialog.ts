const Element_ID = "umm_progrss_dialog";


export const showProgress = (message = "Please wait…") => {
    const existing = document.getElementById("userscript-progress-overlay");
    if (existing) {
        existing.querySelector(".progress-message")!.textContent = message;
        return;
    }

    const overlay = document.createElement("div");
    overlay.id = "userscript-progress-overlay";

    overlay.innerHTML = `
        <div class="progress-dialog">
            <div class="progress-spinner"></div>
            <div class="progress-message"></div>

            
        </div>
    `;

    document.body.appendChild(overlay);

    overlay.querySelector(".progress-message")!.textContent = message;
}

export const hideProgress = () => {
    document.getElementById("userscript-progress-overlay")?.remove();
    document.getElementById("userscript-progress-style")?.remove();
}