/**
 * IMATTC api
 * 
 * most of IMATTC is running in a hidden scope.
 * so we directly manipulate the saved data
 */

import { getEditorScope } from "./ME_Wrapper";
import * as ME from "./ME_APP";


interface Category {
    collapse: boolean;
    id: number; // = array index
    missions: string[]; // array of Mission IDs
    name: string;
    sortCriteria: string;
}


interface EditorScope extends ME.EditorScope {
    selectedCategoryID: number;
}


let oldFormat = false;
export const loadCategoryContent = (): Category[] => {
    oldFormat = true;
    let data = localStorage.getItem("allCategories");
    if (!data) {
        oldFormat = false;
        const activeuser = $('.navbar-login a').first().text().trim(); // expect username here
        const key = `allCategories_${activeuser}`;
        data = localStorage.getItem(key);
    }

    if (!data) return [];
    return JSON.parse(data) as Category[];
}

const storeCategoryContent = (categories: Category[]) => {
    if (oldFormat) {
        localStorage.setItem("allCategories", JSON.stringify(categories));
    } else {
        const activeuser = $('.navbar-login a').first().text().trim(); // expect username here
        const key = `allCategories_${activeuser}`;
        localStorage.setItem(key, JSON.stringify(categories));
    }
}

export const isInstalled = (): boolean => {
    if (localStorage.getItem("allCategories")) return true;
    const activeuser = $('.navbar-login a').first().text().trim();
    const key = `allCategories_${activeuser}`;

    return localStorage.getItem(key) !== undefined;
}



export const findOrCreateCategory = (name: string): number => {
    const store = loadCategoryContent();
    const cat = findCategory(store, name);
    if (cat !== -1) return cat;

    const index = createCategory(store, name);
    storeCategoryContent(store);
    return index;
}


export const setCurrentMissionCat = (category: number) => {
    const editor = getEditorScope() as EditorScope;
    const id = editor.mission.mission_guid;
    console.assert(id !== undefined, "dont have a mission guid");

    // remove from all others
    const store = loadCategoryContent();
    store.forEach((cat, index) => {
        if (index !== category) {
            const pos = cat.missions.indexOf(id);
            if (pos !== -1) cat.missions.splice(index, 1);
        }
    });

    // add to new
    if (!store[category].missions.includes(id)) {
        console.log("categories[category].missions.push(id);", category, id);
        store[category].missions.push(id);
    }
    storeCategoryContent(store);

    // catch the control
    void waitForControl($(".preview-buttons").get(0), ".category-dropdown").then(element => {
        console.log("void waitForControl catched")
        editor.selectedCategoryID = category;
        $(element).val(category);

        // IMATTC will add it again
        store[category].missions.pop();
        storeCategoryContent(store);
    });
}


const waitForControl = (parent: HTMLElement | undefined, selector: string, timeoutMs = 100000): Promise<Element> => {
    const existing = document.querySelector(selector);

    if (existing) {
        return Promise.resolve(existing);
    }

    return new Promise((resolve, reject) => {
        const observer = new MutationObserver(() => {
            const element = document.querySelector(selector);

            if (element) {
                observer.disconnect();
                clearTimeout(timeout);
                resolve(element);
            }
        });

        observer.observe(parent ?? document.body, {
            childList: true,
            subtree: true
        });

        const timeout = setTimeout(() => {
            observer.disconnect();
            reject(new Error(`Timed out waiting for ${selector}`));
        }, timeoutMs);
    });
}



export const findCategory = (store: Category[], name: string): number => {
    return store.findIndex(c => c.name === name);
}


export const createCategory = (store: Category[], categoryName: string): number => {
    const newCategory = {
        id: store.length,
        name: categoryName,
        missions: [],
        collapse: false,
        sortCriteria: 'initial'
    };
    store.push(newCategory);

    storeCategoryContent(store);

    return newCategory.id;
}

