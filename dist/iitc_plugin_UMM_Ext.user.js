// ==UserScript==
// @name            IITC plugin: UMM_Ext
// @id              iitc_plugin_UMM_Ext
// @category        Misc
// @version         0.0.0
// @namespace       https://github.com/IITC-CE/ingress-intel-total-conversion
// @description     Ultimate Mission Maker - Extention
// @match           https://intel.ingress.com/*
// @author          McBen
// @icon64          data:image/png;base64,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
// ==/UserScript==
function wrapper(SCRIPT_INFO) {
(() => {
    "use strict";
    var __webpack_modules__ = {
        56(module, __unused_webpack_exports, __webpack_require__) {
            module.exports = function setAttributesWithoutAttributes(styleElement) {
                var nonce = __webpack_require__.nc;
                nonce && styleElement.setAttribute("nonce", nonce);
            };
        },
        72(module) {
            var stylesInDOM = [];
            function getIndexByIdentifier(identifier) {
                for (var result = -1, i = 0; i < stylesInDOM.length; i++) if (stylesInDOM[i].identifier === identifier) {
                    result = i;
                    break;
                }
                return result;
            }
            function modulesToDom(list, options) {
                for (var idCountMap = {}, identifiers = [], i = 0; i < list.length; i++) {
                    var item = list[i], id = options.base ? item[0] + options.base : item[0], count = idCountMap[id] || 0, identifier = "".concat(id, " ").concat(count);
                    idCountMap[id] = count + 1;
                    var indexByIdentifier = getIndexByIdentifier(identifier), obj = {
                        css: item[1],
                        media: item[2],
                        sourceMap: item[3],
                        supports: item[4],
                        layer: item[5]
                    };
                    if (-1 !== indexByIdentifier) stylesInDOM[indexByIdentifier].references++, stylesInDOM[indexByIdentifier].updater(obj); else {
                        var updater = addElementStyle(obj, options);
                        options.byIndex = i, stylesInDOM.splice(i, 0, {
                            identifier,
                            updater,
                            references: 1
                        });
                    }
                    identifiers.push(identifier);
                }
                return identifiers;
            }
            function addElementStyle(obj, options) {
                var api = options.domAPI(options);
                api.update(obj);
                return function updater(newObj) {
                    if (newObj) {
                        if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) return;
                        api.update(obj = newObj);
                    } else api.remove();
                };
            }
            module.exports = function(list, options) {
                var lastIdentifiers = modulesToDom(list = list || [], options = options || {});
                return function update(newList) {
                    newList = newList || [];
                    for (var i = 0; i < lastIdentifiers.length; i++) {
                        var index = getIndexByIdentifier(lastIdentifiers[i]);
                        stylesInDOM[index].references--;
                    }
                    for (var newLastIdentifiers = modulesToDom(newList, options), _i = 0; _i < lastIdentifiers.length; _i++) {
                        var _index = getIndexByIdentifier(lastIdentifiers[_i]);
                        0 === stylesInDOM[_index].references && (stylesInDOM[_index].updater(), stylesInDOM.splice(_index, 1));
                    }
                    lastIdentifiers = newLastIdentifiers;
                };
            };
        },
        113(module) {
            module.exports = function styleTagTransform(css, styleElement) {
                if (styleElement.styleSheet) styleElement.styleSheet.cssText = css; else {
                    for (;styleElement.firstChild; ) styleElement.removeChild(styleElement.firstChild);
                    styleElement.appendChild(document.createTextNode(css));
                }
            };
        },
        314(module) {
            module.exports = function(cssWithMappingToString) {
                var list = [];
                return list.toString = function toString() {
                    return this.map(function(item) {
                        var content = "", needLayer = void 0 !== item[5];
                        return item[4] && (content += "@supports (".concat(item[4], ") {")), item[2] && (content += "@media ".concat(item[2], " {")), 
                        needLayer && (content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {")), 
                        content += cssWithMappingToString(item), needLayer && (content += "}"), item[2] && (content += "}"), 
                        item[4] && (content += "}"), content;
                    }).join("");
                }, list.i = function i(modules, media, dedupe, supports, layer) {
                    "string" == typeof modules && (modules = [ [ null, modules, void 0 ] ]);
                    var alreadyImportedModules = {};
                    if (dedupe) for (var k = 0; k < this.length; k++) {
                        var id = this[k][0];
                        null != id && (alreadyImportedModules[id] = !0);
                    }
                    for (var _k = 0; _k < modules.length; _k++) {
                        var item = [].concat(modules[_k]);
                        dedupe && alreadyImportedModules[item[0]] || (void 0 !== layer && (void 0 === item[5] || (item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}")), 
                        item[5] = layer), media && (item[2] ? (item[1] = "@media ".concat(item[2], " {").concat(item[1], "}"), 
                        item[2] = media) : item[2] = media), supports && (item[4] ? (item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}"), 
                        item[4] = supports) : item[4] = "".concat(supports)), list.push(item));
                    }
                }, list;
            };
        },
        398(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
            __webpack_require__.r(__webpack_exports__), __webpack_require__.d(__webpack_exports__, {
                default: () => __WEBPACK_DEFAULT_EXPORT__
            });
            var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(72), _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = __webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__), _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(825), _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = __webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__), _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(659), _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = __webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__), _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(56), _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = __webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__), _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(540), _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = __webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__), _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(113), _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = __webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__), _node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_1_use_1_node_modules_postcss_loader_dist_cjs_js_ruleSet_1_rules_1_use_2_styles_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(671), options = {};
            options.styleTagTransform = _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default(), 
            options.setAttributes = _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default(), 
            options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head"), 
            options.domAPI = _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default(), 
            options.insertStyleElement = _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default();
            _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_1_use_1_node_modules_postcss_loader_dist_cjs_js_ruleSet_1_rules_1_use_2_styles_css__WEBPACK_IMPORTED_MODULE_6__.A, options);
            const __WEBPACK_DEFAULT_EXPORT__ = _node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_1_use_1_node_modules_postcss_loader_dist_cjs_js_ruleSet_1_rules_1_use_2_styles_css__WEBPACK_IMPORTED_MODULE_6__.A && _node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_1_use_1_node_modules_postcss_loader_dist_cjs_js_ruleSet_1_rules_1_use_2_styles_css__WEBPACK_IMPORTED_MODULE_6__.A.locals ? _node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_1_use_1_node_modules_postcss_loader_dist_cjs_js_ruleSet_1_rules_1_use_2_styles_css__WEBPACK_IMPORTED_MODULE_6__.A.locals : void 0;
        },
        540(module) {
            module.exports = function insertStyleElement(options) {
                var element = document.createElement("style");
                return options.setAttributes(element, options.attributes), options.insert(element, options.options), 
                element;
            };
        },
        601(module) {
            module.exports = function(i) {
                return i[1];
            };
        },
        659(module) {
            var memo = {};
            module.exports = function insertBySelector(insert, style) {
                var target = function getTarget(target) {
                    if (void 0 === memo[target]) {
                        var styleTarget = document.querySelector(target);
                        if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) try {
                            styleTarget = styleTarget.contentDocument.head;
                        } catch (e) {
                            styleTarget = null;
                        }
                        memo[target] = styleTarget;
                    }
                    return memo[target];
                }(insert);
                if (!target) throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
                target.appendChild(style);
            };
        },
        671(module, __webpack_exports__, __webpack_require__) {
            __webpack_require__.d(__webpack_exports__, {
                A: () => __WEBPACK_DEFAULT_EXPORT__
            });
            var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(601), _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = __webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__), _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(314), ___CSS_LOADER_EXPORT___ = __webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__)()(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default());
            ___CSS_LOADER_EXPORT___.push([ module.id, "", "" ]);
            const __WEBPACK_DEFAULT_EXPORT__ = ___CSS_LOADER_EXPORT___;
        },
        825(module) {
            module.exports = function domAPI(options) {
                if ("undefined" == typeof document) return {
                    update: function update() {},
                    remove: function remove() {}
                };
                var styleElement = options.insertStyleElement(options);
                return {
                    update: function update(obj) {
                        !function apply(styleElement, options, obj) {
                            var css = "";
                            obj.supports && (css += "@supports (".concat(obj.supports, ") {")), obj.media && (css += "@media ".concat(obj.media, " {"));
                            var needLayer = void 0 !== obj.layer;
                            needLayer && (css += "@layer".concat(obj.layer.length > 0 ? " ".concat(obj.layer) : "", " {")), 
                            css += obj.css, needLayer && (css += "}"), obj.media && (css += "}"), obj.supports && (css += "}");
                            var sourceMap = obj.sourceMap;
                            sourceMap && "undefined" != typeof btoa && (css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */")), 
                            options.styleTagTransform(css, styleElement, options.options);
                        }(styleElement, options, obj);
                    },
                    remove: function remove() {
                        !function removeStyleElement(styleElement) {
                            if (null === styleElement.parentNode) return !1;
                            styleElement.parentNode.removeChild(styleElement);
                        }(styleElement);
                    }
                };
            };
        }
    }, __webpack_module_cache__ = {};
    function __webpack_require__(moduleId) {
        var cachedModule = __webpack_module_cache__[moduleId];
        if (void 0 !== cachedModule) return cachedModule.exports;
        var module = __webpack_module_cache__[moduleId] = {
            id: moduleId,
            exports: {}
        };
        return __webpack_modules__[moduleId](module, module.exports, __webpack_require__), 
        module.exports;
    }
    __webpack_require__.n = module => {
        var getter = module && module.__esModule ? () => module.default : () => module;
        return __webpack_require__.d(getter, {
            a: getter
        }), getter;
    }, __webpack_require__.d = (exports, definition) => {
        for (var key in definition) __webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key) && Object.defineProperty(exports, key, {
            enumerable: !0,
            get: definition[key]
        });
    }, __webpack_require__.o = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop), 
    __webpack_require__.r = exports => {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(exports, Symbol.toStringTag, {
            value: "Module"
        }), Object.defineProperty(exports, "__esModule", {
            value: !0
        });
    }, __webpack_require__.nc = void 0;
    let notificationTimer;
    __webpack_require__.d({}, {
        i: () => main
    });
    const notification = (notificationText, isPersistent = !1) => {
        $(".umm-notification").hide();
        const notification = $(".umm-notification").text(notificationText);
        notification.html(notification.html().replace(/\n/g, "<br/>")), $(".umm-notification").show(), 
        window.clearTimeout(notificationTimer), isPersistent || (notificationTimer = window.setTimeout(() => {
            $(".umm-notification").fadeOut(400);
        }, 3e3));
    };
    class RenderPath {
        constructor(ummMissionPaths) {
            this.missionPaths = ummMissionPaths, this.touchIcon = L.Browser.touch ? new L.DivIcon({
                iconSize: new L.Point(20, 20),
                className: "leaflet-div-icon leaflet-editing-icon leaflet-touch-icon"
            }) : new L.DivIcon({
                iconSize: new L.Point(8, 8),
                className: "leaflet-div-icon leaflet-editing-icon"
            });
        }
        redraw() {
            this.missionPaths.clearLayers();
            const editMode = main.umm.missionModeActive;
            main.state.missions.forEach((mission, missionId) => {
                main.state.isCurrent(missionId) && editMode ? this.drawEditMission(missionId, mission) : this.drawMission(mission);
            });
        }
        drawMission(mission) {
            const geodesicPolyline = new L.GeodesicPolyline(mission.getLocations(), {
                color: "crimson",
                weight: 5,
                smoothFactor: 1
            });
            this.missionPaths.addLayer(geodesicPolyline);
        }
        drawEditMission(missionId, mission) {
            const coordinatesList = mission.getLocations();
            coordinatesList.forEach((ll, index) => this.createDragMarker(ll, index, missionId)), 
            coordinatesList.forEach((ll, index) => {
                if (index > 0) {
                    const half = this.getCenter(coordinatesList[index - 1], ll);
                    this.createDragMarker(half, index, missionId, !0);
                }
            });
            const geodesicPolyline = new L.GeodesicPolyline(coordinatesList, {
                color: "#ff9a00",
                weight: 5,
                smoothFactor: 1
            });
            this.missionPaths.addLayer(geodesicPolyline);
        }
        createDragMarker(location, portalId, missionId, dummy = !1) {
            const marker = new L.Marker(location, {
                icon: this.touchIcon,
                draggable: !0,
                zIndexOffset: 7e3,
                opacity: dummy ? .4 : 1,
                portal: portalId,
                missionId,
                isMidPoint: dummy
            });
            this.missionPaths.addLayer(marker), marker.on("drag", event => {
                this.onMarkerDrag(event);
            }).on("dragstart", event => {
                this.onMarkerDragStart(event);
            }).on("dragend", event => {
                this.onMarkerDragEnd(event);
            }).on("dblclick", event => {
                this.onMarkerDblClick(event);
            });
        }
        getCenter(l1, l2) {
            const p1 = window.map.project(l1), p2 = window.map.project(l2);
            return window.map.unproject(p1.add(p2).divideBy(2));
        }
        onMarkerDragStart(event) {
            const marker = event.target, options = event.target.options, isMidPoint = options.isMidPoint, mission = main.state.missions.get(options.missionId);
            this.editDragLine && this.missionPaths.removeLayer(this.editDragLine);
            const portal = options.portal, portal_pre = portal > 0 ? mission.portals.get(portal - 1) : void 0, portal_post = mission.portals.get(portal + (isMidPoint ? 0 : 1));
            let lls = [ portal_pre && new L.LatLng(portal_pre.location.latitude, portal_pre.location.longitude), marker.getLatLng(), portal_post && new L.LatLng(portal_post.location.latitude, portal_post.location.longitude) ];
            portal_pre || portal_post ? portal_pre ? portal_post || (lls = [ lls[1], lls[0] ]) : lls.splice(0, 1) : lls = [ marker.getLatLng(), marker.getLatLng() ], 
            this.editDragLine = new L.Polyline(lls, {
                color: "#ff9a00",
                weight: 3,
                dashArray: "5,5",
                pointerEvents: "none"
            }), this.missionPaths.addLayer(this.editDragLine);
        }
        onMarkerDrag(event) {
            if (!this.editDragLine) return;
            const marker = event.target, options = event.target.options, mission = main.state.missions.get(options.missionId), snappedPortal = this.getSnapPortal(marker.getLatLng(), mission.getLocations()), newTarget = snappedPortal ? snappedPortal.getLatLng() : marker.getLatLng(), latlngs = this.editDragLine.getLatLngs();
            latlngs[3 === latlngs.length ? 1 : 0] = newTarget, this.editDragLine.setLatLngs(latlngs);
        }
        onMarkerDragEnd(event) {
            this.editDragLine && (this.missionPaths.removeLayer(this.editDragLine), this.editDragLine = void 0);
            const marker = event.target, options = event.target.options, mission = main.state.missions.get(options.missionId), coordinatesList = mission.getLocations(), snappedPortal = this.getSnapPortal(marker.getLatLng(), coordinatesList);
            if (!snappedPortal) return void this.redraw();
            const portalToAdd = mission.portals.create(snappedPortal.options.guid);
            options.isMidPoint ? mission.portals.insert(options.portal, portalToAdd) : this.movePortal(mission, options.portal, portalToAdd), 
            this.saveStateAndRefresh();
        }
        movePortal(mission, portalID, target) {
            if (0 === portalID) {
                const missions = main.state.missions, preMission = missions.previous(mission);
                if (null == preMission ? void 0 : preMission.portals.isEnd(target)) {
                    if (confirm("Merge mission ?")) return missions.merge(preMission, mission), void (main.state.get().currentMission = preMission.id);
                } else if (1 === mission.portals.length && (null == preMission ? void 0 : preMission.portals.includes(target)) && confirm("Split mission ?")) {
                    const index = preMission.portals.indexOf(target);
                    return mission.portals.clear(), void missions.split(preMission, index, mission);
                }
            }
            if (portalID === mission.portals.length - 1) {
                const missions = main.state.missions, postMission = missions.next(mission);
                if ((null == postMission ? void 0 : postMission.portals.isStart(target)) && confirm("Merge mission ?")) return void missions.merge(mission, postMission);
            }
            mission.portals.set(portalID, target);
        }
        getSnapPortal(unsnappedLatLng, ignore = []) {
            const containerPoint = window.map.latLngToContainerPoint(unsnappedLatLng);
            let candidates = [];
            for (const guid in window.portals) {
                const portal = window.portals[guid], ll = portal.getLatLng();
                if (ignore.some(x => x.equals(ll))) continue;
                const pp = window.map.latLngToContainerPoint(ll), options = portal.options, size = options.weight + 5 * options.radius, distance = pp.distanceTo(containerPoint);
                distance > size || candidates.push([ distance, portal ]);
            }
            if (0 !== candidates.length) return candidates = candidates.sort((a, b) => a[0] - b[0]), 
            candidates[0][1];
        }
        onMarkerDblClick(event) {
            const options = event.target.options, portal = options.portal;
            if (options.isMidPoint) return;
            const mission = main.state.missions.get(options.missionId);
            mission.portals.remove(portal), this.saveStateAndRefresh(), notification(`${mission.title}\nRemoved #${portal + 1} from mission`);
        }
        saveStateAndRefresh() {
            main.state.save(), main.redrawAll();
        }
    }
    class RenderNumbers {
        constructor(ummMissionNumbers) {
            this.missionNumbers = ummMissionNumbers;
        }
        redraw() {
            this.missionNumbers.clearLayers();
            const state = main.state;
            this.getMissionStarts(state).forEach(start => {
                const id = start.missionIndex, icon = this.generateMarker(state.isCurrent(id) ? "active" : "start", id + 1), marker = L.marker(start.location, {
                    icon: L.divIcon({
                        className: "umm-mission-icon",
                        iconSize: [ 34, 50 ],
                        iconAnchor: [ 17, 50 ],
                        html: icon
                    }),
                    opacity: start.auto ? .4 : 1,
                    interactive: !1
                });
                this.missionNumbers.addLayer(marker);
            });
        }
        getMissionStarts(state) {
            const missions = [];
            let mid = 0;
            for (;mid < state.missions.count(); ) {
                const mission = state.missions.get(mid);
                if (null == mission ? void 0 : mission.hasPortals()) {
                    const start = mission.getLocations()[0];
                    missions.push({
                        missionIndex: mid,
                        location: start,
                        auto: !1
                    });
                }
                let count = 1;
                for (;mid + count <= state.missions.count(); count++) {
                    const nextMission = state.missions.get(mid + count);
                    if (null == nextMission ? void 0 : nextMission.hasPortals()) break;
                }
                if (count > 1) {
                    const allLocations = [];
                    for (let i = 0; i < count - 1; i++) {
                        const fillMission = state.missions.get(mid + i);
                        (null == fillMission ? void 0 : fillMission.hasPortals()) && allLocations.push(...fillMission.getLocations());
                    }
                    const portalsPerMission = Math.max(allLocations.length / count, 6);
                    for (let fillIndex = 1; fillIndex < count; fillIndex++) {
                        const locationIndex = Math.floor(portalsPerMission * fillIndex);
                        locationIndex < allLocations.length - 1 && missions.push({
                            missionIndex: mid + fillIndex,
                            location: allLocations[locationIndex],
                            auto: !0
                        });
                    }
                }
                mid += count;
            }
            return missions;
        }
        generateMarker(kclass, index) {
            return `<svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 33 49" class="umm-mission-marker"><defs><style>.cls-2{fill:#fff;}</style></defs><path class="${kclass}" d="M33,18c0,8.84-12,31-16,31S1,26.84,1,18,8.16,1,17,1,33,9.16,33,18Z" transform="translate(-0.5 -0.5)"/><circle class="cls-2" cx="16.5" cy="16.5" r="13"/><foreignObject x="0" y="0" width="34px" height="34px"><span class="umm-mission-number">${index}</span></foreignObject></svg>`;
        }
    }
    class Portals {
        constructor(data) {
            this.data = data;
        }
        get length() {
            return this.data.length;
        }
        get(index) {
            return this.data.at(index);
        }
        getRange(start, end) {
            return this.data.slice(start, end);
        }
        set(index, portal) {
            this.data[index] = portal;
        }
        add(...portal) {
            portal.some(p => this.includes(p)), this.data.push(...portal);
        }
        insert(index, ...portal) {
            portal.some(p => this.includes(p)), this.data.splice(index, 0, ...portal);
        }
        remove(index, count = 1) {
            this.data.splice(index, count);
        }
        clear() {
            this.data.length = 0;
        }
        toLatLng() {
            return this.data.map(portal => new L.LatLng(portal.location.latitude, portal.location.longitude));
        }
        includes(portal) {
            return this.data.some(x => x.guid === portal.guid);
        }
        indexOf(portal) {
            return this.data.findIndex(x => x.guid === portal.guid);
        }
        isStart(portal) {
            var _a;
            return (null === (_a = this.data[0]) || void 0 === _a ? void 0 : _a.guid) === portal.guid;
        }
        isEnd(portal) {
            var _a;
            return (null === (_a = this.data.at(-1)) || void 0 === _a ? void 0 : _a.guid) === portal.guid;
        }
        create(guid) {
            const iitcPortal = window.portals[guid], options = iitcPortal.options.data, ll = iitcPortal.getLatLng();
            return {
                guid,
                title: options.title || "[undefined]",
                imageUrl: options.image,
                description: "",
                location: {
                    latitude: ll.lat,
                    longitude: ll.lng
                },
                isOrnamented: !1,
                isStartPoint: !1,
                type: "PORTAL",
                objective: {
                    type: "HACK_PORTAL",
                    passphrase_params: {
                        question: "",
                        _single_passphrase: ""
                    }
                }
            };
        }
    }
    class Mission {
        constructor(id, data) {
            this.missionID = id, this.data = data, this.portal_data = new Portals(data.portals);
        }
        get title() {
            return this.data.missionTitle;
        }
        get portals() {
            return this.portal_data;
        }
        get id() {
            return this.missionID;
        }
        hasPortals() {
            return this.portal_data.length > 0;
        }
        getLocations() {
            return this.portal_data.toLatLng();
        }
        show() {
            if (this.hasPortals()) {
                const bounds = new L.LatLngBounds(this.getLocations()).pad(.2);
                window.map.fitBounds(bounds, {
                    maxZoom: 18
                });
            }
        }
    }
    class Missions {
        constructor(data) {
            this.data = data;
        }
        get(missionId) {
            const mis = this.data[missionId];
            return mis && new Mission(missionId, mis);
        }
        count() {
            return this.data.length;
        }
        forEach(callback) {
            this.data.forEach((missionData, index) => {
                const mission = new Mission(index, missionData);
                callback(mission, index);
            });
        }
        previous(mission) {
            var _a;
            let preMission, preMissionID = mission.id - 1;
            for (;!(null === (_a = preMission = this.get(preMissionID)) || void 0 === _a ? void 0 : _a.hasPortals()) && preMissionID > 0; ) preMissionID--;
            return preMission;
        }
        next(mission) {
            return this.get(mission.id + 1);
        }
        merge(destination, missionB) {
            destination.portals.add(...missionB.portals.getRange()), missionB.portals.clear();
        }
        split(source, at, destination) {
            const toMove = source.portals.getRange(at);
            destination.portals.insert(0, ...toMove), source.portals.remove(at, toMove.length);
        }
    }
    class State {
        constructor() {
            this.load(), window.addHook("portalDetailsUpdated", event => this.checkPortal(event));
        }
        get() {
            return this.theState;
        }
        load() {
            this.reset();
            const data = localStorage.getItem("ultimate-mission-maker");
            if (data) {
                const anyState = JSON.parse(data);
                this.theState = ((state, ummState) => {
                    if (void 0 === ummState.fileFormatVersion || "" === ummState.fileFormatVersion) {
                        const undefinedOrEmptyString = value => null == value || "" == value;
                        if (undefinedOrEmptyString(ummState.missionSetName) && (undefinedOrEmptyString(ummState.missionName) ? ummState.missionSetName = "" : (ummState.missionSetName = ummState.missionName, 
                        delete ummState.missionName)), undefinedOrEmptyString(ummState.missionSetDescription) && (undefinedOrEmptyString(ummState.missionDescription) ? ummState.missionSetDescription = "" : (ummState.missionSetDescription = ummState.missionDescription, 
                        delete ummState.missionDescription)), undefinedOrEmptyString(ummState.titleFormat) && (ummState.titleFormat = "T NN-M"), 
                        void 0 === ummState.numberOfMissions ? ummState.plannedBannerLength = Object.keys(ummState.missions).length : (ummState.plannedBannerLength = ummState.numberOfMissions, 
                        delete ummState.numberOfMissions), !Object.keys(ummState.missions[0]).includes("portals")) if (ummState.missions[0][0].guid) {
                            const newMissions = [];
                            for (const mission in ummState.missions) {
                                const plannedLength = ummState.plannedBannerLength > 0 ? ummState.plannedBannerLength : ummState.missions.length, missionTitle = state.generateMissionTitleEx(parseInt(mission) + 1, plannedLength, ummState.missionSetName, ummState.titleFormat);
                                newMissions.push({
                                    missionTitle,
                                    missionDescription: ummState.missionSetDescription,
                                    portals: ummState.missions[mission]
                                });
                            }
                            ummState.missions = newMissions;
                        } else ummState.missions = [ {
                            missionTitle: "",
                            missionDescription: "",
                            portals: []
                        } ];
                        ummState.fileFormatVersion = 1;
                    }
                    if (1 === ummState.fileFormatVersion) {
                        for (const mission in ummState.missions) for (const portal in ummState.missions[mission].portals) ummState.missions[mission].portals[portal].objective = {
                            type: "HACK_PORTAL",
                            passphrase_params: {
                                question: "",
                                _single_passphrase: ""
                            }
                        };
                        ummState.fileFormatVersion = 2;
                    }
                    if (2 === ummState.fileFormatVersion) {
                        for (const mission in ummState.missions) for (const portal in ummState.missions[mission].portals) "HACK" === ummState.missions[mission].portals[portal].objective.type && (ummState.missions[mission].portals[portal].objective.type = "HACK_PORTAL");
                        state.setPlannedLength(ummState.plannedBannerLength || 1);
                    }
                    return ummState;
                })(this, anyState);
            }
        }
        save() {
            this.setPlannedLength(this.theState.plannedBannerLength), localStorage.setItem("ultimate-mission-maker", JSON.stringify(this.theState));
        }
        reset() {
            this.theState = {
                missionSetName: "",
                missionSetDescription: "",
                currentMission: 0,
                plannedBannerLength: 1,
                titleFormat: "T NN-M",
                fileFormatVersion: 2,
                missions: [ {
                    missionTitle: "",
                    missionDescription: "",
                    portals: []
                } ]
            };
        }
        getPlannedLength() {
            return this.theState.plannedBannerLength;
        }
        setPlannedLength(count) {
            if (count = Math.max(count, 1), this.theState.plannedBannerLength = count, this.theState.missions.length > count) this.theState.missions = this.theState.missions.slice(0, count); else for (let id = this.theState.missions.length; id < count; id++) this.theState.missions.push({
                missionTitle: this.generateMissionTitle(id),
                missionDescription: this.theState.missionSetDescription,
                portals: []
            });
        }
        get missions() {
            return new Missions(this.theState.missions);
        }
        generateMissionTitle(missNumber) {
            return this.generateMissionTitleEx(missNumber, this.getPlannedLength(), this.theState.missionSetName, this.theState.titleFormat);
        }
        generateMissionTitleEx(missNumber, plannedBannerLength, missSetName, missNameFormat) {
            var _a;
            const format = null != missNameFormat ? missNameFormat : "";
            if (!format) return "";
            let title = format;
            const totalMissions = null != plannedBannerLength ? plannedBannerLength : 0;
            if (totalMissions >= 1 && (title = title.replace(/M+/g, totalMissions.toString())), 
            missNumber >= 0) {
                const numberPattern = null === (_a = format.match(/N+/g)) || void 0 === _a ? void 0 : _a[0];
                if (numberPattern) {
                    const length = numberPattern.length > 1 ? totalMissions.toString().length : 0, paddedNumber = window.zeroPad(missNumber, length);
                    title = title.replace(/N+/g, paddedNumber);
                }
            }
            return (null == missSetName ? void 0 : missSetName.trim()) && (title = title.replace(/T/g, missSetName)), 
            title;
        }
        getEditMission() {
            return this.missions.get(this.theState.currentMission);
        }
        isCurrent(missionId) {
            return this.theState.currentMission === missionId;
        }
        nextMission() {
            if (this.theState.currentMission >= this.theState.plannedBannerLength - 1) return;
            main.umm.setCurrentMission(this.theState.currentMission + 1);
            const mission = this.missions.get(this.theState.currentMission);
            mission.hasPortals() ? this.showMission(mission) : notification(`${this.theState.missionSetName}\nStart of mission #${this.theState.currentMission + 1}\nSelect start portal.`);
        }
        prevMission() {
            if (this.theState.currentMission <= 0) return;
            main.umm.setCurrentMission(this.theState.currentMission - 1);
            const mission = this.missions.get(this.theState.currentMission);
            mission.hasPortals() && this.showMission(mission);
        }
        showMission(mission) {
            mission.hasPortals() && (mission.show(), main.umm.updatePortalCountSidebar(), main.umm.missionModeActive ? notification(`Mission mode active.\n${this.theState.missionSetName}\nCurrent mission #${this.theState.currentMission + 1}\nSelect next portal`) : notification(`${this.theState.missionSetName}\nCurrent active mission set to #${this.theState.currentMission + 1}`));
        }
        checkPortal(event) {
            let updated = !1;
            this.theState.missions.forEach(mission => {
                const portal = mission.portals.find(x => x.guid === event.guid);
                portal && (portal.imageUrl === event.portalData.image && portal.title === event.portalData.title || (portal.imageUrl = event.portalData.image, 
                portal.title = event.portalData.title, updated = !0));
            }), updated && this.save();
        }
    }
    let lastPortal;
    const addPortalToCurrentMission = data => {
        var _a;
        const state = main.state;
        if (!main.umm.missionModeActive || main.umm.missionModeResuming) return void (main.umm.missionModeResuming = !1);
        if (lastPortal === data.selectedPortalGuid) return;
        lastPortal = data.selectedPortalGuid;
        const mission = state.getEditMission();
        if (!mission) return;
        const portalToAdd = mission.portals.create(data.selectedPortalGuid);
        if (mission.portals.includes(portalToAdd)) {
            if ((null === (_a = mission.portals.get(-1)) || void 0 === _a ? void 0 : _a.guid) !== portalToAdd.guid) {
                const pstate = state.get();
                notification(`${pstate.missionSetName}\nPortal already in mission #${pstate.currentMission + 1}`);
            }
        } else {
            const preMission = state.missions.previous(mission);
            if (preMission && preMission.portals.includes(portalToAdd) && !preMission.portals.isStart(portalToAdd) && !preMission.portals.isEnd(portalToAdd) && confirm("Split mission?")) {
                const index = preMission.portals.indexOf(portalToAdd);
                return mission.portals.clear(), state.missions.split(preMission, index, mission), 
                state.save(), void main.redrawAll();
            }
            mission.portals.add(portalToAdd), state.save(), main.redrawAll();
            const pstate = state.get();
            notification(`${pstate.missionSetName}\nAdded to mission #${pstate.currentMission + 1}`);
        }
    }, dialogButton = (label, callback) => ({
        text: label,
        click: callback,
        class: "umm-dialog-button"
    }), dialogButtonClose = () => dialogButton("Close", event => {
        $(event.currentTarget).parents(".ui-dialog").children(".ui-dialog-content").dialog("close");
    }), Options_button = (label, click) => $("<a>", {
        text: label,
        click
    }), showUmmOptions = () => {
        var _a, _b, _c;
        const ummState = main.state.get(), html = $("<div>", {
            class: "umm-options-list"
        }).append($("<b>", {
            text: "Banner data"
        }), $("<br>"), "Banner name: <b><span>" + (null !== (_a = ummState.missionSetName) && void 0 !== _a ? _a : "N/A") + "</span></b><br>", "Banner description: <b><span>" + (null !== (_b = ummState.missionSetDescription) && void 0 !== _b ? _b : "N/A") + "</span></b><br>", "Mission title format: <b><span>" + (null !== (_c = ummState.titleFormat) && void 0 !== _c ? _c : "N/A") + '</span></b> <span title="Title format allows:&#10;N = Mission number without leading 0 (if required by banner length)&#10;NN = Mission number with leading 0&#10;M = Planned banner length&#10;T = (mission title)&#10; &#10;eg. T N-M or NN.M T">(?)</span><br>', "Planned banner length: <b><span>" + ummState.plannedBannerLength + '</span></b> <span title="Length your banner is going to be. Will be used for mission titles and to make sure you don\'t create too many.">(?)</span><br>', ummState.plannedBannerLength % 6 != 0 ? '<span style="color: red;"><b>Warning:</b></span> banner length is not a multiple of 6<br>' : "<br><b>Active mission data</b><br>", 'Active mission: <b><span id="umm-active-mission-no">' + (ummState.currentMission + 1) + "</span></b><br>", 'Active mission title: <b><span id="umm-active-mission-title">' + (ummState.missions[ummState.currentMission].missionTitle || "N/A") + "</span></b><br>", 'Active mission portal count: <b><span id="umm-active-mission-no-portals">' + ummState.missions[ummState.currentMission].portals.length + "</span></b><br>", $("<br>"), $("<b>", {
            text: "Mission options"
        }), $("<br>"), 'Layers: <label style="user-select: none"><input type="checkbox" onclick="window.plugin.umm.toggleLayerPaths(this.checked)" id="umm-layercheckbox-paths"' + (window.map.hasLayer(main.umm.ummMissionPaths) ? " checked" : "") + '>Mission Paths</label> <label style="user-select: none"><input type="checkbox" onclick="window.plugin.umm.toggleLayerNumbers(this.checked)" id="umm-layercheckbox-numbers"' + (window.map.hasLayer(main.umm.ummMissionNumbers) ? " checked" : "") + ">Mission Numbers</label>", Options_button("Edit banner details", main.umm.editMissionSetDetails), Options_button("Change active mission #", main.umm.editActiveMission), Options_button("Zoom to view all missions", main.umm.zoomAllMissions), $("<hr>"), Options_button("Split mission", main.umm.splitMissionOptions), Options_button("Merge missions", main.umm.mergeMissions), Options_button("Reverse mission", main.umm.reverseMission), $("<hr>"), "<a onclick=\"if (confirm('Are you sure you want to clear ALL missions data?')) window.plugin.umm.clearMissionData(); return false;\">Clear ALL missions data</a>", "<b>Import/Export</b><br>", Options_button("Export banner data to file", main.umm.exportData), '<div style="width:80%; margin: auto;"><b>Import banner data from file:</b><br>', '<input type="file" id="umm-import-file"></input></div>');
        window.dialog({
            html,
            title: `${main.umm.title} v${main.umm.version}`,
            id: "umm-options",
            width: 350,
            buttons: [ dialogButton("About this plugin", about), dialogButtonClose() ]
        }), $("#umm-import-file").on("change", event => {
            confirm("Are you sure you want to overwrite the current mission data?") && main.umm.loadFile(event);
        });
    }, about = () => {
        let html = '<div class="umm-options-list">';
        html += "In short: Create missions in IITC, export as a json file:<br>", html += '<a href="https://intel.ingress.com/" target="_blank"' + (/^intel\.ingress\.com$/i.test(window.location.host) ? ' style="color: #bbb; pointer-events: none; cursor: default;"' : "") + ">https://intel.ingress.com/</a>", 
        html += "Then open the mission creator and load the json file.<br>", html += "Start creating missions and import the UMM data for every mission:<br>", 
        html += '<a href="https://missions.ingress.com/" target="_blank"' + (/^missions\.ingress\.com$/i.test(window.location.host) ? ' style="color: #bbb; pointer-events: none; cursor: default;"' : "") + ">https://missions.ingress.com/</a>", 
        html += "Documentation for this plugin can be found at:<br>", html += '<a href="https://umm.8bitnoise.rocks/" target="_blank">https://umm.8bitnoise.rocks/</a>', 
        html += "Questions, feature requests and tips:<br>", html += '<a href="https://t.me/joinchat/j9T9eLfa3VJlZWE0" target="_blank">Telegram: [XF] Ultimate Mission Maker</a>', 
        html += "</div>";
        const buttons = [ dialogButton("< Main Menu", showUmmOptions), dialogButton("Changelog", () => alert(main.umm.changelog)), dialogButtonClose() ];
        window.dialog({
            html,
            title: `${main.umm.title} v${main.umm.version} - About`,
            id: "umm-options",
            width: 350,
            buttons
        });
    };
    const main = new class UMM_Ext {
        init() {
            __webpack_require__(398), this.umm = window.plugin.umm, this.umm ? (this.state = new State, 
            this.renderPath = new RenderPath(this.umm.ummMissionPaths), this.renderNumbers = new RenderNumbers(this.umm.ummMissionNumbers), 
            this.patch()) : console.error("UMM_Ext: UMM plugin not found!");
        }
        get ori() {
            return this.umm;
        }
        redrawAll() {
            this.renderPath.redraw(), this.renderNumbers.redraw(), this.umm.updatePortalCountSidebar();
        }
        patch() {
            this.replaceToolboxButton(), this.monkeyPatchState(), this.monkeyPatchDrawing(), 
            this.monkeyPatchNumbers(), this.monkeyPatchMissionSelect(), this.monkeyPatchPortalAdd(), 
            this.monkeyPatchDialogs();
        }
        replaceToolboxButton() {
            window.setTimeout(() => {
                $('#toolbox a:contains("UMM Opt")').remove(), $('#toolbox_component a:contains("UMM Opt")').remove();
            }, 500), $("#toolbox").append($("<a>", {
                text: "UMM",
                title: "Ultimate Mission Maker",
                click: () => $(".leaflet-umm.leaflet-bar").toggle()
            })), $(".leaflet-umm.leaflet-bar").hide();
        }
        monkeyPatchState() {
            this.ori.getUmmState = () => this.state.get(), this.ori.saveUmmState = _ummState => {
                this.state.save();
            }, window.removeHook("portalDetailsUpdated", this.ori.updateMissionPortalsDetails), 
            this.ori.clearMissionData = () => {
                this.state.reset(), this.state.save(), this.umm.updateCurrentActiveMissionSidebar(this.state.get()), 
                this.umm.reloadSettingsWindowIfNeeded(), this.umm.missionModeActive && this.umm.toggleMissionMode(), 
                this.renderPath.redraw(), this.renderNumbers.redraw();
            };
        }
        monkeyPatchDrawing() {
            this.ori.drawMissions = () => this.renderPath.redraw();
            const ori = this.umm.toggleMissionMode;
            this.ori.toggleMissionMode = () => {
                ori(), this.renderPath.redraw();
            }, this.renderPath.redraw();
        }
        monkeyPatchNumbers() {
            this.ori.refreshMissionNumbers = () => this.renderNumbers.redraw();
        }
        monkeyPatchMissionSelect() {
            this.ori.nextMission = () => this.state.nextMission(), this.ori.previousMission = () => this.state.prevMission();
        }
        monkeyPatchPortalAdd() {
            window.addHook("portalSelected", event => addPortalToCurrentMission(event)), window.removeHook("portalSelected", this.ori.addPortalToCurrentMission), 
            this.ori.addPortalToCurrentMission = addPortalToCurrentMission;
        }
        monkeyPatchDialogs() {
            this.ori.about = about, this.ori.showUmmOptions = showUmmOptions;
        }
    };
    !function Register(plugin, name) {
        const setup = () => {
            window.plugin[name] = plugin, window.plugin[name].init();
        };
        setup.info = SCRIPT_INFO, window.bootPlugins || (window.bootPlugins = []), window.bootPlugins.push(setup), 
        window.iitcLoaded && setup();
    }(main, "UMM_Ext");
})();
};
(function () {
  const info = {};
  if (typeof GM_info !== 'undefined' && GM_info && GM_info.script)
    info.script = { version: GM_info.script.version, name: GM_info.script.name, description: GM_info.script.description };
  if (typeof unsafeWindow != 'undefined' || typeof GM_info == 'undefined' || GM_info.scriptHandler != 'Tampermonkey') {
    const script = document.createElement('script');
    script.appendChild(document.createTextNode( '('+ wrapper +')('+JSON.stringify(info)+');'));
    document.head.appendChild(script);} 
  else wrapper(info);
})();