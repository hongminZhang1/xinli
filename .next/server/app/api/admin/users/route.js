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
exports.id = "app/api/admin/users/route";
exports.ids = ["app/api/admin/users/route"];
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

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fadmin%2Fusers%2Froute&page=%2Fapi%2Fadmin%2Fusers%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fadmin%2Fusers%2Froute.ts&appDir=D%3A%5Cxinli%5Csrc%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=D%3A%5Cxinli&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fadmin%2Fusers%2Froute&page=%2Fapi%2Fadmin%2Fusers%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fadmin%2Fusers%2Froute.ts&appDir=D%3A%5Cxinli%5Csrc%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=D%3A%5Cxinli&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   headerHooks: () => (/* binding */ headerHooks),\n/* harmony export */   originalPathname: () => (/* binding */ originalPathname),\n/* harmony export */   requestAsyncStorage: () => (/* binding */ requestAsyncStorage),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   staticGenerationAsyncStorage: () => (/* binding */ staticGenerationAsyncStorage),\n/* harmony export */   staticGenerationBailout: () => (/* binding */ staticGenerationBailout)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/future/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/future/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/future/route-kind */ \"(rsc)/./node_modules/next/dist/server/future/route-kind.js\");\n/* harmony import */ var D_xinli_src_app_api_admin_users_route_ts__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./src/app/api/admin/users/route.ts */ \"(rsc)/./src/app/api/admin/users/route.ts\");\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/admin/users/route\",\n        pathname: \"/api/admin/users\",\n        filename: \"route\",\n        bundlePath: \"app/api/admin/users/route\"\n    },\n    resolvedPagePath: \"D:\\\\xinli\\\\src\\\\app\\\\api\\\\admin\\\\users\\\\route.ts\",\n    nextConfigOutput,\n    userland: D_xinli_src_app_api_admin_users_route_ts__WEBPACK_IMPORTED_MODULE_2__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { requestAsyncStorage, staticGenerationAsyncStorage, serverHooks, headerHooks, staticGenerationBailout } = routeModule;\nconst originalPathname = \"/api/admin/users/route\";\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIuanM/bmFtZT1hcHAlMkZhcGklMkZhZG1pbiUyRnVzZXJzJTJGcm91dGUmcGFnZT0lMkZhcGklMkZhZG1pbiUyRnVzZXJzJTJGcm91dGUmYXBwUGF0aHM9JnBhZ2VQYXRoPXByaXZhdGUtbmV4dC1hcHAtZGlyJTJGYXBpJTJGYWRtaW4lMkZ1c2VycyUyRnJvdXRlLnRzJmFwcERpcj1EJTNBJTVDeGlubGklNUNzcmMlNUNhcHAmcGFnZUV4dGVuc2lvbnM9dHN4JnBhZ2VFeHRlbnNpb25zPXRzJnBhZ2VFeHRlbnNpb25zPWpzeCZwYWdlRXh0ZW5zaW9ucz1qcyZyb290RGlyPUQlM0ElNUN4aW5saSZpc0Rldj10cnVlJnRzY29uZmlnUGF0aD10c2NvbmZpZy5qc29uJmJhc2VQYXRoPSZhc3NldFByZWZpeD0mbmV4dENvbmZpZ091dHB1dD0mcHJlZmVycmVkUmVnaW9uPSZtaWRkbGV3YXJlQ29uZmlnPWUzMCUzRCEiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBc0c7QUFDdkM7QUFDYztBQUM3RTtBQUNBO0FBQ0E7QUFDQSx3QkFBd0IsZ0hBQW1CO0FBQzNDO0FBQ0EsY0FBYyx5RUFBUztBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsWUFBWTtBQUNaLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQSxRQUFRLHVHQUF1RztBQUMvRztBQUNpSjs7QUFFakoiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly94aW5saS8/NTQwNiJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBcHBSb3V0ZVJvdXRlTW9kdWxlIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvZnV0dXJlL3JvdXRlLW1vZHVsZXMvYXBwLXJvdXRlL21vZHVsZS5jb21waWxlZFwiO1xuaW1wb3J0IHsgUm91dGVLaW5kIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvZnV0dXJlL3JvdXRlLWtpbmRcIjtcbmltcG9ydCAqIGFzIHVzZXJsYW5kIGZyb20gXCJEOlxcXFx4aW5saVxcXFxzcmNcXFxcYXBwXFxcXGFwaVxcXFxhZG1pblxcXFx1c2Vyc1xcXFxyb3V0ZS50c1wiO1xuLy8gV2UgaW5qZWN0IHRoZSBuZXh0Q29uZmlnT3V0cHV0IGhlcmUgc28gdGhhdCB3ZSBjYW4gdXNlIHRoZW0gaW4gdGhlIHJvdXRlXG4vLyBtb2R1bGUuXG5jb25zdCBuZXh0Q29uZmlnT3V0cHV0ID0gXCJcIlxuY29uc3Qgcm91dGVNb2R1bGUgPSBuZXcgQXBwUm91dGVSb3V0ZU1vZHVsZSh7XG4gICAgZGVmaW5pdGlvbjoge1xuICAgICAgICBraW5kOiBSb3V0ZUtpbmQuQVBQX1JPVVRFLFxuICAgICAgICBwYWdlOiBcIi9hcGkvYWRtaW4vdXNlcnMvcm91dGVcIixcbiAgICAgICAgcGF0aG5hbWU6IFwiL2FwaS9hZG1pbi91c2Vyc1wiLFxuICAgICAgICBmaWxlbmFtZTogXCJyb3V0ZVwiLFxuICAgICAgICBidW5kbGVQYXRoOiBcImFwcC9hcGkvYWRtaW4vdXNlcnMvcm91dGVcIlxuICAgIH0sXG4gICAgcmVzb2x2ZWRQYWdlUGF0aDogXCJEOlxcXFx4aW5saVxcXFxzcmNcXFxcYXBwXFxcXGFwaVxcXFxhZG1pblxcXFx1c2Vyc1xcXFxyb3V0ZS50c1wiLFxuICAgIG5leHRDb25maWdPdXRwdXQsXG4gICAgdXNlcmxhbmRcbn0pO1xuLy8gUHVsbCBvdXQgdGhlIGV4cG9ydHMgdGhhdCB3ZSBuZWVkIHRvIGV4cG9zZSBmcm9tIHRoZSBtb2R1bGUuIFRoaXMgc2hvdWxkXG4vLyBiZSBlbGltaW5hdGVkIHdoZW4gd2UndmUgbW92ZWQgdGhlIG90aGVyIHJvdXRlcyB0byB0aGUgbmV3IGZvcm1hdC4gVGhlc2Vcbi8vIGFyZSB1c2VkIHRvIGhvb2sgaW50byB0aGUgcm91dGUuXG5jb25zdCB7IHJlcXVlc3RBc3luY1N0b3JhZ2UsIHN0YXRpY0dlbmVyYXRpb25Bc3luY1N0b3JhZ2UsIHNlcnZlckhvb2tzLCBoZWFkZXJIb29rcywgc3RhdGljR2VuZXJhdGlvbkJhaWxvdXQgfSA9IHJvdXRlTW9kdWxlO1xuY29uc3Qgb3JpZ2luYWxQYXRobmFtZSA9IFwiL2FwaS9hZG1pbi91c2Vycy9yb3V0ZVwiO1xuZXhwb3J0IHsgcm91dGVNb2R1bGUsIHJlcXVlc3RBc3luY1N0b3JhZ2UsIHN0YXRpY0dlbmVyYXRpb25Bc3luY1N0b3JhZ2UsIHNlcnZlckhvb2tzLCBoZWFkZXJIb29rcywgc3RhdGljR2VuZXJhdGlvbkJhaWxvdXQsIG9yaWdpbmFsUGF0aG5hbWUsICB9O1xuXG4vLyMgc291cmNlTWFwcGluZ1VSTD1hcHAtcm91dGUuanMubWFwIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fadmin%2Fusers%2Froute&page=%2Fapi%2Fadmin%2Fusers%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fadmin%2Fusers%2Froute.ts&appDir=D%3A%5Cxinli%5Csrc%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=D%3A%5Cxinli&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

/***/ }),

/***/ "(rsc)/./src/app/api/admin/users/route.ts":
/*!******************************************!*\
  !*** ./src/app/api/admin/users/route.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   GET: () => (/* binding */ GET),\n/* harmony export */   PATCH: () => (/* binding */ PATCH)\n/* harmony export */ });\n/* harmony import */ var next_auth__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next-auth */ \"(rsc)/./node_modules/next-auth/index.js\");\n/* harmony import */ var next_auth__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_auth__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _auth_nextauth_route__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../auth/[...nextauth]/route */ \"(rsc)/./src/app/api/auth/[...nextauth]/route.ts\");\n/* harmony import */ var _lib_db__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/lib/db */ \"(rsc)/./src/lib/db.ts\");\n/* harmony import */ var next_dist_server_web_exports_next_response__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! next/dist/server/web/exports/next-response */ \"(rsc)/./node_modules/next/dist/server/web/exports/next-response.js\");\n\n\n\n\n// 检查用户是否为管理员\nasync function checkAdminAuth() {\n    const session = await (0,next_auth__WEBPACK_IMPORTED_MODULE_0__.getServerSession)(_auth_nextauth_route__WEBPACK_IMPORTED_MODULE_1__.authOptions);\n    if (!session?.user?.id) {\n        return {\n            error: \"未授权\",\n            status: 401\n        };\n    }\n    const user = await _lib_db__WEBPACK_IMPORTED_MODULE_2__.prisma.user.findUnique({\n        where: {\n            id: session.user.id\n        },\n        select: {\n            role: true\n        }\n    });\n    if (!user || user.role !== \"ADMIN\") {\n        return {\n            error: \"权限不足\",\n            status: 403\n        };\n    }\n    return {\n        success: true\n    };\n}\n// GET - 获取所有用户列表\nasync function GET() {\n    const authCheck = await checkAdminAuth();\n    if (authCheck.error) {\n        return next_dist_server_web_exports_next_response__WEBPACK_IMPORTED_MODULE_3__[\"default\"].json({\n            error: authCheck.error\n        }, {\n            status: authCheck.status\n        });\n    }\n    try {\n        const users = await _lib_db__WEBPACK_IMPORTED_MODULE_2__.prisma.user.findMany({\n            select: {\n                id: true,\n                username: true,\n                email: true,\n                name: true,\n                role: true,\n                createdAt: true,\n                updatedAt: true\n            },\n            orderBy: {\n                createdAt: \"desc\"\n            }\n        });\n        return next_dist_server_web_exports_next_response__WEBPACK_IMPORTED_MODULE_3__[\"default\"].json(users);\n    } catch (error) {\n        console.error(\"获取用户列表失败:\", error);\n        return next_dist_server_web_exports_next_response__WEBPACK_IMPORTED_MODULE_3__[\"default\"].json({\n            error: \"获取用户列表失败\"\n        }, {\n            status: 500\n        });\n    }\n}\n// PATCH - 更新用户角色\nasync function PATCH(request) {\n    const authCheck = await checkAdminAuth();\n    if (authCheck.error) {\n        return next_dist_server_web_exports_next_response__WEBPACK_IMPORTED_MODULE_3__[\"default\"].json({\n            error: authCheck.error\n        }, {\n            status: authCheck.status\n        });\n    }\n    try {\n        const { userId, action } = await request.json();\n        if (!userId || !action) {\n            return next_dist_server_web_exports_next_response__WEBPACK_IMPORTED_MODULE_3__[\"default\"].json({\n                error: \"参数错误\"\n            }, {\n                status: 400\n            });\n        }\n        // 防止管理员修改自己的角色\n        const session = await (0,next_auth__WEBPACK_IMPORTED_MODULE_0__.getServerSession)(_auth_nextauth_route__WEBPACK_IMPORTED_MODULE_1__.authOptions);\n        if (userId === session?.user?.id) {\n            return next_dist_server_web_exports_next_response__WEBPACK_IMPORTED_MODULE_3__[\"default\"].json({\n                error: \"不能修改自己的角色\"\n            }, {\n                status: 400\n            });\n        }\n        // 检查要更新的用户是否存在\n        const targetUser = await _lib_db__WEBPACK_IMPORTED_MODULE_2__.prisma.user.findUnique({\n            where: {\n                id: userId\n            },\n            select: {\n                id: true,\n                username: true,\n                role: true\n            }\n        });\n        if (!targetUser) {\n            return next_dist_server_web_exports_next_response__WEBPACK_IMPORTED_MODULE_3__[\"default\"].json({\n                error: \"用户不存在\"\n            }, {\n                status: 404\n            });\n        }\n        // 简单的角色切换逻辑\n        const newRole = action === \"promote\" ? \"COUNSELOR\" : \"USER\";\n        const updatedUser = await _lib_db__WEBPACK_IMPORTED_MODULE_2__.prisma.user.update({\n            where: {\n                id: userId\n            },\n            data: {\n                role: newRole\n            },\n            select: {\n                id: true,\n                username: true,\n                email: true,\n                name: true,\n                role: true,\n                updatedAt: true\n            }\n        });\n        return next_dist_server_web_exports_next_response__WEBPACK_IMPORTED_MODULE_3__[\"default\"].json(updatedUser);\n    } catch (error) {\n        console.error(\"更新用户角色失败:\", error);\n        return next_dist_server_web_exports_next_response__WEBPACK_IMPORTED_MODULE_3__[\"default\"].json({\n            error: \"更新用户角色失败\"\n        }, {\n            status: 500\n        });\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QSxDQUFDYyxJQUFJLENBQUM7Z0JBQUVULE9BQU87WUFBUSxHQUFHO2dCQUFFQyxRQUFRO1lBQUk7UUFDN0Q7UUFFQSxZQUFZO1FBQ1osTUFBTXVCLFVBQVVGLFdBQVcsWUFBWSxjQUFjO1FBRXJELE1BQU1HLGNBQWMsTUFBTS9CLDJDQUFNQSxDQUFDSSxJQUFJLENBQUM0QixNQUFNLENBQUM7WUFDM0N2QixPQUFPO2dCQUFFSixJQUFJc0I7WUFBTztZQUNwQk0sTUFBTTtnQkFBRXRCLE1BQU1tQjtZQUFRO1lBQ3RCcEIsUUFBUTtnQkFDTkwsSUFBSTtnQkFDSmEsVUFBVTtnQkFDVkMsT0FBTztnQkFDUEMsTUFBTTtnQkFDTlQsTUFBTTtnQkFDTlcsV0FBVztZQUNiO1FBQ0Y7UUFFQSxPQUFPckIsa0ZBQVlBLENBQUNjLElBQUksQ0FBQ2dCO0lBQzNCLEVBQUUsT0FBT3pCLE9BQU87UUFDZGtCLFFBQVFsQixLQUFLLENBQUMsYUFBYUE7UUFDM0IsT0FBT0wsa0ZBQVlBLENBQUNjLElBQUksQ0FBQztZQUFFVCxPQUFPO1FBQVcsR0FBRztZQUFFQyxRQUFRO1FBQUk7SUFDaEU7QUFDRiIsInNvdXJjZXMiOlsid2VicGFjazovL3hpbmxpLy4vc3JjL2FwcC9hcGkvYWRtaW4vdXNlcnMvcm91dGUudHM/NjBkYyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBnZXRTZXJ2ZXJTZXNzaW9uIH0gZnJvbSBcIm5leHQtYXV0aFwiO1xyXG5pbXBvcnQgeyBhdXRoT3B0aW9ucyB9IGZyb20gXCIuLi8uLi9hdXRoL1suLi5uZXh0YXV0aF0vcm91dGVcIjtcclxuaW1wb3J0IHsgcHJpc21hIH0gZnJvbSBcIkAvbGliL2RiXCI7XHJcbmltcG9ydCB7IE5leHRSZXNwb25zZSB9IGZyb20gXCJuZXh0L3NlcnZlclwiO1xyXG5cclxuLy8g5qOA5p+l55So5oi35piv5ZCm5Li6566h55CG5ZGYXHJcbmFzeW5jIGZ1bmN0aW9uIGNoZWNrQWRtaW5BdXRoKCkge1xyXG4gIGNvbnN0IHNlc3Npb24gPSBhd2FpdCBnZXRTZXJ2ZXJTZXNzaW9uKGF1dGhPcHRpb25zKTtcclxuICBcclxuICBpZiAoIXNlc3Npb24/LnVzZXI/LmlkKSB7XHJcbiAgICByZXR1cm4geyBlcnJvcjogXCLmnKrmjojmnYNcIiwgc3RhdHVzOiA0MDEgfTtcclxuICB9XHJcblxyXG4gIGNvbnN0IHVzZXIgPSBhd2FpdCBwcmlzbWEudXNlci5maW5kVW5pcXVlKHtcclxuICAgIHdoZXJlOiB7IGlkOiBzZXNzaW9uLnVzZXIuaWQgfSxcclxuICAgIHNlbGVjdDogeyByb2xlOiB0cnVlIH1cclxuICB9KTtcclxuXHJcbiAgaWYgKCF1c2VyIHx8IHVzZXIucm9sZSAhPT0gJ0FETUlOJykge1xyXG4gICAgcmV0dXJuIHsgZXJyb3I6IFwi5p2D6ZmQ5LiN6LazXCIsIHN0YXR1czogNDAzIH07XHJcbiAgfVxyXG5cclxuICByZXR1cm4geyBzdWNjZXNzOiB0cnVlIH07XHJcbn1cclxuXHJcbi8vIEdFVCAtIOiOt+WPluaJgOacieeUqOaIt+WIl+ihqFxyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gR0VUKCkge1xyXG4gIGNvbnN0IGF1dGhDaGVjayA9IGF3YWl0IGNoZWNrQWRtaW5BdXRoKCk7XHJcbiAgaWYgKGF1dGhDaGVjay5lcnJvcikge1xyXG4gICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKHsgZXJyb3I6IGF1dGhDaGVjay5lcnJvciB9LCB7IHN0YXR1czogYXV0aENoZWNrLnN0YXR1cyB9KTtcclxuICB9XHJcblxyXG4gIHRyeSB7XHJcbiAgICBjb25zdCB1c2VycyA9IGF3YWl0IHByaXNtYS51c2VyLmZpbmRNYW55KHtcclxuICAgICAgc2VsZWN0OiB7XHJcbiAgICAgICAgaWQ6IHRydWUsXHJcbiAgICAgICAgdXNlcm5hbWU6IHRydWUsXHJcbiAgICAgICAgZW1haWw6IHRydWUsXHJcbiAgICAgICAgbmFtZTogdHJ1ZSxcclxuICAgICAgICByb2xlOiB0cnVlLFxyXG4gICAgICAgIGNyZWF0ZWRBdDogdHJ1ZSxcclxuICAgICAgICB1cGRhdGVkQXQ6IHRydWUsXHJcbiAgICAgIH0sXHJcbiAgICAgIG9yZGVyQnk6IHtcclxuICAgICAgICBjcmVhdGVkQXQ6ICdkZXNjJ1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24odXNlcnMpO1xyXG4gIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICBjb25zb2xlLmVycm9yKFwi6I635Y+W55So5oi35YiX6KGo5aSx6LSlOlwiLCBlcnJvcik7XHJcbiAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oeyBlcnJvcjogXCLojrflj5bnlKjmiLfliJfooajlpLHotKVcIiB9LCB7IHN0YXR1czogNTAwIH0pO1xyXG4gIH1cclxufVxyXG5cclxuLy8gUEFUQ0ggLSDmm7TmlrDnlKjmiLfop5LoibJcclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIFBBVENIKHJlcXVlc3Q6IFJlcXVlc3QpIHtcclxuICBjb25zdCBhdXRoQ2hlY2sgPSBhd2FpdCBjaGVja0FkbWluQXV0aCgpO1xyXG4gIGlmIChhdXRoQ2hlY2suZXJyb3IpIHtcclxuICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbih7IGVycm9yOiBhdXRoQ2hlY2suZXJyb3IgfSwgeyBzdGF0dXM6IGF1dGhDaGVjay5zdGF0dXMgfSk7XHJcbiAgfVxyXG5cclxuICB0cnkge1xyXG4gICAgY29uc3QgeyB1c2VySWQsIGFjdGlvbiB9ID0gYXdhaXQgcmVxdWVzdC5qc29uKCk7XHJcblxyXG4gICAgaWYgKCF1c2VySWQgfHwgIWFjdGlvbikge1xyXG4gICAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oeyBlcnJvcjogXCLlj4LmlbDplJnor69cIiB9LCB7IHN0YXR1czogNDAwIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIOmYsuatoueuoeeQhuWRmOS/ruaUueiHquW3seeahOinkuiJslxyXG4gICAgY29uc3Qgc2Vzc2lvbiA9IGF3YWl0IGdldFNlcnZlclNlc3Npb24oYXV0aE9wdGlvbnMpO1xyXG4gICAgaWYgKHVzZXJJZCA9PT0gc2Vzc2lvbj8udXNlcj8uaWQpIHtcclxuICAgICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKHsgZXJyb3I6IFwi5LiN6IO95L+u5pS56Ieq5bex55qE6KeS6ImyXCIgfSwgeyBzdGF0dXM6IDQwMCB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvLyDmo4Dmn6XopoHmm7TmlrDnmoTnlKjmiLfmmK/lkKblrZjlnKhcclxuICAgIGNvbnN0IHRhcmdldFVzZXIgPSBhd2FpdCBwcmlzbWEudXNlci5maW5kVW5pcXVlKHtcclxuICAgICAgd2hlcmU6IHsgaWQ6IHVzZXJJZCB9LFxyXG4gICAgICBzZWxlY3Q6IHsgaWQ6IHRydWUsIHVzZXJuYW1lOiB0cnVlLCByb2xlOiB0cnVlIH1cclxuICAgIH0pO1xyXG5cclxuICAgIGlmICghdGFyZ2V0VXNlcikge1xyXG4gICAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oeyBlcnJvcjogXCLnlKjmiLfkuI3lrZjlnKhcIiB9LCB7IHN0YXR1czogNDA0IH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIOeugOWNleeahOinkuiJsuWIh+aNoumAu+i+kVxyXG4gICAgY29uc3QgbmV3Um9sZSA9IGFjdGlvbiA9PT0gJ3Byb21vdGUnID8gJ0NPVU5TRUxPUicgOiAnVVNFUic7XHJcblxyXG4gICAgY29uc3QgdXBkYXRlZFVzZXIgPSBhd2FpdCBwcmlzbWEudXNlci51cGRhdGUoe1xyXG4gICAgICB3aGVyZTogeyBpZDogdXNlcklkIH0sXHJcbiAgICAgIGRhdGE6IHsgcm9sZTogbmV3Um9sZSB9LFxyXG4gICAgICBzZWxlY3Q6IHtcclxuICAgICAgICBpZDogdHJ1ZSxcclxuICAgICAgICB1c2VybmFtZTogdHJ1ZSxcclxuICAgICAgICBlbWFpbDogdHJ1ZSxcclxuICAgICAgICBuYW1lOiB0cnVlLFxyXG4gICAgICAgIHJvbGU6IHRydWUsXHJcbiAgICAgICAgdXBkYXRlZEF0OiB0cnVlLFxyXG4gICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24odXBkYXRlZFVzZXIpO1xyXG4gIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICBjb25zb2xlLmVycm9yKFwi5pu05paw55So5oi36KeS6Imy5aSx6LSlOlwiLCBlcnJvcik7XHJcbiAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oeyBlcnJvcjogXCLmm7TmlrDnlKjmiLfop5LoibLlpLHotKVcIiB9LCB7IHN0YXR1czogNTAwIH0pO1xyXG4gIH1cclxufSJdLCJuYW1lcyI6WyJnZXRTZXJ2ZXJTZXNzaW9uIiwiYXV0aE9wdGlvbnMiLCJwcmlzbWEiLCJOZXh0UmVzcG9uc2UiLCJjaGVja0FkbWluQXV0aCIsInNlc3Npb24iLCJ1c2VyIiwiaWQiLCJlcnJvciIsInN0YXR1cyIsImZpbmRVbmlxdWUiLCJ3aGVyZSIsInNlbGVjdCIsInJvbGUiLCJzdWNjZXNzIiwiR0VUIiwiYXV0aENoZWNrIiwianNvbiIsInVzZXJzIiwiZmluZE1hbnkiLCJ1c2VybmFtZSIsImVtYWlsIiwibmFtZSIsImNyZWF0ZWRBdCIsInVwZGF0ZWRBdCIsIm9yZGVyQnkiLCJjb25zb2xlIiwiUEFUQ0giLCJyZXF1ZXN0IiwidXNlcklkIiwiYWN0aW9uIiwidGFyZ2V0VXNlciIsIm5ld1JvbGUiLCJ1cGRhdGVkVXNlciIsInVwZGF0ZSIsImRhdGEiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./src/app/api/admin/users/route.ts\n");

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

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/next-auth","vendor-chunks/@babel","vendor-chunks/jose","vendor-chunks/openid-client","vendor-chunks/oauth","vendor-chunks/object-hash","vendor-chunks/preact","vendor-chunks/preact-render-to-string","vendor-chunks/uuid","vendor-chunks/yallist","vendor-chunks/lru-cache","vendor-chunks/cookie","vendor-chunks/oidc-token-hash","vendor-chunks/@panva"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fadmin%2Fusers%2Froute&page=%2Fapi%2Fadmin%2Fusers%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fadmin%2Fusers%2Froute.ts&appDir=D%3A%5Cxinli%5Csrc%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=D%3A%5Cxinli&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();