export const checkbox = (id: string, label: string, checked: boolean) => {
    return $("<div>", { class: "form-control" }).append(
        $("<label>", { class: "cursor-pointer label" }).append(
            $("<input>", { type: "checkbox", id, checked, class: "checkbox" }),
            $("<span>", { class: "label-text", text: label })
        )
    )
}