import { removeLastPortal, setCurrentMission, toggleMissionMode } from "../Edits";
import { main } from "../Main";
import { Mission } from "../State/Mission";
import { State } from "../State/State";
import { showUmmOptions } from "./Dialog/Options";
import { editActiveMission } from "./Dialog/SelectMission";
import { notification } from "./Notification";

// TODO use real files
const imgBookmarks = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAATLSURBVGhD7ZoHqH5jHMdfe++9CcnKLnsWsjLKLiHZo5AthQjJlvwzSkqyIjObEJGysorsvSPz8znv+9NzT+c97xnvvZy63/p0z/Pc5z7n+Z5znvV7bm9a/0M9Du/AITCrGWPS/HAWfAXPwV4wM4xLC8JF8C3Y9t7fCe9DW0Nh4BtI6xYf2OEwJzTVHHAifA1R7zXwb+KN5LqJoSIDD8OWcBC8NsiTz+EMWBiqyrd5IHwAUc8ng58TjFhwP6hrqMjAI7AZpJoJdoanIMr9BJfBClCmHeBliL97CbaGIwfpCUZCZYZmg9AwA5vDKG0Cd8Kf4N/9DrfAupBqPXgIov53wbb5UFSpkdAwQ4dC3sCjUMVAXqvBDPgVoq4HYQ/QWBj9Eo6H2SFVJSOhIkOBBraAtloKLoTvIa3/FzgfHKGKVMtIKAy9AtGJxy0/15PhdbgeloEyjTRio2Wy5BNevH/ZSiONvAB23MnQyuAk5j2PMAMtArfCdbC0GRU10shtcFX/ciw6APbsX2Zv4nl4C3Y1A20E0Q4nO+XEt2z/cqga9ZE6mgdm6V/2TgPrd+Qp+1w14zJm3izV650H/t2NWapYlY3sCHfBqCcTWg4eA4fNn8GRyGHzbdgF6mh7+AGcNOcyo0CVjVwK/s6FZRU9DVFf4NqqqRaC5fuXhapsZAFwBr44S5XLdVPUleIENw7Zb51TUjXuI864J4CjTCrHe/vFHxD1BbdDW7k0+g6sb2MzBmpsxInKss9kqf4NngTzrgCHz6hP7CtbwTi0N3j/lbJUX42NbAg3wFFZqr+vcP31BXgjV8mngEbvhW1hMtXYSJHSFfFUaMXBTzVWI1MpJ1bb6nyjOmvkaLCtTguqs0YcLW+GtbNUh43k1Wkja0Cs2Tpr5BiwrftnqQ4buRxs68FZqsNGjLIYXXQxqaY7+38pO7m7zIhpqc4ZMZ71IdjONGjRCSNzg9tfY14GJFxJvwhT9kacfdsuJN1iexxhu/4CRys7ej7oXduIDVsfVoeYjHzdbrIMQhtYU6eDdRloWMIM5NK+TgzL4EN6ZBDsA3nVMmJ89k2Ick+Aw58mIm8DUPvCe+AnMJ8Z6A6wzANZarSMIUe9KW7a8qplxIZHmeBKMCjgXt7PoEyHgU/4VYhP7hJwD57uHo28+3C2g/z95GzIq7IRb2zIP8oEHto0lXV60GM995uBfHux33ePbywrvZ8HOotBXrXeyMcQZQLPLNrI+JdzQoR67HengvsMQ6qmPY9xyX4uRH/Lq5YRK3TkiHKeZWwKVWXZUVH1pppgJF7p3ZA/MQptA9eCT2wtMypoJzAYbt2/wU2wJoxLu0EMQvbZLOphWNIMn3yZoSpKDchnECdS1n8ftAkRGdeKEJQYIloHMjnOO5K0MZQ38BEcC4aMloQLII4TxLJ1zt5XAQeC+MwdAAzHFh7UNjGUN+DgcBwUnaU7cZ4E6QAy6ux9Ubga/Dwt/yN4hhlR+1JVMTTMwLDIeSpXBW6OInIpDslnQixDDMF6Fm/D/b3TgIaGjWClKjJ0D6QGPgWPDqoYyMvPyk77LER93stoZvwzgPc0kL4qtFbeUFsDRfIfDHxI0QfE0GsatB6bNHQOVP2EmsgNlAdEu2epaXVSvd4/r54FA9f01AsAAAAASUVORK5CYII=";
const imgNext = "data:image/png;base64,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";
const imgPrevious = "data:image/png;base64,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";
const imgUndo = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAOiSURBVHhe7Zo9SFtRFMeTvHwbjSHRIA52aJBICw1oSSCglQ66CIWOLoUOLh0cOnRLJwcHu3Xp0EJLV3HxIwSe1iGKGKFCAnaok9RUjUbQ6NP0HjiC1PeZvCTvxvsDufcc0eT837nnnnsTE4PBYDAYjHuLGceaEI/HnxQKhemrq6shQRCs6L4Dx3GF7u7uSCqV+o2uumHBUXf6+/vj+Xz+R6lUei4XPGA2m60OhwOt+lKTDIDgi8Xi/PX1tQddklit1tNgMDjK8/wquuqK7gLQFDygqwC0BQ/oJgCNwQO6CEBr8EDVAtAcPFCVALQHD1QsQDMED1QkQLMED2gWoJmCBzQJoCX4WkHaZpPdbi+Qcdtms/EdHR3fFhcXc/hrzagWwAjBi2GxWECQWZ/P93ZlZeUXulWjSoCBpwPRk+OTpNGCvw05UZ57vd43a2trn9ClCg5HWQL+wPfLy8uHaBqScrlsPTs7GyNL4vjg4CCNbkVUHYdh3dECydKZaDT6Gk1FVAkA6wsqOpqG5/DwcGZ4eFhVxqoSgGxj6c5g5ygtIpDl4CHLYBpNWTTl9uDQYHz/z/68IAiqiiEsHajSekJSHAJESxp43d7e3vDc3JzsFql5cWsRgbyJ09bW1tGNjQ3dGqFEIuFJpVIjR0dHU6VSSTbNyWu/39zcTKApSkXVrdEiAOFw2EP+d+bi4kJSBIfTwW//3H6GpigV5ecyv7yqtiZA7wANFDRS6NKFbDZ72tbW9g5NccqmRziTpOIFagQRIpHIAk5FIRkawKkkVW/wjV4OoVBItiLu7OzIxlh1iTZCJlSDLnsUzSLotknTKoJuAgA0iqCrAABtIuguAFCJCOTw8gBddaUmAgAgQldXV8zldi3Y7fZzjuPg0kL0x2azCW63G/+yvlTdBzSSiYkJOBcU0bwDiJvL5WrbBzSSTCYzglNRyBL8i1NJqBVgfHw8QGrHFJqiwM0xTiVRdSdoJCDtSWqP7e7uKt5TulyuL3t7ezyaohiuBsRisZfkyX6Eg8zNxcf/oxrgQqSnpye0tLQke1VuOAH6+vry5MkqnuKUaGlpmd3a2nqBpiSGqwF6BA+nTqfTOYmmLFTvAmLAPSR8QJJOp1V95a6pBIDgSYGcXF9f/4wuRZpGAEj79vb2V9ls9gO6VGE4AUhbrNi83AaqPRQ8n8/3WMuTv4G6bRDaW+jwoMkhYi37/f6vyWRS86fCDAaDwWAwGAwG4z5jMv0D9jMAtZVsLdkAAAAASUVORK5CYII=";
const imgOpt = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAB3RJTUUH5QgWEyMyp0FY2wAAAAlwSFlzAAALEwAACxMBAJqcGAAAAARnQU1BAACxjwv8YQUAAAKoSURBVHja7Zo/SFxBEMb3GQvFIpoY6yjcgdgmRVKYwlJBSaugYKmNNsYEDAmIYmMEa4OgpYWo2AkKVlqr3IFa+zcWEpvk+Y1vrzm5Y+e4ZVZvfjDsO7hl5/vuvd3ZfWeMoiiKoiiKolQkEefLqVQqymQycTqdfoGPs4hexCthDVeIZcQIcvuH3KJsNht7MSCOY4MBXuNyEdEpLDyfDUQ/TLiMIndZ3DuAfvnVAMXnWEd04w7479qhijnAbMDiiS6bozNcA/qkFZY7R64B9dLqHGjwacCJtDoHjn0aMIm4k1ZYhL82Rz8GYIlZQDMjrbIIM8jxN6cDuw4gUAuMoPmCaJJWbDlDTEH8rwdRHusAugtyJjSieW/CqAT3kNeFzcugDnDuXM0djQYg7ICbwuIf5aUoPFhzAEHzAJGbC0Ih9whwnn+2AfniMWgdmhph7XfI57ZUE9iTIInHQK24HEe0I14KG3CDfHZMsgwecifDUs4DOnC5EoDwR0YgPsOELZ91QJtJ9txvpdUW4BTRiUfgwLUDdy8wH7B4Y3Ob53TgGvBRWmG5c+Qa8OzgGrArnXC5c+QaMGySiSZUTmyOfgzAEkOz66BJlpzQ+EO5US3A6cQqhKjIoHUW7QeTnAd8MvL1AP0Y2yYphI68FkLPsRSu+M2QUumUNAcQoT4ChPftsB3wDZp3JoxD0X3kdZ5vhAulHouPohkzYR2LT8OEhxej3rbD9jzgBy4npBUX4CdM+O7zPICqQNpuSq/9haBXY0OYA5zfDnH3Al8DFk/UIr5xOnANaJZW6ECLTwOupdU5cOXTgCVpdeXOkWsAvRVel1ZYhDXEqDcDsMTQv6/6AzWBxA/YHP0YQH9CxAD0jHUj5hCX0qptDpRLD+VGOUonpCiKoiiKoihPgHtXV96aolVzHAAAAABJRU5ErkJggg==";

export const createToolbar = () => {

    const UMMToolbar = L.Control.extend({
        options: {
            position: 'topleft'
        },
        onAdd: () => {
            const container = $("<div>", { class: "leaflet-umm leaflet-bar" }).append(
                toolBarButton("umm-toggle-bookmarks", imgBookmarks, "UMM: Toggle Mission Mode", toggleMissionMode),
                toolBarButton("umm-next-mission", imgNext, "UMM: Next Mission", nextMission),
                toolBarButton("umm-edit-active-mission", undefined, "UMM: Select mission number", editActiveMission),
                toolBarButton("umm-previous-mission", imgPrevious, "UMM: Previous Mission", previousMission),
                toolBarButton("umm-number-of-portals", undefined, "UMM: Number of portals in current mission"),
                toolBarButton("umm-undo", imgUndo, "UMM: Remove Last", removeLastPortal),
                toolBarButton("umm-opt", imgOpt, "UMM: Opt", showUmmOptions),
            );

            return container[0];
        }
    });

    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-call
    window.map.addControl(new UMMToolbar());
};


const toolBarButton = (id: string, image: string | undefined, tooltip: string, click?: () => void): JQuery => {

    // width = "16" height = 16" style="margin - top: 7px; "></a>').on('click dblclick', '#umm-toggle-bookmarks', function (event) {

    return $("<a>", {
        id,
        class: "umm-control",
        title: window.isSmartphone() ? "" : tooltip
    })
        .on("click dblclick", ((event) => { event.stopPropagation(); if (click) click() }))
        .append($("<img>", { src: image }).css({ width: 16, height: 16, "margin-top": "7px" }));
}


export const updateCurrentActiveMissionSidebar = (state: State) => {
    $('#umm-edit-active-mission').text(state.getCurrent() + 1);
    $('#umm-edit-active-mission').css("background-color", "white");
    $('#umm-next-mission img').css("opacity", "100%");
    $('#umm-previous-mission img').css("opacity", "100%");

    const current = state.getCurrent();

    if (current >= state.getPlannedLength() - 1) {
        $('#umm-next-mission').children('img').css("opacity", "30%");
        $('#umm-edit-active-mission').css("background-color", "orange");
    }
    if (current === 0) {
        $('#umm-previous-mission').children('img').css("opacity", "30%");
    }
}


export const updatePortalCountSidebar = () => {
    const count = main.state.getEditMission()?.portals.length ?? 0;
    if (count < 1000) {
        $('#umm-number-of-portals').text(`P${count}`);
    } else {
        $('#umm-number-of-portals').text(`${count}`);
    }
}


const nextMission = () => {
    const state = main.state;
    if (state.getCurrent() >= state.getPlannedLength() - 1) return;

    // Activate the new mission
    setCurrentMission(state.getCurrent() + 1)

    const mission = state.getEditMission()!;
    console.assert(mission, "no mission found");

    if (mission.hasPortals()) {
        showMission(mission);
    } else {
        if (main.missionModeActive) {
            notification(`${state.getBannerName()}\nStart of mission #${state.getCurrent() + 1}\nSelect start portal.`);
        }
    }
}

const previousMission = () => {
    const state = main.state;
    if (state.getCurrent() <= 0) return;

    // Activate the new mission
    setCurrentMission(state.getCurrent() - 1)

    const mission = state.getEditMission()!;
    console.assert(mission, "no mission found");

    showMission(mission);
}

const showMission = (mission: Mission) => {
    if (mission.hasPortals()) {
        mission.show();

        updatePortalCountSidebar();

        if (main.missionModeActive) {
            notification(`Mission mode active.\n${main.state.getBannerName()}\nCurrent mission #${main.state.getCurrent() + 1}\nSelect next portal`);
        } else {
            notification(`${main.state.getBannerName()}\nCurrent active mission set to #${main.state.getCurrent() + 1}`);
        }
    }
}