// ==UserScript==
// @name            IITC plugin: Ultimate Mission Maker - Extended
// @id              iitc_plugin_UMM_Ext
// @category        Mission
// @version         1.0
// @namespace       https://github.com/IITC-CE/ingress-intel-total-conversion
// @updateURL       https://github.com/IITCPlugins/umm_ext/raw/refs/heads/main/dist/iitc_plugin_UMM_Ext.meta.js
// @downloadURL     https://github.com/IITCPlugins/umm_ext/raw/refs/heads/main/dist/iitc_plugin_UMM_Ext.user.js
// @description     Ultimate Mission Maker - Extended
// @match           https://intel.ingress.com/*
// @match           https://missions.ingress.com/*
// @author          McBen, Vashiru, j00rtje, DanielOnDiordna 
// @icon64          data:image/png;base64,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
// ==/UserScript==
/**
 * # v1.0
 * 
 * This is a complete rewrite of the Ultimate Mission Maker from a developer perspective.
 * The entire codebase has been redesigned while maintaining the familiar user experience of the original UMM.
 * Below are the visible improvements and changes you'll notice.
 * 
 * ## What's Changed:
 * 
 * - UMM is now hidden by default. You need to hit the "UMM" button in the Portal details window to make it appear.
 * 
 * - **Select Mission Dialog** (open it through the toolbar or the main dialog)
 *   - Selecting a mission is no longer required; simply open another mission
 *   - Navigation buttons (+/-) allow you to cycle through missions
 *   - Added split, clear, merge, and reverse commands for mission manipulation
 *   - New mission information display: portal count and distances
 * 
 * - **Banner Settins** (start window)
 *   - changed Title placeholders to $T $M $N
 *   
 * - **Option Dialog** (main window)
 *   - Banner information now displays as a compact table
 *   - Removed warning for mission counts that are not multiples of 6
 *   - Added warning when missions lack sufficient waypoints
 * 
 * - **Drag & Drop** in the mission editor path
 *   - Move existing markers to adjust waypoints
 *   - Add new waypoints by positioning intermediate markers at new locations
 *   - Remove waypoints by double-clicking a marker
 *   - Merge missions by dragging start and end markers together
 * 
 * - **Mission Numbers**
 *   - Potential split points are previewed while creating missions
 * 
 * - **Waypoint edit**
 *   - current mission is preselected
 *   - passphrases: add random default questions.
 *     when question & answer is empty a simple question will be set.
 * 
 * - **Miscellaneous**
 *   - Custom confirmation dialogs clarify actions and improve readability
 *   - Switch between any missions, even those without portals
 *   - Option to split missions when starting on a portal that's already assigned to another mission
 *   - on mobile dialogs are not at the top instead of centered
 *   - flash buttonbar on activation to draw attention
 *   
 * 
 * ---
 * 
 * # History:
 * 
 * ## v1.0.beta.2 - 15.02.26
 * 
 * - fixed update-URL in script header
 * 
 * ## v1.0.beta - 15.02.26
 * 
 * - first public release
 * - automated build process on GitHub
 * - fixed layer checkboxes in Option-Dialog
 * - add "clear" mission to selection dialog
 * - always color selected mission even when not in Edit-Mode
 * - move "no" to left in custom confirm dialog
 * - remove doubled "v" in version numbers
 * - fix toggeling edit mode on mission detail window "save" button
 * - close dialog on mission detail window "save"
 * - fix linebreaks in changelog dialog
 * - select mission: directly select mission on combo-box change
 * - fix question text in portal details
 * - on mobile dialogs are not at the top instead of centered
 * 
 */
function wrapper_iitc(SCRIPT_INFO) {
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
        707(module, __webpack_exports__, __webpack_require__) {
            __webpack_require__.d(__webpack_exports__, {
                A: () => __WEBPACK_DEFAULT_EXPORT__
            });
            var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(601), _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = __webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__), _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(314), ___CSS_LOADER_EXPORT___ = __webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__)()(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default());
            ___CSS_LOADER_EXPORT___.push([ module.id, "#umm-mission-picker-info{border:1px solid #ff0;border-radius:2px;margin:1em 4px 4px}.umm-mission-btn{margin-bottom:2px;margin-right:1em;margin-top:2px}.umm-mission-btn.w-full{width:90%}.umm-notification{background-color:#383838;border-radius:2px;-webkit-box-shadow:0 0 24px -1px #383838;-moz-box-shadow:0 0 24px -1px #383838;box-shadow:0 0 24px -1px #383838;color:#f0f0f0;font-family:Calibri,sans-serif;font-size:20px;height:auto;left:50%;margin-left:-100px;padding:10px;position:absolute;text-align:center;top:20px;width:300px;z-index:10000}.umm-options-list{overflow:hidden}.umm-options-list .banner_info{border:1px solid grey;border-radius:2px;margin-top:0;padding:4px;position:relative}.umm-options-list .banner_info .title{font:700;font-size:large}.umm-options-list .banner_info .description{font-size:small;margin-bottom:.5em}.umm-options-list .banner_info .stat{font-weight:700;margin-left:.4em}.umm-options-list .banner_info #umm_opt_error{padding-top:.5em}.umm-options-list .banner_info #umm_opt_error .error{color:#ffa0a0;font-weight:700}.umm-options-list .banner_info .editButtom{bottom:0;position:absolute;right:0}.umm-options-list a{background:rgba(8,48,78,.9);border:1px solid #ffce00;color:#ffce00;display:block;margin:10px auto;padding:3px 0;text-align:center;width:80%}#dialog-umm-edit-mission-set-details{background-color:rgba(8,48,78,.9)}.umm-edit-mission-set-details p{display:block;margin:5px 0 8px}.umm-edit-mission-set-details label{display:block;margin-bottom:5px}.umm-edit-mission-set-details input,.umm-edit-mission-set-details textarea{margin-bottom:15px;width:100%}.umm-edit-mission-set-details textarea{background-color:#062844;color:#ffce00;font-family:inherit;resize:vertical;width:calc(100% - 6px)}.umm-edit-mission-set-details span.umm-error{color:#fff;display:block;display:none;margin-bottom:5px}.umm-edit-mission-set-details span.umm-error b{color:red}.umm-dialog-button{margin-left:5px}.umm-mission-marker .start{fill:#16d4b2;stroke:#005243;stroke-miterlimit:10}.umm-mission-marker .active{fill:#6832da;stroke:#16043f;stroke-miterlimit:10}.umm-mission-number{color:#000;font-family:monospace;font-size:14px;font-weight:700;left:0;position:absolute;text-align:center;top:6px;width:34px}#umm-waypoint-editor{border-bottom:1px solid #20a8b1;border-top:1px solid #20a8b1;box-sizing:border-box;color:#ffce00;display:flex;flex-direction:column;margin-bottom:10px;margin-top:10px;padding:8px 5px;width:100%}.umm-waypoint-editor-title{font-weight:700;margin-bottom:6px}.umm-waypoint-select-container{display:flex;flex-direction:row;width:100%}.umm-waypoint-select-container>select{background-color:#062844;border:none;color:#ffce00;height:24px}#umm-mission-select{width:60px}#umm-action-select{margin-left:4px;width:100%}#umm-passphrase-container{display:none;flex-direction:column;margin-top:5px}#umm-passphrase-container>span{margin-bottom:3px}#umm-passphrase-container>input,#umm-passphrase-container>textarea{background-color:#062844;border:none;color:#ffce00;font-family:Arial;margin-bottom:5px;min-height:24px;padding:3px;resize:vertical}.umm-confirm.no_title .ui-dialog-titlebar{display:none}.umm-confirm .header{font-size:1.4em;line-height:1.4em;margin:10px;overflow:hidden;text-align:center;text-overflow:ellipsis}.umm-confirm .details{color:#ccc;text-align:center}.um-helpTooltip{cursor:help;font-size:small;margin-left:5px}", "" ]);
            const __WEBPACK_DEFAULT_EXPORT__ = ___CSS_LOADER_EXPORT___;
        },
        768(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
            __webpack_require__.r(__webpack_exports__), __webpack_require__.d(__webpack_exports__, {
                default: () => __WEBPACK_DEFAULT_EXPORT__
            });
            var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(72), _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = __webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__), _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(825), _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = __webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__), _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(659), _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = __webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__), _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(56), _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = __webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__), _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(540), _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = __webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__), _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(113), _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = __webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__), _node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_1_use_1_node_modules_postcss_loader_dist_cjs_js_ruleSet_1_rules_1_use_2_styles_pcss__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(707), options = {};
            options.styleTagTransform = _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default(), 
            options.setAttributes = _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default(), 
            options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head"), 
            options.domAPI = _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default(), 
            options.insertStyleElement = _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default();
            _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_1_use_1_node_modules_postcss_loader_dist_cjs_js_ruleSet_1_rules_1_use_2_styles_pcss__WEBPACK_IMPORTED_MODULE_6__.A, options);
            const __WEBPACK_DEFAULT_EXPORT__ = _node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_1_use_1_node_modules_postcss_loader_dist_cjs_js_ruleSet_1_rules_1_use_2_styles_pcss__WEBPACK_IMPORTED_MODULE_6__.A && _node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_1_use_1_node_modules_postcss_loader_dist_cjs_js_ruleSet_1_rules_1_use_2_styles_pcss__WEBPACK_IMPORTED_MODULE_6__.A.locals ? _node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_1_use_1_node_modules_postcss_loader_dist_cjs_js_ruleSet_1_rules_1_use_2_styles_pcss__WEBPACK_IMPORTED_MODULE_6__.A.locals : void 0;
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
    __webpack_require__.d({}, {
        i: () => main
    });
    const debounce = (fct, timeout = 10) => {
        let timer;
        return (...data) => {
            clearTimeout(timer), timer = window.setTimeout(() => {
                fct.apply(void 0, data);
            }, timeout);
        };
    }, confirmDialog = options => new Promise((resolve, _) => {
        const message = $("<div>");
        message.append($("<div>", {
            class: "header"
        }).append(options.message)), options.details && message.append($("<hr>"), $("<div>", {
            class: "details"
        }).append(options.details));
        const buttons = [ {
            text: "No",
            click: () => {
                newDialog.dialog("close"), resolve(!1);
            }
        }, {
            text: "Yes",
            click: () => {
                newDialog.dialog("close"), resolve(!0);
            }
        } ], newDialog = window.dialog({
            html: message,
            title: options.title,
            dialogClass: "umm-confirm " + (options.title ? "" : " no_title"),
            resizable: !1,
            modal: !0,
            closeOnEscape: !1,
            buttons
        });
        newDialog.parent().find("button:eq(1)").css({
            float: "left"
        }), newDialog.closest(".ui-dialog").trigger("focus"), newDialog.closest(".ui-dialog").on("keydown", event => "Enter" === event.key ? (event.preventDefault(), 
        event.stopPropagation(), newDialog.parent().find("button:eq(2)").trigger("click"), 
        !1) : "Escape" !== event.key || (event.preventDefault(), event.stopPropagation(), 
        newDialog.parent().find("button:eq(1)").trigger("click"), !1)), newDialog.dialog("moveToTop");
    }), bannerNotification = (state, message) => notification(`${state.getBannerName()}\n${message}`), notification = (notificationText, presistend = !1) => {
        $(".umm-notification").remove(), notificationText = notificationText.replace(/\n/g, "<br/>");
        const notification = $("<div>", {
            class: "umm-notification",
            html: notificationText
        });
        $("body").append(notification), presistend || window.setTimeout(() => {
            $(".umm-notification").fadeOut(400, () => notification.remove());
        }, 3e3);
    };
    let icon;
    class DragMarker {
        constructor(layer, location, portalId, mission, isDummy = !1) {
            this.mission = mission, this.layer = layer, this.startLocation = location, this.marker = new L.Marker(location, {
                icon: (icon || (icon = L.Browser.touch ? new L.DivIcon({
                    iconSize: new L.Point(20, 20),
                    className: "leaflet-div-icon leaflet-editing-icon leaflet-touch-icon"
                }) : new L.DivIcon({
                    iconSize: new L.Point(8, 8),
                    className: "leaflet-div-icon leaflet-editing-icon"
                })), icon),
                draggable: !0,
                zIndexOffset: 7e3,
                opacity: isDummy ? .4 : 1,
                portal: portalId,
                isMidPoint: isDummy
            }), layer.addLayer(this.marker), this.marker.on("drag", event => {
                this.onMarkerDrag(event);
            }).on("dragstart", event => {
                this.onMarkerDragStart(event);
            }).on("dragend", event => {
                this.onMarkerDragEnd(event);
            }).on("dblclick", event => {
                this.onMarkerDblClick(event);
            });
        }
        destroy() {
            this.layer.removeLayer(this.marker);
        }
        onMarkerDragStart(event) {
            const marker = event.target, options = event.target.options, isMidPoint = options.isMidPoint;
            this.editDragLine && this.layer.removeLayer(this.editDragLine);
            const portal = options.portal, portal_pre = portal > 0 ? this.mission.portals.get(portal - 1) : void 0, portal_post = this.mission.portals.get(portal + (isMidPoint ? 0 : 1));
            let lls = [ portal_pre && new L.LatLng(portal_pre.location.latitude, portal_pre.location.longitude), marker.getLatLng(), portal_post && new L.LatLng(portal_post.location.latitude, portal_post.location.longitude) ];
            portal_pre || portal_post ? portal_pre ? portal_post || (lls = [ lls[1], lls[0] ]) : lls.splice(0, 1) : lls = [ marker.getLatLng(), marker.getLatLng() ], 
            this.editDragLine = new L.Polyline(lls, {
                color: "#ff9a00",
                weight: 3,
                dashArray: "5,5",
                pointerEvents: "none"
            }), this.layer.addLayer(this.editDragLine);
        }
        onMarkerDrag(event) {
            if (!this.editDragLine) return;
            const marker = event.target, snappedPortal = this.getSnapPortal(marker.getLatLng(), this.mission.getLocations()), newTarget = snappedPortal ? snappedPortal.getLatLng() : marker.getLatLng(), latlngs = this.editDragLine.getLatLngs();
            latlngs[3 === latlngs.length ? 1 : 0] = newTarget, this.editDragLine.setLatLngs(latlngs);
        }
        async onMarkerDragEnd(event) {
            this.editDragLine && (this.layer.removeLayer(this.editDragLine), this.editDragLine = void 0);
            const marker = event.target, options = event.target.options, coordinatesList = this.mission.getLocations(), snappedPortal = this.getSnapPortal(marker.getLatLng(), coordinatesList);
            if (!snappedPortal) return void this.marker.setLatLng(this.startLocation);
            const portalToAdd = this.mission.portals.create(snappedPortal.options.guid);
            options.isMidPoint ? this.mission.portals.insert(options.portal, portalToAdd) : await this.movePortal(options.portal, portalToAdd), 
            main.state.save();
        }
        async movePortal(portalID, target) {
            if (0 === portalID) {
                const missions = main.state.missions, preMission = missions.previous(this.mission);
                if (null == preMission ? void 0 : preMission.portals.isEnd(target)) {
                    if (await confirmDialog({
                        message: "Merge mission ?"
                    })) return missions.merge(preMission, this.mission), void main.state.setCurrent(preMission.id);
                } else if (1 === this.mission.portals.length && (null == preMission ? void 0 : preMission.portals.includes(target.guid)) && await confirmDialog({
                    message: "Split mission ?"
                })) {
                    const index = preMission.portals.indexOf(target);
                    return this.mission.portals.clear(), void missions.split(preMission, index, this.mission);
                }
            }
            if (portalID === this.mission.portals.length - 1) {
                const missions = main.state.missions, postMission = missions.next(this.mission);
                if ((null == postMission ? void 0 : postMission.portals.isStart(target)) && await confirmDialog({
                    message: "Merge mission ?"
                })) return void missions.merge(this.mission, postMission);
            }
            this.mission.portals.set(portalID, target);
        }
        getSnapPortal(unsnappedLatLng, ignore = []) {
            const containerPoint = window.map.latLngToContainerPoint(unsnappedLatLng);
            let best_portal, best_distance = 1 / 0;
            for (const guid in window.portals) {
                const portal = window.portals[guid], ll = portal.getLatLng();
                if (ignore.some(x => x.equals(ll))) continue;
                const pp = window.map.latLngToContainerPoint(ll), options = portal.options, size = options.weight + 5 * options.radius, distance = pp.distanceTo(containerPoint);
                distance > size || distance < best_distance && (best_distance = distance, best_portal = portal);
            }
            return best_portal;
        }
        onMarkerDblClick(event) {
            const options = event.target.options, portal = options.portal;
            options.isMidPoint || (this.mission.portals.remove(portal), main.state.save(), notification(`${this.mission.title}\nRemoved #${portal + 1} from mission`));
        }
    }
    class RenderBase {
        constructor(name) {
            this.layer = new window.L.FeatureGroup, window.addLayerGroup(name, this.layer, !0), 
            this.toggle(!1);
        }
        isVisible() {
            return window.map.hasLayer(this.layer);
        }
        isLayer(layer) {
            return layer === this.layer;
        }
        toggle(show) {
            show ? window.map.addLayer(this.layer) : window.map.removeLayer(this.layer);
        }
    }
    class RenderPath extends RenderBase {
        constructor() {
            super("UMM: Mission Paths"), this.redrawNow = () => {
                this.layer.clearLayers(), this.dragMarkers.forEach(m => m.destroy()), this.dragMarkers = [];
                const editMode = main.missionModeActive;
                main.state.missions.forEach(mission => {
                    main.state.isCurrent(mission.id) && editMode ? this.drawEditMission(mission) : this.drawMission(mission);
                });
            }, this.redraw = debounce(this.redrawNow), this.dragMarkers = [], main.state.onMissionChange.do(this.redraw), 
            main.state.onMissionPortal.do(this.redraw), main.state.onSelectedMissionChange.do(this.redraw);
        }
        drawMission(mission) {
            const geodesicPolyline = new L.GeodesicPolyline(mission.getLocations(), {
                color: main.state.isCurrent(mission.id) ? "#ff9a00" : "crimson",
                weight: 5,
                smoothFactor: 1,
                interactive: !1
            });
            this.layer.addLayer(geodesicPolyline);
        }
        drawEditMission(mission) {
            const coordinatesList = mission.getLocations();
            coordinatesList.forEach((ll, index) => this.createDragMarker(ll, index, mission)), 
            coordinatesList.forEach((ll, index) => {
                if (index > 0) {
                    const half = this.getCenter(coordinatesList[index - 1], ll);
                    this.createDragMarker(half, index, mission, !0);
                }
            });
            const geodesicPolyline = new L.GeodesicPolyline(coordinatesList, {
                color: "#ff9a00",
                weight: 5,
                smoothFactor: 1
            });
            this.layer.addLayer(geodesicPolyline);
        }
        createDragMarker(location, portalId, mission, dummy = !1) {
            this.dragMarkers.push(new DragMarker(this.layer, location, portalId, mission, dummy));
        }
        getCenter(l1, l2) {
            const p1 = window.map.project(l1), p2 = window.map.project(l2);
            return window.map.unproject(p1.add(p2).divideBy(2));
        }
    }
    class Portals {
        constructor(state, data) {
            this.state = state, this.data = data;
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
            this.data[index] = portal, this.state.onMissionPortal.trigger();
        }
        add(...portal) {
            portal.some(p => this.includes(p.guid)), this.data.push(...portal), this.state.onMissionPortal.trigger();
        }
        insert(index, ...portal) {
            portal.some(p => this.includes(p.guid)), this.data.splice(index, 0, ...portal), 
            this.state.onMissionPortal.trigger();
        }
        remove(index, count = 1) {
            this.data.splice(index, count), this.state.onMissionPortal.trigger();
        }
        clear() {
            this.data.length = 0, this.state.onMissionPortal.trigger();
        }
        toLatLng() {
            return this.data.map(portal => new L.LatLng(portal.location.latitude, portal.location.longitude));
        }
        getLatLngOf(index) {
            const portal = this.get(index);
            if (portal) return new L.LatLng(portal.location.latitude, portal.location.longitude);
        }
        includes(guid) {
            return this.data.some(x => x.guid === guid);
        }
        find(guid) {
            return this.data.find(x => x.guid === guid);
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
        reverse() {
            this.data.reverse(), this.state.onMissionPortal.trigger();
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
    const setPassphrase = (portal, question, answer) => {
        portal.objective.passphrase_params.question = question, portal.objective.passphrase_params._single_passphrase = answer;
    };
    class Mission {
        constructor(state, id, data) {
            this.missionID = id, this.data = data, this.portal_data = new Portals(state, data.portals);
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
        get description() {
            return this.data.missionDescription;
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
        focusLastPortal() {
            const last_ll = this.portal_data.getLatLngOf(-1), last = this.portal_data.get(-1);
            return !(!last || !last_ll) && (window.map.setView(last_ll), window.renderPortalDetails(last.guid), 
            !0);
        }
        getDistance() {
            return this.portals.toLatLng().reduce((sum, ll, index, lls) => index > 0 ? sum + ll.distanceTo(lls[index - 1]) : 0, 0);
        }
        clear() {
            this.portal_data.clear();
        }
        reverse() {
            this.portal_data.reverse();
        }
    }
    class Missions {
        static generateMissionTitle(format, info) {
            return format.replace(/\$(\d*)?(\w)/g, (_, flags, token) => {
                var _a, _b, _c, _d, _e, _f, _g;
                let value = token;
                switch (token.toLowerCase()) {
                  case "t":
                    value = null !== (_a = info.title) && void 0 !== _a ? _a : value;
                    break;

                  case "m":
                    value = null !== (_c = null === (_b = info.total) || void 0 === _b ? void 0 : _b.toString()) && void 0 !== _c ? _c : value;
                    break;

                  case "n":
                    value = null !== (_e = null === (_d = info.misison) || void 0 === _d ? void 0 : _d.toString()) && void 0 !== _e ? _e : value;
                }
                let leadingZero = !1;
                (null == flags ? void 0 : flags.startsWith("0")) && (leadingZero = !0, flags = flags.slice(1));
                let length = parseInt(flags);
                return Number.isNaN(length) && (length = 1, leadingZero && (length = null !== (_g = null === (_f = info.total) || void 0 === _f ? void 0 : _f.toString().length) && void 0 !== _g ? _g : 1)), 
                value.length < length && (value = value.padStart(length, leadingZero ? "0" : " ")), 
                value;
            });
        }
        constructor(state, data) {
            this.state = state, this.data = data;
        }
        get(missionId) {
            const mis = this.data[missionId];
            return mis && new Mission(this.state, missionId, mis);
        }
        count() {
            return this.data.length;
        }
        forEach(callback) {
            this.data.forEach((missionData, index) => {
                const mission = new Mission(this.state, index, missionData);
                callback(mission);
            });
        }
        filter(callback) {
            const result = [];
            return this.forEach(mission => {
                callback(mission) && result.push(mission);
            }), result;
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
        distanceToStart(id) {
            const mission = this.get(id);
            if (!mission) return;
            const previous = this.previous(mission), first = null == previous ? void 0 : previous.portals.getLatLngOf(-1), last = mission.portals.getLatLngOf(0);
            return first && last ? first.distanceTo(last) : void 0;
        }
        getTotalDistance() {
            const waypoints = [];
            return this.forEach(m => waypoints.push(...m.getLocations())), waypoints.reduce((sum, ll, index, lls) => index > 0 ? sum + ll.distanceTo(lls[index - 1]) : 0, 0);
        }
        getWaypointCount() {
            return this.data.reduce((count, mis) => count + mis.portals.length, 0);
        }
        validate() {
            const errors = {}, notEnoughWaypoint = this.filter(m => m.portals.length < 6).map(m => m.id);
            return notEnoughWaypoint.length > 0 && (errors["not enough waypoints"] = notEnoughWaypoint), 
            errors;
        }
        zoom() {
            const location = this.data.flatMap(m => new Portals(this.state, m.portals).toLatLng());
            if (location.length > 0) {
                const bounds = new L.LatLngBounds(location).pad(.1);
                window.map.fitBounds(bounds, {
                    maxZoom: 18
                });
            }
        }
        merge(destination, missionB) {
            destination.portals.add(...missionB.portals.getRange()), missionB.portals.clear();
        }
        mergeAll() {
            const portals = [];
            this.data.forEach(m => {
                portals.push(...m.portals), portals.length = 0;
            }), this.data[0].portals = portals;
        }
        split(source, at, destination) {
            const toMove = source.portals.getRange(at);
            destination.portals.insert(0, ...toMove), source.portals.remove(at, toMove.length);
        }
        splitIntoMultiple(source, count, restAtLast = !1) {
            const allPortals = this.getAllPortalsOf(source.id, count);
            let portalsPerMission = allPortals.length / count;
            restAtLast && (portalsPerMission = Math.floor(portalsPerMission));
            for (let i = 0; i < count; i++) {
                const start = Math.floor(portalsPerMission * i);
                let end = Math.floor(portalsPerMission * (i + 1));
                i === count - 1 && (end = allPortals.length);
                const mission = this.get(source.id + i);
                null == mission || mission.portals.clear(), null == mission || mission.portals.add(...allPortals.slice(start, end));
            }
        }
        getAllPortalsOf(from, count) {
            const allPortals = [];
            for (let i = 0; i < count; i++) {
                const mission = this.get(from + i);
                mission && allPortals.push(...mission.portals.getRange());
            }
            return allPortals;
        }
        getMissionsOfPortal(guid) {
            return this.filter(mis => mis.portals.includes(guid)).map(m => m.id);
        }
    }
    class RenderNumbers extends RenderBase {
        constructor() {
            super("UMM: Mission Numbers"), this.redrawNow = () => {
                this.layer.clearLayers();
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
                    this.layer.addLayer(marker);
                });
            }, this.redraw = debounce(this.redrawNow), main.state.onMissionChange.do(this.redraw), 
            main.state.onMissionPortal.do(this.redraw), main.state.onSelectedMissionChange.do(this.redraw);
        }
        getMissionStarts(state) {
            const missions = [];
            let mid = 0;
            for (;mid < state.missions.count(); ) {
                const mission = state.missions.get(mid);
                if (null == mission ? void 0 : mission.hasPortals()) {
                    const start = mission.portals.getLatLngOf(0);
                    missions.push({
                        missionIndex: mid,
                        location: start,
                        auto: !1
                    });
                }
                let count = 1;
                for (;mid + count < state.missions.count(); count++) {
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
    const undefinedOrEmptyString = value => null == value || "" == value;
    class Trigger {
        constructor() {
            this.handler = [];
        }
        do(fct) {
            this.handler.includes(fct) || this.handler.push(fct);
        }
        dont(fct) {
            const index = this.handler.indexOf(fct);
            -1 === index ? console.error("handler was not registerd", fct) : this.handler.splice(index, 1);
        }
        trigger() {
            this.handler.some(fct => !1 === fct());
        }
        clear() {
            this.handler = [];
        }
    }
    const fileFormatVersion = 3;
    class State {
        constructor() {
            this.onSelectedMissionChange = new Trigger, this.onMissionChange = new Trigger, 
            this.onMissionPortal = new Trigger, this.load();
        }
        load() {
            this.reset();
            const data = localStorage.getItem("ultimate-mission-maker");
            data && this.import(data);
        }
        save() {
            this.setPlannedLength(this.theState.plannedBannerLength), localStorage.setItem("ultimate-mission-maker", this.asString());
        }
        import(jsonString) {
            const anyState = JSON.parse(jsonString);
            this.theState = (ummState => {
                var _a, _b, _c, _d, _e, _f;
                if (ummState.fileFormatVersion > fileFormatVersion) throw new Error("UMM: You've attempted to load data that's newer than what's supported by this version of UMM. Please update the plugin and try again. Data has not been loaded.");
                if (void 0 === ummState.fileFormatVersion || "" === ummState.fileFormatVersion) {
                    if (undefinedOrEmptyString(ummState.missionSetName) && (undefinedOrEmptyString(ummState.missionName) ? ummState.missionSetName = "" : (ummState.missionSetName = ummState.missionName, 
                    delete ummState.missionName)), undefinedOrEmptyString(ummState.missionSetDescription) && (undefinedOrEmptyString(ummState.missionDescription) ? ummState.missionSetDescription = "" : (ummState.missionSetDescription = ummState.missionDescription, 
                    delete ummState.missionDescription)), undefinedOrEmptyString(ummState.titleFormat) && (ummState.titleFormat = "T NN-M"), 
                    void 0 === ummState.numberOfMissions ? ummState.plannedBannerLength = Object.keys(ummState.missions).length : (ummState.plannedBannerLength = ummState.numberOfMissions, 
                    delete ummState.numberOfMissions), !Object.keys(ummState.missions[0]).includes("portals")) if (ummState.missions[0][0].guid) {
                        const newMissions = [];
                        for (const mission in ummState.missions) {
                            const plannedLength = ummState.plannedBannerLength > 0 ? ummState.plannedBannerLength : ummState.missions.length, missionTitle = Missions.generateMissionTitle(ummState.titleFormat, {
                                misison: parseInt(mission) + 1,
                                title: ummState.missionSetName,
                                total: plannedLength
                            });
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
                if (2 === ummState.fileFormatVersion) for (const mission in ummState.missions) for (const portal in ummState.missions[mission].portals) "HACK" === ummState.missions[mission].portals[portal].objective.type && (ummState.missions[mission].portals[portal].objective.type = "HACK_PORTAL");
                return 2 === ummState.fileFormatVersion && (null !== (_a = ummState.missionSetName) && void 0 !== _a || (ummState.missionSetName = ""), 
                null !== (_b = ummState.missionSetDescription) && void 0 !== _b || (ummState.missionSetDescription = ""), 
                null !== (_c = ummState.currentMission) && void 0 !== _c || (ummState.currentMission = 0), 
                null !== (_d = ummState.plannedBannerLength) && void 0 !== _d || (ummState.plannedBannerLength = 1), 
                null !== (_e = ummState.titleFormat) && void 0 !== _e || (ummState.titleFormat = "T NN-M")), 
                ummState.fileFormatVersion < 3 && (ummState.titleFormat = (null !== (_f = ummState.titleFormat) && void 0 !== _f ? _f : "").replace("T", "$T").replace(/N+/, match => match.length > 1 ? "$0N" : "$N").replace(/(M+)/g, "$M"), 
                ummState.fileFormatVersion = 3), ummState;
            })(anyState), this.setPlannedLength(this.getPlannedLength() || 1), this.onMissionChange.trigger(), 
            this.onMissionPortal.trigger(), this.onSelectedMissionChange.trigger();
        }
        asString() {
            return JSON.stringify(this.theState);
        }
        reset() {
            this.theState = {
                missionSetName: "",
                missionSetDescription: "",
                currentMission: 0,
                plannedBannerLength: 1,
                titleFormat: "$T $N / $M",
                fileFormatVersion,
                missions: [ {
                    missionTitle: "",
                    missionDescription: "",
                    portals: []
                } ],
                layers: []
            }, this.onMissionChange.trigger();
        }
        isEmpty() {
            return "" === this.theState.missionSetName && "" === this.theState.missionSetDescription && this.theState.missions.every(m => 0 === m.portals.length);
        }
        isValid() {
            return "" !== this.theState.missionSetName && "" !== this.theState.missionSetDescription && this.theState.plannedBannerLength > 0;
        }
        get missions() {
            return new Missions(this, this.theState.missions);
        }
        getBannerName() {
            return this.theState.missionSetName;
        }
        setBannerName(name) {
            this.theState.missionSetName = name, this.theState.missions.forEach((mission, id) => mission.missionTitle = this.generateMissionTitle(id)), 
            this.onMissionChange.trigger();
        }
        getBannerDesc() {
            return this.theState.missionSetDescription;
        }
        setBannerDesc(desc) {
            this.theState.missionSetDescription = desc, this.theState.missions.forEach(mission => mission.missionDescription = this.theState.missionSetDescription), 
            this.onMissionChange.trigger();
        }
        getTitleFormat() {
            return this.theState.titleFormat;
        }
        setTitleFormat(name) {
            this.theState.titleFormat = name, this.theState.missions.forEach((mission, id) => mission.missionTitle = this.generateMissionTitle(id)), 
            this.onMissionChange.trigger();
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
            this.onMissionChange.trigger();
        }
        generateMissionTitle(missNumber) {
            return Missions.generateMissionTitle(this.theState.titleFormat, {
                misison: missNumber,
                total: this.getPlannedLength(),
                title: this.theState.missionSetName
            });
        }
        getEditMission() {
            return this.missions.get(this.theState.currentMission);
        }
        setCurrent(missionId) {
            missionId >= 0 && this.getPlannedLength(), this.theState.currentMission = missionId, 
            this.onSelectedMissionChange.trigger();
        }
        getCurrent() {
            return this.theState.currentMission;
        }
        isCurrent(missionId) {
            return this.theState.currentMission === missionId;
        }
        checkPortal(event) {
            let updated = !1;
            this.theState.missions.forEach(mission => {
                const portal = mission.portals.find(x => x.guid === event.guid);
                portal && (portal.imageUrl === event.portalData.image && portal.title === event.portalData.title || (portal.imageUrl = event.portalData.image, 
                portal.title = event.portalData.title, updated = !0));
            }), updated && this.save();
        }
        checkAllPortals() {
            let updated = !1;
            this.theState.missions.forEach(mission => {
                mission.portals.forEach(portal => {
                    var _a;
                    const iitcPortal = null === (_a = window.portals[portal.guid]) || void 0 === _a ? void 0 : _a.options.data;
                    iitcPortal && (portal.imageUrl === iitcPortal.image && portal.title === iitcPortal.title || (portal.imageUrl = iitcPortal.image, 
                    portal.title = iitcPortal.title, updated = !0));
                });
            }), updated && this.save();
        }
        storeLayerState(layers) {
            this.theState.layers = layers.map(l => l.isVisible()), this.save();
        }
        restoreLayerState(layers) {
            this.theState.layers.forEach((vis, index) => layers[index].toggle(null == vis || vis));
        }
    }
    const Button_button = (label, click, classes) => $("<button>", {
        text: label,
        click,
        class: "umm-mission-btn " + (null != classes ? classes : "")
    }), dialogButton = (label, callback) => ({
        text: label,
        click: callback,
        class: "umm-dialog-button"
    }), dialogButtonClose = () => dialogButton("Close", event => {
        $(event.currentTarget).parents(".ui-dialog").children(".ui-dialog-content").dialog("close");
    }), loadFile = async (state, inputFile) => {
        const text = await inputFile.text();
        try {
            state.import(text);
        } catch (error) {
            return notification(`Loadgin error: \n${error}`), !1;
        }
        return state.save(), notification(`Banner data loaded:\n${state.getBannerName()}`), 
        !0;
    }, title = "Ultimate Mission Maker EX", MissionNumberQuestions = [ "What number is this mission ?", "Which mission number is this ?", "What is the mission number ?", "Which number does this mission have ?", "What is this mission’s number ?", "Which mission index is this ?", "What is the index of this mission ?", "Which position does this mission have ?", "What is the position of this mission ?", "Which mission slot is this ?", "What number does this mission have in the banner ?", "Which banner number is this mission ?", "What is this mission’s banner position ?", "Which mission number is shown in the banner ?", "What number identifies this mission in the series ?", "Which number does this mission have in the sequence ?", "What is the mission’s number in the series ?", "Which mission position is this in the banner ?", "What number is assigned to this banner mission ?", "Which number marks this mission in the banner ?", "What mission number are you playing right now ?", "Which mission number are you currently on ?", "What number are you on in this banner ?", "Which mission number are you completing now ?", "What is the current mission number ?", "Which number is this step of the banner ?", "What number is this step in the mission series ?", "Which mission step number is this ?", "What is the step number of this mission ?", "Which number corresponds to this mission step ?", "Identify the mission number of this mission.", "Select the mission number for this mission.", "Determine this mission’s number.", "State the number of this mission.", "Indicate the index of this mission.", "Specify the position number of this mission.", "What ordinal number does this mission have ?", "Which ordinal position is this mission ?", "What numeric identifier does this mission have ?", "Which numeric index applies to this mission ?", "What is the mission number you are answering ?", "Which number corresponds to this exact mission ?", "What number is displayed for this mission ?", "Which mission number is written here ?", "What is the official number of this mission ?", "Which mission number was assigned here ?", "What number labels this mission ?", "Which number tags this mission ?", "What is the mission’s assigned number ?", "Which number marks this mission ?", "What is this mission’s index number ?", "Which index number is this mission ?", "What is the banner index of this mission ?", "Which banner index applies here ?", "What position number does this mission have ?", "Which position number is this mission ?", "What is the mission’s position number ?", "Which slot number is this mission ?", "What is this mission’s slot number ?", "Which slot position is this mission ?", "What number identifies this mission in the banner ?", "Which number identifies this mission in the banner ?", "What is the number assigned to this mission ?", "Which number is assigned to this mission ?", "What is this mission’s series number ?", "Which series number is this mission ?", "What is the banner series number of this mission ?", "Which banner series number is this mission ?", "What number corresponds to this banner entry ?", "Which number corresponds to this banner entry ?" ], NoobQuestions = [ {
        q: "What is the capital of France?",
        a: "Paris"
    }, {
        q: "What is the capital of Germany?",
        a: "Berlin"
    }, {
        q: "What is the capital of Italy?",
        a: "Rome"
    }, {
        q: "What is the capital of Spain?",
        a: "Madrid"
    }, {
        q: "What is the capital of the United Kingdom?",
        a: "London"
    }, {
        q: "What is the capital of Japan?",
        a: "Tokyo"
    }, {
        q: "What is the capital of China?",
        a: "Beijing"
    }, {
        q: "What is the capital of Australia?",
        a: "Canberra"
    }, {
        q: "What is the capital of Canada?",
        a: "Ottawa"
    }, {
        q: "What is the capital of Austria?",
        a: "Vienna"
    }, {
        q: "How many days are in a week?",
        a: "7"
    }, {
        q: "How many months are in a year?",
        a: "12"
    }, {
        q: "How many hours are in a day?",
        a: "24"
    }, {
        q: "How many minutes are in an hour?",
        a: "60"
    }, {
        q: "How many seconds are in a minute?",
        a: "60"
    }, {
        q: "How many continents are there?",
        a: "7"
    }, {
        q: "How many letters are in the English alphabet?",
        a: "26"
    }, {
        q: "What is 1 + 1?",
        a: "2"
    }, {
        q: "What is 2 + 2?",
        a: "4"
    }, {
        q: "What is 3 + 3?",
        a: "6"
    }, {
        q: "What is 4 + 4?",
        a: "8"
    }, {
        q: "What is 5 + 5?",
        a: "10"
    }, {
        q: "What is 10 - 5?",
        a: "5"
    }, {
        q: "What is 7 - 2?",
        a: "5"
    }, {
        q: "What is 6 + 1?",
        a: "7"
    }, {
        q: "What is 9 - 3?",
        a: "6"
    }, {
        q: "What animal says meow?",
        a: "Cat"
    }, {
        q: "What animal says woof?",
        a: "Dog"
    }, {
        q: "What animal says moo?",
        a: "Cow"
    }, {
        q: "What color is grass?",
        a: "Green"
    }, {
        q: "What color is snow?",
        a: "White"
    }, {
        q: "What color is coal?",
        a: "Black"
    }, {
        q: "What color is the sun?",
        a: "Yellow"
    }, {
        q: "Is the Earth round?",
        a: "Yes"
    }, {
        q: "Is fire hot?",
        a: "Yes"
    }, {
        q: "Is ice cold?",
        a: "Yes"
    }, {
        q: "Is the sky usually blue?",
        a: "Yes"
    }, {
        q: "Is water wet?",
        a: "Yes"
    }, {
        q: "Is the sun a star?",
        a: "Yes"
    }, {
        q: "Is the moon a satellite of Earth?",
        a: "Yes"
    }, {
        q: "What is the name of the blue faction in Ingress?",
        a: "Resistance"
    }, {
        q: "What is the name of the green faction in Ingress?",
        a: "Enlightened"
    }, {
        q: "What is Ingress energy called?",
        a: "XM"
    }, {
        q: "What is a basic item deployed on portals?",
        a: "Resonator"
    }, {
        q: "How many sides does a triangle have?",
        a: "3"
    }, {
        q: "How many sides does a square have?",
        a: "4"
    }, {
        q: "How many sides does a pentagon have?",
        a: "5"
    }, {
        q: "How many wheels does a car usually have?",
        a: "4"
    }, {
        q: "How many legs does a spider have?",
        a: "8"
    }, {
        q: "How many fingers does a human have?",
        a: "10"
    }, {
        q: "What planet do we live on?",
        a: "Earth"
    }, {
        q: "What star is at the center of our solar system?",
        a: "Sun"
    }, {
        q: "What is frozen water called?",
        a: "Ice"
    }, {
        q: "What is water vapor called?",
        a: "Steam"
    }, {
        q: "What is the opposite of hot?",
        a: "Cold"
    }, {
        q: "What is the opposite of big?",
        a: "Small"
    }, {
        q: "What is the opposite of day?",
        a: "Night"
    }, {
        q: "What comes after Monday?",
        a: "Tuesday"
    }, {
        q: "What comes after Tuesday?",
        a: "Wednesday"
    }, {
        q: "What comes after Wednesday?",
        a: "Thursday"
    }, {
        q: "What comes after Thursday?",
        a: "Friday"
    }, {
        q: "What comes after Friday?",
        a: "Saturday"
    }, {
        q: "What comes after Saturday?",
        a: "Sunday"
    }, {
        q: "Is 0 an even number?",
        a: "Yes"
    }, {
        q: "Is 2 an even number?",
        a: "Yes"
    }, {
        q: "Is 3 an odd number?",
        a: "Yes"
    }, {
        q: "Is 10 greater than 5?",
        a: "Yes"
    }, {
        q: "Is 1 less than 2?",
        a: "Yes"
    }, {
        q: "What is the first month of the year?",
        a: "January"
    }, {
        q: "What is the last month of the year?",
        a: "December"
    }, {
        q: "How many seasons are there?",
        a: "4"
    }, {
        q: "What season comes after spring?",
        a: "Summer"
    }, {
        q: "What season comes after summer?",
        a: "Autumn"
    }, {
        q: "What season comes after autumn?",
        a: "Winter"
    }, {
        q: "What color is the Resistance faction?",
        a: "Blue"
    }, {
        q: "What color is the Enlightened faction?",
        a: "Green"
    }, {
        q: "What does GPS stand for?",
        a: "Global Positioning System"
    }, {
        q: "What is the shape of the Earth?",
        a: "Round"
    }, {
        q: "What is the natural satellite of Earth called?",
        a: "Moon"
    }, {
        q: "What is the largest planet in the solar system?",
        a: "Jupiter"
    }, {
        q: "What is the closest star to Earth?",
        a: "Sun"
    }, {
        q: "What do you call frozen precipitation?",
        a: "Snow"
    }, {
        q: "What do you call liquid precipitation?",
        a: "Rain"
    }, {
        q: "What is the name of the blue faction?",
        m: "Resistance,Enlightened,Neutral,Shapers"
    }, {
        q: "What is the name of the green faction?",
        m: "Enlightened,Resistance,Neutral,Niantic"
    }, {
        q: "What is the energy in Ingress called?",
        m: "XM,AP,MU,HP"
    }, {
        q: "What is the basic portal item called?",
        m: "Resonator,Shield,Key,Mod"
    }, {
        q: "What item links two portals?",
        m: "Link,Field,Shield,Key"
    }, {
        q: "What item creates a field?",
        m: "Control Field,Link,Resonator,XMP"
    }, {
        q: "What device do you use to play Ingress?",
        m: "Scanner,Portal,Beacon,Drone"
    }, {
        q: "What is the maximum portal level?",
        m: "8,16,10,5"
    }, {
        q: "How many resonators can a portal have?",
        m: "8,4,6,10"
    }, {
        q: "What is the color of the Resistance?",
        m: "Blue,Green,Red,Yellow"
    }, {
        q: "What is the color of the Enlightened?",
        m: "Green,Blue,Red,Yellow"
    }, {
        q: "What is a neutral portal called?",
        m: "Neutral,Empty,Gray,Wild"
    }, {
        q: "What item removes enemy resonators?",
        m: "XMP Burster,Shield,Key,Resonator"
    }, {
        q: "What item removes links and fields?",
        m: "Ultra Strike,XMP Burster,Shield,Key"
    }, {
        q: "What item increases link range?",
        m: "Link Amp,Shield,Key,Resonator"
    }, {
        q: "What item increases portal defense?",
        m: "Shield,Link Amp,Key,Resonator"
    }, {
        q: "What do you deploy to increase portal level?",
        m: "Resonator,Shield,Key,Link"
    }, {
        q: "What do you use to recharge portals?",
        m: "Power Cube,Resonator,Shield,Link Amp"
    }, {
        q: "What is the maximum agent level?",
        m: "16,8,10,20"
    }, {
        q: "What does AP stand for?",
        m: "Action Points,Agent Power,Access Points,Action Portals"
    }, {
        q: "What does MU stand for?",
        m: "Mind Units,Map Units,Mission Units,Memory Units"
    }, {
        q: "What is the official Ingress map called?",
        m: "Intel,Scanner,Portal Map,XM Map"
    }, {
        q: "What is a portal key used for?",
        m: "Linking,Hacking,Recharging,Shielding"
    }, {
        q: "What is the Enlightened flip item?",
        m: "ADA Refactor,Jarvis Virus,XMP,Link Amp"
    }, {
        q: "What is the Resistance flip item?",
        m: "Jarvis Virus,ADA Refactor,XMP,Shield"
    }, {
        q: "What is a group of missions called?",
        m: "Banner,Cluster,Series,Pack"
    }, {
        q: "What do you call fields inside fields?",
        m: "Nested Fields,Double Links,Overlays,Stacked Links"
    }, {
        q: "What is the term for destroying a portal?",
        m: "Neutralizing,Capturing,Hacking,Linking"
    }, {
        q: "What is the term for capturing a portal?",
        m: "Capturing,Neutralizing,Linking,Fielding"
    }, {
        q: "What is the term for repeated hacking?",
        m: "Glyph Hacking,Power Hacking,Fast Hacking,Multi Hacking"
    }, {
        q: "What is the maximum resonator level?",
        m: "8,16,10,5"
    }, {
        q: "What is the lowest resonator level?",
        m: "1,0,2,3"
    }, {
        q: "What is the default neutral color?",
        m: "Gray,Blue,Green,Red"
    }, {
        q: "What is the color of Resistance fields?",
        m: "Blue,Green,Yellow,Red"
    }, {
        q: "What is the color of Enlightened fields?",
        m: "Green,Blue,Yellow,Red"
    }, {
        q: "What is a portal farm called?",
        m: "Farm,Cluster,Base,Hub"
    }, {
        q: "What is a dense portal area called?",
        m: "Cluster,Farm,Hub,Base"
    }, {
        q: "What item boosts hack output?",
        m: "Heat Sink,Multi-hack,Shield,Link Amp"
    }, {
        q: "What item boosts hack rarity?",
        m: "Multi-hack,Heat Sink,Shield,Resonator"
    }, {
        q: "What is a long-distance link called?",
        m: "Long Link,Ultra Link,Far Link,Wide Link"
    }, {
        q: "What is a portal with all resonators called?",
        m: "Full Portal,Complete Portal,Max Portal,Prime Portal"
    }, {
        q: "What is an empty portal called?",
        m: "Neutral Portal,Zero Portal,Empty Portal,Blank Portal"
    } ], about = () => {
        let html = '<div class="umm-options-list">';
        html += "In short: Create missions in IITC, export as a json file:<br>", html += '<a href="https://intel.ingress.com/" target="_blank"' + (/^intel\.ingress\.com$/i.test(window.location.host) ? ' style="color: #bbb; pointer-events: none; cursor: default;"' : "") + ">https://intel.ingress.com/</a>", 
        html += "Then open the mission creator and load the json file.<br>", html += "Start creating missions and import the UMM data for every mission:<br>", 
        html += '<a href="https://missions.ingress.com/" target="_blank"' + (/^missions\.ingress\.com$/i.test(window.location.host) ? ' style="color: #bbb; pointer-events: none; cursor: default;"' : "") + ">https://missions.ingress.com/</a>", 
        html += "Documentation for this plugin can be found at:<br>", html += '<a href="https://umm.8bitnoise.rocks/" target="_blank">https://umm.8bitnoise.rocks/</a>', 
        html += "Questions, feature requests and tips:<br>", html += '<a href="https://t.me/joinchat/j9T9eLfa3VJlZWE0" target="_blank">Telegram: [XF] Ultimate Mission Maker</a>', 
        html += "</div>";
        const buttons = [ dialogButton("< Main Menu", showUmmOptions), dialogButton("Changelog", () => dialog({
            title: "Changelog",
            html: miniMarkdown('# v1.0\n\nThis is a complete rewrite of the Ultimate Mission Maker from a developer perspective.\nThe entire codebase has been redesigned while maintaining the familiar user experience of the original UMM.\nBelow are the visible improvements and changes you\'ll notice.\n\n## What\'s Changed:\n\n- UMM is now hidden by default. You need to hit the "UMM" button in the Portal details window to make it appear.\n\n- **Select Mission Dialog** (open it through the toolbar or the main dialog)\n  - Selecting a mission is no longer required; simply open another mission\n  - Navigation buttons (+/-) allow you to cycle through missions\n  - Added split, clear, merge, and reverse commands for mission manipulation\n  - New mission information display: portal count and distances\n\n- **Banner Settins** (start window)\n  - changed Title placeholders to $T $M $N\n  \n- **Option Dialog** (main window)\n  - Banner information now displays as a compact table\n  - Removed warning for mission counts that are not multiples of 6\n  - Added warning when missions lack sufficient waypoints\n\n- **Drag & Drop** in the mission editor path\n  - Move existing markers to adjust waypoints\n  - Add new waypoints by positioning intermediate markers at new locations\n  - Remove waypoints by double-clicking a marker\n  - Merge missions by dragging start and end markers together\n\n- **Mission Numbers**\n  - Potential split points are previewed while creating missions\n\n- **Waypoint edit**\n  - current mission is preselected\n  - passphrases: add random default questions.\n    when question & answer is empty a simple question will be set.\n\n- **Miscellaneous**\n  - Custom confirmation dialogs clarify actions and improve readability\n  - Switch between any missions, even those without portals\n  - Option to split missions when starting on a portal that\'s already assigned to another mission\n  - on mobile dialogs are not at the top instead of centered\n  - flash buttonbar on activation to draw attention\n  \n\n---\n\n# History:\n\n## v1.0.beta.2 - 15.02.26\n\n- fixed update-URL in script header\n\n## v1.0.beta - 15.02.26\n\n- first public release\n- automated build process on GitHub\n- fixed layer checkboxes in Option-Dialog\n- add "clear" mission to selection dialog\n- always color selected mission even when not in Edit-Mode\n- move "no" to left in custom confirm dialog\n- remove doubled "v" in version numbers\n- fix toggeling edit mode on mission detail window "save" button\n- close dialog on mission detail window "save"\n- fix linebreaks in changelog dialog\n- select mission: directly select mission on combo-box change\n- fix question text in portal details\n- on mobile dialogs are not at the top instead of centered\n'),
            width: 500
        })), dialogButtonClose() ];
        window.dialog({
            html,
            title: `${title} v1.0 - About`,
            id: "umm-options",
            width: 350,
            buttons
        });
    }, miniMarkdown = incoming => incoming.replace(/^---/gm, "<hr>").replace(/^##\s(.*)\n*/gm, "<h3>$1</h3>").replace(/^#\s(.*)\n*/gm, "<h2>$1</h2>").replace(/\*\*(.*)\*\*/gm, "<b>$1</b>").replace(/\n/gm, "<br/>").replace(/(<\/h.>)<br>/gm, "$1").replace(/<br>(<h.>)/gm, "$1"), editActiveMission = () => {
        const html = $("<div>", {
            class: "umm-mission-picker-btn"
        }).append("Select a mission number:<br>", Button_button("<", onPreviousMission).css({
            "margin-right": 0
        }), $("<select>", {
            id: "umm-mission-picker",
            class: "umm-mission-picker",
            change: onMissionSelect
        }), Button_button(">", onNextMission), $("<div>").append(Button_button("Edit", onStartEdit), Button_button("Zoom to mission", onZoomToMission).css({
            "margin-left": "1em"
        })), $("<div>", {
            id: "umm-mission-picker-info"
        }), Button_button("Split", onMissionSplit), Button_button("Clear", onMissionClear), Button_button("Reverse", onMissionReverse), $("<br>"), Button_button("Merge with previous", onMergePrevious), Button_button("Merge next into this", onMergePost));
        let position;
        "undefined" != typeof android && android && (position = {
            my: "center top",
            at: "center top"
        }), window.dialog({
            html,
            title: `${title} v1.0`,
            id: "umm-options",
            width: 350,
            position,
            buttons: [ dialogButton("< Main Menu", showUmmOptions), dialogButtonClose() ],
            closeCallback: destroy
        }), main.state.onSelectedMissionChange.do(updateSelection), main.state.onMissionPortal.do(updateMissionInfo), 
        updateMissionList(), updateMissionInfo();
    }, destroy = () => {
        main.state.onSelectedMissionChange.dont(updateSelection);
    }, getSelectedMission = () => {
        const missionNumber = parseInt($("#umm-mission-picker").val());
        return main.state.missions.get(missionNumber);
    }, updateMissionList = () => {
        const select = $("#umm-mission-picker").empty(), state = main.state;
        state.missions.forEach(mission => {
            select.append($("<option>", {
                value: mission.id,
                selected: state.isCurrent(mission.id),
                text: `${mission.id + 1} - waypoints ${mission.portals.length}`
            }));
        });
    }, updateSelection = () => {
        const current = main.state.getCurrent();
        $("#umm-mission-picker").val(current), updateMissionInfo();
    }, updateMissionInfo = () => {
        var _a, _b;
        const info = $("#umm-mission-picker-info");
        info.empty();
        const mission = getSelectedMission();
        if (!mission) return;
        const missionLength = window.formatDistance(mission.getDistance()), distanceToStart = main.state.missions.distanceToStart(mission.id), distanceToNext = main.state.missions.distanceToStart(mission.id + 1), table = `\n    Wapoints:\t${mission.portals.length}\n\n    Length:\t${missionLength}\n\n    to Start:\t${null !== (_a = distanceToStart && window.formatDistance(distanceToStart)) && void 0 !== _a ? _a : "---"}\n\n    to Next:\t${null !== (_b = distanceToNext && window.formatDistance(distanceToNext)) && void 0 !== _b ? _b : "---"}\n`;
        info.html(window.convertTextToTableMagic(table));
    }, refreshMissionUI = () => {
        updateMissionInfo(), updateMissionList();
    }, onPreviousMission = () => {
        const mission = main.state.getCurrent();
        mission > 0 && setCurrentMission(mission - 1);
    }, onNextMission = () => {
        const mission = main.state.getCurrent();
        mission < main.state.getPlannedLength() - 1 && setCurrentMission(mission + 1);
    }, onMissionSelect = () => {
        const mission = getSelectedMission();
        mission && !main.state.isCurrent(mission.id) ? setCurrentMission(mission.id) : notification("Active mission not changed.");
    }, onStartEdit = () => {
        main.missionModeActive || toggleMissionMode(), renderPortalDetails(null), startEdit(), 
        $("#dialog-umm-options").dialog("close");
    }, onZoomToMission = () => {
        const mission = getSelectedMission();
        mission ? mission.show() : notification("Can't zoom in on this mission. No portals.");
    }, onMissionSplit = async () => {
        var _a, _b;
        const missions = main.state.missions, mission = getSelectedMission();
        if (!mission) return;
        let next = missions.next(mission);
        for (;0 === (null == next ? void 0 : next.portals.length); ) next = missions.next(next);
        const endMissionId = null !== (_a = null == next ? void 0 : next.id) && void 0 !== _a ? _a : main.state.getPlannedLength();
        let count = parseInt(null !== (_b = prompt("Split inhow many missions should be divided among?", (endMissionId - mission.id).toString())) && void 0 !== _b ? _b : "0");
        if (count < 2) return;
        count = Math.min(count, main.state.getPlannedLength() - mission.id);
        let mustMerge = !1;
        for (let i = 1; i < count; i++) {
            const current = missions.get(mission.id + i);
            (null == current ? void 0 : current.portals.length) > 0 && (mustMerge = !0);
        }
        mustMerge && !await confirmDialog({
            message: "Merge missione before split?",
            details: "Mission(s) already contain portals. These will be merged into one"
        }) || (missions.splitIntoMultiple(mission, count), main.state.save(), refreshMissionUI());
    }, onMergePrevious = () => {
        const missions = main.state.missions, mission = getSelectedMission();
        if (!mission) return;
        let previous = missions.previous(mission);
        if (!previous) {
            if (0 === mission.id) return;
            previous = missions.get(0);
        }
        main.state.missions.merge(previous, mission), main.state.save(), refreshMissionUI();
    }, onMergePost = () => {
        const missions = main.state.missions, mission = getSelectedMission();
        if (!mission) return;
        let next = missions.next(mission);
        for (;0 === (null == next ? void 0 : next.portals.length); ) next = missions.next(next);
        next && (main.state.missions.merge(mission, next), main.state.save(), refreshMissionUI());
    }, onMissionReverse = () => {
        const mission = getSelectedMission();
        mission && (mission.reverse(), main.state.save(), refreshMissionUI());
    }, onMissionClear = async () => {
        const mission = getSelectedMission();
        mission && await confirmDialog({
            message: "This will remove all portals"
        }) && (mission.clear(), main.state.save(), refreshMissionUI());
    }, lable = lable => $("<td>", {
        text: lable
    }), stat = id => $("<td>").append($("<span>", {
        class: "stat",
        id
    })), showUmmOptions = () => {
        const state = main.state, html = $("<div>", {
            class: "umm-options-list"
        }).append($("<p>", {
            class: "banner_info"
        }).append($("<div>", {
            class: "title",
            id: "umm_opt_bannername"
        }), $("<div>", {
            class: "description",
            id: "umm_opt_bannerdesc"
        }), "<table><tr>", lable("Title format"), stat("umm_opt_bannerformat").append($("<span>", {
            text: "(?)",
            class: "um-helpTooltip",
            title: "Title format allows:\n$N = Mission number\n$M = Planned banner length\n$T = Banner title"
        })), $("<td>").css({
            width: "2em"
        }), lable("Missions"), stat("umm_opt_bannerlength"), "</tr><tr>", lable("Waypoints"), stat("umm_opt_waypoints"), $("<td>"), lable("Length"), stat("umm_opt_bannerdistance"), "</tr></table>", $("<div>", {
            id: "umm_opt_error"
        }), Button_button("Edit", () => editMissionSetDetails(), "editButtom")), $("<p>").append("Layers:", '<label style="user-select: none">Mission Paths</label>', $("<input>", {
            type: "checkbox",
            click: event => tooglePathsLayer(event.target.checked),
            checked: main.renderPath.isVisible()
        }), '<label style="user-select: none">Mission Numbers</label>', $("<input>", {
            type: "checkbox",
            click: event => toggleLayerNumbers(event.target.checked),
            checked: main.renderNumbers.isVisible()
        }), Button_button("Change active mission #", editActiveMission, "w-full"), Button_button("Zoom to view all missions", () => state.missions.zoom(), "w-full")), $("<hr>"), Button_button("Split mission", splitMissionOptions, "w-full"), Button_button("Merge missions", mergeMissions, "w-full"), Button_button("Reverse mission", reverseMission, "w-full"), Button_button("Clear ALL missions data", confirmClear, "w-full"), $("<hr>"), $("<b>", {
            text: "Import/Export"
        }), $("<br>"), Button_button("Export banner data to file", () => (state => {
            const data = state.asString(), filename = state.getBannerName().replace(/[\W_]+/g, " ") + "-mission-data.json";
            if ("function" == typeof window.saveFile) window.saveFile(data, filename, "application/json"); else if ("undefined" != typeof android && (null === android || void 0 === android ? void 0 : android.saveFile)) android.saveFile(filename, "application/json", data); else if (!window.isSmartphone()) {
                const a = document.createElement("a");
                a.href = "data:text/json;charset=utf-8," + encodeURIComponent(data), a.download = filename, 
                a.click();
            }
        })(main.state), "w-full"), $("<div>").css({
            width: 800,
            margin: "auto"
        }).append("<b>Import banner data from file:</b><br>", $("<input>", {
            type: "file",
            change: confirmLoad
        })));
        let position;
        "undefined" != typeof android && android && (position = {
            my: "center top",
            at: "center top"
        }), window.dialog({
            html,
            title: `${title} v1.0`,
            id: "umm-options",
            width: 350,
            position,
            buttons: [ dialogButton("About this plugin", about), dialogButtonClose() ],
            closeCallback: () => Options_destroy()
        }), window.map.on("layeradd", onLayerAdd), window.map.on("layerremove", onLayerRemove), 
        main.state.onMissionChange.do(updateDialog), updateDialog();
    }, Options_destroy = () => {
        window.map.off("layeradd", onLayerAdd), window.map.off("layerremove", onLayerRemove), 
        main.state.onMissionChange.dont(updateDialog);
    }, onLayerAdd = event => {
        main.renderPath.isLayer(event.layer) && $("#umm-layercheckbox-paths").prop("checked", !0), 
        main.renderNumbers.isLayer(event.layer) && $("#umm-layercheckbox-numbers").prop("checked", !0);
    }, onLayerRemove = event => {
        main.renderPath.isLayer(event.layer) && $("#umm-layercheckbox-paths").prop("checked", !1), 
        main.renderNumbers.isLayer(event.layer) && $("#umm-layercheckbox-numbers").prop("checked", !1);
    }, updateDialog = () => {
        var _a, _b, _c;
        const state = main.state;
        $("#umm_opt_bannername").text(null !== (_a = state.getBannerName()) && void 0 !== _a ? _a : "N/A"), 
        $("#umm_opt_bannerdesc").text(null !== (_b = state.getBannerDesc()) && void 0 !== _b ? _b : "N/A"), 
        $("#umm_opt_bannerformat").text(null !== (_c = state.getTitleFormat()) && void 0 !== _c ? _c : "N/A"), 
        $("#umm_opt_bannerlength").text(state.getPlannedLength().toString()), $("#umm_opt_waypoints").text(state.missions.getWaypointCount().toString()), 
        $("#umm_opt_bannerdistance").text(window.formatDistance(state.missions.getTotalDistance())), 
        $("#umm_opt_error").empty().append(validateMissions(state));
    }, validateMissions = state => {
        const invalidMissions = state.missions.validate(), result = [];
        for (const error in invalidMissions) {
            const numbers = invalidMissions[error].map(n => n + 1).join(", ");
            result.push(`<span class="error">${error}:</span></br>Mission: ${numbers}`);
        }
        return result.join("<br>");
    }, confirmClear = async () => {
        await confirmDialog({
            message: "Clear all Mission data?",
            details: "Removes mission settings and waypoints. This action cannot be undone."
        }) && clearMissionData();
    }, confirmLoad = async event => {
        (main.state.isEmpty() || await confirmDialog({
            message: "Overwrite current data?",
            details: "All current missions will be replaced by the imported data."
        })) && (await (async (event, state) => {
            const files = event.target.files;
            return 1 !== (null == files ? void 0 : files.length) ? (alert("No file selected! Please select a mission file in JSON format and try again."), 
            $("#umm-import-file").val(""), !1) : "application/json" != files[0].type ? ($("#umm-import-file").val(""), 
            alert(files[0].name + " has not been recognized as JSON file. Make sure you've loaded the right file."), 
            !1) : loadFile(state, files[0]);
        })(event, main.state), main.state.checkAllPortals(), main.state.missions.zoom());
    }, tooglePathsLayer = show => main.renderPath.toggle(show), toggleLayerNumbers = show => main.renderNumbers.toggle(show), editMissionSetDetails = (toggleMissionModeAfterSave = !1) => {
        var _a;
        const state = main.state;
        let html = '<div class="umm-edit-mission-set-details">';
        html += "<b>Banner details</b>", html += "<p>Please enter the details for your banner. All fields are required.</p><br>", 
        html += `<label for="umm-mission-set-name"><b>Banner name</b> (max. 50 characters)</label>\n      <span class="umm-error" id="umm-mission-set-name-error"><b>Error: </b>Please enter a valid banner name</span>\n      <input id="umm-mission-set-name" name="umm-mission-set-name" type="text" placeholder="Enter name for the banner" maxlength="50" value="${state.getBannerName()}">`, 
        html += `<label for="umm-mission-set-description"><b>Banner description</b> (max. 200 characters)</label>\n      <span class="umm-error" id="umm-mission-set-description-error"><b>Error: </b>Please enter a valid banner description</span>\n      <textarea id="umm-mission-set-description" name="umm-mission-set-description" placeholder="Enter description for the banner" maxlength="200" rows="5">${state.getBannerDesc()}</textarea>`, 
        html += `<label for="umm-banner-length"><b>Planned banner length</b>, min. ${Math.max(state.missions.count(), 1)} mission(s)</label>\n      <span class="umm-error" id="umm-mission-planned-banner-length-error"><b>Error: </b>Please enter a valid banner length</span>\n      <input id="umm-banner-length" name="umm-banner-length" type="number" placeholder="Enter length of banner set" min="1" value="${Math.max(state.getPlannedLength(), 1)}">`, 
        html += `<label for="umm-title-format"><b>Title format</b></label>\n      <span class="umm-error" id="umm-mission-title-format-error"><b>Error: </b>Please enter a valid title-format</span>\n      <table>\n      <tr><td>$T = Mission title</td><td>additional flags:</td></tr>\n      <tr><td>$N = Current Missione number</td><td>$0n = with leading zeros</td></tr>\n      <tr><td>$M = Banner length</td><td>$3n = minimum length</td></tr>\n      </table>\n      <br><br>Examples: "$T $N / $M" or "$0n.$m $t"  or "$T $03N-$03M" </p>\n      <input id="umm-title-format" name="umm-title-format" type="text" placeholder="Enter a title format" value="${null !== (_a = state.getTitleFormat()) && void 0 !== _a ? _a : "$T $N / $M"}" style="margin-bottom: 5px;">\n      <b>Preview: </b><span id="umm-mission-title-preview"></span>`, 
        html += "</div>", window.dialog({
            html,
            title: "Edit banner details - UMM v1.0",
            id: "umm-options",
            width: 400,
            buttons: [ dialogButton("< Main Menu", showUmmOptions), dialogButton("Save", () => successfulSave(toggleMissionModeAfterSave)), dialogButtonClose() ]
        }), updateMissionTitlePreview(), $("#umm-mission-set-name, #umm-mission-set-description, #umm-banner-length, #umm-title-format").on("input", updateMissionTitlePreview);
    }, getFormValues = () => ({
        name: $("#umm-mission-set-name").val(),
        description: $("#umm-mission-set-description").val(),
        length: $("#umm-banner-length").val(),
        format: $("#umm-title-format").val()
    }), successfulSave = toggleMissionModeAfterSave => {
        const values = getFormValues();
        saveMissionSetDetails(values.name, values.description, values.length, values.format) && (bannerNotification(main.state, "Mission details saved"), 
        toggleMissionModeAfterSave && toggleMissionMode(), $("#dialog-umm-options").dialog("close"));
    }, updateMissionTitlePreview = () => {
        const values = getFormValues(), plannedLength = parseInt(values.length);
        if (values.name.length > 0 && values.format.length > 0 && !isNaN(plannedLength)) {
            const missionTitle = Missions.generateMissionTitle(values.format, {
                misison: 1,
                title: values.name,
                total: plannedLength
            });
            $("#umm-mission-title-preview").text(missionTitle);
        } else $("#umm-mission-title-preview").text("Fill in all required fields");
    }, setFieldError = (elementId, hasError) => {
        $(elementId).css("display", hasError ? "block" : "none");
    }, saveMissionSetDetails = (missionSetName, missionSetDescription, plannedBannerLength, titleFormat) => {
        let isValid = !0;
        const hasName = missionSetName && missionSetName.length > 0;
        hasName && main.state.setBannerName(missionSetName), setFieldError("#umm-mission-set-name-error", !hasName), 
        isValid = isValid && !!hasName;
        const hasDescription = missionSetDescription && missionSetDescription.length > 0;
        hasDescription && main.state.setBannerDesc(missionSetDescription), setFieldError("#umm-mission-set-description-error", !hasDescription), 
        isValid = isValid && !!hasDescription;
        const plannedLength = parseInt(null != plannedBannerLength ? plannedBannerLength : ""), hasValidLength = plannedLength && !isNaN(plannedLength);
        hasValidLength && main.state.setPlannedLength(plannedLength), setFieldError("#umm-mission-planned-banner-length-error", !hasValidLength), 
        isValid = isValid && !!hasValidLength;
        const hasFormat = titleFormat && titleFormat.length > 0;
        return hasFormat && main.state.setTitleFormat(titleFormat), setFieldError("#umm-mission-title-format-error", !hasFormat), 
        isValid = isValid && !!hasFormat, isValid && main.state.save(), isValid;
    };
    let lastPortal;
    const clearMissionData = () => {
        main.state.reset(), main.state.save(), main.missionModeActive && toggleMissionMode();
    }, removeLastPortal = () => {
        var _a;
        if (!main.missionModeActive) return void notification("Only valid in edit mode");
        const mission = main.state.getEditMission();
        mission && mission.portals.length > 0 ? (lastPortal = void 0, mission.portals.remove(mission.portals.length - 1), 
        main.state.save(), mission.focusLastPortal() || (renderPortalDetails(null), notification(`${main.state.getBannerName()}\nNo portals left in mission.\nSelect start portal`))) : mission && mission.id > 0 ? (setCurrentMission(mission.id - 1), 
        main.state.save(), null === (_a = main.state.getEditMission()) || void 0 === _a || _a.focusLastPortal(), 
        notification(`${main.state.getBannerName()}\nLast mission removed\nSwitched to previous mission ${mission.id + 2}\n`)) : notification(`${main.state.getBannerName()}\nCan't undo\nAlready on last mission\n`);
    }, toggleMissionMode = () => {
        if (main.missionModeActive) main.missionModeActive = !1, $("#umm-toggle-bookmarks").css("background-color", ""); else {
            if (!main.state.isValid()) return editMissionSetDetails(!0), void notification("Mission mode inactive\nPlease enter mission data\nAnd try again.");
            main.missionModeActive = !0, startEdit(), $("#umm-toggle-bookmarks").css("background-color", "crimson");
        }
        main.renderPath.redraw();
    }, startEdit = () => {
        const editMission = main.state.getEditMission(), missionNumber = main.state.getCurrent() + 1;
        (null == editMission ? void 0 : editMission.hasPortals()) ? (editMission.show(), 
        lastPortal = editMission.portals.get(-1).guid, window.renderPortalDetails(lastPortal), 
        bannerNotification(main.state, `Mission mode active.\nResuming mission #${missionNumber}\nSelect next portal`)) : (lastPortal = void 0, 
        bannerNotification(main.state, `Mission mode active.\nSelect start portal for mission #${missionNumber}`));
    }, splitMissionOptions = () => {
        const buttons = [ dialogButton("< Main Menu", showUmmOptions), dialogButton("Remainder at end", () => splitMissionStart(!0)), dialogButton("Balanced", () => splitMissionStart(!1)) ];
        window.dialog({
            html: "<b>How do you want to split your mission?</b><br><br>\n      <b>Remainder at the end:</b> All missions will contain the same amount of portals, any portals left over after splitting are added to the last mission.<br><br>\n      <b>Balanced:</b> Split the banner into missions of the same length, if any portals are left over after splitting, earlier missions will get 1 portal extra to balance it out.\n      ",
            title: `${title} - Split mission options`,
            id: "umm-options",
            width: 350,
            buttons
        });
    }, splitMissionStart = remainderAtEnd => {
        var _a, _b;
        const portalsCount = null !== (_b = null === (_a = main.state.missions.get(0)) || void 0 === _a ? void 0 : _a.portals.length) && void 0 !== _b ? _b : 0, preset = Math.min(main.state.getPlannedLength(), portalsCount), numMissionString = prompt(`In how many missions do you want to split your banner (1-${portalsCount})?\r\rRecommended number is a multiple of 6.`, preset.toString());
        if (null === numMissionString) return;
        const numMissions = parseInt(numMissionString);
        numMissions > portalsCount ? alert(`Can't split into more missions than there are portals in your current path. Please try again with a number between 1 and ${portalsCount}`) : numMissions < 1 || !Number.isInteger(numMissions) ? alert(`Invalid input. Please try again with a number between 1 and ${portalsCount}`) : splitMission(numMissions, remainderAtEnd);
    }, splitMission = async (numMissions, remainderAtEnd) => {
        var _a;
        const mission = main.state.missions.get(0);
        if (!mission) return;
        let hasPortals = !1;
        for (let i = 0; i < numMissions; i++) hasPortals || (hasPortals = !0 === (null === (_a = main.state.missions.get(i)) || void 0 === _a ? void 0 : _a.hasPortals()));
        if (hasPortals && !await confirmDialog({
            message: "Merge missione before split?",
            details: "Mission(s) already contain portals. These will be merged into one"
        })) return;
        const numPortals = null == mission ? void 0 : mission.portals.length, numRestPortals = numPortals % numMissions, message = `Your path of ${numPortals} will be divided into ${numMissions} missions of ${Math.floor(numPortals / numMissions)} portals each.`;
        let details = "";
        numRestPortals > 0 && (details += remainderAtEnd ? ` The remaining ${numRestPortals} portal(s) will be added to the last mission.` : ` The remaining ${numRestPortals} portal(s) will be equaly divided between the first missions.`), 
        details += "\r\n\r\nThis process can be reversed using the merge missions feature. Do you want to continue?", 
        await confirmDialog({
            message,
            details
        }) && (main.state.missions.splitIntoMultiple(mission, numMissions, remainderAtEnd), 
        main.state.save());
    }, mergeMissions = async () => {
        await confirmDialog({
            message: "Merge mission?",
            details: "Are you sure you want to merge all your missions into 1?\r\n\r\nThis can't be undone."
        }) && (main.state.missions.mergeAll(), main.state.setCurrent(0));
    }, reverseMission = () => {
        const state = main.state, missionToReverse = prompt(`Which mission do you want to reverse (1-${state.getPlannedLength()})?`, (state.getCurrent() + 1).toString());
        if (null === missionToReverse) return;
        const mission = state.missions.get(parseInt(missionToReverse));
        mission ? (mission.reverse(), state.save()) : alert(`This mission doesn't exist, enter a value between 1-${state.getPlannedLength()}.`);
    }, setCurrentMission = missionId => {
        main.state.setCurrent(missionId), main.state.save();
    }, toolBarButton = (id, image, tooltip, click) => $("<a>", {
        id,
        class: "umm-control",
        title: window.isSmartphone() ? "" : tooltip
    }).on("click dblclick", event => {
        event.stopPropagation(), click && click();
    }).append($("<img>", {
        src: image
    }).css({
        width: 16,
        height: 16,
        "margin-top": "7px"
    })), onMissionNumberChanged = () => {
        const state = main.state;
        $("#umm-edit-active-mission").text(state.getCurrent() + 1), $("#umm-edit-active-mission").css("background-color", "white"), 
        $("#umm-next-mission img").css("opacity", "100%"), $("#umm-previous-mission img").css("opacity", "100%");
        const current = state.getCurrent();
        current >= state.getPlannedLength() - 1 && ($("#umm-next-mission").children("img").css("opacity", "30%"), 
        $("#umm-edit-active-mission").css("background-color", "orange")), 0 === current && $("#umm-previous-mission").children("img").css("opacity", "30%"), 
        onMissionPortalsChanged();
    }, onMissionPortalsChanged = () => {
        var _a, _b;
        const count = null !== (_b = null === (_a = main.state.getEditMission()) || void 0 === _a ? void 0 : _a.portals.length) && void 0 !== _b ? _b : 0;
        count < 1e3 ? $("#umm-number-of-portals").text(`P${count}`) : $("#umm-number-of-portals").text(`${count}`);
    }, nextMission = () => {
        const state = main.state;
        if (state.getCurrent() >= state.getPlannedLength() - 1) return;
        setCurrentMission(state.getCurrent() + 1);
        const mission = state.getEditMission();
        mission.hasPortals() ? showMission(mission) : main.missionModeActive && bannerNotification(state, `Start of mission #${state.getCurrent() + 1}\nSelect start portal.`);
    }, previousMission = () => {
        const state = main.state;
        if (state.getCurrent() <= 0) return;
        setCurrentMission(state.getCurrent() - 1);
        const mission = state.getEditMission();
        showMission(mission);
    }, showMission = mission => {
        mission.hasPortals() && (mission.show(), onMissionPortalsChanged(), main.missionModeActive ? bannerNotification(main.state, `Mission mode active.\nCurrent mission #${main.state.getCurrent() + 1}\nSelect next portal`) : bannerNotification(main.state, `Current active mission set to #${main.state.getCurrent() + 1}`));
    }, sample = data => data[Math.floor(Math.random() * data.length)], missionNumberQuestion = missionId => ({
        question: sample(MissionNumberQuestions),
        answer: (missionId + 1).toString()
    }), standardQuestion = () => {
        const quest = sample(NoobQuestions);
        if (quest.m) {
            const rawChoices = quest.m.split(",");
            if (0 === rawChoices.length) return {
                question: quest.q,
                answer: ""
            };
            const answer = rawChoices.splice(0, 1), shuffled = (data => {
                const a = [ ...data ];
                for (let i = a.length - 1; i > 0; i--) {
                    const j = Math.floor(Math.random() * (i + 1));
                    [a[i], a[j]] = [ a[j], a[i] ];
                }
                return a;
            })(rawChoices), correctIndex = Math.floor(4 * Math.random());
            shuffled.splice(correctIndex, 0, ...answer).slice(0, 4);
            const lines = shuffled.map((c, i) => `${String.fromCodePoint(65 + i)}) ${c}`).join(" "), correctLetter = correctIndex >= 0 ? String.fromCodePoint(65 + correctIndex) : "";
            return {
                question: `${quest.q}\n${lines}`,
                answer: correctLetter
            };
        }
        return {
            question: quest.q,
            answer: quest.a
        };
    }, ActionLabels = new Map([ [ "HACK_PORTAL", "Hack portal" ], [ "INSTALL_MOD", "Install mod" ], [ "CAPTURE_PORTAL", "Capture portal" ], [ "CREATE_LINK", "Create link" ], [ "CREATE_FIELD", "Create field" ], [ "PASSPHRASE", "Enter passphrase" ] ]), addWaypointEditorToPortal = () => {
        var _a;
        const missions = main.state.missions.getMissionsOfPortal(null !== (_a = window.selectedPortal) && void 0 !== _a ? _a : "");
        if (0 === missions.length) return;
        appendEditor(missions);
        const current = main.state.getCurrent(), preSelect = missions.includes(current) ? current : missions[0];
        $("#umm-mission-select").val(preSelect), onMisisonSelect();
    }, appendEditor = missions => {
        const misisonSelect = $("<select>", {
            id: "umm-mission-select"
        }), actionSelect = $("<select>", {
            id: "umm-action-select"
        }), container = $("<div>", {
            id: "umm-waypoint-editor"
        }).append($("<span>", {
            text: "UMM Waypoint Editor",
            class: "umm-waypoint-editor-title"
        }), $("<div>", {
            class: "umm-waypoint-select-container"
        }).append(misisonSelect, actionSelect), $("<div>", {
            id: "umm-passphrase-container"
        }).css("display", "flex").append($("<span>", {
            text: "Question"
        }), $("<textarea>", {
            id: "umm-passphrase-question",
            type: "text",
            row: 1
        }).css({
            "overflow-y": "hidden"
        }).on("blur", () => savePassPhrase()).on("focus", event => onFocus(event)), $("<span>", {
            text: "Passphrase"
        }), $("<input>", {
            type: "text",
            id: "umm-passphrase-passphrase"
        }).on("blur", () => savePassPhrase()).on("focus", event => onFocus(event))));
        addMissionOptions(misisonSelect, missions), addActionOptions(actionSelect), misisonSelect.on("change", onMisisonSelect), 
        actionSelect.on("change", onActionSelect), $("#portaldetails #randdetails").before(container);
    }, addMissionOptions = (missionSelect, validMissionIds) => {
        const missionOption = $("<option>", {
            value: "#",
            text: "Select mission"
        });
        missionSelect.append(missionOption), validMissionIds.forEach(id => {
            const missionOption = $("<option>", {
                value: id,
                text: id + 1
            });
            missionSelect.append(missionOption);
        });
    }, addActionOptions = actionSelect => {
        ActionLabels.forEach((label, action) => {
            const option = $("<option>", {
                value: action,
                text: label
            });
            actionSelect.append(option);
        });
    }, onMisisonSelect = () => {
        const portal = currentPortal();
        if (portal) {
            const action = portal.objective.type, {question, answer} = (portal => {
                var _a, _b;
                return {
                    question: null !== (_a = portal.objective.passphrase_params.question) && void 0 !== _a ? _a : "",
                    answer: null !== (_b = portal.objective.passphrase_params._single_passphrase) && void 0 !== _b ? _b : ""
                };
            })(portal);
            $("#umm-action-select").val(action), $("#umm-passphrase-question").val(question), 
            $("#umm-passphrase-passphrase").val(answer), $("#umm-passphrase-container").toggle("PASSPHRASE" === action), 
            onActionSelect();
        } else $("#umm-action-select").prop("disabled", !0), $("#umm-passphrase-container").hide();
    }, onActionSelect = () => {
        const action = $("#umm-action-select").val(), portal = currentPortal();
        portal && ($("#umm-passphrase-container").toggle("PASSPHRASE" === action), "PASSPHRASE" === action && pregenerateQuestion(portal), 
        portal.objective.type = action, main.state.save());
    }, onFocus = event => {
        const element = $(event.target);
        element.attr("selectAll") && (element.attr("selectAll", null), element.trigger("select"));
    }, pregenerateQuestion = portal => {
        if (!(portal => "" === portal.objective.passphrase_params.question && "" === portal.objective.passphrase_params._single_passphrase)(portal)) return;
        const missionId = parseInt($("#umm-mission-select").val()), mission = main.state.missions.get(missionId);
        if (!mission) return;
        const {question, answer} = ((missionId, isStart) => isStart ? missionNumberQuestion(missionId) : standardQuestion())(missionId, mission.portals.isStart(portal));
        $("#umm-passphrase-question").val(question).attr("selectAll", "true"), $("#umm-passphrase-passphrase").val(answer).attr("selectAll", "true"), 
        setPassphrase(portal, question, answer);
    }, currentPortal = () => {
        var _a;
        const missionId = parseInt($("#umm-mission-select").val()), portals = null === (_a = main.state.missions.get(missionId)) || void 0 === _a ? void 0 : _a.portals;
        return null == portals ? void 0 : portals.find(window.selectedPortal);
    }, savePassPhrase = () => {
        const portal = currentPortal();
        portal && (setPassphrase(portal, $("#umm-passphrase-question").val(), $("#umm-passphrase-passphrase").val()), 
        main.state.save());
    };
    const main = new class UMM_Ext {
        constructor() {
            const index = window.bootPlugins.findIndex(x => "IITC Plugin: Ultimate Mission Maker" === x.info.script.name);
            -1 !== index && window.bootPlugins.splice(index, 1);
        }
        init() {
            __webpack_require__(768), this.state = new State, (() => {
                const UMMToolbar = L.Control.extend({
                    options: {
                        position: "topleft"
                    },
                    onAdd: () => $("<div>", {
                        class: "leaflet-umm leaflet-bar"
                    }).append(toolBarButton("umm-toggle-bookmarks", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAATLSURBVGhD7ZoHqH5jHMdfe++9CcnKLnsWsjLKLiHZo5AthQjJlvwzSkqyIjObEJGysorsvSPz8znv+9NzT+c97xnvvZy63/p0z/Pc5z7n+Z5znvV7bm9a/0M9Du/AITCrGWPS/HAWfAXPwV4wM4xLC8JF8C3Y9t7fCe9DW0Nh4BtI6xYf2OEwJzTVHHAifA1R7zXwb+KN5LqJoSIDD8OWcBC8NsiTz+EMWBiqyrd5IHwAUc8ng58TjFhwP6hrqMjAI7AZpJoJdoanIMr9BJfBClCmHeBliL97CbaGIwfpCUZCZYZmg9AwA5vDKG0Cd8Kf4N/9DrfAupBqPXgIov53wbb5UFSpkdAwQ4dC3sCjUMVAXqvBDPgVoq4HYQ/QWBj9Eo6H2SFVJSOhIkOBBraAtloKLoTvIa3/FzgfHKGKVMtIKAy9AtGJxy0/15PhdbgeloEyjTRio2Wy5BNevH/ZSiONvAB23MnQyuAk5j2PMAMtArfCdbC0GRU10shtcFX/ciw6APbsX2Zv4nl4C3Y1A20E0Q4nO+XEt2z/cqga9ZE6mgdm6V/2TgPrd+Qp+1w14zJm3izV650H/t2NWapYlY3sCHfBqCcTWg4eA4fNn8GRyGHzbdgF6mh7+AGcNOcyo0CVjVwK/s6FZRU9DVFf4NqqqRaC5fuXhapsZAFwBr44S5XLdVPUleIENw7Zb51TUjXuI864J4CjTCrHe/vFHxD1BbdDW7k0+g6sb2MzBmpsxInKss9kqf4NngTzrgCHz6hP7CtbwTi0N3j/lbJUX42NbAg3wFFZqr+vcP31BXgjV8mngEbvhW1hMtXYSJHSFfFUaMXBTzVWI1MpJ1bb6nyjOmvkaLCtTguqs0YcLW+GtbNUh43k1Wkja0Cs2Tpr5BiwrftnqQ4buRxs68FZqsNGjLIYXXQxqaY7+38pO7m7zIhpqc4ZMZ71IdjONGjRCSNzg9tfY14GJFxJvwhT9kacfdsuJN1iexxhu/4CRys7ej7oXduIDVsfVoeYjHzdbrIMQhtYU6eDdRloWMIM5NK+TgzL4EN6ZBDsA3nVMmJ89k2Ick+Aw58mIm8DUPvCe+AnMJ8Z6A6wzANZarSMIUe9KW7a8qplxIZHmeBKMCjgXt7PoEyHgU/4VYhP7hJwD57uHo28+3C2g/z95GzIq7IRb2zIP8oEHto0lXV60GM995uBfHux33ePbywrvZ8HOotBXrXeyMcQZQLPLNrI+JdzQoR67HengvsMQ6qmPY9xyX4uRH/Lq5YRK3TkiHKeZWwKVWXZUVH1pppgJF7p3ZA/MQptA9eCT2wtMypoJzAYbt2/wU2wJoxLu0EMQvbZLOphWNIMn3yZoSpKDchnECdS1n8ftAkRGdeKEJQYIloHMjnOO5K0MZQ38BEcC4aMloQLII4TxLJ1zt5XAQeC+MwdAAzHFh7UNjGUN+DgcBwUnaU7cZ4E6QAy6ux9Ubga/Dwt/yN4hhlR+1JVMTTMwLDIeSpXBW6OInIpDslnQixDDMF6Fm/D/b3TgIaGjWClKjJ0D6QGPgWPDqoYyMvPyk77LER93stoZvwzgPc0kL4qtFbeUFsDRfIfDHxI0QfE0GsatB6bNHQOVP2EmsgNlAdEu2epaXVSvd4/r54FA9f01AsAAAAASUVORK5CYII=", "UMM: Toggle Mission Mode", toggleMissionMode), toolBarButton("umm-next-mission", "data:image/png;base64,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", "UMM: Next Mission", nextMission), toolBarButton("umm-edit-active-mission", void 0, "UMM: Select mission number", editActiveMission), toolBarButton("umm-previous-mission", "data:image/png;base64,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", "UMM: Previous Mission", previousMission), toolBarButton("umm-number-of-portals", void 0, "UMM: Number of portals in current mission"), toolBarButton("umm-undo", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAOiSURBVHhe7Zo9SFtRFMeTvHwbjSHRIA52aJBICw1oSSCglQ66CIWOLoUOLh0cOnRLJwcHu3Xp0EJLV3HxIwSe1iGKGKFCAnaok9RUjUbQ6NP0HjiC1PeZvCTvxvsDufcc0eT837nnnnsTE4PBYDAYjHuLGceaEI/HnxQKhemrq6shQRCs6L4Dx3GF7u7uSCqV+o2uumHBUXf6+/vj+Xz+R6lUei4XPGA2m60OhwOt+lKTDIDgi8Xi/PX1tQddklit1tNgMDjK8/wquuqK7gLQFDygqwC0BQ/oJgCNwQO6CEBr8EDVAtAcPFCVALQHD1QsQDMED1QkQLMED2gWoJmCBzQJoCX4WkHaZpPdbi+Qcdtms/EdHR3fFhcXc/hrzagWwAjBi2GxWECQWZ/P93ZlZeUXulWjSoCBpwPRk+OTpNGCvw05UZ57vd43a2trn9ClCg5HWQL+wPfLy8uHaBqScrlsPTs7GyNL4vjg4CCNbkVUHYdh3dECydKZaDT6Gk1FVAkA6wsqOpqG5/DwcGZ4eFhVxqoSgGxj6c5g5ygtIpDl4CHLYBpNWTTl9uDQYHz/z/68IAiqiiEsHajSekJSHAJESxp43d7e3vDc3JzsFql5cWsRgbyJ09bW1tGNjQ3dGqFEIuFJpVIjR0dHU6VSSTbNyWu/39zcTKApSkXVrdEiAOFw2EP+d+bi4kJSBIfTwW//3H6GpigV5ecyv7yqtiZA7wANFDRS6NKFbDZ72tbW9g5NccqmRziTpOIFagQRIpHIAk5FIRkawKkkVW/wjV4OoVBItiLu7OzIxlh1iTZCJlSDLnsUzSLotknTKoJuAgA0iqCrAABtIuguAFCJCOTw8gBddaUmAgAgQldXV8zldi3Y7fZzjuPg0kL0x2azCW63G/+yvlTdBzSSiYkJOBcU0bwDiJvL5WrbBzSSTCYzglNRyBL8i1NJqBVgfHw8QGrHFJqiwM0xTiVRdSdoJCDtSWqP7e7uKt5TulyuL3t7ezyaohiuBsRisZfkyX6Eg8zNxcf/oxrgQqSnpye0tLQke1VuOAH6+vry5MkqnuKUaGlpmd3a2nqBpiSGqwF6BA+nTqfTOYmmLFTvAmLAPSR8QJJOp1V95a6pBIDgSYGcXF9f/4wuRZpGAEj79vb2V9ls9gO6VGE4AUhbrNi83AaqPRQ8n8/3WMuTv4G6bRDaW+jwoMkhYi37/f6vyWRS86fCDAaDwWAwGAwG4z5jMv0D9jMAtZVsLdkAAAAASUVORK5CYII=", "UMM: Remove Last", removeLastPortal), toolBarButton("umm-opt", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAB3RJTUUH5QgWEyMyp0FY2wAAAAlwSFlzAAALEwAACxMBAJqcGAAAAARnQU1BAACxjwv8YQUAAAKoSURBVHja7Zo/SFxBEMb3GQvFIpoY6yjcgdgmRVKYwlJBSaugYKmNNsYEDAmIYmMEa4OgpYWo2AkKVlqr3IFa+zcWEpvk+Y1vrzm5Y+e4ZVZvfjDsO7hl5/vuvd3ZfWeMoiiKoiiKolQkEefLqVQqymQycTqdfoGPs4hexCthDVeIZcQIcvuH3KJsNht7MSCOY4MBXuNyEdEpLDyfDUQ/TLiMIndZ3DuAfvnVAMXnWEd04w7479qhijnAbMDiiS6bozNcA/qkFZY7R64B9dLqHGjwacCJtDoHjn0aMIm4k1ZYhL82Rz8GYIlZQDMjrbIIM8jxN6cDuw4gUAuMoPmCaJJWbDlDTEH8rwdRHusAugtyJjSieW/CqAT3kNeFzcugDnDuXM0djQYg7ICbwuIf5aUoPFhzAEHzAJGbC0Ih9whwnn+2AfniMWgdmhph7XfI57ZUE9iTIInHQK24HEe0I14KG3CDfHZMsgwecifDUs4DOnC5EoDwR0YgPsOELZ91QJtJ9txvpdUW4BTRiUfgwLUDdy8wH7B4Y3Ob53TgGvBRWmG5c+Qa8OzgGrArnXC5c+QaMGySiSZUTmyOfgzAEkOz66BJlpzQ+EO5US3A6cQqhKjIoHUW7QeTnAd8MvL1AP0Y2yYphI68FkLPsRSu+M2QUumUNAcQoT4ChPftsB3wDZp3JoxD0X3kdZ5vhAulHouPohkzYR2LT8OEhxej3rbD9jzgBy4npBUX4CdM+O7zPICqQNpuSq/9haBXY0OYA5zfDnH3Al8DFk/UIr5xOnANaJZW6ECLTwOupdU5cOXTgCVpdeXOkWsAvRVel1ZYhDXEqDcDsMTQv6/6AzWBxA/YHP0YQH9CxAD0jHUj5hCX0qptDpRLD+VGOUonpCiKoiiKoihPgHtXV96aolVzHAAAAABJRU5ErkJggg==", "UMM: Opt", showUmmOptions))[0]
                });
                window.map.addControl(new UMMToolbar), main.state.onSelectedMissionChange.do(onMissionNumberChanged), 
                main.state.onMissionPortal.do(onMissionPortalsChanged), onMissionNumberChanged(), 
                onMissionPortalsChanged();
            })(), $("#toolbox").append($("<a>", {
                text: "UMM",
                title: "Ultimate Mission Maker",
                click: () => this.toggleUMMBar()
            })), $(".leaflet-umm.leaflet-bar").hide(), this.renderPath = new RenderPath, this.renderNumbers = new RenderNumbers, 
            window.addHook("portalSelected", event => (async data => {
                if (lastPortal === data.selectedPortalGuid) return;
                if (lastPortal = data.selectedPortalGuid, !data.selectedPortalGuid) return;
                const state = main.state;
                if (!main.missionModeActive) return;
                const mission = state.getEditMission();
                if (!mission) return;
                const portalToAdd = mission.portals.create(data.selectedPortalGuid);
                if (mission.portals.includes(portalToAdd.guid)) mission.portals.isEnd(portalToAdd) && bannerNotification(state, `Portal already in mission #${main.state.getCurrent() + 1}`); else {
                    const preMission = state.missions.previous(mission);
                    if (0 === mission.portals.length && preMission && preMission.portals.includes(portalToAdd.guid) && !preMission.portals.isStart(portalToAdd) && !preMission.portals.isEnd(portalToAdd) && await confirmDialog({
                        message: "Split mission?",
                        details: "Your start portal overlaps another mission's portal. Reuse it or split the previous mission?"
                    })) {
                        const index = preMission.portals.indexOf(portalToAdd);
                        return mission.portals.clear(), state.missions.split(preMission, index, mission), 
                        void state.save();
                    }
                    mission.portals.add(portalToAdd), state.save(), notification(`${main.state.getBannerName()}\nAdded to mission #${main.state.getCurrent() + 1}`);
                }
            })(event)), window.addHook("portalDetailsUpdated", addWaypointEditorToPortal), window.addHook("mapDataRefreshEnd", () => this.state.checkAllPortals()), 
            window.addHook("portalDetailsUpdated", event => this.state.checkPortal(event)), 
            this.missionModeActive = !1, this.renderPath.redraw(), this.renderNumbers.redraw();
        }
        toggleUMMBar() {
            if ($(".leaflet-umm.leaflet-bar").toggle(), $(".leaflet-umm.leaflet-bar").is(":visible")) {
                $(".leaflet-umm").fadeIn().fadeOut().fadeIn().fadeOut().fadeIn().fadeOut().fadeIn(), 
                this.state.isEmpty() ? editMissionSetDetails() : this.state.missions.zoom();
                [ this.renderPath, this.renderNumbers ].forEach(l => l.toggle(!0));
            } else {
                [ this.renderPath, this.renderNumbers ].forEach(l => l.toggle(!1));
            }
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

/**
 * # v1.0
 * 
 * This is a complete rewrite of the Ultimate Mission Maker from a developer perspective.
 * The entire codebase has been redesigned while maintaining the familiar user experience of the original UMM.
 * Below are the visible improvements and changes you'll notice.
 * 
 * ## What's Changed:
 * 
 * - UMM is now hidden by default. You need to hit the "UMM" button in the Portal details window to make it appear.
 * 
 * - **Select Mission Dialog** (open it through the toolbar or the main dialog)
 *   - Selecting a mission is no longer required; simply open another mission
 *   - Navigation buttons (+/-) allow you to cycle through missions
 *   - Added split, clear, merge, and reverse commands for mission manipulation
 *   - New mission information display: portal count and distances
 * 
 * - **Banner Settins** (start window)
 *   - changed Title placeholders to $T $M $N
 *   
 * - **Option Dialog** (main window)
 *   - Banner information now displays as a compact table
 *   - Removed warning for mission counts that are not multiples of 6
 *   - Added warning when missions lack sufficient waypoints
 * 
 * - **Drag & Drop** in the mission editor path
 *   - Move existing markers to adjust waypoints
 *   - Add new waypoints by positioning intermediate markers at new locations
 *   - Remove waypoints by double-clicking a marker
 *   - Merge missions by dragging start and end markers together
 * 
 * - **Mission Numbers**
 *   - Potential split points are previewed while creating missions
 * 
 * - **Waypoint edit**
 *   - current mission is preselected
 *   - passphrases: add random default questions.
 *     when question & answer is empty a simple question will be set.
 * 
 * - **Miscellaneous**
 *   - Custom confirmation dialogs clarify actions and improve readability
 *   - Switch between any missions, even those without portals
 *   - Option to split missions when starting on a portal that's already assigned to another mission
 *   - on mobile dialogs are not at the top instead of centered
 *   - flash buttonbar on activation to draw attention
 *   
 * 
 * ---
 * 
 * # History:
 * 
 * ## v1.0.beta.2 - 15.02.26
 * 
 * - fixed update-URL in script header
 * 
 * ## v1.0.beta - 15.02.26
 * 
 * - first public release
 * - automated build process on GitHub
 * - fixed layer checkboxes in Option-Dialog
 * - add "clear" mission to selection dialog
 * - always color selected mission even when not in Edit-Mode
 * - move "no" to left in custom confirm dialog
 * - remove doubled "v" in version numbers
 * - fix toggeling edit mode on mission detail window "save" button
 * - close dialog on mission detail window "save"
 * - fix linebreaks in changelog dialog
 * - select mission: directly select mission on combo-box change
 * - fix question text in portal details
 * - on mobile dialogs are not at the top instead of centered
 * 
 */
function wrapper_editor(SCRIPT_INFO) {
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
        404(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
            __webpack_require__.r(__webpack_exports__), __webpack_require__.d(__webpack_exports__, {
                default: () => __WEBPACK_DEFAULT_EXPORT__
            });
            var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(72), _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = __webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__), _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(825), _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = __webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__), _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(659), _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = __webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__), _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(56), _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = __webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__), _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(540), _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = __webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__), _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(113), _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = __webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__), _node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_1_use_1_node_modules_postcss_loader_dist_cjs_js_ruleSet_1_rules_1_use_2_styles_pcss__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(879), options = {};
            options.styleTagTransform = _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default(), 
            options.setAttributes = _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default(), 
            options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head"), 
            options.domAPI = _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default(), 
            options.insertStyleElement = _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default();
            _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_1_use_1_node_modules_postcss_loader_dist_cjs_js_ruleSet_1_rules_1_use_2_styles_pcss__WEBPACK_IMPORTED_MODULE_6__.A, options);
            const __WEBPACK_DEFAULT_EXPORT__ = _node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_1_use_1_node_modules_postcss_loader_dist_cjs_js_ruleSet_1_rules_1_use_2_styles_pcss__WEBPACK_IMPORTED_MODULE_6__.A && _node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_1_use_1_node_modules_postcss_loader_dist_cjs_js_ruleSet_1_rules_1_use_2_styles_pcss__WEBPACK_IMPORTED_MODULE_6__.A.locals ? _node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_1_use_1_node_modules_postcss_loader_dist_cjs_js_ruleSet_1_rules_1_use_2_styles_pcss__WEBPACK_IMPORTED_MODULE_6__.A.locals : void 0;
        },
        417(module) {
            module.exports = function(url, options) {
                return options || (options = {}), url ? (url = String(url.__esModule ? url.default : url), 
                /^['"].*['"]$/.test(url) && (url = url.slice(1, -1)), options.hash && (url += options.hash), 
                /["'() \t\n]|(%20)/.test(url) || options.needQuotes ? '"'.concat(url.replace(/"/g, '\\"').replace(/\n/g, "\\n"), '"') : url) : url;
            };
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
        },
        879(module, __webpack_exports__, __webpack_require__) {
            __webpack_require__.d(__webpack_exports__, {
                A: () => __WEBPACK_DEFAULT_EXPORT__
            });
            var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(601), _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = __webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__), _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(314), _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = __webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__), _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(417), _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default = __webpack_require__.n(_node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__), ___CSS_LOADER_URL_IMPORT_0___ = new URL(__webpack_require__(977), __webpack_require__.b), ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()), ___CSS_LOADER_URL_REPLACEMENT_0___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_0___);
            ___CSS_LOADER_EXPORT___.push([ module.id, `#umm-badge{background-color:crimson;margin:15px 0 0 10px;padding:0 5px}#umm-badge,#umm-mission-editor-bar{color:#fff;float:left;height:26px;line-height:28px;vertical-align:middle}#umm-mission-editor-bar{align-items:center;background-color:#08304e;display:flex;flex-wrap:nowrap;margin-top:15px;padding-left:5px}#umm-mission-title{display:inline-block;max-width:200px;min-width:4em;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}#umm-mission-picker-wrapper{display:inline-block;margin-left:10px}.umm-upload-label{background-image:url(${___CSS_LOADER_URL_REPLACEMENT_0___});background-size:cover;box-sizing:border-box;cursor:pointer;display:inline-block;height:16px;margin:0 0 0 5px;padding:3px 0 7px;width:16px}#umm-import-file{border:none;border-radius:0;height:.1px;opacity:0;overflow:hidden;position:absolute;width:.1px;z-index:-1}.umm-mission-picker{margin-left:15px}.umm-mission-picker,.umm-mission-picker-btn{background-color:#08304e;height:26px;padding:0 10px}.umm-mission-picker-btn{margin-left:3px}.umm-notification{background-color:#383838;border-radius:2px;-webkit-box-shadow:0 0 24px -1px #383838;-moz-box-shadow:0 0 24px -1px #383838;box-shadow:0 0 24px -1px #383838;color:#f0f0f0;font-family:Calibri,sans-serif;font-size:20px;height:20px;height:auto;left:50%;margin-left:-100px;padding:10px;position:fixed;text-align:center;top:55px;width:300px;z-index:10000}.umm-options-list a{background:rgba(8,48,78,.9);border:1px solid #ffce00;color:#ffce00;display:block;margin:10px auto;padding:3px 0;text-align:center;width:80%}`, "" ]);
            const __WEBPACK_DEFAULT_EXPORT__ = ___CSS_LOADER_EXPORT___;
        },
        977(module) {
            module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAFHGlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxNDIgNzkuMTYwOTI0LCAyMDE3LzA3LzEzLTAxOjA2OjM5ICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIgeG1sbnM6cGhvdG9zaG9wPSJodHRwOi8vbnMuYWRvYmUuY29tL3Bob3Rvc2hvcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxOCAoV2luZG93cykiIHhtcDpDcmVhdGVEYXRlPSIyMDE4LTA5LTE3VDAyOjU3OjM3KzAyOjAwIiB4bXA6TW9kaWZ5RGF0ZT0iMjAxOC0wOS0xN1QwMjo1ODoyMCswMjowMCIgeG1wOk1ldGFkYXRhRGF0ZT0iMjAxOC0wOS0xN1QwMjo1ODoyMCswMjowMCIgZGM6Zm9ybWF0PSJpbWFnZS9wbmciIHBob3Rvc2hvcDpDb2xvck1vZGU9IjMiIHBob3Rvc2hvcDpJQ0NQcm9maWxlPSJzUkdCIElFQzYxOTY2LTIuMSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo0NWYwMDRiMS05NzRjLWRlNDctYTEzMi02NWZlYzIyOWM1NWYiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NDVmMDA0YjEtOTc0Yy1kZTQ3LWExMzItNjVmZWMyMjljNTVmIiB4bXBNTTpPcmlnaW5hbERvY3VtZW50SUQ9InhtcC5kaWQ6NDVmMDA0YjEtOTc0Yy1kZTQ3LWExMzItNjVmZWMyMjljNTVmIj4gPHhtcE1NOkhpc3Rvcnk+IDxyZGY6U2VxPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0iY3JlYXRlZCIgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDo0NWYwMDRiMS05NzRjLWRlNDctYTEzMi02NWZlYzIyOWM1NWYiIHN0RXZ0OndoZW49IjIwMTgtMDktMTdUMDI6NTc6MzcrMDI6MDAiIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkFkb2JlIFBob3Rvc2hvcCBDQyAyMDE4IChXaW5kb3dzKSIvPiA8L3JkZjpTZXE+IDwveG1wTU06SGlzdG9yeT4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz5w/iV0AAACPklEQVRoge2ZsWvVQACHv1yVoiIiggWhkygu0giC4KSzrg4ujp27uTnq6KDgoOjoKPgvCA5OeQ8LWqHa6lAdWnWprdWfw7009/Kitbl4eRf84JG7eyT8PnJ3uVwSSXQB03aApvgvMm4YYB9wB1gDtIvfInAxfORqEkm3gbma538GUmCpoTy1SSStAFMe13gGXAB+NpKoJomamX9vAHcbuM5O/AC+Vv3RlEhI3gPXgcduY4wiYO/MeeBF3hDr9DsBXHEb9uxwgrAz0zhyyK1UiQh4BNwDXgLfAoTypmqMzAL3B+VJ4CiwN2iqv2MT+LBd0zBPJSFpUtJDSRsabz5JuiZpROSyrMit4JHqsyXpXLlrHQFWgWVgOmxP8eKmO/0uYSWmiEsCYN0V6Q2OaQtBfOm7ItngmIbP4U3WBZE1YLkLIj0o1lpfgHfAAeBES4HqMiSSYZcmp7ELspgYEYH4uhV0RGQLmIdCJNZnyCtgA6zId6zVBHaMxESWFwxWYhM4CexvKVBd+nnBUFjNtBLFjywvGIrxcaaVKH5U3pG0jSQerAAf80rMIplbMdhdkmPYd/OY6LuV/DkS9UCHQiTGgd5zK7lIGj6HF+vAgtsQq8g8dp21jQEOAsdbiVOfXrnBYNdXsW1mV4rEOND75QZDfOMDSlMvxCnyFrvHMIQBToXP4sVItwIrshg4iC/PqxoTSZeAJ4znN5Ayb4CzVHzZTQab8TPAVeBw2Fy74jXwgD98ng4b5x8R24Pwt3RG5BfpNRC+G94MKgAAAABJRU5ErkJggg==";
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
    __webpack_require__.m = __webpack_modules__, __webpack_require__.n = module => {
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
    }, __webpack_require__.b = "undefined" != typeof document && document.baseURI || self.location.href, 
    __webpack_require__.nc = void 0;
    const notification = (notificationText, presistend = !1) => {
        $(".umm-notification").remove(), notificationText = notificationText.replace(/\n/g, "<br/>");
        const notification = $("<div>", {
            class: "umm-notification",
            html: notificationText
        });
        $("body").append(notification), presistend || window.setTimeout(() => {
            $(".umm-notification").fadeOut(400, () => notification.remove());
        }, 3e3);
    }, loadFile = async (state, inputFile) => {
        const text = await inputFile.text();
        try {
            state.import(text);
        } catch (error) {
            return notification(`Loadgin error: \n${error}`), !1;
        }
        return state.save(), notification(`Banner data loaded:\n${state.getBannerName()}`), 
        !0;
    };
    class Portals {
        constructor(state, data) {
            this.state = state, this.data = data;
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
            this.data[index] = portal, this.state.onMissionPortal.trigger();
        }
        add(...portal) {
            portal.some(p => this.includes(p.guid)), this.data.push(...portal), this.state.onMissionPortal.trigger();
        }
        insert(index, ...portal) {
            portal.some(p => this.includes(p.guid)), this.data.splice(index, 0, ...portal), 
            this.state.onMissionPortal.trigger();
        }
        remove(index, count = 1) {
            this.data.splice(index, count), this.state.onMissionPortal.trigger();
        }
        clear() {
            this.data.length = 0, this.state.onMissionPortal.trigger();
        }
        toLatLng() {
            return this.data.map(portal => new L.LatLng(portal.location.latitude, portal.location.longitude));
        }
        getLatLngOf(index) {
            const portal = this.get(index);
            if (portal) return new L.LatLng(portal.location.latitude, portal.location.longitude);
        }
        includes(guid) {
            return this.data.some(x => x.guid === guid);
        }
        find(guid) {
            return this.data.find(x => x.guid === guid);
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
        reverse() {
            this.data.reverse(), this.state.onMissionPortal.trigger();
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
        constructor(state, id, data) {
            this.missionID = id, this.data = data, this.portal_data = new Portals(state, data.portals);
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
        get description() {
            return this.data.missionDescription;
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
        focusLastPortal() {
            const last_ll = this.portal_data.getLatLngOf(-1), last = this.portal_data.get(-1);
            return !(!last || !last_ll) && (window.map.setView(last_ll), window.renderPortalDetails(last.guid), 
            !0);
        }
        getDistance() {
            return this.portals.toLatLng().reduce((sum, ll, index, lls) => index > 0 ? sum + ll.distanceTo(lls[index - 1]) : 0, 0);
        }
        clear() {
            this.portal_data.clear();
        }
        reverse() {
            this.portal_data.reverse();
        }
    }
    class Missions {
        static generateMissionTitle(format, info) {
            return format.replace(/\$(\d*)?(\w)/g, (_, flags, token) => {
                var _a, _b, _c, _d, _e, _f, _g;
                let value = token;
                switch (token.toLowerCase()) {
                  case "t":
                    value = null !== (_a = info.title) && void 0 !== _a ? _a : value;
                    break;

                  case "m":
                    value = null !== (_c = null === (_b = info.total) || void 0 === _b ? void 0 : _b.toString()) && void 0 !== _c ? _c : value;
                    break;

                  case "n":
                    value = null !== (_e = null === (_d = info.misison) || void 0 === _d ? void 0 : _d.toString()) && void 0 !== _e ? _e : value;
                }
                let leadingZero = !1;
                (null == flags ? void 0 : flags.startsWith("0")) && (leadingZero = !0, flags = flags.slice(1));
                let length = parseInt(flags);
                return Number.isNaN(length) && (length = 1, leadingZero && (length = null !== (_g = null === (_f = info.total) || void 0 === _f ? void 0 : _f.toString().length) && void 0 !== _g ? _g : 1)), 
                value.length < length && (value = value.padStart(length, leadingZero ? "0" : " ")), 
                value;
            });
        }
        constructor(state, data) {
            this.state = state, this.data = data;
        }
        get(missionId) {
            const mis = this.data[missionId];
            return mis && new Mission(this.state, missionId, mis);
        }
        count() {
            return this.data.length;
        }
        forEach(callback) {
            this.data.forEach((missionData, index) => {
                const mission = new Mission(this.state, index, missionData);
                callback(mission);
            });
        }
        filter(callback) {
            const result = [];
            return this.forEach(mission => {
                callback(mission) && result.push(mission);
            }), result;
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
        distanceToStart(id) {
            const mission = this.get(id);
            if (!mission) return;
            const previous = this.previous(mission), first = null == previous ? void 0 : previous.portals.getLatLngOf(-1), last = mission.portals.getLatLngOf(0);
            return first && last ? first.distanceTo(last) : void 0;
        }
        getTotalDistance() {
            const waypoints = [];
            return this.forEach(m => waypoints.push(...m.getLocations())), waypoints.reduce((sum, ll, index, lls) => index > 0 ? sum + ll.distanceTo(lls[index - 1]) : 0, 0);
        }
        getWaypointCount() {
            return this.data.reduce((count, mis) => count + mis.portals.length, 0);
        }
        validate() {
            const errors = {}, notEnoughWaypoint = this.filter(m => m.portals.length < 6).map(m => m.id);
            return notEnoughWaypoint.length > 0 && (errors["not enough waypoints"] = notEnoughWaypoint), 
            errors;
        }
        zoom() {
            const location = this.data.flatMap(m => new Portals(this.state, m.portals).toLatLng());
            if (location.length > 0) {
                const bounds = new L.LatLngBounds(location).pad(.1);
                window.map.fitBounds(bounds, {
                    maxZoom: 18
                });
            }
        }
        merge(destination, missionB) {
            destination.portals.add(...missionB.portals.getRange()), missionB.portals.clear();
        }
        mergeAll() {
            const portals = [];
            this.data.forEach(m => {
                portals.push(...m.portals), portals.length = 0;
            }), this.data[0].portals = portals;
        }
        split(source, at, destination) {
            const toMove = source.portals.getRange(at);
            destination.portals.insert(0, ...toMove), source.portals.remove(at, toMove.length);
        }
        splitIntoMultiple(source, count, restAtLast = !1) {
            const allPortals = this.getAllPortalsOf(source.id, count);
            let portalsPerMission = allPortals.length / count;
            restAtLast && (portalsPerMission = Math.floor(portalsPerMission));
            for (let i = 0; i < count; i++) {
                const start = Math.floor(portalsPerMission * i);
                let end = Math.floor(portalsPerMission * (i + 1));
                i === count - 1 && (end = allPortals.length);
                const mission = this.get(source.id + i);
                null == mission || mission.portals.clear(), null == mission || mission.portals.add(...allPortals.slice(start, end));
            }
        }
        getAllPortalsOf(from, count) {
            const allPortals = [];
            for (let i = 0; i < count; i++) {
                const mission = this.get(from + i);
                mission && allPortals.push(...mission.portals.getRange());
            }
            return allPortals;
        }
        getMissionsOfPortal(guid) {
            return this.filter(mis => mis.portals.includes(guid)).map(m => m.id);
        }
    }
    const undefinedOrEmptyString = value => null == value || "" == value;
    class Trigger {
        constructor() {
            this.handler = [];
        }
        do(fct) {
            this.handler.includes(fct) || this.handler.push(fct);
        }
        dont(fct) {
            const index = this.handler.indexOf(fct);
            -1 === index ? console.error("handler was not registerd", fct) : this.handler.splice(index, 1);
        }
        trigger() {
            this.handler.some(fct => !1 === fct());
        }
        clear() {
            this.handler = [];
        }
    }
    const fileFormatVersion = 3;
    class State {
        constructor() {
            this.onSelectedMissionChange = new Trigger, this.onMissionChange = new Trigger, 
            this.onMissionPortal = new Trigger, this.load();
        }
        load() {
            this.reset();
            const data = localStorage.getItem("ultimate-mission-maker");
            data && this.import(data);
        }
        save() {
            this.setPlannedLength(this.theState.plannedBannerLength), localStorage.setItem("ultimate-mission-maker", this.asString());
        }
        import(jsonString) {
            const anyState = JSON.parse(jsonString);
            this.theState = (ummState => {
                var _a, _b, _c, _d, _e, _f;
                if (ummState.fileFormatVersion > fileFormatVersion) throw new Error("UMM: You've attempted to load data that's newer than what's supported by this version of UMM. Please update the plugin and try again. Data has not been loaded.");
                if (void 0 === ummState.fileFormatVersion || "" === ummState.fileFormatVersion) {
                    if (undefinedOrEmptyString(ummState.missionSetName) && (undefinedOrEmptyString(ummState.missionName) ? ummState.missionSetName = "" : (ummState.missionSetName = ummState.missionName, 
                    delete ummState.missionName)), undefinedOrEmptyString(ummState.missionSetDescription) && (undefinedOrEmptyString(ummState.missionDescription) ? ummState.missionSetDescription = "" : (ummState.missionSetDescription = ummState.missionDescription, 
                    delete ummState.missionDescription)), undefinedOrEmptyString(ummState.titleFormat) && (ummState.titleFormat = "T NN-M"), 
                    void 0 === ummState.numberOfMissions ? ummState.plannedBannerLength = Object.keys(ummState.missions).length : (ummState.plannedBannerLength = ummState.numberOfMissions, 
                    delete ummState.numberOfMissions), !Object.keys(ummState.missions[0]).includes("portals")) if (ummState.missions[0][0].guid) {
                        const newMissions = [];
                        for (const mission in ummState.missions) {
                            const plannedLength = ummState.plannedBannerLength > 0 ? ummState.plannedBannerLength : ummState.missions.length, missionTitle = Missions.generateMissionTitle(ummState.titleFormat, {
                                misison: parseInt(mission) + 1,
                                title: ummState.missionSetName,
                                total: plannedLength
                            });
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
                if (2 === ummState.fileFormatVersion) for (const mission in ummState.missions) for (const portal in ummState.missions[mission].portals) "HACK" === ummState.missions[mission].portals[portal].objective.type && (ummState.missions[mission].portals[portal].objective.type = "HACK_PORTAL");
                return 2 === ummState.fileFormatVersion && (null !== (_a = ummState.missionSetName) && void 0 !== _a || (ummState.missionSetName = ""), 
                null !== (_b = ummState.missionSetDescription) && void 0 !== _b || (ummState.missionSetDescription = ""), 
                null !== (_c = ummState.currentMission) && void 0 !== _c || (ummState.currentMission = 0), 
                null !== (_d = ummState.plannedBannerLength) && void 0 !== _d || (ummState.plannedBannerLength = 1), 
                null !== (_e = ummState.titleFormat) && void 0 !== _e || (ummState.titleFormat = "T NN-M")), 
                ummState.fileFormatVersion < 3 && (ummState.titleFormat = (null !== (_f = ummState.titleFormat) && void 0 !== _f ? _f : "").replace("T", "$T").replace(/N+/, match => match.length > 1 ? "$0N" : "$N").replace(/(M+)/g, "$M"), 
                ummState.fileFormatVersion = 3), ummState;
            })(anyState), this.setPlannedLength(this.getPlannedLength() || 1), this.onMissionChange.trigger(), 
            this.onMissionPortal.trigger(), this.onSelectedMissionChange.trigger();
        }
        asString() {
            return JSON.stringify(this.theState);
        }
        reset() {
            this.theState = {
                missionSetName: "",
                missionSetDescription: "",
                currentMission: 0,
                plannedBannerLength: 1,
                titleFormat: "$T $N / $M",
                fileFormatVersion,
                missions: [ {
                    missionTitle: "",
                    missionDescription: "",
                    portals: []
                } ],
                layers: []
            }, this.onMissionChange.trigger();
        }
        isEmpty() {
            return "" === this.theState.missionSetName && "" === this.theState.missionSetDescription && this.theState.missions.every(m => 0 === m.portals.length);
        }
        isValid() {
            return "" !== this.theState.missionSetName && "" !== this.theState.missionSetDescription && this.theState.plannedBannerLength > 0;
        }
        get missions() {
            return new Missions(this, this.theState.missions);
        }
        getBannerName() {
            return this.theState.missionSetName;
        }
        setBannerName(name) {
            this.theState.missionSetName = name, this.theState.missions.forEach((mission, id) => mission.missionTitle = this.generateMissionTitle(id)), 
            this.onMissionChange.trigger();
        }
        getBannerDesc() {
            return this.theState.missionSetDescription;
        }
        setBannerDesc(desc) {
            this.theState.missionSetDescription = desc, this.theState.missions.forEach(mission => mission.missionDescription = this.theState.missionSetDescription), 
            this.onMissionChange.trigger();
        }
        getTitleFormat() {
            return this.theState.titleFormat;
        }
        setTitleFormat(name) {
            this.theState.titleFormat = name, this.theState.missions.forEach((mission, id) => mission.missionTitle = this.generateMissionTitle(id)), 
            this.onMissionChange.trigger();
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
            this.onMissionChange.trigger();
        }
        generateMissionTitle(missNumber) {
            return Missions.generateMissionTitle(this.theState.titleFormat, {
                misison: missNumber,
                total: this.getPlannedLength(),
                title: this.theState.missionSetName
            });
        }
        getEditMission() {
            return this.missions.get(this.theState.currentMission);
        }
        setCurrent(missionId) {
            missionId >= 0 && this.getPlannedLength(), this.theState.currentMission = missionId, 
            this.onSelectedMissionChange.trigger();
        }
        getCurrent() {
            return this.theState.currentMission;
        }
        isCurrent(missionId) {
            return this.theState.currentMission === missionId;
        }
        checkPortal(event) {
            let updated = !1;
            this.theState.missions.forEach(mission => {
                const portal = mission.portals.find(x => x.guid === event.guid);
                portal && (portal.imageUrl === event.portalData.image && portal.title === event.portalData.title || (portal.imageUrl = event.portalData.image, 
                portal.title = event.portalData.title, updated = !0));
            }), updated && this.save();
        }
        checkAllPortals() {
            let updated = !1;
            this.theState.missions.forEach(mission => {
                mission.portals.forEach(portal => {
                    var _a;
                    const iitcPortal = null === (_a = window.portals[portal.guid]) || void 0 === _a ? void 0 : _a.options.data;
                    iitcPortal && (portal.imageUrl === iitcPortal.image && portal.title === iitcPortal.title || (portal.imageUrl = iitcPortal.image, 
                    portal.title = iitcPortal.title, updated = !0));
                });
            }), updated && this.save();
        }
        storeLayerState(layers) {
            this.theState.layers = layers.map(l => l.isVisible()), this.save();
        }
        restoreLayerState(layers) {
            this.theState.layers.forEach((vis, index) => layers[index].toggle(null == vis || vis));
        }
    }
    const main = new class UMM_Editor {
        init() {
            __webpack_require__(404), $(".navbar-header").append($("<div>", {
                id: "umm-badge",
                text: "UMM:"
            }), $("<div>", {
                id: "umm-mission-editor-bar"
            }).append($("<div>", {
                id: "umm-mission-title",
                click: () => $("#umm-import-file").trigger("click")
            }), $("<div>", {
                style: "margin-top: 0.3em;"
            }).append($("<input>", {
                id: "umm-import-file",
                type: "file"
            }), $("<label>", {
                for: "umm-import-file",
                class: "umm-upload-label"
            })), $("<div>", {
                id: "umm-mission-picker-wrapper"
            }).append($("<select>", {
                id: "umm-mission-picker",
                class: "umm-mission-picker"
            }), $("<button>", {
                id: "umm-mission-picker-btn",
                class: "umm-mission-picker-btn",
                text: "Import",
                click: () => this.importMission()
            })))), this.state = new State, this.setActiveBannerTitle(), this.bindFileImport(), 
            this.generateMissionSelect();
        }
        setActiveBannerTitle() {
            "" === this.state.getBannerName() ? $("#umm-mission-title").text("Please load a mission file...") : $("#umm-mission-title").text(this.state.getBannerName());
        }
        bindFileImport() {
            $("#umm-import-file")[0].addEventListener("change", async event => {
                ("" === this.state.getBannerName() || confirm("Are you sure you want to load this file? Doing so will overwrite any previously imported UMM data. Your existing missions will not be affected.")) && ($("#umm-mission-title").text("Loading banner... "), 
                await (async (event, state) => {
                    const files = event.target.files;
                    return 1 !== (null == files ? void 0 : files.length) ? (alert("No file selected! Please select a mission file in JSON format and try again."), 
                    $("#umm-import-file").val(""), !1) : "application/json" != files[0].type ? ($("#umm-import-file").val(""), 
                    alert(files[0].name + " has not been recognized as JSON file. Make sure you've loaded the right file."), 
                    !1) : loadFile(state, files[0]);
                })(event, this.state), this.setActiveBannerTitle(), this.generateMissionSelect());
            });
        }
        generateMissionSelect() {
            const selectedMission = this.state.getCurrent(), container = $("#umm-mission-picker");
            container.empty(), this.state.missions.forEach(mission => {
                container.append($("<option>", {
                    value: mission.id,
                    text: `${mission.id + 1}: ${mission.title}`
                }));
            }), $("#umm-mission-picker").val(selectedMission), this.state.missions.count() > 0 && $("#umm-mission-picker-btn").prop("disabled", !1);
        }
        importMission() {
            const selectedMission = parseInt($("#umm-mission-picker").val());
            main.state.setCurrent(selectedMission), main.state.save();
            const mission = main.state.getEditMission(), angularScope = this.getAngularAppScope();
            if (!mission || "" === mission.title || "" === mission.description && 0 === mission.portals.length) return void notification("There is no mission data loaded");
            if (!$(".loading").hasClass("ng-hide")) return void notification("Please wait for the spinner in the top right to finish loading before importing a (new) mission");
            if (!angularScope.mission) return void notification("You can not import a mission on the preview page\nStart with Create New Mission");
            if ($(".title.title-4").length > 0 && !$(".title.title-4").hasClass("ng-hide") || $(".pagination li:nth-child(4)").hasClass("active")) return void notification("You can not import a mission on this page\nGo back to a previous page");
            if (angularScope.mission.definition.waypoints.length > 0 && !confirm("Your current mission already contains portals/waypoints. Are you sure you want to overwrite these?")) return;
            this.resetWaypoints(angularScope), angularScope.mission.definition.name = mission.title, 
            angularScope.mission.definition.description = mission.description;
            const mock = angularScope.setSelectedWaypoint;
            angularScope.setSelectedWaypoint = () => 0;
            let missingImagesCount = 0;
            mission.portals.getRange().forEach(portal => {
                const {mePortal, hasError} = this.createPortal(portal);
                hasError && missingImagesCount++, angularScope.addWaypoint(mePortal);
            }), angularScope.setSelectedWaypoint = mock, angularScope.mission.definition.waypoints.forEach((aportal, index) => {
                const portal = mission.portals.get(index);
                aportal.objective.type = portal.objective.type, aportal.objective.passphrase_params.question = portal.objective.passphrase_params.question, 
                aportal.objective.passphrase_params._single_passphrase = portal.objective.passphrase_params._single_passphrase;
            }), angularScope.$apply();
            const angularApp = this.getAngularApp();
            angularApp.injector().get("$timeout")(() => {
                if (missingImagesCount > 0) {
                    notification("Missing data detected\nRefreshing data to correct the issue. Standby...", !0);
                    const triggerRefresh = () => {
                        setTimeout(validateRefresh, 200);
                    }, validateRefresh = () => {
                        const angularHttp = angularApp.injector().get("$http");
                        let isMissionSaving = !1;
                        for (const request of angularHttp.pendingRequests) "/api/author/saveMission" === request.url && (isMissionSaving = !0);
                        if (angularScope.pendingSave || isMissionSaving) triggerRefresh(); else {
                            notification("Refreshing mission...", !0);
                            const scope = this.getAngularAppScope();
                            this.reloadMAT(scope.mission.mission_id);
                        }
                    };
                    setTimeout(triggerRefresh, 200);
                } else notification("UMM Mission import succesful:\n" + angularScope.mission.definition.name);
            });
        }
        getAngularApp() {
            const container = document.getElementsByClassName("container")[0];
            return angular.element(container);
        }
        getAngularAppScope() {
            return this.getAngularApp().scope();
        }
        resetWaypoints(scope) {
            scope.mission.definition.waypoints = [], scope.waypointMarkers = [], scope.$apply();
        }
        createPortal(portal) {
            let hasError = !1, imageUrl = portal.imageUrl;
            return imageUrl || (hasError = !0, imageUrl = "https://lh3.googleusercontent.com/s0kCRS7KE-i0gQhbH_gx-qxvC2kHBJ9TDITirnpzSJnEDV-QVDio5OFl8bJ8OC8EhPGGFOFje5HeO9M6RDklZ971e8aSPeLs"), 
            imageUrl.startsWith("http:") && (imageUrl = imageUrl.replace("http:", "https:")), 
            {
                mePortal: {
                    $$hashKey: null,
                    guid: portal.guid,
                    description: portal.description,
                    location: {
                        latitude: portal.location.latitude,
                        longitude: portal.location.longitude
                    },
                    imageUrl,
                    isOrnamented: !1,
                    isStartPoint: !1,
                    title: portal.title,
                    type: "PORTAL"
                },
                hasError
            };
        }
        reloadMAT(missionId) {
            const angularApp = this.getAngularApp(), angularHttp = angularApp.injector().get("$http"), angularApi = angularApp.injector().get("Api"), angularTimeout = angularApp.injector().get("$timeout"), wireUtil = angularApp.injector().get("WireUtil"), styles = angularApp.injector().get("Styles");
            angularHttp.post(angularApi.GET_MISSION, {
                mission_id: missionId
            }).success(data => {
                data = wireUtil.convertMissionWireToLocal(data.mission, data.pois);
                const angularscope = this.getAngularAppScope();
                angularscope.mission = data, angularTimeout(() => {
                    angularscope.waypointMarkers = (waypoints => {
                        const d = [];
                        return angular.forEach(waypoints, (a, b) => {
                            const c = ((b, d) => {
                                if (b._poi) {
                                    const c = (d + 1).toString();
                                    return {
                                        id: Math.floor(1e10 * Math.random()),
                                        location: b._poi.location,
                                        icon: angularscope.isWaypointSelected(b) ? styles.SELECTED_WAYPOINT_ICON : styles.WAYPOINT_ICON,
                                        onClicked: function() {
                                            angularscope.$apply(() => {
                                                angularscope.setSelectedWaypoint(b, !0);
                                            });
                                        },
                                        options: {
                                            labelAnchor: styles.WAYPOINT_LABEL_ANCHOR,
                                            labelClass: "waypoint-label",
                                            labelContent: c,
                                            zIndex: styles.WAYPOINT_MARKER_Z_INDEX
                                        },
                                        latitude: b._poi.location.latitude,
                                        longitude: b._poi.location.longitude
                                    };
                                }
                            })(a, b);
                            d.push(c);
                        }), d;
                    })(angularscope.mission.definition.waypoints), angularscope.$apply(), notification("UMM Mission import succesful:\n" + angularscope.mission.definition.name);
                });
            }).catch(() => {
                window.alert("Failed to refresh mission, refreshing full page to fix this."), window.location.href = window.location.href;
            });
        }
    };
    main.init();
})();
};


(function () {
  const info = {};
  if (typeof GM_info !== 'undefined' && GM_info && GM_info.script)
    info.script = { version: GM_info.script.version, name: GM_info.script.name, description: GM_info.script.description };
  if (typeof unsafeWindow != 'undefined' || typeof GM_info == 'undefined' || GM_info.scriptHandler != 'Tampermonkey') {

    var pluginContent;
    if (window.location.host.match(/^intel.ingress.com$/i)) 
      pluginContent = wrapper_iitc;
    else 
      pluginContent = wrapper_editor;
    
    const script = document.createElement('script');
    const code = '(' + pluginContent + ')(' + JSON.stringify(info) + ');'
    script.appendChild(document.createTextNode(code));
    document.head.appendChild(script);
  } 
})();
