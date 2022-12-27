"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("pages/generate_password",{

/***/ "./src/components/generate-password/generate-password-view.tsx":
/*!*********************************************************************!*\
  !*** ./src/components/generate-password/generate-password-view.tsx ***!
  \*********************************************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": function() { return /* binding */ GeneratePasswordView; }\n/* harmony export */ });\n/* harmony import */ var _swc_helpers_src_tagged_template_literal_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @swc/helpers/src/_tagged_template_literal.mjs */ \"./node_modules/@swc/helpers/src/_tagged_template_literal.mjs\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"./node_modules/react/jsx-dev-runtime.js\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @mui/material */ \"./node_modules/@mui/material/index.js\");\n/* harmony import */ var _emotion_styled__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @emotion/styled */ \"./node_modules/@emotion/styled/dist/emotion-styled.browser.esm.js\");\n/* harmony import */ var _ui_button_button__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../ui/button/button */ \"./src/components/ui/button/button.tsx\");\n/* harmony import */ var _app_lib_hooks_use_form_status__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @app/lib/hooks/use-form-status */ \"./src/lib/hooks/use-form-status.ts\");\n/* harmony import */ var _ui_links_anchor_link__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../ui/links/anchor-link */ \"./src/components/ui/links/anchor-link.tsx\");\n\nfunction _templateObject() {\n    const data = (0,_swc_helpers_src_tagged_template_literal_mjs__WEBPACK_IMPORTED_MODULE_0__[\"default\"])([\n        \"\\n  margin-bottom: 12px;\\n\"\n    ]);\n    _templateObject = function() {\n        return data;\n    };\n    return data;\n}\n\nvar _s = $RefreshSig$();\n\n\n\n\n\n\nconst MuiStyledTextField = _emotion_styled__WEBPACK_IMPORTED_MODULE_3__[\"default\"].div(_templateObject());\n_c = MuiStyledTextField;\nfunction GeneratePasswordView() {\n    _s();\n    const [isMskVerified, setIsMskVerified] = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)(false);\n    const { isLoading , setIsLoading  } = (0,_app_lib_hooks_use_form_status__WEBPACK_IMPORTED_MODULE_5__.useFormStatus)();\n    const [generatePswState, setGeneratePswState] = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)({\n        msk: \"\",\n        host: \"\",\n        usernameEmail: \"\",\n        date: \"\",\n        retries: 0\n    });\n    const handleGeneratePassword = ()=>{\n        if (isMskVerified) {\n            console.log(\"Password generated\");\n        } else if (generatePswState.msk !== \"\") {\n            setIsLoading(true);\n            setTimeout(()=>{\n                setIsMskVerified(true);\n                setIsLoading(false);\n            }, 2000);\n        }\n    };\n    const mskFormComponent = /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.Fragment, {\n        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxDEV)(MuiStyledTextField, {\n            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxDEV)(_mui_material__WEBPACK_IMPORTED_MODULE_7__.TextField, {\n                id: \"input-msk\",\n                value: generatePswState.msk,\n                label: \"Master Security Key(MSK)\",\n                variant: \"outlined\",\n                fullWidth: true,\n                disabled: isMskVerified,\n                onChange: (event)=>setGeneratePswState({\n                        ...generatePswState,\n                        msk: event.currentTarget.value\n                    })\n            }, void 0, false, {\n                fileName: \"/home/nabin/programming/android/offlinepass/web/src/components/generate-password/generate-password-view.tsx\",\n                lineNumber: 46,\n                columnNumber: 9\n            }, this)\n        }, void 0, false, {\n            fileName: \"/home/nabin/programming/android/offlinepass/web/src/components/generate-password/generate-password-view.tsx\",\n            lineNumber: 45,\n            columnNumber: 7\n        }, this)\n    }, void 0, false);\n    const generatePasswordFormComponent = /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.Fragment, {\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxDEV)(MuiStyledTextField, {\n                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxDEV)(_mui_material__WEBPACK_IMPORTED_MODULE_7__.TextField, {\n                    id: \"host\",\n                    value: generatePswState.host,\n                    label: \"Host\",\n                    variant: \"outlined\",\n                    fullWidth: true,\n                    onChange: (event)=>setGeneratePswState({\n                            ...generatePswState,\n                            host: event.currentTarget.value\n                        })\n                }, void 0, false, {\n                    fileName: \"/home/nabin/programming/android/offlinepass/web/src/components/generate-password/generate-password-view.tsx\",\n                    lineNumber: 67,\n                    columnNumber: 9\n                }, this)\n            }, void 0, false, {\n                fileName: \"/home/nabin/programming/android/offlinepass/web/src/components/generate-password/generate-password-view.tsx\",\n                lineNumber: 66,\n                columnNumber: 7\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxDEV)(MuiStyledTextField, {\n                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxDEV)(_mui_material__WEBPACK_IMPORTED_MODULE_7__.TextField, {\n                    id: \"username/email\",\n                    value: generatePswState.usernameEmail,\n                    label: \"Username/Email\",\n                    variant: \"outlined\",\n                    fullWidth: true,\n                    onChange: (event)=>setGeneratePswState({\n                            ...generatePswState,\n                            usernameEmail: event.currentTarget.value\n                        })\n                }, void 0, false, {\n                    fileName: \"/home/nabin/programming/android/offlinepass/web/src/components/generate-password/generate-password-view.tsx\",\n                    lineNumber: 82,\n                    columnNumber: 9\n                }, this)\n            }, void 0, false, {\n                fileName: \"/home/nabin/programming/android/offlinepass/web/src/components/generate-password/generate-password-view.tsx\",\n                lineNumber: 81,\n                columnNumber: 7\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxDEV)(MuiStyledTextField, {\n                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxDEV)(_mui_material__WEBPACK_IMPORTED_MODULE_7__.TextField, {\n                    id: \"date\",\n                    value: generatePswState.date,\n                    label: \"Date\",\n                    variant: \"outlined\",\n                    fullWidth: true,\n                    onChange: (event)=>setGeneratePswState({\n                            ...generatePswState,\n                            date: event.currentTarget.value\n                        })\n                }, void 0, false, {\n                    fileName: \"/home/nabin/programming/android/offlinepass/web/src/components/generate-password/generate-password-view.tsx\",\n                    lineNumber: 97,\n                    columnNumber: 9\n                }, this)\n            }, void 0, false, {\n                fileName: \"/home/nabin/programming/android/offlinepass/web/src/components/generate-password/generate-password-view.tsx\",\n                lineNumber: 96,\n                columnNumber: 7\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxDEV)(MuiStyledTextField, {\n                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxDEV)(_mui_material__WEBPACK_IMPORTED_MODULE_7__.TextField, {\n                    id: \"retries\",\n                    type: \"number\",\n                    value: generatePswState.retries,\n                    label: \"Retries\",\n                    variant: \"outlined\",\n                    fullWidth: true,\n                    onChange: (event)=>setGeneratePswState({\n                            ...generatePswState,\n                            retries: parseInt(event.currentTarget.value)\n                        }),\n                    inputProps: {\n                        inputMode: \"numeric\",\n                        pattern: \"[0-9]*\"\n                    }\n                }, void 0, false, {\n                    fileName: \"/home/nabin/programming/android/offlinepass/web/src/components/generate-password/generate-password-view.tsx\",\n                    lineNumber: 112,\n                    columnNumber: 9\n                }, this)\n            }, void 0, false, {\n                fileName: \"/home/nabin/programming/android/offlinepass/web/src/components/generate-password/generate-password-view.tsx\",\n                lineNumber: 111,\n                columnNumber: 7\n            }, this)\n        ]\n    }, void 0, true);\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxDEV)(\"div\", {\n        className: \"w-full h-full space-y-8\",\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxDEV)(\"div\", {\n                className: \"flex flex-col items-center space-y-2\",\n                children: [\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxDEV)(\"p\", {\n                        className: \"font-bold text-2xl\",\n                        children: \"Generate Password\"\n                    }, void 0, false, {\n                        fileName: \"/home/nabin/programming/android/offlinepass/web/src/components/generate-password/generate-password-view.tsx\",\n                        lineNumber: 134,\n                        columnNumber: 9\n                    }, this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxDEV)(\"p\", {\n                        className: \"text-sm text-gray-500\",\n                        children: \"Please enter your Master Security Key (MSK)\"\n                    }, void 0, false, {\n                        fileName: \"/home/nabin/programming/android/offlinepass/web/src/components/generate-password/generate-password-view.tsx\",\n                        lineNumber: 135,\n                        columnNumber: 9\n                    }, this)\n                ]\n            }, void 0, true, {\n                fileName: \"/home/nabin/programming/android/offlinepass/web/src/components/generate-password/generate-password-view.tsx\",\n                lineNumber: 133,\n                columnNumber: 7\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxDEV)(\"div\", {\n                children: [\n                    mskFormComponent,\n                    isMskVerified && generatePasswordFormComponent\n                ]\n            }, void 0, true, {\n                fileName: \"/home/nabin/programming/android/offlinepass/web/src/components/generate-password/generate-password-view.tsx\",\n                lineNumber: 140,\n                columnNumber: 7\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxDEV)(_ui_button_button__WEBPACK_IMPORTED_MODULE_4__[\"default\"], {\n                isLoading: isLoading,\n                fullWidth: true,\n                onClick: handleGeneratePassword,\n                children: isMskVerified ? \"Generate Password\" : \"Done\"\n            }, void 0, false, {\n                fileName: \"/home/nabin/programming/android/offlinepass/web/src/components/generate-password/generate-password-view.tsx\",\n                lineNumber: 144,\n                columnNumber: 7\n            }, this),\n            !isMskVerified && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxDEV)(_ui_links_anchor_link__WEBPACK_IMPORTED_MODULE_6__[\"default\"], {\n                href: \"/msk/reset\",\n                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxDEV)(\"p\", {\n                    className: \"text-sm text-gray-500\",\n                    children: \"Don't have MSK? Generate one\"\n                }, void 0, false, {\n                    fileName: \"/home/nabin/programming/android/offlinepass/web/src/components/generate-password/generate-password-view.tsx\",\n                    lineNumber: 149,\n                    columnNumber: 11\n                }, this)\n            }, void 0, false, {\n                fileName: \"/home/nabin/programming/android/offlinepass/web/src/components/generate-password/generate-password-view.tsx\",\n                lineNumber: 148,\n                columnNumber: 9\n            }, this)\n        ]\n    }, void 0, true, {\n        fileName: \"/home/nabin/programming/android/offlinepass/web/src/components/generate-password/generate-password-view.tsx\",\n        lineNumber: 132,\n        columnNumber: 5\n    }, this);\n}\n_s(GeneratePasswordView, \"hbpoT5CKZBpMFRjHmYNKRzwgcsI=\", false, function() {\n    return [\n        _app_lib_hooks_use_form_status__WEBPACK_IMPORTED_MODULE_5__.useFormStatus\n    ];\n});\n_c1 = GeneratePasswordView;\nvar _c, _c1;\n$RefreshReg$(_c, \"MuiStyledTextField\");\n$RefreshReg$(_c1, \"GeneratePasswordView\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports on update so we can compare the boundary\n                // signatures.\n                module.hot.dispose(function (data) {\n                    data.prevExports = currentExports;\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevExports !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevExports !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvY29tcG9uZW50cy9nZW5lcmF0ZS1wYXNzd29yZC9nZW5lcmF0ZS1wYXNzd29yZC12aWV3LnRzeC5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFBOzs7Ozs7Ozs7Ozs7QUFBd0M7QUFDRTtBQUNMO0FBQ0k7QUFDc0I7QUFDZDtBQUVqRCxNQUFNTyxxQkFBcUJKLDJEQUFVO0tBQS9CSTtBQVlTLFNBQVNFLHVCQUF1Qjs7SUFDN0MsTUFBTSxDQUFDQyxlQUFlQyxpQkFBaUIsR0FBR1YsK0NBQVFBLENBQUMsS0FBSztJQUN4RCxNQUFNLEVBQUVXLFVBQVMsRUFBRUMsYUFBWSxFQUFFLEdBQUdSLDZFQUFhQTtJQUNqRCxNQUFNLENBQUNTLGtCQUFrQkMsb0JBQW9CLEdBQUdkLCtDQUFRQSxDQUFtQjtRQUN6RWUsS0FBSztRQUNMQyxNQUFNO1FBQ05DLGVBQWU7UUFDZkMsTUFBTTtRQUNOQyxTQUFTO0lBQ1g7SUFFQSxNQUFNQyx5QkFBeUIsSUFBTTtRQUNuQyxJQUFJWCxlQUFlO1lBQ2pCWSxRQUFRQyxHQUFHLENBQUM7UUFDZCxPQUFPLElBQUlULGlCQUFpQkUsR0FBRyxLQUFLLElBQUk7WUFDdENILGFBQWEsSUFBSTtZQUNqQlcsV0FBVyxJQUFNO2dCQUNmYixpQkFBaUIsSUFBSTtnQkFDckJFLGFBQWEsS0FBSztZQUNwQixHQUFHO1FBQ0wsQ0FBQztJQUNIO0lBRUEsTUFBTVksaUNBQ0o7a0JBQ0UsNEVBQUNsQjtzQkFDQyw0RUFBQ0wsb0RBQVNBO2dCQUNSd0IsSUFBRztnQkFDSEMsT0FBT2IsaUJBQWlCRSxHQUFHO2dCQUMzQlksT0FBTTtnQkFDTkMsU0FBUTtnQkFDUkMsU0FBUztnQkFDVEMsVUFBVXJCO2dCQUNWc0IsVUFBVSxDQUFDQyxRQUNUbEIsb0JBQW9CO3dCQUNsQixHQUFHRCxnQkFBZ0I7d0JBQ25CRSxLQUFLaUIsTUFBTUMsYUFBYSxDQUFDUCxLQUFLO29CQUNoQzs7Ozs7Ozs7Ozs7O0lBT1YsTUFBTVEsOENBQ0o7OzBCQUNFLDhEQUFDNUI7MEJBQ0MsNEVBQUNMLG9EQUFTQTtvQkFDUndCLElBQUc7b0JBQ0hDLE9BQU9iLGlCQUFpQkcsSUFBSTtvQkFDNUJXLE9BQU07b0JBQ05DLFNBQVE7b0JBQ1JDLFNBQVM7b0JBQ1RFLFVBQVUsQ0FBQ0MsUUFDVGxCLG9CQUFvQjs0QkFDbEIsR0FBR0QsZ0JBQWdCOzRCQUNuQkcsTUFBTWdCLE1BQU1DLGFBQWEsQ0FBQ1AsS0FBSzt3QkFDakM7Ozs7Ozs7Ozs7OzBCQUlOLDhEQUFDcEI7MEJBQ0MsNEVBQUNMLG9EQUFTQTtvQkFDUndCLElBQUc7b0JBQ0hDLE9BQU9iLGlCQUFpQkksYUFBYTtvQkFDckNVLE9BQU07b0JBQ05DLFNBQVE7b0JBQ1JDLFNBQVM7b0JBQ1RFLFVBQVUsQ0FBQ0MsUUFDVGxCLG9CQUFvQjs0QkFDbEIsR0FBR0QsZ0JBQWdCOzRCQUNuQkksZUFBZWUsTUFBTUMsYUFBYSxDQUFDUCxLQUFLO3dCQUMxQzs7Ozs7Ozs7Ozs7MEJBSU4sOERBQUNwQjswQkFDQyw0RUFBQ0wsb0RBQVNBO29CQUNSd0IsSUFBRztvQkFDSEMsT0FBT2IsaUJBQWlCSyxJQUFJO29CQUM1QlMsT0FBTTtvQkFDTkMsU0FBUTtvQkFDUkMsU0FBUztvQkFDVEUsVUFBVSxDQUFDQyxRQUNUbEIsb0JBQW9COzRCQUNsQixHQUFHRCxnQkFBZ0I7NEJBQ25CSyxNQUFNYyxNQUFNQyxhQUFhLENBQUNQLEtBQUs7d0JBQ2pDOzs7Ozs7Ozs7OzswQkFJTiw4REFBQ3BCOzBCQUNDLDRFQUFDTCxvREFBU0E7b0JBQ1J3QixJQUFHO29CQUNIVSxNQUFLO29CQUNMVCxPQUFPYixpQkFBaUJNLE9BQU87b0JBQy9CUSxPQUFNO29CQUNOQyxTQUFRO29CQUNSQyxTQUFTO29CQUNURSxVQUFVLENBQUNDLFFBQ1RsQixvQkFBb0I7NEJBQ2xCLEdBQUdELGdCQUFnQjs0QkFDbkJNLFNBQVNpQixTQUFTSixNQUFNQyxhQUFhLENBQUNQLEtBQUs7d0JBQzdDO29CQUVGVyxZQUFZO3dCQUFFQyxXQUFXO3dCQUFXQyxTQUFTO29CQUFTOzs7Ozs7Ozs7Ozs7O0lBTTlELHFCQUNFLDhEQUFDaEM7UUFBSWlDLFdBQVU7OzBCQUNiLDhEQUFDakM7Z0JBQUlpQyxXQUFVOztrQ0FDYiw4REFBQ0M7d0JBQUVELFdBQVU7a0NBQXFCOzs7Ozs7a0NBQ2xDLDhEQUFDQzt3QkFBRUQsV0FBVTtrQ0FBd0I7Ozs7Ozs7Ozs7OzswQkFLdkMsOERBQUNqQzs7b0JBQ0VpQjtvQkFDQWYsaUJBQWlCeUI7Ozs7Ozs7MEJBRXBCLDhEQUFDL0IseURBQU1BO2dCQUFDUSxXQUFXQTtnQkFBV2tCLFNBQVM7Z0JBQUNhLFNBQVN0QjswQkFDOUNYLGdCQUFnQixzQkFBc0IsTUFBTTs7Ozs7O1lBRTlDLENBQUNBLCtCQUNBLDhEQUFDSiw2REFBVUE7Z0JBQUNzQyxNQUFNOzBCQUNoQiw0RUFBQ0Y7b0JBQUVELFdBQVU7OEJBQXdCOzs7Ozs7Ozs7Ozs7Ozs7OztBQUsvQyxDQUFDO0dBdEl1QmhDOztRQUVjSix5RUFBYUE7OztNQUYzQkkiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vc3JjL2NvbXBvbmVudHMvZ2VuZXJhdGUtcGFzc3dvcmQvZ2VuZXJhdGUtcGFzc3dvcmQtdmlldy50c3g/ZDUxYyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHsgdXNlU3RhdGUgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IFRleHRGaWVsZCB9IGZyb20gXCJAbXVpL21hdGVyaWFsXCI7XG5pbXBvcnQgc3R5bGVkIGZyb20gXCJAZW1vdGlvbi9zdHlsZWRcIjtcbmltcG9ydCBCdXR0b24gZnJvbSBcIi4uL3VpL2J1dHRvbi9idXR0b25cIjtcbmltcG9ydCB7IHVzZUZvcm1TdGF0dXMgfSBmcm9tIFwiQGFwcC9saWIvaG9va3MvdXNlLWZvcm0tc3RhdHVzXCI7XG5pbXBvcnQgQW5jaG9yTGluayBmcm9tIFwiLi4vdWkvbGlua3MvYW5jaG9yLWxpbmtcIjtcblxuY29uc3QgTXVpU3R5bGVkVGV4dEZpZWxkID0gc3R5bGVkLmRpdmBcbiAgbWFyZ2luLWJvdHRvbTogMTJweDtcbmA7XG5cbmludGVyZmFjZSBHZW5lcmF0ZVBzd1N0YXRlIHtcbiAgbXNrOiBzdHJpbmc7XG4gIGhvc3Q6IHN0cmluZztcbiAgdXNlcm5hbWVFbWFpbDogc3RyaW5nO1xuICBkYXRlOiBzdHJpbmc7XG4gIHJldHJpZXM6IG51bWJlcjtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gR2VuZXJhdGVQYXNzd29yZFZpZXcoKSB7XG4gIGNvbnN0IFtpc01za1ZlcmlmaWVkLCBzZXRJc01za1ZlcmlmaWVkXSA9IHVzZVN0YXRlKGZhbHNlKTtcbiAgY29uc3QgeyBpc0xvYWRpbmcsIHNldElzTG9hZGluZyB9ID0gdXNlRm9ybVN0YXR1cygpO1xuICBjb25zdCBbZ2VuZXJhdGVQc3dTdGF0ZSwgc2V0R2VuZXJhdGVQc3dTdGF0ZV0gPSB1c2VTdGF0ZTxHZW5lcmF0ZVBzd1N0YXRlPih7XG4gICAgbXNrOiBcIlwiLFxuICAgIGhvc3Q6IFwiXCIsXG4gICAgdXNlcm5hbWVFbWFpbDogXCJcIixcbiAgICBkYXRlOiBcIlwiLFxuICAgIHJldHJpZXM6IDAsXG4gIH0pO1xuXG4gIGNvbnN0IGhhbmRsZUdlbmVyYXRlUGFzc3dvcmQgPSAoKSA9PiB7XG4gICAgaWYgKGlzTXNrVmVyaWZpZWQpIHtcbiAgICAgIGNvbnNvbGUubG9nKFwiUGFzc3dvcmQgZ2VuZXJhdGVkXCIpO1xuICAgIH0gZWxzZSBpZiAoZ2VuZXJhdGVQc3dTdGF0ZS5tc2sgIT09IFwiXCIpIHtcbiAgICAgIHNldElzTG9hZGluZyh0cnVlKTtcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICBzZXRJc01za1ZlcmlmaWVkKHRydWUpO1xuICAgICAgICBzZXRJc0xvYWRpbmcoZmFsc2UpO1xuICAgICAgfSwgMjAwMCk7XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IG1za0Zvcm1Db21wb25lbnQgPSAoXG4gICAgPD5cbiAgICAgIDxNdWlTdHlsZWRUZXh0RmllbGQ+XG4gICAgICAgIDxUZXh0RmllbGRcbiAgICAgICAgICBpZD1cImlucHV0LW1za1wiXG4gICAgICAgICAgdmFsdWU9e2dlbmVyYXRlUHN3U3RhdGUubXNrfVxuICAgICAgICAgIGxhYmVsPVwiTWFzdGVyIFNlY3VyaXR5IEtleShNU0spXCJcbiAgICAgICAgICB2YXJpYW50PVwib3V0bGluZWRcIlxuICAgICAgICAgIGZ1bGxXaWR0aFxuICAgICAgICAgIGRpc2FibGVkPXtpc01za1ZlcmlmaWVkfVxuICAgICAgICAgIG9uQ2hhbmdlPXsoZXZlbnQpID0+XG4gICAgICAgICAgICBzZXRHZW5lcmF0ZVBzd1N0YXRlKHtcbiAgICAgICAgICAgICAgLi4uZ2VuZXJhdGVQc3dTdGF0ZSxcbiAgICAgICAgICAgICAgbXNrOiBldmVudC5jdXJyZW50VGFyZ2V0LnZhbHVlLFxuICAgICAgICAgICAgfSlcbiAgICAgICAgICB9XG4gICAgICAgIC8+XG4gICAgICA8L011aVN0eWxlZFRleHRGaWVsZD5cbiAgICA8Lz5cbiAgKTtcblxuICBjb25zdCBnZW5lcmF0ZVBhc3N3b3JkRm9ybUNvbXBvbmVudCA9IChcbiAgICA8PlxuICAgICAgPE11aVN0eWxlZFRleHRGaWVsZD5cbiAgICAgICAgPFRleHRGaWVsZFxuICAgICAgICAgIGlkPVwiaG9zdFwiXG4gICAgICAgICAgdmFsdWU9e2dlbmVyYXRlUHN3U3RhdGUuaG9zdH1cbiAgICAgICAgICBsYWJlbD1cIkhvc3RcIlxuICAgICAgICAgIHZhcmlhbnQ9XCJvdXRsaW5lZFwiXG4gICAgICAgICAgZnVsbFdpZHRoXG4gICAgICAgICAgb25DaGFuZ2U9eyhldmVudCkgPT5cbiAgICAgICAgICAgIHNldEdlbmVyYXRlUHN3U3RhdGUoe1xuICAgICAgICAgICAgICAuLi5nZW5lcmF0ZVBzd1N0YXRlLFxuICAgICAgICAgICAgICBob3N0OiBldmVudC5jdXJyZW50VGFyZ2V0LnZhbHVlLFxuICAgICAgICAgICAgfSlcbiAgICAgICAgICB9XG4gICAgICAgIC8+XG4gICAgICA8L011aVN0eWxlZFRleHRGaWVsZD5cbiAgICAgIDxNdWlTdHlsZWRUZXh0RmllbGQ+XG4gICAgICAgIDxUZXh0RmllbGRcbiAgICAgICAgICBpZD1cInVzZXJuYW1lL2VtYWlsXCJcbiAgICAgICAgICB2YWx1ZT17Z2VuZXJhdGVQc3dTdGF0ZS51c2VybmFtZUVtYWlsfVxuICAgICAgICAgIGxhYmVsPVwiVXNlcm5hbWUvRW1haWxcIlxuICAgICAgICAgIHZhcmlhbnQ9XCJvdXRsaW5lZFwiXG4gICAgICAgICAgZnVsbFdpZHRoXG4gICAgICAgICAgb25DaGFuZ2U9eyhldmVudCkgPT5cbiAgICAgICAgICAgIHNldEdlbmVyYXRlUHN3U3RhdGUoe1xuICAgICAgICAgICAgICAuLi5nZW5lcmF0ZVBzd1N0YXRlLFxuICAgICAgICAgICAgICB1c2VybmFtZUVtYWlsOiBldmVudC5jdXJyZW50VGFyZ2V0LnZhbHVlLFxuICAgICAgICAgICAgfSlcbiAgICAgICAgICB9XG4gICAgICAgIC8+XG4gICAgICA8L011aVN0eWxlZFRleHRGaWVsZD5cbiAgICAgIDxNdWlTdHlsZWRUZXh0RmllbGQ+XG4gICAgICAgIDxUZXh0RmllbGRcbiAgICAgICAgICBpZD1cImRhdGVcIlxuICAgICAgICAgIHZhbHVlPXtnZW5lcmF0ZVBzd1N0YXRlLmRhdGV9XG4gICAgICAgICAgbGFiZWw9XCJEYXRlXCJcbiAgICAgICAgICB2YXJpYW50PVwib3V0bGluZWRcIlxuICAgICAgICAgIGZ1bGxXaWR0aFxuICAgICAgICAgIG9uQ2hhbmdlPXsoZXZlbnQpID0+XG4gICAgICAgICAgICBzZXRHZW5lcmF0ZVBzd1N0YXRlKHtcbiAgICAgICAgICAgICAgLi4uZ2VuZXJhdGVQc3dTdGF0ZSxcbiAgICAgICAgICAgICAgZGF0ZTogZXZlbnQuY3VycmVudFRhcmdldC52YWx1ZSxcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgfVxuICAgICAgICAvPlxuICAgICAgPC9NdWlTdHlsZWRUZXh0RmllbGQ+XG4gICAgICA8TXVpU3R5bGVkVGV4dEZpZWxkPlxuICAgICAgICA8VGV4dEZpZWxkXG4gICAgICAgICAgaWQ9XCJyZXRyaWVzXCJcbiAgICAgICAgICB0eXBlPVwibnVtYmVyXCJcbiAgICAgICAgICB2YWx1ZT17Z2VuZXJhdGVQc3dTdGF0ZS5yZXRyaWVzfVxuICAgICAgICAgIGxhYmVsPVwiUmV0cmllc1wiXG4gICAgICAgICAgdmFyaWFudD1cIm91dGxpbmVkXCJcbiAgICAgICAgICBmdWxsV2lkdGhcbiAgICAgICAgICBvbkNoYW5nZT17KGV2ZW50KSA9PlxuICAgICAgICAgICAgc2V0R2VuZXJhdGVQc3dTdGF0ZSh7XG4gICAgICAgICAgICAgIC4uLmdlbmVyYXRlUHN3U3RhdGUsXG4gICAgICAgICAgICAgIHJldHJpZXM6IHBhcnNlSW50KGV2ZW50LmN1cnJlbnRUYXJnZXQudmFsdWUpLFxuICAgICAgICAgICAgfSlcbiAgICAgICAgICB9XG4gICAgICAgICAgaW5wdXRQcm9wcz17eyBpbnB1dE1vZGU6IFwibnVtZXJpY1wiLCBwYXR0ZXJuOiBcIlswLTldKlwiIH19XG4gICAgICAgIC8+XG4gICAgICA8L011aVN0eWxlZFRleHRGaWVsZD5cbiAgICA8Lz5cbiAgKTtcblxuICByZXR1cm4gKFxuICAgIDxkaXYgY2xhc3NOYW1lPVwidy1mdWxsIGgtZnVsbCBzcGFjZS15LThcIj5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBmbGV4LWNvbCBpdGVtcy1jZW50ZXIgc3BhY2UteS0yXCI+XG4gICAgICAgIDxwIGNsYXNzTmFtZT1cImZvbnQtYm9sZCB0ZXh0LTJ4bFwiPkdlbmVyYXRlIFBhc3N3b3JkPC9wPlxuICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LXNtIHRleHQtZ3JheS01MDBcIj5cbiAgICAgICAgICBQbGVhc2UgZW50ZXIgeW91ciBNYXN0ZXIgU2VjdXJpdHkgS2V5IChNU0spXG4gICAgICAgIDwvcD5cbiAgICAgIDwvZGl2PlxuXG4gICAgICA8ZGl2PlxuICAgICAgICB7bXNrRm9ybUNvbXBvbmVudH1cbiAgICAgICAge2lzTXNrVmVyaWZpZWQgJiYgZ2VuZXJhdGVQYXNzd29yZEZvcm1Db21wb25lbnR9XG4gICAgICA8L2Rpdj5cbiAgICAgIDxCdXR0b24gaXNMb2FkaW5nPXtpc0xvYWRpbmd9IGZ1bGxXaWR0aCBvbkNsaWNrPXtoYW5kbGVHZW5lcmF0ZVBhc3N3b3JkfT5cbiAgICAgICAge2lzTXNrVmVyaWZpZWQgPyBcIkdlbmVyYXRlIFBhc3N3b3JkXCIgOiBcIkRvbmVcIn1cbiAgICAgIDwvQnV0dG9uPlxuICAgICAgeyFpc01za1ZlcmlmaWVkICYmIChcbiAgICAgICAgPEFuY2hvckxpbmsgaHJlZj17XCIvbXNrL3Jlc2V0XCJ9PlxuICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQtc20gdGV4dC1ncmF5LTUwMFwiPkRvbid0IGhhdmUgTVNLPyBHZW5lcmF0ZSBvbmU8L3A+XG4gICAgICAgIDwvQW5jaG9yTGluaz5cbiAgICAgICl9XG4gICAgPC9kaXY+XG4gICk7XG59XG4iXSwibmFtZXMiOlsiUmVhY3QiLCJ1c2VTdGF0ZSIsIlRleHRGaWVsZCIsInN0eWxlZCIsIkJ1dHRvbiIsInVzZUZvcm1TdGF0dXMiLCJBbmNob3JMaW5rIiwiTXVpU3R5bGVkVGV4dEZpZWxkIiwiZGl2IiwiR2VuZXJhdGVQYXNzd29yZFZpZXciLCJpc01za1ZlcmlmaWVkIiwic2V0SXNNc2tWZXJpZmllZCIsImlzTG9hZGluZyIsInNldElzTG9hZGluZyIsImdlbmVyYXRlUHN3U3RhdGUiLCJzZXRHZW5lcmF0ZVBzd1N0YXRlIiwibXNrIiwiaG9zdCIsInVzZXJuYW1lRW1haWwiLCJkYXRlIiwicmV0cmllcyIsImhhbmRsZUdlbmVyYXRlUGFzc3dvcmQiLCJjb25zb2xlIiwibG9nIiwic2V0VGltZW91dCIsIm1za0Zvcm1Db21wb25lbnQiLCJpZCIsInZhbHVlIiwibGFiZWwiLCJ2YXJpYW50IiwiZnVsbFdpZHRoIiwiZGlzYWJsZWQiLCJvbkNoYW5nZSIsImV2ZW50IiwiY3VycmVudFRhcmdldCIsImdlbmVyYXRlUGFzc3dvcmRGb3JtQ29tcG9uZW50IiwidHlwZSIsInBhcnNlSW50IiwiaW5wdXRQcm9wcyIsImlucHV0TW9kZSIsInBhdHRlcm4iLCJjbGFzc05hbWUiLCJwIiwib25DbGljayIsImhyZWYiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/components/generate-password/generate-password-view.tsx\n"));

/***/ })

});