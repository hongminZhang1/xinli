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
exports.id = "app/api/uploadthing/route";
exports.ids = ["app/api/uploadthing/route"];
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

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fuploadthing%2Froute&page=%2Fapi%2Fuploadthing%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fuploadthing%2Froute.ts&appDir=D%3A%5Cxinli%5Csrc%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=D%3A%5Cxinli&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fuploadthing%2Froute&page=%2Fapi%2Fuploadthing%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fuploadthing%2Froute.ts&appDir=D%3A%5Cxinli%5Csrc%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=D%3A%5Cxinli&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   headerHooks: () => (/* binding */ headerHooks),\n/* harmony export */   originalPathname: () => (/* binding */ originalPathname),\n/* harmony export */   requestAsyncStorage: () => (/* binding */ requestAsyncStorage),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   staticGenerationAsyncStorage: () => (/* binding */ staticGenerationAsyncStorage),\n/* harmony export */   staticGenerationBailout: () => (/* binding */ staticGenerationBailout)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/future/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/future/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/future/route-kind */ \"(rsc)/./node_modules/next/dist/server/future/route-kind.js\");\n/* harmony import */ var D_xinli_src_app_api_uploadthing_route_ts__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./src/app/api/uploadthing/route.ts */ \"(rsc)/./src/app/api/uploadthing/route.ts\");\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/uploadthing/route\",\n        pathname: \"/api/uploadthing\",\n        filename: \"route\",\n        bundlePath: \"app/api/uploadthing/route\"\n    },\n    resolvedPagePath: \"D:\\\\xinli\\\\src\\\\app\\\\api\\\\uploadthing\\\\route.ts\",\n    nextConfigOutput,\n    userland: D_xinli_src_app_api_uploadthing_route_ts__WEBPACK_IMPORTED_MODULE_2__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { requestAsyncStorage, staticGenerationAsyncStorage, serverHooks, headerHooks, staticGenerationBailout } = routeModule;\nconst originalPathname = \"/api/uploadthing/route\";\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIuanM/bmFtZT1hcHAlMkZhcGklMkZ1cGxvYWR0aGluZyUyRnJvdXRlJnBhZ2U9JTJGYXBpJTJGdXBsb2FkdGhpbmclMkZyb3V0ZSZhcHBQYXRocz0mcGFnZVBhdGg9cHJpdmF0ZS1uZXh0LWFwcC1kaXIlMkZhcGklMkZ1cGxvYWR0aGluZyUyRnJvdXRlLnRzJmFwcERpcj1EJTNBJTVDeGlubGklNUNzcmMlNUNhcHAmcGFnZUV4dGVuc2lvbnM9dHN4JnBhZ2VFeHRlbnNpb25zPXRzJnBhZ2VFeHRlbnNpb25zPWpzeCZwYWdlRXh0ZW5zaW9ucz1qcyZyb290RGlyPUQlM0ElNUN4aW5saSZpc0Rldj10cnVlJnRzY29uZmlnUGF0aD10c2NvbmZpZy5qc29uJmJhc2VQYXRoPSZhc3NldFByZWZpeD0mbmV4dENvbmZpZ091dHB1dD0mcHJlZmVycmVkUmVnaW9uPSZtaWRkbGV3YXJlQ29uZmlnPWUzMCUzRCEiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBc0c7QUFDdkM7QUFDYTtBQUM1RTtBQUNBO0FBQ0E7QUFDQSx3QkFBd0IsZ0hBQW1CO0FBQzNDO0FBQ0EsY0FBYyx5RUFBUztBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsWUFBWTtBQUNaLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQSxRQUFRLHVHQUF1RztBQUMvRztBQUNpSjs7QUFFakoiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly94aW5saS8/MTViOSJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBcHBSb3V0ZVJvdXRlTW9kdWxlIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvZnV0dXJlL3JvdXRlLW1vZHVsZXMvYXBwLXJvdXRlL21vZHVsZS5jb21waWxlZFwiO1xuaW1wb3J0IHsgUm91dGVLaW5kIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvZnV0dXJlL3JvdXRlLWtpbmRcIjtcbmltcG9ydCAqIGFzIHVzZXJsYW5kIGZyb20gXCJEOlxcXFx4aW5saVxcXFxzcmNcXFxcYXBwXFxcXGFwaVxcXFx1cGxvYWR0aGluZ1xcXFxyb3V0ZS50c1wiO1xuLy8gV2UgaW5qZWN0IHRoZSBuZXh0Q29uZmlnT3V0cHV0IGhlcmUgc28gdGhhdCB3ZSBjYW4gdXNlIHRoZW0gaW4gdGhlIHJvdXRlXG4vLyBtb2R1bGUuXG5jb25zdCBuZXh0Q29uZmlnT3V0cHV0ID0gXCJcIlxuY29uc3Qgcm91dGVNb2R1bGUgPSBuZXcgQXBwUm91dGVSb3V0ZU1vZHVsZSh7XG4gICAgZGVmaW5pdGlvbjoge1xuICAgICAgICBraW5kOiBSb3V0ZUtpbmQuQVBQX1JPVVRFLFxuICAgICAgICBwYWdlOiBcIi9hcGkvdXBsb2FkdGhpbmcvcm91dGVcIixcbiAgICAgICAgcGF0aG5hbWU6IFwiL2FwaS91cGxvYWR0aGluZ1wiLFxuICAgICAgICBmaWxlbmFtZTogXCJyb3V0ZVwiLFxuICAgICAgICBidW5kbGVQYXRoOiBcImFwcC9hcGkvdXBsb2FkdGhpbmcvcm91dGVcIlxuICAgIH0sXG4gICAgcmVzb2x2ZWRQYWdlUGF0aDogXCJEOlxcXFx4aW5saVxcXFxzcmNcXFxcYXBwXFxcXGFwaVxcXFx1cGxvYWR0aGluZ1xcXFxyb3V0ZS50c1wiLFxuICAgIG5leHRDb25maWdPdXRwdXQsXG4gICAgdXNlcmxhbmRcbn0pO1xuLy8gUHVsbCBvdXQgdGhlIGV4cG9ydHMgdGhhdCB3ZSBuZWVkIHRvIGV4cG9zZSBmcm9tIHRoZSBtb2R1bGUuIFRoaXMgc2hvdWxkXG4vLyBiZSBlbGltaW5hdGVkIHdoZW4gd2UndmUgbW92ZWQgdGhlIG90aGVyIHJvdXRlcyB0byB0aGUgbmV3IGZvcm1hdC4gVGhlc2Vcbi8vIGFyZSB1c2VkIHRvIGhvb2sgaW50byB0aGUgcm91dGUuXG5jb25zdCB7IHJlcXVlc3RBc3luY1N0b3JhZ2UsIHN0YXRpY0dlbmVyYXRpb25Bc3luY1N0b3JhZ2UsIHNlcnZlckhvb2tzLCBoZWFkZXJIb29rcywgc3RhdGljR2VuZXJhdGlvbkJhaWxvdXQgfSA9IHJvdXRlTW9kdWxlO1xuY29uc3Qgb3JpZ2luYWxQYXRobmFtZSA9IFwiL2FwaS91cGxvYWR0aGluZy9yb3V0ZVwiO1xuZXhwb3J0IHsgcm91dGVNb2R1bGUsIHJlcXVlc3RBc3luY1N0b3JhZ2UsIHN0YXRpY0dlbmVyYXRpb25Bc3luY1N0b3JhZ2UsIHNlcnZlckhvb2tzLCBoZWFkZXJIb29rcywgc3RhdGljR2VuZXJhdGlvbkJhaWxvdXQsIG9yaWdpbmFsUGF0aG5hbWUsICB9O1xuXG4vLyMgc291cmNlTWFwcGluZ1VSTD1hcHAtcm91dGUuanMubWFwIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fuploadthing%2Froute&page=%2Fapi%2Fuploadthing%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fuploadthing%2Froute.ts&appDir=D%3A%5Cxinli%5Csrc%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=D%3A%5Cxinli&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

/***/ }),

/***/ "(rsc)/./src/app/api/auth/[...nextauth]/route.ts":
/*!*************************************************!*\
  !*** ./src/app/api/auth/[...nextauth]/route.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   GET: () => (/* binding */ handler),\n/* harmony export */   POST: () => (/* binding */ handler),\n/* harmony export */   authOptions: () => (/* binding */ authOptions)\n/* harmony export */ });\n/* harmony import */ var next_auth__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next-auth */ \"(rsc)/./node_modules/next-auth/index.js\");\n/* harmony import */ var next_auth__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_auth__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_auth_providers_credentials__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next-auth/providers/credentials */ \"(rsc)/./node_modules/next-auth/providers/credentials.js\");\n/* harmony import */ var _lib_db__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/lib/db */ \"(rsc)/./src/lib/db.ts\");\n/* harmony import */ var bcrypt__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! bcrypt */ \"bcrypt\");\n/* harmony import */ var bcrypt__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(bcrypt__WEBPACK_IMPORTED_MODULE_3__);\n\n\n\n\nconst authOptions = {\n    providers: [\n        (0,next_auth_providers_credentials__WEBPACK_IMPORTED_MODULE_1__[\"default\"])({\n            name: \"Credentials\",\n            credentials: {\n                username: {\n                    label: \"Username\",\n                    type: \"text\"\n                },\n                password: {\n                    label: \"Password\",\n                    type: \"password\"\n                }\n            },\n            async authorize (credentials) {\n                if (!credentials?.username || !credentials?.password) {\n                    return null;\n                }\n                const user = await _lib_db__WEBPACK_IMPORTED_MODULE_2__.prisma.user.findUnique({\n                    where: {\n                        username: credentials.username\n                    },\n                    select: {\n                        id: true,\n                        username: true,\n                        password: true,\n                        role: true,\n                        isActive: true,\n                        avatar: true\n                    }\n                });\n                if (!user || !user.password) {\n                    return null;\n                }\n                // 检查用户是否被禁用\n                // if (!user.isActive) {\n                //   throw new Error('您的账户已被禁用，请联系管理员');\n                // }\n                const isValid = await bcrypt__WEBPACK_IMPORTED_MODULE_3___default().compare(credentials.password, user.password);\n                if (isValid) {\n                    // Return user data including role\n                    return {\n                        id: user.id,\n                        username: user.username,\n                        role: user.role,\n                        isActive: true,\n                        avatar: user.avatar\n                    };\n                } else {\n                    return null;\n                }\n            }\n        })\n    ],\n    session: {\n        strategy: \"jwt\"\n    },\n    pages: {\n        signIn: \"/\"\n    },\n    callbacks: {\n        async jwt ({ token, user }) {\n            if (user) {\n                token.id = user.id;\n                token.username = user.username;\n                token.role = user.role;\n                token.isActive = user.isActive;\n                token.avatar = user.avatar;\n            }\n            return token;\n        },\n        async session ({ session, token }) {\n            if (session.user && token.id) {\n                // 从数据库获取最新的用户信息\n                try {\n                    const user = await _lib_db__WEBPACK_IMPORTED_MODULE_2__.prisma.user.findUnique({\n                        where: {\n                            id: token.id\n                        },\n                        select: {\n                            id: true,\n                            username: true,\n                            avatar: true,\n                            role: true,\n                            isActive: true\n                        }\n                    });\n                    if (user) {\n                        session.user.id = user.id;\n                        session.user.username = user.username;\n                        session.user.role = user.role;\n                        session.user.isActive = user.isActive;\n                        session.user.avatar = user.avatar;\n                    }\n                } catch (error) {\n                    console.error(\"Error fetching user data:\", error);\n                    // 如果数据库查询失败，使用token中的数据\n                    session.user.id = token.id;\n                    session.user.username = token.username;\n                    session.user.role = token.role;\n                    session.user.isActive = token.isActive;\n                    session.user.avatar = token.avatar;\n                }\n            }\n            return session;\n        }\n    },\n    secret: process.env.NEXTAUTH_SECRET\n};\nconst handler = next_auth__WEBPACK_IMPORTED_MODULE_0___default()(authOptions);\n\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9zcmMvYXBwL2FwaS9hdXRoL1suLi5uZXh0YXV0aF0vcm91dGUudHMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQWlDO0FBQ2lDO0FBQ2hDO0FBQ047QUFHckIsTUFBTUksY0FBMkI7SUFDdENDLFdBQVc7UUFDVEosMkVBQW1CQSxDQUFDO1lBQ2xCSyxNQUFNO1lBQ05DLGFBQWE7Z0JBQ1hDLFVBQVU7b0JBQUVDLE9BQU87b0JBQVlDLE1BQU07Z0JBQU87Z0JBQzVDQyxVQUFVO29CQUFFRixPQUFPO29CQUFZQyxNQUFNO2dCQUFXO1lBQ2xEO1lBQ0EsTUFBTUUsV0FBVUwsV0FBVztnQkFDekIsSUFBSSxDQUFDQSxhQUFhQyxZQUFZLENBQUNELGFBQWFJLFVBQVU7b0JBQ3BELE9BQU87Z0JBQ1Q7Z0JBRUEsTUFBTUUsT0FBTyxNQUFNWCwyQ0FBTUEsQ0FBQ1csSUFBSSxDQUFDQyxVQUFVLENBQUM7b0JBQ3hDQyxPQUFPO3dCQUFFUCxVQUFVRCxZQUFZQyxRQUFRO29CQUFDO29CQUN4Q1EsUUFBUTt3QkFDTkMsSUFBSTt3QkFDSlQsVUFBVTt3QkFDVkcsVUFBVTt3QkFDVk8sTUFBTTt3QkFDTkMsVUFBVTt3QkFDVkMsUUFBUTtvQkFDVjtnQkFDRjtnQkFFQSxJQUFJLENBQUNQLFFBQVEsQ0FBQ0EsS0FBS0YsUUFBUSxFQUFFO29CQUMzQixPQUFPO2dCQUNUO2dCQUVBLFlBQVk7Z0JBQ1osd0JBQXdCO2dCQUN4Qix3Q0FBd0M7Z0JBQ3hDLElBQUk7Z0JBRUosTUFBTVUsVUFBVSxNQUFNbEIscURBQWMsQ0FBQ0ksWUFBWUksUUFBUSxFQUFFRSxLQUFLRixRQUFRO2dCQUV4RSxJQUFJVSxTQUFTO29CQUNYLGtDQUFrQztvQkFDbEMsT0FBTzt3QkFDTEosSUFBSUosS0FBS0ksRUFBRTt3QkFDWFQsVUFBVUssS0FBS0wsUUFBUTt3QkFDdkJVLE1BQU1MLEtBQUtLLElBQUk7d0JBQ2ZDLFVBQVU7d0JBQ1ZDLFFBQVFQLEtBQUtPLE1BQU07b0JBQ3JCO2dCQUNGLE9BQU87b0JBQ0wsT0FBTztnQkFDVDtZQUNGO1FBQ0Y7S0FDRDtJQUNERyxTQUFTO1FBQ1BDLFVBQVU7SUFDWjtJQUNBQyxPQUFPO1FBQ0xDLFFBQVE7SUFDVjtJQUNBQyxXQUFXO1FBQ1QsTUFBTUMsS0FBSSxFQUFFQyxLQUFLLEVBQUVoQixJQUFJLEVBQUU7WUFDdkIsSUFBSUEsTUFBTTtnQkFDUmdCLE1BQU1aLEVBQUUsR0FBR0osS0FBS0ksRUFBRTtnQkFDbEJZLE1BQU1yQixRQUFRLEdBQUdLLEtBQUtMLFFBQVE7Z0JBQzlCcUIsTUFBTVgsSUFBSSxHQUFHTCxLQUFLSyxJQUFJO2dCQUN0QlcsTUFBTVYsUUFBUSxHQUFHTixLQUFLTSxRQUFRO2dCQUM5QlUsTUFBTVQsTUFBTSxHQUFHUCxLQUFLTyxNQUFNO1lBQzVCO1lBQ0EsT0FBT1M7UUFDVDtRQUNBLE1BQU1OLFNBQVEsRUFBRUEsT0FBTyxFQUFFTSxLQUFLLEVBQUU7WUFDOUIsSUFBSU4sUUFBUVYsSUFBSSxJQUFJZ0IsTUFBTVosRUFBRSxFQUFFO2dCQUM1QixnQkFBZ0I7Z0JBQ2hCLElBQUk7b0JBQ0YsTUFBTUosT0FBTyxNQUFNWCwyQ0FBTUEsQ0FBQ1csSUFBSSxDQUFDQyxVQUFVLENBQUM7d0JBQ3hDQyxPQUFPOzRCQUFFRSxJQUFJWSxNQUFNWixFQUFFO3dCQUFDO3dCQUN0QkQsUUFBUTs0QkFDTkMsSUFBSTs0QkFDSlQsVUFBVTs0QkFDVlksUUFBUTs0QkFDUkYsTUFBTTs0QkFDTkMsVUFBVTt3QkFDWjtvQkFDRjtvQkFFQSxJQUFJTixNQUFNO3dCQUNSVSxRQUFRVixJQUFJLENBQUNJLEVBQUUsR0FBR0osS0FBS0ksRUFBRTt3QkFDekJNLFFBQVFWLElBQUksQ0FBQ0wsUUFBUSxHQUFHSyxLQUFLTCxRQUFRO3dCQUNyQ2UsUUFBUVYsSUFBSSxDQUFDSyxJQUFJLEdBQUdMLEtBQUtLLElBQUk7d0JBQzdCSyxRQUFRVixJQUFJLENBQUNNLFFBQVEsR0FBR04sS0FBS00sUUFBUTt3QkFDckNJLFFBQVFWLElBQUksQ0FBQ08sTUFBTSxHQUFHUCxLQUFLTyxNQUFNO29CQUNuQztnQkFDRixFQUFFLE9BQU9VLE9BQU87b0JBQ2RDLFFBQVFELEtBQUssQ0FBQyw2QkFBNkJBO29CQUMzQyx3QkFBd0I7b0JBQ3hCUCxRQUFRVixJQUFJLENBQUNJLEVBQUUsR0FBR1ksTUFBTVosRUFBRTtvQkFDMUJNLFFBQVFWLElBQUksQ0FBQ0wsUUFBUSxHQUFHcUIsTUFBTXJCLFFBQVE7b0JBQ3RDZSxRQUFRVixJQUFJLENBQUNLLElBQUksR0FBR1csTUFBTVgsSUFBSTtvQkFDOUJLLFFBQVFWLElBQUksQ0FBQ00sUUFBUSxHQUFHVSxNQUFNVixRQUFRO29CQUN0Q0ksUUFBUVYsSUFBSSxDQUFDTyxNQUFNLEdBQUdTLE1BQU1ULE1BQU07Z0JBQ3BDO1lBQ0Y7WUFDQSxPQUFPRztRQUNUO0lBQ0Y7SUFDQVMsUUFBUUMsUUFBUUMsR0FBRyxDQUFDQyxlQUFlO0FBQ3JDLEVBQUU7QUFFRixNQUFNQyxVQUFVcEMsZ0RBQVFBLENBQUNJO0FBRWtCIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8veGlubGkvLi9zcmMvYXBwL2FwaS9hdXRoL1suLi5uZXh0YXV0aF0vcm91dGUudHM/MDA5OCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgTmV4dEF1dGggZnJvbSBcIm5leHQtYXV0aFwiO1xyXG5pbXBvcnQgQ3JlZGVudGlhbHNQcm92aWRlciBmcm9tIFwibmV4dC1hdXRoL3Byb3ZpZGVycy9jcmVkZW50aWFsc1wiO1xyXG5pbXBvcnQgeyBwcmlzbWEgfSBmcm9tIFwiQC9saWIvZGJcIjtcclxuaW1wb3J0IGJjcnlwdCBmcm9tIFwiYmNyeXB0XCI7XHJcbmltcG9ydCB7IEF1dGhPcHRpb25zIH0gZnJvbSBcIm5leHQtYXV0aFwiO1xyXG5cclxuZXhwb3J0IGNvbnN0IGF1dGhPcHRpb25zOiBBdXRoT3B0aW9ucyA9IHtcclxuICBwcm92aWRlcnM6IFtcclxuICAgIENyZWRlbnRpYWxzUHJvdmlkZXIoe1xyXG4gICAgICBuYW1lOiBcIkNyZWRlbnRpYWxzXCIsXHJcbiAgICAgIGNyZWRlbnRpYWxzOiB7XHJcbiAgICAgICAgdXNlcm5hbWU6IHsgbGFiZWw6IFwiVXNlcm5hbWVcIiwgdHlwZTogXCJ0ZXh0XCIgfSxcclxuICAgICAgICBwYXNzd29yZDogeyBsYWJlbDogXCJQYXNzd29yZFwiLCB0eXBlOiBcInBhc3N3b3JkXCIgfSxcclxuICAgICAgfSxcclxuICAgICAgYXN5bmMgYXV0aG9yaXplKGNyZWRlbnRpYWxzKSB7XHJcbiAgICAgICAgaWYgKCFjcmVkZW50aWFscz8udXNlcm5hbWUgfHwgIWNyZWRlbnRpYWxzPy5wYXNzd29yZCkge1xyXG4gICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCB1c2VyID0gYXdhaXQgcHJpc21hLnVzZXIuZmluZFVuaXF1ZSh7XHJcbiAgICAgICAgICB3aGVyZTogeyB1c2VybmFtZTogY3JlZGVudGlhbHMudXNlcm5hbWUgfSxcclxuICAgICAgICAgIHNlbGVjdDoge1xyXG4gICAgICAgICAgICBpZDogdHJ1ZSxcclxuICAgICAgICAgICAgdXNlcm5hbWU6IHRydWUsXHJcbiAgICAgICAgICAgIHBhc3N3b3JkOiB0cnVlLFxyXG4gICAgICAgICAgICByb2xlOiB0cnVlLFxyXG4gICAgICAgICAgICBpc0FjdGl2ZTogdHJ1ZSxcclxuICAgICAgICAgICAgYXZhdGFyOiB0cnVlLFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaWYgKCF1c2VyIHx8ICF1c2VyLnBhc3N3b3JkKSB7XHJcbiAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIOajgOafpeeUqOaIt+aYr+WQpuiiq+emgeeUqFxyXG4gICAgICAgIC8vIGlmICghdXNlci5pc0FjdGl2ZSkge1xyXG4gICAgICAgIC8vICAgdGhyb3cgbmV3IEVycm9yKCfmgqjnmoTotKbmiLflt7LooqvnpoHnlKjvvIzor7fogZTns7vnrqHnkIblkZgnKTtcclxuICAgICAgICAvLyB9XHJcblxyXG4gICAgICAgIGNvbnN0IGlzVmFsaWQgPSBhd2FpdCBiY3J5cHQuY29tcGFyZShjcmVkZW50aWFscy5wYXNzd29yZCwgdXNlci5wYXNzd29yZCk7XHJcblxyXG4gICAgICAgIGlmIChpc1ZhbGlkKSB7XHJcbiAgICAgICAgICAvLyBSZXR1cm4gdXNlciBkYXRhIGluY2x1ZGluZyByb2xlXHJcbiAgICAgICAgICByZXR1cm4geyBcclxuICAgICAgICAgICAgaWQ6IHVzZXIuaWQsIFxyXG4gICAgICAgICAgICB1c2VybmFtZTogdXNlci51c2VybmFtZSxcclxuICAgICAgICAgICAgcm9sZTogdXNlci5yb2xlLFxyXG4gICAgICAgICAgICBpc0FjdGl2ZTogdHJ1ZSwgLy8g5pqC5pe26buY6K6k5Li6dHJ1ZVxyXG4gICAgICAgICAgICBhdmF0YXI6IHVzZXIuYXZhdGFyLFxyXG4gICAgICAgICAgfTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgICB9LFxyXG4gICAgfSksXHJcbiAgXSxcclxuICBzZXNzaW9uOiB7XHJcbiAgICBzdHJhdGVneTogXCJqd3RcIixcclxuICB9LFxyXG4gIHBhZ2VzOiB7XHJcbiAgICBzaWduSW46IFwiL1wiLFxyXG4gIH0sXHJcbiAgY2FsbGJhY2tzOiB7XHJcbiAgICBhc3luYyBqd3QoeyB0b2tlbiwgdXNlciB9KSB7XHJcbiAgICAgIGlmICh1c2VyKSB7XHJcbiAgICAgICAgdG9rZW4uaWQgPSB1c2VyLmlkO1xyXG4gICAgICAgIHRva2VuLnVzZXJuYW1lID0gdXNlci51c2VybmFtZTtcclxuICAgICAgICB0b2tlbi5yb2xlID0gdXNlci5yb2xlO1xyXG4gICAgICAgIHRva2VuLmlzQWN0aXZlID0gdXNlci5pc0FjdGl2ZTtcclxuICAgICAgICB0b2tlbi5hdmF0YXIgPSB1c2VyLmF2YXRhcjtcclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gdG9rZW47XHJcbiAgICB9LFxyXG4gICAgYXN5bmMgc2Vzc2lvbih7IHNlc3Npb24sIHRva2VuIH0pIHtcclxuICAgICAgaWYgKHNlc3Npb24udXNlciAmJiB0b2tlbi5pZCkge1xyXG4gICAgICAgIC8vIOS7juaVsOaNruW6k+iOt+WPluacgOaWsOeahOeUqOaIt+S/oeaBr1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICBjb25zdCB1c2VyID0gYXdhaXQgcHJpc21hLnVzZXIuZmluZFVuaXF1ZSh7XHJcbiAgICAgICAgICAgIHdoZXJlOiB7IGlkOiB0b2tlbi5pZCB9LFxyXG4gICAgICAgICAgICBzZWxlY3Q6IHtcclxuICAgICAgICAgICAgICBpZDogdHJ1ZSxcclxuICAgICAgICAgICAgICB1c2VybmFtZTogdHJ1ZSxcclxuICAgICAgICAgICAgICBhdmF0YXI6IHRydWUsXHJcbiAgICAgICAgICAgICAgcm9sZTogdHJ1ZSxcclxuICAgICAgICAgICAgICBpc0FjdGl2ZTogdHJ1ZSxcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgICBcclxuICAgICAgICAgIGlmICh1c2VyKSB7XHJcbiAgICAgICAgICAgIHNlc3Npb24udXNlci5pZCA9IHVzZXIuaWQ7XHJcbiAgICAgICAgICAgIHNlc3Npb24udXNlci51c2VybmFtZSA9IHVzZXIudXNlcm5hbWU7XHJcbiAgICAgICAgICAgIHNlc3Npb24udXNlci5yb2xlID0gdXNlci5yb2xlO1xyXG4gICAgICAgICAgICBzZXNzaW9uLnVzZXIuaXNBY3RpdmUgPSB1c2VyLmlzQWN0aXZlO1xyXG4gICAgICAgICAgICBzZXNzaW9uLnVzZXIuYXZhdGFyID0gdXNlci5hdmF0YXI7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJFcnJvciBmZXRjaGluZyB1c2VyIGRhdGE6XCIsIGVycm9yKTtcclxuICAgICAgICAgIC8vIOWmguaenOaVsOaNruW6k+afpeivouWksei0pe+8jOS9v+eUqHRva2Vu5Lit55qE5pWw5o2uXHJcbiAgICAgICAgICBzZXNzaW9uLnVzZXIuaWQgPSB0b2tlbi5pZDtcclxuICAgICAgICAgIHNlc3Npb24udXNlci51c2VybmFtZSA9IHRva2VuLnVzZXJuYW1lO1xyXG4gICAgICAgICAgc2Vzc2lvbi51c2VyLnJvbGUgPSB0b2tlbi5yb2xlO1xyXG4gICAgICAgICAgc2Vzc2lvbi51c2VyLmlzQWN0aXZlID0gdG9rZW4uaXNBY3RpdmU7XHJcbiAgICAgICAgICBzZXNzaW9uLnVzZXIuYXZhdGFyID0gdG9rZW4uYXZhdGFyO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gc2Vzc2lvbjtcclxuICAgIH0sXHJcbiAgfSxcclxuICBzZWNyZXQ6IHByb2Nlc3MuZW52Lk5FWFRBVVRIX1NFQ1JFVCxcclxufTtcclxuXHJcbmNvbnN0IGhhbmRsZXIgPSBOZXh0QXV0aChhdXRoT3B0aW9ucyk7XHJcblxyXG5leHBvcnQgeyBoYW5kbGVyIGFzIEdFVCwgaGFuZGxlciBhcyBQT1NUIH07XHJcbiJdLCJuYW1lcyI6WyJOZXh0QXV0aCIsIkNyZWRlbnRpYWxzUHJvdmlkZXIiLCJwcmlzbWEiLCJiY3J5cHQiLCJhdXRoT3B0aW9ucyIsInByb3ZpZGVycyIsIm5hbWUiLCJjcmVkZW50aWFscyIsInVzZXJuYW1lIiwibGFiZWwiLCJ0eXBlIiwicGFzc3dvcmQiLCJhdXRob3JpemUiLCJ1c2VyIiwiZmluZFVuaXF1ZSIsIndoZXJlIiwic2VsZWN0IiwiaWQiLCJyb2xlIiwiaXNBY3RpdmUiLCJhdmF0YXIiLCJpc1ZhbGlkIiwiY29tcGFyZSIsInNlc3Npb24iLCJzdHJhdGVneSIsInBhZ2VzIiwic2lnbkluIiwiY2FsbGJhY2tzIiwiand0IiwidG9rZW4iLCJlcnJvciIsImNvbnNvbGUiLCJzZWNyZXQiLCJwcm9jZXNzIiwiZW52IiwiTkVYVEFVVEhfU0VDUkVUIiwiaGFuZGxlciIsIkdFVCIsIlBPU1QiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./src/app/api/auth/[...nextauth]/route.ts\n");

/***/ }),

/***/ "(rsc)/./src/app/api/uploadthing/core.ts":
/*!*****************************************!*\
  !*** ./src/app/api/uploadthing/core.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   ourFileRouter: () => (/* binding */ ourFileRouter)\n/* harmony export */ });\n/* harmony import */ var uploadthing_next__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! uploadthing/next */ \"(rsc)/./node_modules/uploadthing/next/index.js\");\n/* harmony import */ var next_auth__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next-auth */ \"(rsc)/./node_modules/next-auth/index.js\");\n/* harmony import */ var next_auth__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_auth__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _app_api_auth_nextauth_route__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/app/api/auth/[...nextauth]/route */ \"(rsc)/./src/app/api/auth/[...nextauth]/route.ts\");\n\n\n\nconst f = (0,uploadthing_next__WEBPACK_IMPORTED_MODULE_2__.createUploadthing)();\nconst ourFileRouter = {\n    avatarUploader: f({\n        image: {\n            maxFileSize: \"4MB\",\n            maxFileCount: 1\n        }\n    }).middleware(async ()=>{\n        // 检查用户是否已认证\n        const session = await (0,next_auth__WEBPACK_IMPORTED_MODULE_0__.getServerSession)(_app_api_auth_nextauth_route__WEBPACK_IMPORTED_MODULE_1__.authOptions);\n        if (!session?.user?.id) {\n            throw new Error(\"Unauthorized\");\n        }\n        return {\n            userId: session.user.id\n        };\n    }).onUploadComplete(async ({ metadata, file })=>{\n        console.log(\"Upload complete for userId:\", metadata.userId);\n        console.log(\"File URL:\", file.url);\n        return {\n            uploadedBy: metadata.userId,\n            url: file.url\n        };\n    })\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9zcmMvYXBwL2FwaS91cGxvYWR0aGluZy9jb3JlLnRzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQXNFO0FBQ3pCO0FBQ29CO0FBRWpFLE1BQU1HLElBQUlILG1FQUFpQkE7QUFFcEIsTUFBTUksZ0JBQWdCO0lBQzNCQyxnQkFBZ0JGLEVBQUU7UUFDaEJHLE9BQU87WUFDTEMsYUFBYTtZQUNiQyxjQUFjO1FBQ2hCO0lBQ0YsR0FDR0MsVUFBVSxDQUFDO1FBQ1YsWUFBWTtRQUNaLE1BQU1DLFVBQVUsTUFBTVQsMkRBQWdCQSxDQUFDQyxxRUFBV0E7UUFFbEQsSUFBSSxDQUFDUSxTQUFTQyxNQUFNQyxJQUFJO1lBQ3RCLE1BQU0sSUFBSUMsTUFBTTtRQUNsQjtRQUVBLE9BQU87WUFBRUMsUUFBUUosUUFBUUMsSUFBSSxDQUFDQyxFQUFFO1FBQUM7SUFDbkMsR0FDQ0csZ0JBQWdCLENBQUMsT0FBTyxFQUFFQyxRQUFRLEVBQUVDLElBQUksRUFBRTtRQUN6Q0MsUUFBUUMsR0FBRyxDQUFDLCtCQUErQkgsU0FBU0YsTUFBTTtRQUMxREksUUFBUUMsR0FBRyxDQUFDLGFBQWFGLEtBQUtHLEdBQUc7UUFFakMsT0FBTztZQUNMQyxZQUFZTCxTQUFTRixNQUFNO1lBQzNCTSxLQUFLSCxLQUFLRyxHQUFHO1FBQ2Y7SUFDRjtBQUNKLEVBQXVCIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8veGlubGkvLi9zcmMvYXBwL2FwaS91cGxvYWR0aGluZy9jb3JlLnRzPzFhNjgiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgY3JlYXRlVXBsb2FkdGhpbmcsIHR5cGUgRmlsZVJvdXRlciB9IGZyb20gXCJ1cGxvYWR0aGluZy9uZXh0XCI7XHJcbmltcG9ydCB7IGdldFNlcnZlclNlc3Npb24gfSBmcm9tIFwibmV4dC1hdXRoXCI7XHJcbmltcG9ydCB7IGF1dGhPcHRpb25zIH0gZnJvbSBcIkAvYXBwL2FwaS9hdXRoL1suLi5uZXh0YXV0aF0vcm91dGVcIjtcclxuXHJcbmNvbnN0IGYgPSBjcmVhdGVVcGxvYWR0aGluZygpO1xyXG5cclxuZXhwb3J0IGNvbnN0IG91ckZpbGVSb3V0ZXIgPSB7XHJcbiAgYXZhdGFyVXBsb2FkZXI6IGYoe1xyXG4gICAgaW1hZ2U6IHsgXHJcbiAgICAgIG1heEZpbGVTaXplOiBcIjRNQlwiLFxyXG4gICAgICBtYXhGaWxlQ291bnQ6IDFcclxuICAgIH1cclxuICB9KVxyXG4gICAgLm1pZGRsZXdhcmUoYXN5bmMgKCkgPT4ge1xyXG4gICAgICAvLyDmo4Dmn6XnlKjmiLfmmK/lkKblt7LorqTor4FcclxuICAgICAgY29uc3Qgc2Vzc2lvbiA9IGF3YWl0IGdldFNlcnZlclNlc3Npb24oYXV0aE9wdGlvbnMpO1xyXG4gICAgICBcclxuICAgICAgaWYgKCFzZXNzaW9uPy51c2VyPy5pZCkge1xyXG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIlVuYXV0aG9yaXplZFwiKTtcclxuICAgICAgfVxyXG4gICAgICBcclxuICAgICAgcmV0dXJuIHsgdXNlcklkOiBzZXNzaW9uLnVzZXIuaWQgfTtcclxuICAgIH0pXHJcbiAgICAub25VcGxvYWRDb21wbGV0ZShhc3luYyAoeyBtZXRhZGF0YSwgZmlsZSB9KSA9PiB7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwiVXBsb2FkIGNvbXBsZXRlIGZvciB1c2VySWQ6XCIsIG1ldGFkYXRhLnVzZXJJZCk7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwiRmlsZSBVUkw6XCIsIGZpbGUudXJsKTtcclxuICAgICAgXHJcbiAgICAgIHJldHVybiB7IFxyXG4gICAgICAgIHVwbG9hZGVkQnk6IG1ldGFkYXRhLnVzZXJJZCxcclxuICAgICAgICB1cmw6IGZpbGUudXJsIFxyXG4gICAgICB9O1xyXG4gICAgfSksXHJcbn0gc2F0aXNmaWVzIEZpbGVSb3V0ZXI7XHJcblxyXG5leHBvcnQgdHlwZSBPdXJGaWxlUm91dGVyID0gdHlwZW9mIG91ckZpbGVSb3V0ZXI7Il0sIm5hbWVzIjpbImNyZWF0ZVVwbG9hZHRoaW5nIiwiZ2V0U2VydmVyU2Vzc2lvbiIsImF1dGhPcHRpb25zIiwiZiIsIm91ckZpbGVSb3V0ZXIiLCJhdmF0YXJVcGxvYWRlciIsImltYWdlIiwibWF4RmlsZVNpemUiLCJtYXhGaWxlQ291bnQiLCJtaWRkbGV3YXJlIiwic2Vzc2lvbiIsInVzZXIiLCJpZCIsIkVycm9yIiwidXNlcklkIiwib25VcGxvYWRDb21wbGV0ZSIsIm1ldGFkYXRhIiwiZmlsZSIsImNvbnNvbGUiLCJsb2ciLCJ1cmwiLCJ1cGxvYWRlZEJ5Il0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./src/app/api/uploadthing/core.ts\n");

/***/ }),

/***/ "(rsc)/./src/app/api/uploadthing/route.ts":
/*!******************************************!*\
  !*** ./src/app/api/uploadthing/route.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   GET: () => (/* binding */ GET),\n/* harmony export */   POST: () => (/* binding */ POST)\n/* harmony export */ });\n/* harmony import */ var uploadthing_next__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! uploadthing/next */ \"(rsc)/./node_modules/uploadthing/next/index.js\");\n/* harmony import */ var _core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./core */ \"(rsc)/./src/app/api/uploadthing/core.ts\");\n\n\nconst { GET, POST } = (0,uploadthing_next__WEBPACK_IMPORTED_MODULE_1__.createRouteHandler)({\n    router: _core__WEBPACK_IMPORTED_MODULE_0__.ourFileRouter\n});\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9zcmMvYXBwL2FwaS91cGxvYWR0aGluZy9yb3V0ZS50cyIsIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQXNEO0FBQ2Y7QUFFaEMsTUFBTSxFQUFFRSxHQUFHLEVBQUVDLElBQUksRUFBRSxHQUFHSCxvRUFBa0JBLENBQUM7SUFDOUNJLFFBQVFILGdEQUFhQTtBQUN2QixHQUFHIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8veGlubGkvLi9zcmMvYXBwL2FwaS91cGxvYWR0aGluZy9yb3V0ZS50cz9hYTQxIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGNyZWF0ZVJvdXRlSGFuZGxlciB9IGZyb20gXCJ1cGxvYWR0aGluZy9uZXh0XCI7XHJcbmltcG9ydCB7IG91ckZpbGVSb3V0ZXIgfSBmcm9tIFwiLi9jb3JlXCI7XHJcblxyXG5leHBvcnQgY29uc3QgeyBHRVQsIFBPU1QgfSA9IGNyZWF0ZVJvdXRlSGFuZGxlcih7XHJcbiAgcm91dGVyOiBvdXJGaWxlUm91dGVyLFxyXG59KTsiXSwibmFtZXMiOlsiY3JlYXRlUm91dGVIYW5kbGVyIiwib3VyRmlsZVJvdXRlciIsIkdFVCIsIlBPU1QiLCJyb3V0ZXIiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./src/app/api/uploadthing/route.ts\n");

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
var __webpack_require__ = require("../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/next-auth","vendor-chunks/@babel","vendor-chunks/jose","vendor-chunks/openid-client","vendor-chunks/oauth","vendor-chunks/object-hash","vendor-chunks/preact","vendor-chunks/preact-render-to-string","vendor-chunks/uuid","vendor-chunks/yallist","vendor-chunks/lru-cache","vendor-chunks/cookie","vendor-chunks/oidc-token-hash","vendor-chunks/@panva","vendor-chunks/effect","vendor-chunks/@uploadthing","vendor-chunks/uploadthing","vendor-chunks/sqids","vendor-chunks/fast-check","vendor-chunks/@effect","vendor-chunks/pure-rand","vendor-chunks/multipasta","vendor-chunks/find-my-way-ts","vendor-chunks/@opentelemetry"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fuploadthing%2Froute&page=%2Fapi%2Fuploadthing%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fuploadthing%2Froute.ts&appDir=D%3A%5Cxinli%5Csrc%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=D%3A%5Cxinli&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();