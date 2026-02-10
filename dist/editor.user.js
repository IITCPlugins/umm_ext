// ==UserScript==
// @name            IITC plugin: UMM_Ext
// @id              iitc_plugin_UMM_Ext
// @category        Misc
// @version         1.0.alpha
// @namespace       https://github.com/IITC-CE/ingress-intel-total-conversion
// @description     Ultimate Mission Maker - Extended
// @match           https://intel.ingress.com/*
// @author          McBen, Vashiru, j00rtje, DanielOnDiordna 
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
            ___CSS_LOADER_EXPORT___.push([ module.id, `#umm-badge{background-color:crimson;margin:15px 0 0 10px;padding:0 5px}#umm-badge,#umm-mission-editor-bar{color:#fff;float:left;height:26px;line-height:28px;vertical-align:middle}#umm-mission-editor-bar{background-color:#08304e;margin-top:15px;padding-left:5px}#umm-mission-title{display:inline-block;max-width:200px;min-width:4em;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}#umm-mission-picker-wrapper{display:inline-block;float:right;margin-left:10px}.umm-upload-label{background-image:url(${___CSS_LOADER_URL_REPLACEMENT_0___});background-size:cover;box-sizing:border-box;cursor:pointer;display:inline-block;height:16px;margin:0 0 0 5px;padding:3px 0 7px;width:16px}#umm-import-file{border:none;border-radius:0;height:.1px;opacity:0;overflow:hidden;position:absolute;width:.1px;z-index:-1}.umm-mission-picker{margin-left:15px}.umm-mission-picker,.umm-mission-picker-btn{background-color:#08304e;height:26px;padding:0 10px}.umm-mission-picker-btn{margin-left:3px}.umm-notification{background-color:#383838;border-radius:2px;-webkit-box-shadow:0 0 24px -1px #383838;-moz-box-shadow:0 0 24px -1px #383838;box-shadow:0 0 24px -1px #383838;color:#f0f0f0;font-family:Calibri,sans-serif;font-size:20px;height:20px;height:auto;left:50%;margin-left:-100px;padding:10px;position:fixed;text-align:center;top:55px;width:300px;z-index:10000}.umm-options-list a{background:rgba(8,48,78,.9);border:1px solid #ffce00;color:#ffce00;display:block;margin:10px auto;padding:3px 0;text-align:center;width:80%}`, "" ]);
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
    let notificationTimer;
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
    const notification = (notificationText, isPersistent = !1) => {
        $(".umm-notification").hide();
        const notification = $(".umm-notification").text(notificationText);
        notification.html(notification.html().replace(/\n/g, "<br/>")), $(".umm-notification").show(), 
        window.clearTimeout(notificationTimer), isPersistent || (notificationTimer = window.setTimeout(() => {
            $(".umm-notification").fadeOut(400);
        }, 3e3));
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
            portal.some(p => this.includes(p.guid)), this.data.push(...portal);
        }
        insert(index, ...portal) {
            portal.some(p => this.includes(p.guid)), this.data.splice(index, 0, ...portal);
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
            this.data.reverse();
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
        reverse() {
            this.portal_data.reverse();
        }
    }
    class Missions {
        static generateMissionTitle(missNumber, plannedBannerLength, missSetName, missNameFormat) {
            var _a;
            const format = null != missNameFormat ? missNameFormat : "";
            if (!format) return "";
            let title = format;
            const totalMissions = null != plannedBannerLength ? plannedBannerLength : 0;
            if (totalMissions >= 1 && (title = title.replace(/M+/g, totalMissions.toString())), 
            missNumber >= 0) {
                const numberPattern = null === (_a = format.match(/N+/g)) || void 0 === _a ? void 0 : _a[0];
                if (numberPattern) {
                    const length = numberPattern.length > 1 ? totalMissions.toString().length : 0, paddedNumber = (missNumber + 1).toString().padStart(length, "0");
                    title = title.replace(/N+/g, paddedNumber);
                }
            }
            return (null == missSetName ? void 0 : missSetName.trim()) && (title = title.replace(/T/g, missSetName)), 
            title;
        }
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
        validate() {
            const errors = {}, notEnoughWaypoint = this.filter(m => m.portals.length < 6).map(m => m.id);
            return notEnoughWaypoint.length > 0 && (errors["not enough waypoints"] = notEnoughWaypoint), 
            errors;
        }
        zoom() {
            const location = this.data.flatMap(m => new Portals(m.portals).toLatLng());
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
                i !== count - 1 && (end = allPortals.length - 1);
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
    const fileFormatVersion = 2;
    class State {
        constructor() {
            this.load();
        }
        get() {
            return this.theState;
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
                var _a, _b, _c, _d, _e;
                if (ummState.fileFormatVersion > fileFormatVersion) throw new Error("UMM: You've attempted to load data that's newer than what's supported by this version of UMM. Please update the plugin and try again. Data has not been loaded.");
                if (void 0 === ummState.fileFormatVersion || "" === ummState.fileFormatVersion) {
                    const undefinedOrEmptyString = value => null == value || "" == value;
                    if (undefinedOrEmptyString(ummState.missionSetName) && (undefinedOrEmptyString(ummState.missionName) ? ummState.missionSetName = "" : (ummState.missionSetName = ummState.missionName, 
                    delete ummState.missionName)), undefinedOrEmptyString(ummState.missionSetDescription) && (undefinedOrEmptyString(ummState.missionDescription) ? ummState.missionSetDescription = "" : (ummState.missionSetDescription = ummState.missionDescription, 
                    delete ummState.missionDescription)), undefinedOrEmptyString(ummState.titleFormat) && (ummState.titleFormat = "T NN-M"), 
                    void 0 === ummState.numberOfMissions ? ummState.plannedBannerLength = Object.keys(ummState.missions).length : (ummState.plannedBannerLength = ummState.numberOfMissions, 
                    delete ummState.numberOfMissions), !Object.keys(ummState.missions[0]).includes("portals")) if (ummState.missions[0][0].guid) {
                        const newMissions = [];
                        for (const mission in ummState.missions) {
                            const plannedLength = ummState.plannedBannerLength > 0 ? ummState.plannedBannerLength : ummState.missions.length, missionTitle = Missions.generateMissionTitle(parseInt(mission) + 1, plannedLength, ummState.missionSetName, ummState.titleFormat);
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
                ummState;
            })(anyState), this.setPlannedLength(this.getPlannedLength() || 1);
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
                titleFormat: "T NN-M",
                fileFormatVersion,
                missions: [ {
                    missionTitle: "",
                    missionDescription: "",
                    portals: []
                } ]
            };
        }
        isValid() {
            return "" !== this.theState.missionSetName && "" !== this.theState.missionSetDescription && this.theState.plannedBannerLength > 0;
        }
        get missions() {
            return new Missions(this.theState.missions);
        }
        getBannerName() {
            return this.theState.missionSetName;
        }
        setBannerName(name) {
            this.theState.missionSetName = name, this.theState.missions.forEach((mission, id) => mission.missionTitle = this.generateMissionTitle(id));
        }
        getBannerDesc() {
            return this.theState.missionSetDescription;
        }
        setBannerDesc(desc) {
            this.theState.missionSetDescription = desc, this.theState.missions.forEach(mission => mission.missionDescription = this.theState.missionSetDescription);
        }
        getTitleFormat() {
            return this.theState.titleFormat;
        }
        setTitleFormat(name) {
            this.theState.titleFormat = name, this.theState.missions.forEach((mission, id) => mission.missionTitle = this.generateMissionTitle(id));
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
        generateMissionTitle(missNumber) {
            return Missions.generateMissionTitle(missNumber, this.getPlannedLength(), this.theState.missionSetName, this.theState.titleFormat);
        }
        getEditMission() {
            return this.missions.get(this.theState.currentMission);
        }
        setCurrent(missionId) {
            missionId >= 0 && this.getPlannedLength(), this.theState.currentMission = missionId;
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
    }
    const main = new class UMM_Editor {
        init() {
            __webpack_require__(404), $("body").append("<div class='umm-notification' style='display:none'></div>"), 
            $(".navbar-header").append($("<div>", {
                id: "umm-badge",
                text: "UMM:"
            }), $("<div>", {
                id: "umm-mission-editor-bar"
            }).append($("<div>", {
                id: "umm-mission-title"
            }), $("<div>", {
                style: "display: inline-block"
            }).append($("<input>", {
                id: "umm-import-file",
                type: "file"
            }), $("<label>", {
                for: "umm-import-file",
                class: "umm-upload-label",
                html: "&nbsp;"
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
            const mission = main.state.getEditMission(), angularApp = this.getAngularApp();
            if (!mission || "" === mission.title || "" === mission.description && 0 === mission.portals.length) return void notification("There is no mission data loaded");
            if (!$(".loading").hasClass("ng-hide")) return void notification("Please wait for the spinner in the top right to finish loading before importing a (new) mission");
            if (!angularApp.mission) return void notification("You can not import a mission on the preview page\nStart with Create New Mission");
            if ($(".title.title-4").length > 0 && !$(".title.title-4").hasClass("ng-hide") || $(".pagination li:nth-child(4)").hasClass("active")) return void notification("You can not import a mission on this page\nGo back to a previous page");
            if (angularApp.mission.definition.waypoints.length > 0 && !confirm("Your current mission already contains portals/waypoints. Are you sure you want to overwrite these?")) return;
            this.resetWaypoints(angularApp), angularApp.mission.definition.name = mission.title, 
            angularApp.mission.definition.description = mission.description;
            let missingImagesCount = 0;
            mission.portals.getRange().forEach(portal => {
                const {mePortal, hasError} = this.createPortal(portal);
                hasError && missingImagesCount++, angularApp.addWaypoint(mePortal);
            }), angularApp.mission.definition.waypoints.forEach((aportal, index) => {
                const portal = mission.portals.get(index);
                aportal.objective.type = portal.objective.type, aportal.objective.passphrase_params.question = portal.objective.passphrase_params.question, 
                aportal.objective.passphrase_params._single_passphrase = portal.objective.passphrase_params._single_passphrase;
            }), angularApp.$apply();
            angularApp.injector().get("$timeout")(() => {
                if (missingImagesCount > 0) {
                    notification("Missing data detected\nRefreshing data to correct the issue. Standby...", !0);
                    const triggerRefresh = () => {
                        setTimeout(validateRefresh, 200);
                    }, validateRefresh = () => {
                        const angularHttp = angularApp.injector().get("$http");
                        let isMissionSaving = !1;
                        for (const request of angularHttp.pendingRequests) "/api/author/saveMission" === request.url && (isMissionSaving = !0);
                        if (angularApp.pendingSave || isMissionSaving) triggerRefresh(); else {
                            notification("Refreshing mission...", !0);
                            const app = this.getAngularApp();
                            this.reloadMAT(app.mission.mission_id);
                        }
                    };
                    setTimeout(triggerRefresh, 200);
                } else notification("UMM Mission import succesful:\n" + angularApp.mission.definition.name);
            });
        }
        getAngularApp() {
            const container = document.getElementsByClassName("container")[0];
            return angular.element(container).scope();
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
                const angularApp = this.getAngularApp();
                angularApp.mission = data, angularTimeout(() => {
                    angularApp.waypointMarkers = (waypoints => {
                        const d = [];
                        return angular.forEach(waypoints, (a, b) => {
                            const c = ((b, d) => {
                                if (b._poi) {
                                    const c = (d + 1).toString();
                                    return {
                                        id: Math.floor(1e10 * Math.random()),
                                        location: b._poi.location,
                                        icon: angularApp.isWaypointSelected(b) ? styles.SELECTED_WAYPOINT_ICON : styles.WAYPOINT_ICON,
                                        onClicked: function() {
                                            angularApp.$apply(() => {
                                                angularApp.setSelectedWaypoint(b, !0);
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
                    })(angularApp.mission.definition.waypoints), angularApp.$apply(), notification("UMM Mission import succesful:\n" + angularApp.mission.definition.name);
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
    const script = document.createElement('script');
    script.appendChild(document.createTextNode( '('+ wrapper +')('+JSON.stringify(info)+');'));
    document.head.appendChild(script);} 
  else wrapper(info);
})();