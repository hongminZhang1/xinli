"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "app/api/admin/settings/route";
exports.ids = ["app/api/admin/settings/route"];
exports.modules = {

/***/ "@prisma/client":
/*!*********************************!*\
  !*** external "@prisma/client" ***!
  \*********************************/
/***/ ((module) => {

module.exports = require("@prisma/client");

/***/ }),

/***/ "bcrypt":
/*!*************************!*\
  !*** external "bcrypt" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("bcrypt");

/***/ }),

/***/ "next/dist/compiled/next-server/app-page.runtime.dev.js":
/*!*************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-page.runtime.dev.js" ***!
  \*************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/compiled/next-server/app-page.runtime.dev.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-route.runtime.dev.js":
/*!**************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-route.runtime.dev.js" ***!
  \**************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/compiled/next-server/app-route.runtime.dev.js");

/***/ }),

/***/ "../../client/components/action-async-storage.external":
/*!**********************************************************************************!*\
  !*** external "next/dist\\client\\components\\action-async-storage.external.js" ***!
  \**********************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist\\client\\components\\action-async-storage.external.js");

/***/ }),

/***/ "../../client/components/request-async-storage.external":
/*!***********************************************************************************!*\
  !*** external "next/dist\\client\\components\\request-async-storage.external.js" ***!
  \***********************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist\\client\\components\\request-async-storage.external.js");

/***/ }),

/***/ "../../client/components/static-generation-async-storage.external":
/*!*********************************************************************************************!*\
  !*** external "next/dist\\client\\components\\static-generation-async-storage.external.js" ***!
  \*********************************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist\\client\\components\\static-generation-async-storage.external.js");

/***/ }),

/***/ "assert":
/*!*************************!*\
  !*** external "assert" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("assert");

/***/ }),

/***/ "buffer":
/*!*************************!*\
  !*** external "buffer" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("buffer");

/***/ }),

/***/ "crypto":
/*!*************************!*\
  !*** external "crypto" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("crypto");

/***/ }),

/***/ "events":
/*!*************************!*\
  !*** external "events" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("events");

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/***/ ((module) => {

module.exports = require("fs");

/***/ }),

/***/ "http":
/*!***********************!*\
  !*** external "http" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("http");

/***/ }),

/***/ "https":
/*!************************!*\
  !*** external "https" ***!
  \************************/
/***/ ((module) => {

module.exports = require("https");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("path");

/***/ }),

/***/ "querystring":
/*!******************************!*\
  !*** external "querystring" ***!
  \******************************/
/***/ ((module) => {

module.exports = require("querystring");

/***/ }),

/***/ "url":
/*!**********************!*\
  !*** external "url" ***!
  \**********************/
/***/ ((module) => {

module.exports = require("url");

/***/ }),

/***/ "util":
/*!***********************!*\
  !*** external "util" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("util");

/***/ }),

/***/ "zlib":
/*!***********************!*\
  !*** external "zlib" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("zlib");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fadmin%2Fsettings%2Froute&page=%2Fapi%2Fadmin%2Fsettings%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fadmin%2Fsettings%2Froute.ts&appDir=D%3A%5Cxinli%5Csrc%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=D%3A%5Cxinli&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fadmin%2Fsettings%2Froute&page=%2Fapi%2Fadmin%2Fsettings%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fadmin%2Fsettings%2Froute.ts&appDir=D%3A%5Cxinli%5Csrc%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=D%3A%5Cxinli&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   headerHooks: () => (/* binding */ headerHooks),\n/* harmony export */   originalPathname: () => (/* binding */ originalPathname),\n/* harmony export */   requestAsyncStorage: () => (/* binding */ requestAsyncStorage),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   staticGenerationAsyncStorage: () => (/* binding */ staticGenerationAsyncStorage),\n/* harmony export */   staticGenerationBailout: () => (/* binding */ staticGenerationBailout)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/future/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/future/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/future/route-kind */ \"(rsc)/./node_modules/next/dist/server/future/route-kind.js\");\n/* harmony import */ var D_xinli_src_app_api_admin_settings_route_ts__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./src/app/api/admin/settings/route.ts */ \"(rsc)/./src/app/api/admin/settings/route.ts\");\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/admin/settings/route\",\n        pathname: \"/api/admin/settings\",\n        filename: \"route\",\n        bundlePath: \"app/api/admin/settings/route\"\n    },\n    resolvedPagePath: \"D:\\\\xinli\\\\src\\\\app\\\\api\\\\admin\\\\settings\\\\route.ts\",\n    nextConfigOutput,\n    userland: D_xinli_src_app_api_admin_settings_route_ts__WEBPACK_IMPORTED_MODULE_2__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { requestAsyncStorage, staticGenerationAsyncStorage, serverHooks, headerHooks, staticGenerationBailout } = routeModule;\nconst originalPathname = \"/api/admin/settings/route\";\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIuanM/bmFtZT1hcHAlMkZhcGklMkZhZG1pbiUyRnNldHRpbmdzJTJGcm91dGUmcGFnZT0lMkZhcGklMkZhZG1pbiUyRnNldHRpbmdzJTJGcm91dGUmYXBwUGF0aHM9JnBhZ2VQYXRoPXByaXZhdGUtbmV4dC1hcHAtZGlyJTJGYXBpJTJGYWRtaW4lMkZzZXR0aW5ncyUyRnJvdXRlLnRzJmFwcERpcj1EJTNBJTVDeGlubGklNUNzcmMlNUNhcHAmcGFnZUV4dGVuc2lvbnM9dHN4JnBhZ2VFeHRlbnNpb25zPXRzJnBhZ2VFeHRlbnNpb25zPWpzeCZwYWdlRXh0ZW5zaW9ucz1qcyZyb290RGlyPUQlM0ElNUN4aW5saSZpc0Rldj10cnVlJnRzY29uZmlnUGF0aD10c2NvbmZpZy5qc29uJmJhc2VQYXRoPSZhc3NldFByZWZpeD0mbmV4dENvbmZpZ091dHB1dD0mcHJlZmVycmVkUmVnaW9uPSZtaWRkbGV3YXJlQ29uZmlnPWUzMCUzRCEiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBc0c7QUFDdkM7QUFDaUI7QUFDaEY7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLGdIQUFtQjtBQUMzQztBQUNBLGNBQWMseUVBQVM7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLFlBQVk7QUFDWixDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0EsUUFBUSx1R0FBdUc7QUFDL0c7QUFDaUo7O0FBRWpKIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8veGlubGkvP2QzNjYiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQXBwUm91dGVSb3V0ZU1vZHVsZSB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL2Z1dHVyZS9yb3V0ZS1tb2R1bGVzL2FwcC1yb3V0ZS9tb2R1bGUuY29tcGlsZWRcIjtcbmltcG9ydCB7IFJvdXRlS2luZCB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL2Z1dHVyZS9yb3V0ZS1raW5kXCI7XG5pbXBvcnQgKiBhcyB1c2VybGFuZCBmcm9tIFwiRDpcXFxceGlubGlcXFxcc3JjXFxcXGFwcFxcXFxhcGlcXFxcYWRtaW5cXFxcc2V0dGluZ3NcXFxccm91dGUudHNcIjtcbi8vIFdlIGluamVjdCB0aGUgbmV4dENvbmZpZ091dHB1dCBoZXJlIHNvIHRoYXQgd2UgY2FuIHVzZSB0aGVtIGluIHRoZSByb3V0ZVxuLy8gbW9kdWxlLlxuY29uc3QgbmV4dENvbmZpZ091dHB1dCA9IFwiXCJcbmNvbnN0IHJvdXRlTW9kdWxlID0gbmV3IEFwcFJvdXRlUm91dGVNb2R1bGUoe1xuICAgIGRlZmluaXRpb246IHtcbiAgICAgICAga2luZDogUm91dGVLaW5kLkFQUF9ST1VURSxcbiAgICAgICAgcGFnZTogXCIvYXBpL2FkbWluL3NldHRpbmdzL3JvdXRlXCIsXG4gICAgICAgIHBhdGhuYW1lOiBcIi9hcGkvYWRtaW4vc2V0dGluZ3NcIixcbiAgICAgICAgZmlsZW5hbWU6IFwicm91dGVcIixcbiAgICAgICAgYnVuZGxlUGF0aDogXCJhcHAvYXBpL2FkbWluL3NldHRpbmdzL3JvdXRlXCJcbiAgICB9LFxuICAgIHJlc29sdmVkUGFnZVBhdGg6IFwiRDpcXFxceGlubGlcXFxcc3JjXFxcXGFwcFxcXFxhcGlcXFxcYWRtaW5cXFxcc2V0dGluZ3NcXFxccm91dGUudHNcIixcbiAgICBuZXh0Q29uZmlnT3V0cHV0LFxuICAgIHVzZXJsYW5kXG59KTtcbi8vIFB1bGwgb3V0IHRoZSBleHBvcnRzIHRoYXQgd2UgbmVlZCB0byBleHBvc2UgZnJvbSB0aGUgbW9kdWxlLiBUaGlzIHNob3VsZFxuLy8gYmUgZWxpbWluYXRlZCB3aGVuIHdlJ3ZlIG1vdmVkIHRoZSBvdGhlciByb3V0ZXMgdG8gdGhlIG5ldyBmb3JtYXQuIFRoZXNlXG4vLyBhcmUgdXNlZCB0byBob29rIGludG8gdGhlIHJvdXRlLlxuY29uc3QgeyByZXF1ZXN0QXN5bmNTdG9yYWdlLCBzdGF0aWNHZW5lcmF0aW9uQXN5bmNTdG9yYWdlLCBzZXJ2ZXJIb29rcywgaGVhZGVySG9va3MsIHN0YXRpY0dlbmVyYXRpb25CYWlsb3V0IH0gPSByb3V0ZU1vZHVsZTtcbmNvbnN0IG9yaWdpbmFsUGF0aG5hbWUgPSBcIi9hcGkvYWRtaW4vc2V0dGluZ3Mvcm91dGVcIjtcbmV4cG9ydCB7IHJvdXRlTW9kdWxlLCByZXF1ZXN0QXN5bmNTdG9yYWdlLCBzdGF0aWNHZW5lcmF0aW9uQXN5bmNTdG9yYWdlLCBzZXJ2ZXJIb29rcywgaGVhZGVySG9va3MsIHN0YXRpY0dlbmVyYXRpb25CYWlsb3V0LCBvcmlnaW5hbFBhdGhuYW1lLCAgfTtcblxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9YXBwLXJvdXRlLmpzLm1hcCJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fadmin%2Fsettings%2Froute&page=%2Fapi%2Fadmin%2Fsettings%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fadmin%2Fsettings%2Froute.ts&appDir=D%3A%5Cxinli%5Csrc%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=D%3A%5Cxinli&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

/***/ }),

/***/ "(rsc)/./src/app/api/admin/settings/route.ts":
/*!*********************************************!*\
  !*** ./src/app/api/admin/settings/route.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   GET: () => (/* binding */ GET),\n/* harmony export */   POST: () => (/* binding */ POST)\n/* harmony export */ });\n/* harmony import */ var next_auth__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next-auth */ \"(rsc)/./node_modules/next-auth/index.js\");\n/* harmony import */ var next_auth__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_auth__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _auth_nextauth_route__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../auth/[...nextauth]/route */ \"(rsc)/./src/app/api/auth/[...nextauth]/route.ts\");\n/* harmony import */ var _lib_db__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/lib/db */ \"(rsc)/./src/lib/db.ts\");\n/* harmony import */ var next_dist_server_web_exports_next_response__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! next/dist/server/web/exports/next-response */ \"(rsc)/./node_modules/next/dist/server/web/exports/next-response.js\");\n/* harmony import */ var _lib_settings__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @/lib/settings */ \"(rsc)/./src/lib/settings.ts\");\n\n\n\n\n\n// 检查用户是否为管理员\nasync function checkAdminAuth() {\n    const session = await (0,next_auth__WEBPACK_IMPORTED_MODULE_0__.getServerSession)(_auth_nextauth_route__WEBPACK_IMPORTED_MODULE_1__.authOptions);\n    if (!session?.user?.id) {\n        return {\n            error: \"未授权\",\n            status: 401\n        };\n    }\n    const user = await _lib_db__WEBPACK_IMPORTED_MODULE_2__.prisma.user.findUnique({\n        where: {\n            id: session.user.id\n        },\n        select: {\n            role: true\n        }\n    });\n    if (!user || user.role !== \"ADMIN\") {\n        return {\n            error: \"权限不足\",\n            status: 403\n        };\n    }\n    return {\n        success: true\n    };\n}\n// GET - 获取系统设置\nasync function GET() {\n    const authCheck = await checkAdminAuth();\n    if (authCheck.error) {\n        return next_dist_server_web_exports_next_response__WEBPACK_IMPORTED_MODULE_3__[\"default\"].json({\n            error: authCheck.error\n        }, {\n            status: authCheck.status\n        });\n    }\n    try {\n        const settings = (0,_lib_settings__WEBPACK_IMPORTED_MODULE_4__.getSettings)();\n        const settingsArray = Object.entries(settings).map(([key, value])=>({\n                id: key,\n                key,\n                value: String(value),\n                description: key === \"registration_enabled\" ? \"是否允许新用户注册\" : \"\",\n                updatedAt: new Date().toISOString()\n            }));\n        return next_dist_server_web_exports_next_response__WEBPACK_IMPORTED_MODULE_3__[\"default\"].json(settingsArray);\n    } catch (error) {\n        console.error(\"获取系统设置失败:\", error);\n        return next_dist_server_web_exports_next_response__WEBPACK_IMPORTED_MODULE_3__[\"default\"].json({\n            error: \"获取系统设置失败\"\n        }, {\n            status: 500\n        });\n    }\n}\n// POST - 更新系统设置\nasync function POST(request) {\n    const authCheck = await checkAdminAuth();\n    if (authCheck.error) {\n        return next_dist_server_web_exports_next_response__WEBPACK_IMPORTED_MODULE_3__[\"default\"].json({\n            error: authCheck.error\n        }, {\n            status: authCheck.status\n        });\n    }\n    try {\n        const { key, value } = await request.json();\n        if (!key || value === undefined) {\n            return next_dist_server_web_exports_next_response__WEBPACK_IMPORTED_MODULE_3__[\"default\"].json({\n                error: \"参数错误\"\n            }, {\n                status: 400\n            });\n        }\n        // 更新设置\n        const updatedSettings = (0,_lib_settings__WEBPACK_IMPORTED_MODULE_4__.updateSettings)({\n            [key]: value === \"true\"\n        });\n        const setting = {\n            id: key,\n            key,\n            value: String(value),\n            description: key === \"registration_enabled\" ? \"是否允许新用户注册\" : \"\",\n            updatedAt: new Date().toISOString()\n        };\n        return next_dist_server_web_exports_next_response__WEBPACK_IMPORTED_MODULE_3__[\"default\"].json(setting);\n    } catch (error) {\n        console.error(\"更新系统设置失败:\", error);\n        return next_dist_server_web_exports_next_response__WEBPACK_IMPORTED_MODULE_3__[\"default\"].json({\n            error: \"更新系统设置失败\"\n        }, {\n            status: 500\n        });\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9zcmMvYXBwL2FwaS9hZG1pbi9zZXR0aW5ncy9yb3V0ZS50cyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUE2QztBQUNnQjtBQUMzQjtBQUNTO0FBQ2tCO0FBRTdELGFBQWE7QUFDYixlQUFlTTtJQUNiLE1BQU1DLFVBQVUsTUFBTVAsMkRBQWdCQSxDQUFDQyw2REFBV0E7SUFFbEQsSUFBSSxDQUFDTSxTQUFTQyxNQUFNQyxJQUFJO1FBQ3RCLE9BQU87WUFBRUMsT0FBTztZQUFPQyxRQUFRO1FBQUk7SUFDckM7SUFFQSxNQUFNSCxPQUFPLE1BQU1OLDJDQUFNQSxDQUFDTSxJQUFJLENBQUNJLFVBQVUsQ0FBQztRQUN4Q0MsT0FBTztZQUFFSixJQUFJRixRQUFRQyxJQUFJLENBQUNDLEVBQUU7UUFBQztRQUM3QkssUUFBUTtZQUFFQyxNQUFNO1FBQUs7SUFDdkI7SUFFQSxJQUFJLENBQUNQLFFBQVFBLEtBQUtPLElBQUksS0FBSyxTQUFTO1FBQ2xDLE9BQU87WUFBRUwsT0FBTztZQUFRQyxRQUFRO1FBQUk7SUFDdEM7SUFFQSxPQUFPO1FBQUVLLFNBQVM7SUFBSztBQUN6QjtBQUVBLGVBQWU7QUFDUixlQUFlQztJQUNwQixNQUFNQyxZQUFZLE1BQU1aO0lBQ3hCLElBQUlZLFVBQVVSLEtBQUssRUFBRTtRQUNuQixPQUFPUCxrRkFBWUEsQ0FBQ2dCLElBQUksQ0FBQztZQUFFVCxPQUFPUSxVQUFVUixLQUFLO1FBQUMsR0FBRztZQUFFQyxRQUFRTyxVQUFVUCxNQUFNO1FBQUM7SUFDbEY7SUFFQSxJQUFJO1FBQ0YsTUFBTVMsV0FBV2hCLDBEQUFXQTtRQUU1QixNQUFNaUIsZ0JBQWdCQyxPQUFPQyxPQUFPLENBQUNILFVBQVVJLEdBQUcsQ0FBQyxDQUFDLENBQUNDLEtBQUtDLE1BQU0sR0FBTTtnQkFDcEVqQixJQUFJZ0I7Z0JBQ0pBO2dCQUNBQyxPQUFPQyxPQUFPRDtnQkFDZEUsYUFBYUgsUUFBUSx5QkFBeUIsY0FBYztnQkFDNURJLFdBQVcsSUFBSUMsT0FBT0MsV0FBVztZQUNuQztRQUVBLE9BQU81QixrRkFBWUEsQ0FBQ2dCLElBQUksQ0FBQ0U7SUFDM0IsRUFBRSxPQUFPWCxPQUFPO1FBQ2RzQixRQUFRdEIsS0FBSyxDQUFDLGFBQWFBO1FBQzNCLE9BQU9QLGtGQUFZQSxDQUFDZ0IsSUFBSSxDQUFDO1lBQUVULE9BQU87UUFBVyxHQUFHO1lBQUVDLFFBQVE7UUFBSTtJQUNoRTtBQUNGO0FBRUEsZ0JBQWdCO0FBQ1QsZUFBZXNCLEtBQUtDLE9BQWdCO0lBQ3pDLE1BQU1oQixZQUFZLE1BQU1aO0lBQ3hCLElBQUlZLFVBQVVSLEtBQUssRUFBRTtRQUNuQixPQUFPUCxrRkFBWUEsQ0FBQ2dCLElBQUksQ0FBQztZQUFFVCxPQUFPUSxVQUFVUixLQUFLO1FBQUMsR0FBRztZQUFFQyxRQUFRTyxVQUFVUCxNQUFNO1FBQUM7SUFDbEY7SUFFQSxJQUFJO1FBQ0YsTUFBTSxFQUFFYyxHQUFHLEVBQUVDLEtBQUssRUFBRSxHQUFHLE1BQU1RLFFBQVFmLElBQUk7UUFFekMsSUFBSSxDQUFDTSxPQUFPQyxVQUFVUyxXQUFXO1lBQy9CLE9BQU9oQyxrRkFBWUEsQ0FBQ2dCLElBQUksQ0FBQztnQkFBRVQsT0FBTztZQUFPLEdBQUc7Z0JBQUVDLFFBQVE7WUFBSTtRQUM1RDtRQUVBLE9BQU87UUFDUCxNQUFNeUIsa0JBQWtCL0IsNkRBQWNBLENBQUM7WUFBRSxDQUFDb0IsSUFBSSxFQUFFQyxVQUFVO1FBQU87UUFFakUsTUFBTVcsVUFBVTtZQUNkNUIsSUFBSWdCO1lBQ0pBO1lBQ0FDLE9BQU9DLE9BQU9EO1lBQ2RFLGFBQWFILFFBQVEseUJBQXlCLGNBQWM7WUFDNURJLFdBQVcsSUFBSUMsT0FBT0MsV0FBVztRQUNuQztRQUVBLE9BQU81QixrRkFBWUEsQ0FBQ2dCLElBQUksQ0FBQ2tCO0lBQzNCLEVBQUUsT0FBTzNCLE9BQU87UUFDZHNCLFFBQVF0QixLQUFLLENBQUMsYUFBYUE7UUFDM0IsT0FBT1Asa0ZBQVlBLENBQUNnQixJQUFJLENBQUM7WUFBRVQsT0FBTztRQUFXLEdBQUc7WUFBRUMsUUFBUTtRQUFJO0lBQ2hFO0FBQ0YiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly94aW5saS8uL3NyYy9hcHAvYXBpL2FkbWluL3NldHRpbmdzL3JvdXRlLnRzPzY0N2IiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgZ2V0U2VydmVyU2Vzc2lvbiB9IGZyb20gXCJuZXh0LWF1dGhcIjtcclxuaW1wb3J0IHsgYXV0aE9wdGlvbnMgfSBmcm9tIFwiLi4vLi4vYXV0aC9bLi4ubmV4dGF1dGhdL3JvdXRlXCI7XHJcbmltcG9ydCB7IHByaXNtYSB9IGZyb20gXCJAL2xpYi9kYlwiO1xyXG5pbXBvcnQgeyBOZXh0UmVzcG9uc2UgfSBmcm9tIFwibmV4dC9zZXJ2ZXJcIjtcclxuaW1wb3J0IHsgZ2V0U2V0dGluZ3MsIHVwZGF0ZVNldHRpbmdzIH0gZnJvbSBcIkAvbGliL3NldHRpbmdzXCI7XHJcblxyXG4vLyDmo4Dmn6XnlKjmiLfmmK/lkKbkuLrnrqHnkIblkZhcclxuYXN5bmMgZnVuY3Rpb24gY2hlY2tBZG1pbkF1dGgoKSB7XHJcbiAgY29uc3Qgc2Vzc2lvbiA9IGF3YWl0IGdldFNlcnZlclNlc3Npb24oYXV0aE9wdGlvbnMpO1xyXG4gIFxyXG4gIGlmICghc2Vzc2lvbj8udXNlcj8uaWQpIHtcclxuICAgIHJldHVybiB7IGVycm9yOiBcIuacquaOiOadg1wiLCBzdGF0dXM6IDQwMSB9O1xyXG4gIH1cclxuXHJcbiAgY29uc3QgdXNlciA9IGF3YWl0IHByaXNtYS51c2VyLmZpbmRVbmlxdWUoe1xyXG4gICAgd2hlcmU6IHsgaWQ6IHNlc3Npb24udXNlci5pZCB9LFxyXG4gICAgc2VsZWN0OiB7IHJvbGU6IHRydWUgfVxyXG4gIH0pO1xyXG5cclxuICBpZiAoIXVzZXIgfHwgdXNlci5yb2xlICE9PSAnQURNSU4nKSB7XHJcbiAgICByZXR1cm4geyBlcnJvcjogXCLmnYPpmZDkuI3otrNcIiwgc3RhdHVzOiA0MDMgfTtcclxuICB9XHJcblxyXG4gIHJldHVybiB7IHN1Y2Nlc3M6IHRydWUgfTtcclxufVxyXG5cclxuLy8gR0VUIC0g6I635Y+W57O757uf6K6+572uXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBHRVQoKSB7XHJcbiAgY29uc3QgYXV0aENoZWNrID0gYXdhaXQgY2hlY2tBZG1pbkF1dGgoKTtcclxuICBpZiAoYXV0aENoZWNrLmVycm9yKSB7XHJcbiAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oeyBlcnJvcjogYXV0aENoZWNrLmVycm9yIH0sIHsgc3RhdHVzOiBhdXRoQ2hlY2suc3RhdHVzIH0pO1xyXG4gIH1cclxuXHJcbiAgdHJ5IHtcclxuICAgIGNvbnN0IHNldHRpbmdzID0gZ2V0U2V0dGluZ3MoKTtcclxuICAgIFxyXG4gICAgY29uc3Qgc2V0dGluZ3NBcnJheSA9IE9iamVjdC5lbnRyaWVzKHNldHRpbmdzKS5tYXAoKFtrZXksIHZhbHVlXSkgPT4gKHtcclxuICAgICAgaWQ6IGtleSxcclxuICAgICAga2V5LFxyXG4gICAgICB2YWx1ZTogU3RyaW5nKHZhbHVlKSxcclxuICAgICAgZGVzY3JpcHRpb246IGtleSA9PT0gJ3JlZ2lzdHJhdGlvbl9lbmFibGVkJyA/ICfmmK/lkKblhYHorrjmlrDnlKjmiLfms6jlhownIDogJycsXHJcbiAgICAgIHVwZGF0ZWRBdDogbmV3IERhdGUoKS50b0lTT1N0cmluZygpXHJcbiAgICB9KSk7XHJcblxyXG4gICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKHNldHRpbmdzQXJyYXkpO1xyXG4gIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICBjb25zb2xlLmVycm9yKFwi6I635Y+W57O757uf6K6+572u5aSx6LSlOlwiLCBlcnJvcik7XHJcbiAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oeyBlcnJvcjogXCLojrflj5bns7vnu5/orr7nva7lpLHotKVcIiB9LCB7IHN0YXR1czogNTAwIH0pO1xyXG4gIH1cclxufVxyXG5cclxuLy8gUE9TVCAtIOabtOaWsOezu+e7n+iuvue9rlxyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gUE9TVChyZXF1ZXN0OiBSZXF1ZXN0KSB7XHJcbiAgY29uc3QgYXV0aENoZWNrID0gYXdhaXQgY2hlY2tBZG1pbkF1dGgoKTtcclxuICBpZiAoYXV0aENoZWNrLmVycm9yKSB7XHJcbiAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oeyBlcnJvcjogYXV0aENoZWNrLmVycm9yIH0sIHsgc3RhdHVzOiBhdXRoQ2hlY2suc3RhdHVzIH0pO1xyXG4gIH1cclxuXHJcbiAgdHJ5IHtcclxuICAgIGNvbnN0IHsga2V5LCB2YWx1ZSB9ID0gYXdhaXQgcmVxdWVzdC5qc29uKCk7XHJcblxyXG4gICAgaWYgKCFrZXkgfHwgdmFsdWUgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oeyBlcnJvcjogXCLlj4LmlbDplJnor69cIiB9LCB7IHN0YXR1czogNDAwIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIOabtOaWsOiuvue9rlxyXG4gICAgY29uc3QgdXBkYXRlZFNldHRpbmdzID0gdXBkYXRlU2V0dGluZ3MoeyBba2V5XTogdmFsdWUgPT09ICd0cnVlJyB9KTtcclxuICAgIFxyXG4gICAgY29uc3Qgc2V0dGluZyA9IHtcclxuICAgICAgaWQ6IGtleSxcclxuICAgICAga2V5LFxyXG4gICAgICB2YWx1ZTogU3RyaW5nKHZhbHVlKSxcclxuICAgICAgZGVzY3JpcHRpb246IGtleSA9PT0gJ3JlZ2lzdHJhdGlvbl9lbmFibGVkJyA/ICfmmK/lkKblhYHorrjmlrDnlKjmiLfms6jlhownIDogJycsXHJcbiAgICAgIHVwZGF0ZWRBdDogbmV3IERhdGUoKS50b0lTT1N0cmluZygpXHJcbiAgICB9O1xyXG5cclxuICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbihzZXR0aW5nKTtcclxuICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgY29uc29sZS5lcnJvcihcIuabtOaWsOezu+e7n+iuvue9ruWksei0pTpcIiwgZXJyb3IpO1xyXG4gICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKHsgZXJyb3I6IFwi5pu05paw57O757uf6K6+572u5aSx6LSlXCIgfSwgeyBzdGF0dXM6IDUwMCB9KTtcclxuICB9XHJcbn0iXSwibmFtZXMiOlsiZ2V0U2VydmVyU2Vzc2lvbiIsImF1dGhPcHRpb25zIiwicHJpc21hIiwiTmV4dFJlc3BvbnNlIiwiZ2V0U2V0dGluZ3MiLCJ1cGRhdGVTZXR0aW5ncyIsImNoZWNrQWRtaW5BdXRoIiwic2Vzc2lvbiIsInVzZXIiLCJpZCIsImVycm9yIiwic3RhdHVzIiwiZmluZFVuaXF1ZSIsIndoZXJlIiwic2VsZWN0Iiwicm9sZSIsInN1Y2Nlc3MiLCJHRVQiLCJhdXRoQ2hlY2siLCJqc29uIiwic2V0dGluZ3MiLCJzZXR0aW5nc0FycmF5IiwiT2JqZWN0IiwiZW50cmllcyIsIm1hcCIsImtleSIsInZhbHVlIiwiU3RyaW5nIiwiZGVzY3JpcHRpb24iLCJ1cGRhdGVkQXQiLCJEYXRlIiwidG9JU09TdHJpbmciLCJjb25zb2xlIiwiUE9TVCIsInJlcXVlc3QiLCJ1bmRlZmluZWQiLCJ1cGRhdGVkU2V0dGluZ3MiLCJzZXR0aW5nIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./src/app/api/admin/settings/route.ts\n");

/***/ }),

/***/ "(rsc)/./src/app/api/auth/[...nextauth]/route.ts":
/*!*************************************************!*\
  !*** ./src/app/api/auth/[...nextauth]/route.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   GET: () => (/* binding */ handler),\n/* harmony export */   POST: () => (/* binding */ handler),\n/* harmony export */   authOptions: () => (/* binding */ authOptions)\n/* harmony export */ });\n/* harmony import */ var next_auth__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next-auth */ \"(rsc)/./node_modules/next-auth/index.js\");\n/* harmony import */ var next_auth__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_auth__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_auth_providers_credentials__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next-auth/providers/credentials */ \"(rsc)/./node_modules/next-auth/providers/credentials.js\");\n/* harmony import */ var _lib_db__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/lib/db */ \"(rsc)/./src/lib/db.ts\");\n/* harmony import */ var bcrypt__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! bcrypt */ \"bcrypt\");\n/* harmony import */ var bcrypt__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(bcrypt__WEBPACK_IMPORTED_MODULE_3__);\n\n\n\n\nconst authOptions = {\n    providers: [\n        (0,next_auth_providers_credentials__WEBPACK_IMPORTED_MODULE_1__[\"default\"])({\n            name: \"Credentials\",\n            credentials: {\n                username: {\n                    label: \"Username\",\n                    type: \"text\"\n                },\n                password: {\n                    label: \"Password\",\n                    type: \"password\"\n                }\n            },\n            async authorize (credentials) {\n                if (!credentials?.username || !credentials?.password) {\n                    return null;\n                }\n                const user = await _lib_db__WEBPACK_IMPORTED_MODULE_2__.prisma.user.findUnique({\n                    where: {\n                        username: credentials.username\n                    }\n                });\n                if (!user || !user.password) {\n                    return null;\n                }\n                // 检查用户是否被禁用\n                // if (!user.isActive) {\n                //   throw new Error('您的账户已被禁用，请联系管理员');\n                // }\n                const isValid = await bcrypt__WEBPACK_IMPORTED_MODULE_3___default().compare(credentials.password, user.password);\n                if (isValid) {\n                    // Return user data including role\n                    return {\n                        id: user.id,\n                        username: user.username,\n                        role: user.role,\n                        isActive: true // 暂时默认为true\n                    };\n                } else {\n                    return null;\n                }\n            }\n        })\n    ],\n    session: {\n        strategy: \"jwt\"\n    },\n    pages: {\n        signIn: \"/\"\n    },\n    callbacks: {\n        async jwt ({ token, user }) {\n            if (user) {\n                token.id = user.id;\n                token.username = user.username;\n                token.role = user.role;\n                token.isActive = user.isActive;\n            }\n            return token;\n        },\n        async session ({ session, token }) {\n            if (session.user) {\n                session.user.id = token.id;\n                session.user.username = token.username;\n                session.user.role = token.role;\n                session.user.isActive = token.isActive;\n            }\n            return session;\n        }\n    },\n    secret: process.env.NEXTAUTH_SECRET\n};\nconst handler = next_auth__WEBPACK_IMPORTED_MODULE_0___default()(authOptions);\n\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9zcmMvYXBwL2FwaS9hdXRoL1suLi5uZXh0YXV0aF0vcm91dGUudHMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQWlDO0FBQ2lDO0FBQ2hDO0FBQ047QUFHckIsTUFBTUksY0FBMkI7SUFDdENDLFdBQVc7UUFDVEosMkVBQW1CQSxDQUFDO1lBQ2xCSyxNQUFNO1lBQ05DLGFBQWE7Z0JBQ1hDLFVBQVU7b0JBQUVDLE9BQU87b0JBQVlDLE1BQU07Z0JBQU87Z0JBQzVDQyxVQUFVO29CQUFFRixPQUFPO29CQUFZQyxNQUFNO2dCQUFXO1lBQ2xEO1lBQ0EsTUFBTUUsV0FBVUwsV0FBVztnQkFDekIsSUFBSSxDQUFDQSxhQUFhQyxZQUFZLENBQUNELGFBQWFJLFVBQVU7b0JBQ3BELE9BQU87Z0JBQ1Q7Z0JBRUEsTUFBTUUsT0FBTyxNQUFNWCwyQ0FBTUEsQ0FBQ1csSUFBSSxDQUFDQyxVQUFVLENBQUM7b0JBQ3hDQyxPQUFPO3dCQUFFUCxVQUFVRCxZQUFZQyxRQUFRO29CQUFDO2dCQUMxQztnQkFFQSxJQUFJLENBQUNLLFFBQVEsQ0FBQ0EsS0FBS0YsUUFBUSxFQUFFO29CQUMzQixPQUFPO2dCQUNUO2dCQUVBLFlBQVk7Z0JBQ1osd0JBQXdCO2dCQUN4Qix3Q0FBd0M7Z0JBQ3hDLElBQUk7Z0JBRUosTUFBTUssVUFBVSxNQUFNYixxREFBYyxDQUFDSSxZQUFZSSxRQUFRLEVBQUVFLEtBQUtGLFFBQVE7Z0JBRXhFLElBQUlLLFNBQVM7b0JBQ1gsa0NBQWtDO29CQUNsQyxPQUFPO3dCQUNMRSxJQUFJTCxLQUFLSyxFQUFFO3dCQUNYVixVQUFVSyxLQUFLTCxRQUFRO3dCQUN2QlcsTUFBTU4sS0FBS00sSUFBSTt3QkFDZkMsVUFBVSxLQUFLLFlBQVk7b0JBQzdCO2dCQUNGLE9BQU87b0JBQ0wsT0FBTztnQkFDVDtZQUNGO1FBQ0Y7S0FDRDtJQUNEQyxTQUFTO1FBQ1BDLFVBQVU7SUFDWjtJQUNBQyxPQUFPO1FBQ0xDLFFBQVE7SUFDVjtJQUNBQyxXQUFXO1FBQ1QsTUFBTUMsS0FBSSxFQUFFQyxLQUFLLEVBQUVkLElBQUksRUFBRTtZQUN2QixJQUFJQSxNQUFNO2dCQUNSYyxNQUFNVCxFQUFFLEdBQUdMLEtBQUtLLEVBQUU7Z0JBQ2xCUyxNQUFNbkIsUUFBUSxHQUFHSyxLQUFLTCxRQUFRO2dCQUM5Qm1CLE1BQU1SLElBQUksR0FBR04sS0FBS00sSUFBSTtnQkFDdEJRLE1BQU1QLFFBQVEsR0FBR1AsS0FBS08sUUFBUTtZQUNoQztZQUNBLE9BQU9PO1FBQ1Q7UUFDQSxNQUFNTixTQUFRLEVBQUVBLE9BQU8sRUFBRU0sS0FBSyxFQUFFO1lBQzlCLElBQUlOLFFBQVFSLElBQUksRUFBRTtnQkFDaEJRLFFBQVFSLElBQUksQ0FBQ0ssRUFBRSxHQUFHUyxNQUFNVCxFQUFFO2dCQUMxQkcsUUFBUVIsSUFBSSxDQUFDTCxRQUFRLEdBQUdtQixNQUFNbkIsUUFBUTtnQkFDdENhLFFBQVFSLElBQUksQ0FBQ00sSUFBSSxHQUFHUSxNQUFNUixJQUFJO2dCQUM5QkUsUUFBUVIsSUFBSSxDQUFDTyxRQUFRLEdBQUdPLE1BQU1QLFFBQVE7WUFDeEM7WUFDQSxPQUFPQztRQUNUO0lBQ0Y7SUFDQU8sUUFBUUMsUUFBUUMsR0FBRyxDQUFDQyxlQUFlO0FBQ3JDLEVBQUU7QUFFRixNQUFNQyxVQUFVaEMsZ0RBQVFBLENBQUNJO0FBRWtCIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8veGlubGkvLi9zcmMvYXBwL2FwaS9hdXRoL1suLi5uZXh0YXV0aF0vcm91dGUudHM/MDA5OCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgTmV4dEF1dGggZnJvbSBcIm5leHQtYXV0aFwiO1xyXG5pbXBvcnQgQ3JlZGVudGlhbHNQcm92aWRlciBmcm9tIFwibmV4dC1hdXRoL3Byb3ZpZGVycy9jcmVkZW50aWFsc1wiO1xyXG5pbXBvcnQgeyBwcmlzbWEgfSBmcm9tIFwiQC9saWIvZGJcIjtcclxuaW1wb3J0IGJjcnlwdCBmcm9tIFwiYmNyeXB0XCI7XHJcbmltcG9ydCB7IEF1dGhPcHRpb25zIH0gZnJvbSBcIm5leHQtYXV0aFwiO1xyXG5cclxuZXhwb3J0IGNvbnN0IGF1dGhPcHRpb25zOiBBdXRoT3B0aW9ucyA9IHtcclxuICBwcm92aWRlcnM6IFtcclxuICAgIENyZWRlbnRpYWxzUHJvdmlkZXIoe1xyXG4gICAgICBuYW1lOiBcIkNyZWRlbnRpYWxzXCIsXHJcbiAgICAgIGNyZWRlbnRpYWxzOiB7XHJcbiAgICAgICAgdXNlcm5hbWU6IHsgbGFiZWw6IFwiVXNlcm5hbWVcIiwgdHlwZTogXCJ0ZXh0XCIgfSxcclxuICAgICAgICBwYXNzd29yZDogeyBsYWJlbDogXCJQYXNzd29yZFwiLCB0eXBlOiBcInBhc3N3b3JkXCIgfSxcclxuICAgICAgfSxcclxuICAgICAgYXN5bmMgYXV0aG9yaXplKGNyZWRlbnRpYWxzKSB7XHJcbiAgICAgICAgaWYgKCFjcmVkZW50aWFscz8udXNlcm5hbWUgfHwgIWNyZWRlbnRpYWxzPy5wYXNzd29yZCkge1xyXG4gICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCB1c2VyID0gYXdhaXQgcHJpc21hLnVzZXIuZmluZFVuaXF1ZSh7XHJcbiAgICAgICAgICB3aGVyZTogeyB1c2VybmFtZTogY3JlZGVudGlhbHMudXNlcm5hbWUgfSxcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaWYgKCF1c2VyIHx8ICF1c2VyLnBhc3N3b3JkKSB7XHJcbiAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIOajgOafpeeUqOaIt+aYr+WQpuiiq+emgeeUqFxyXG4gICAgICAgIC8vIGlmICghdXNlci5pc0FjdGl2ZSkge1xyXG4gICAgICAgIC8vICAgdGhyb3cgbmV3IEVycm9yKCfmgqjnmoTotKbmiLflt7LooqvnpoHnlKjvvIzor7fogZTns7vnrqHnkIblkZgnKTtcclxuICAgICAgICAvLyB9XHJcblxyXG4gICAgICAgIGNvbnN0IGlzVmFsaWQgPSBhd2FpdCBiY3J5cHQuY29tcGFyZShjcmVkZW50aWFscy5wYXNzd29yZCwgdXNlci5wYXNzd29yZCk7XHJcblxyXG4gICAgICAgIGlmIChpc1ZhbGlkKSB7XHJcbiAgICAgICAgICAvLyBSZXR1cm4gdXNlciBkYXRhIGluY2x1ZGluZyByb2xlXHJcbiAgICAgICAgICByZXR1cm4geyBcclxuICAgICAgICAgICAgaWQ6IHVzZXIuaWQsIFxyXG4gICAgICAgICAgICB1c2VybmFtZTogdXNlci51c2VybmFtZSxcclxuICAgICAgICAgICAgcm9sZTogdXNlci5yb2xlLFxyXG4gICAgICAgICAgICBpc0FjdGl2ZTogdHJ1ZSAvLyDmmoLml7bpu5jorqTkuLp0cnVlXHJcbiAgICAgICAgICB9O1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgIH0sXHJcbiAgICB9KSxcclxuICBdLFxyXG4gIHNlc3Npb246IHtcclxuICAgIHN0cmF0ZWd5OiBcImp3dFwiLFxyXG4gIH0sXHJcbiAgcGFnZXM6IHtcclxuICAgIHNpZ25JbjogXCIvXCIsXHJcbiAgfSxcclxuICBjYWxsYmFja3M6IHtcclxuICAgIGFzeW5jIGp3dCh7IHRva2VuLCB1c2VyIH0pIHtcclxuICAgICAgaWYgKHVzZXIpIHtcclxuICAgICAgICB0b2tlbi5pZCA9IHVzZXIuaWQ7XHJcbiAgICAgICAgdG9rZW4udXNlcm5hbWUgPSB1c2VyLnVzZXJuYW1lO1xyXG4gICAgICAgIHRva2VuLnJvbGUgPSB1c2VyLnJvbGU7XHJcbiAgICAgICAgdG9rZW4uaXNBY3RpdmUgPSB1c2VyLmlzQWN0aXZlO1xyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiB0b2tlbjtcclxuICAgIH0sXHJcbiAgICBhc3luYyBzZXNzaW9uKHsgc2Vzc2lvbiwgdG9rZW4gfSkge1xyXG4gICAgICBpZiAoc2Vzc2lvbi51c2VyKSB7XHJcbiAgICAgICAgc2Vzc2lvbi51c2VyLmlkID0gdG9rZW4uaWQ7XHJcbiAgICAgICAgc2Vzc2lvbi51c2VyLnVzZXJuYW1lID0gdG9rZW4udXNlcm5hbWU7XHJcbiAgICAgICAgc2Vzc2lvbi51c2VyLnJvbGUgPSB0b2tlbi5yb2xlO1xyXG4gICAgICAgIHNlc3Npb24udXNlci5pc0FjdGl2ZSA9IHRva2VuLmlzQWN0aXZlO1xyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiBzZXNzaW9uO1xyXG4gICAgfSxcclxuICB9LFxyXG4gIHNlY3JldDogcHJvY2Vzcy5lbnYuTkVYVEFVVEhfU0VDUkVULFxyXG59O1xyXG5cclxuY29uc3QgaGFuZGxlciA9IE5leHRBdXRoKGF1dGhPcHRpb25zKTtcclxuXHJcbmV4cG9ydCB7IGhhbmRsZXIgYXMgR0VULCBoYW5kbGVyIGFzIFBPU1QgfTtcclxuIl0sIm5hbWVzIjpbIk5leHRBdXRoIiwiQ3JlZGVudGlhbHNQcm92aWRlciIsInByaXNtYSIsImJjcnlwdCIsImF1dGhPcHRpb25zIiwicHJvdmlkZXJzIiwibmFtZSIsImNyZWRlbnRpYWxzIiwidXNlcm5hbWUiLCJsYWJlbCIsInR5cGUiLCJwYXNzd29yZCIsImF1dGhvcml6ZSIsInVzZXIiLCJmaW5kVW5pcXVlIiwid2hlcmUiLCJpc1ZhbGlkIiwiY29tcGFyZSIsImlkIiwicm9sZSIsImlzQWN0aXZlIiwic2Vzc2lvbiIsInN0cmF0ZWd5IiwicGFnZXMiLCJzaWduSW4iLCJjYWxsYmFja3MiLCJqd3QiLCJ0b2tlbiIsInNlY3JldCIsInByb2Nlc3MiLCJlbnYiLCJORVhUQVVUSF9TRUNSRVQiLCJoYW5kbGVyIiwiR0VUIiwiUE9TVCJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./src/app/api/auth/[...nextauth]/route.ts\n");

/***/ }),

/***/ "(rsc)/./src/lib/db.ts":
/*!***********************!*\
  !*** ./src/lib/db.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   prisma: () => (/* binding */ prisma)\n/* harmony export */ });\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @prisma/client */ \"@prisma/client\");\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_prisma_client__WEBPACK_IMPORTED_MODULE_0__);\n\nconst prisma = global.prisma ?? new _prisma_client__WEBPACK_IMPORTED_MODULE_0__.PrismaClient();\nif (true) global.prisma = prisma;\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9zcmMvbGliL2RiLnRzIiwibWFwcGluZ3MiOiI7Ozs7OztBQUE4QztBQVF2QyxNQUFNQyxTQUFTQyxPQUFPRCxNQUFNLElBQUksSUFBSUQsd0RBQVlBLEdBQUc7QUFDMUQsSUFBSUcsSUFBeUIsRUFBY0QsT0FBT0QsTUFBTSxHQUFHQSIsInNvdXJjZXMiOlsid2VicGFjazovL3hpbmxpLy4vc3JjL2xpYi9kYi50cz85ZTRmIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFByaXNtYUNsaWVudCB9IGZyb20gJ0BwcmlzbWEvY2xpZW50JztcclxuXHJcbmRlY2xhcmUgZ2xvYmFsIHtcclxuICAvLyBhbGxvdyBnbG9iYWwgYHZhcmAgYWNyb3NzIG1vZHVsZSByZWxvYWRzIGluIGRldlxyXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby12YXJcclxuICB2YXIgcHJpc21hOiBQcmlzbWFDbGllbnQgfCB1bmRlZmluZWRcclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IHByaXNtYSA9IGdsb2JhbC5wcmlzbWEgPz8gbmV3IFByaXNtYUNsaWVudCgpO1xyXG5pZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykgZ2xvYmFsLnByaXNtYSA9IHByaXNtYTtcclxuIl0sIm5hbWVzIjpbIlByaXNtYUNsaWVudCIsInByaXNtYSIsImdsb2JhbCIsInByb2Nlc3MiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./src/lib/db.ts\n");

/***/ }),

/***/ "(rsc)/./src/lib/settings.ts":
/*!*****************************!*\
  !*** ./src/lib/settings.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   getSettings: () => (/* binding */ getSettings),\n/* harmony export */   updateSettings: () => (/* binding */ updateSettings)\n/* harmony export */ });\n/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! fs */ \"fs\");\n/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(fs__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! path */ \"path\");\n/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_1__);\n\n\nconst SETTINGS_FILE = path__WEBPACK_IMPORTED_MODULE_1___default().join(process.cwd(), \".settings.json\");\nfunction getDefaultSettings() {\n    return {\n        registration_enabled: true\n    };\n}\nfunction getSettings() {\n    try {\n        if (fs__WEBPACK_IMPORTED_MODULE_0___default().existsSync(SETTINGS_FILE)) {\n            const data = fs__WEBPACK_IMPORTED_MODULE_0___default().readFileSync(SETTINGS_FILE, \"utf8\");\n            return {\n                ...getDefaultSettings(),\n                ...JSON.parse(data)\n            };\n        }\n    } catch (error) {\n        console.error(\"读取设置文件失败:\", error);\n    }\n    return getDefaultSettings();\n}\nfunction updateSettings(newSettings) {\n    try {\n        const currentSettings = getSettings();\n        const updatedSettings = {\n            ...currentSettings,\n            ...newSettings\n        };\n        fs__WEBPACK_IMPORTED_MODULE_0___default().writeFileSync(SETTINGS_FILE, JSON.stringify(updatedSettings, null, 2));\n        return updatedSettings;\n    } catch (error) {\n        console.error(\"保存设置文件失败:\", error);\n        throw error;\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9zcmMvbGliL3NldHRpbmdzLnRzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFvQjtBQUNJO0FBRXhCLE1BQU1FLGdCQUFnQkQsZ0RBQVMsQ0FBQ0csUUFBUUMsR0FBRyxJQUFJO0FBTy9DLFNBQVNDO0lBQ1AsT0FBTztRQUNMQyxzQkFBc0I7SUFDeEI7QUFDRjtBQUVPLFNBQVNDO0lBQ2QsSUFBSTtRQUNGLElBQUlSLG9EQUFhLENBQUNFLGdCQUFnQjtZQUNoQyxNQUFNUSxPQUFPVixzREFBZSxDQUFDRSxlQUFlO1lBQzVDLE9BQU87Z0JBQUUsR0FBR0ksb0JBQW9CO2dCQUFFLEdBQUdNLEtBQUtDLEtBQUssQ0FBQ0gsS0FBSztZQUFDO1FBQ3hEO0lBQ0YsRUFBRSxPQUFPSSxPQUFPO1FBQ2RDLFFBQVFELEtBQUssQ0FBQyxhQUFhQTtJQUM3QjtJQUNBLE9BQU9SO0FBQ1Q7QUFFTyxTQUFTVSxlQUFlQyxXQUE4QjtJQUMzRCxJQUFJO1FBQ0YsTUFBTUMsa0JBQWtCVjtRQUN4QixNQUFNVyxrQkFBa0I7WUFBRSxHQUFHRCxlQUFlO1lBQUUsR0FBR0QsV0FBVztRQUFDO1FBQzdEakIsdURBQWdCLENBQUNFLGVBQWVVLEtBQUtTLFNBQVMsQ0FBQ0YsaUJBQWlCLE1BQU07UUFDdEUsT0FBT0E7SUFDVCxFQUFFLE9BQU9MLE9BQU87UUFDZEMsUUFBUUQsS0FBSyxDQUFDLGFBQWFBO1FBQzNCLE1BQU1BO0lBQ1I7QUFDRiIsInNvdXJjZXMiOlsid2VicGFjazovL3hpbmxpLy4vc3JjL2xpYi9zZXR0aW5ncy50cz8xZTU3Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBmcyBmcm9tICdmcyc7XHJcbmltcG9ydCBwYXRoIGZyb20gJ3BhdGgnO1xyXG5cclxuY29uc3QgU0VUVElOR1NfRklMRSA9IHBhdGguam9pbihwcm9jZXNzLmN3ZCgpLCAnLnNldHRpbmdzLmpzb24nKTtcclxuXHJcbmludGVyZmFjZSBTZXR0aW5ncyB7XHJcbiAgcmVnaXN0cmF0aW9uX2VuYWJsZWQ6IGJvb2xlYW47XHJcbiAgW2tleTogc3RyaW5nXTogYW55O1xyXG59XHJcblxyXG5mdW5jdGlvbiBnZXREZWZhdWx0U2V0dGluZ3MoKTogU2V0dGluZ3Mge1xyXG4gIHJldHVybiB7XHJcbiAgICByZWdpc3RyYXRpb25fZW5hYmxlZDogdHJ1ZVxyXG4gIH07XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRTZXR0aW5ncygpOiBTZXR0aW5ncyB7XHJcbiAgdHJ5IHtcclxuICAgIGlmIChmcy5leGlzdHNTeW5jKFNFVFRJTkdTX0ZJTEUpKSB7XHJcbiAgICAgIGNvbnN0IGRhdGEgPSBmcy5yZWFkRmlsZVN5bmMoU0VUVElOR1NfRklMRSwgJ3V0ZjgnKTtcclxuICAgICAgcmV0dXJuIHsgLi4uZ2V0RGVmYXVsdFNldHRpbmdzKCksIC4uLkpTT04ucGFyc2UoZGF0YSkgfTtcclxuICAgIH1cclxuICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgY29uc29sZS5lcnJvcign6K+75Y+W6K6+572u5paH5Lu25aSx6LSlOicsIGVycm9yKTtcclxuICB9XHJcbiAgcmV0dXJuIGdldERlZmF1bHRTZXR0aW5ncygpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gdXBkYXRlU2V0dGluZ3MobmV3U2V0dGluZ3M6IFBhcnRpYWw8U2V0dGluZ3M+KTogU2V0dGluZ3Mge1xyXG4gIHRyeSB7XHJcbiAgICBjb25zdCBjdXJyZW50U2V0dGluZ3MgPSBnZXRTZXR0aW5ncygpO1xyXG4gICAgY29uc3QgdXBkYXRlZFNldHRpbmdzID0geyAuLi5jdXJyZW50U2V0dGluZ3MsIC4uLm5ld1NldHRpbmdzIH07XHJcbiAgICBmcy53cml0ZUZpbGVTeW5jKFNFVFRJTkdTX0ZJTEUsIEpTT04uc3RyaW5naWZ5KHVwZGF0ZWRTZXR0aW5ncywgbnVsbCwgMikpO1xyXG4gICAgcmV0dXJuIHVwZGF0ZWRTZXR0aW5ncztcclxuICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgY29uc29sZS5lcnJvcign5L+d5a2Y6K6+572u5paH5Lu25aSx6LSlOicsIGVycm9yKTtcclxuICAgIHRocm93IGVycm9yO1xyXG4gIH1cclxufSJdLCJuYW1lcyI6WyJmcyIsInBhdGgiLCJTRVRUSU5HU19GSUxFIiwiam9pbiIsInByb2Nlc3MiLCJjd2QiLCJnZXREZWZhdWx0U2V0dGluZ3MiLCJyZWdpc3RyYXRpb25fZW5hYmxlZCIsImdldFNldHRpbmdzIiwiZXhpc3RzU3luYyIsImRhdGEiLCJyZWFkRmlsZVN5bmMiLCJKU09OIiwicGFyc2UiLCJlcnJvciIsImNvbnNvbGUiLCJ1cGRhdGVTZXR0aW5ncyIsIm5ld1NldHRpbmdzIiwiY3VycmVudFNldHRpbmdzIiwidXBkYXRlZFNldHRpbmdzIiwid3JpdGVGaWxlU3luYyIsInN0cmluZ2lmeSJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./src/lib/settings.ts\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/next-auth","vendor-chunks/@babel","vendor-chunks/jose","vendor-chunks/openid-client","vendor-chunks/oauth","vendor-chunks/object-hash","vendor-chunks/preact","vendor-chunks/preact-render-to-string","vendor-chunks/uuid","vendor-chunks/yallist","vendor-chunks/lru-cache","vendor-chunks/cookie","vendor-chunks/oidc-token-hash","vendor-chunks/@panva"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fadmin%2Fsettings%2Froute&page=%2Fapi%2Fadmin%2Fsettings%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fadmin%2Fsettings%2Froute.ts&appDir=D%3A%5Cxinli%5Csrc%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=D%3A%5Cxinli&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();