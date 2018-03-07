"use strict";
/**
 * Generated using theia-extension-generator
 */
Object.defineProperty(exports, "__esModule", { value: true });
var inversify_1 = require("inversify");
var browser_1 = require("@theia/languages/lib/browser");
var language_contribution_1 = require("./language-contribution");
exports.default = new inversify_1.ContainerModule(function (bind) {
    // add your contribution bindings here
    bind(browser_1.LanguageClientContribution).to(language_contribution_1.DslClientContribution).inSingletonScope();
});
//# sourceMappingURL=kukulkan-frontend-module.js.map