// IMATTIC api

import { getEditorScope, getScope } from "./ME_Wrapper";
import * as ME from "./ME_APP";
import * as angular from "angular";


interface Category {
    collapse: boolean;
    id: number; // = array index
    missions: string[]; // array of Mission IDs
    name: string;
    sortCriteria: string;
}


interface MissionScope extends angular.IScope {
    categoryContent: Category[];
}


interface EditorScope extends ME.EditorScope {
    selectedCategoryID: number;
}


const getMissionScope = (): MissionScope => {
    return getScope($(".container").get(0));
}

const getCategories = (): Category[] | undefined => {
    const scope = getMissionScope();
    return scope?.categoryContent;
}

const storeCategoryContent = () => {
    const activeuser = $('.navbar-login a').first().text().trim(); // expect username here
    const key = `allCategories_${activeuser}`;

    const scope = getMissionScope();
    localStorage.setItem(key, JSON.stringify(scope.categoryContent));
}


export const isInstalled = (): boolean => {
    return getCategories() !== undefined;
}


export const findOrCreateCategory = (name: string): number => {
    const cat = findCategory(name);
    if (cat !== -1) return cat;

    return createCategory(name);
}


export const setCurrentMissionCat = (category: number) => {
    const editor = getEditorScope() as EditorScope;
    const id = editor.mission.mission_guid;
    console.assert(id !== undefined, "dont have a mission guid");

    // remove from all others
    const categories = getMissionScope().categoryContent;
    categories.forEach((cat, index) => {
        if (index !== category) {
            const pos = cat.missions.indexOf(id);
            if (pos !== -1) cat.missions.splice(index, 1);
        }
    });

    // add to new
    if (!categories[category].missions.includes(id)) {
        categories[category].missions.push(id);
    }

    editor.$apply(() => editor.selectedCategoryID = category)
}


export const findCategory = (name: string): number => {
    const cats = getCategories();
    if (!cats) return -1;

    return cats.findIndex(c => c.name === name);
}


export const createCategory = (categoryName: string): number => {
    const missionScope = getMissionScope();

    const newCategory = {
        id: missionScope.categoryContent.length,
        name: categoryName,
        missions: [],
        collapse: false,
        sortCriteria: 'initial'
    };
    missionScope.categoryContent.push(newCategory);

    // store it
    storeCategoryContent();

    return newCategory.id;
}

