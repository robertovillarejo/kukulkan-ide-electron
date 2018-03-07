"use strict";
/*
 * Copyright (C) 2017 TypeFox and others.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 */
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var inversify_1 = require("inversify");
var node_1 = require("@theia/languages/lib/node");
var path = require("path");
exports.default = new inversify_1.ContainerModule(function (bind) {
    bind(node_1.LanguageServerContribution).to(DSLContribution);
});
var DSLContribution = /** @class */ (function (_super) {
    __extends(DSLContribution, _super);
    function DSLContribution() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.id = "kukulkan";
        _this.name = "kukulkan";
        return _this;
    }
    DSLContribution.prototype.start = function (clientConnection) {
        var jar = path.resolve(__dirname, '../../build/dsl-ls.jar');
        var command = 'java';
        var args = [
            '-jar',
            jar
        ];
        var serverConnection = this.createProcessStreamConnection(command, args);
        this.forward(clientConnection, serverConnection);
    };
    DSLContribution.prototype.onDidFailSpawnProcess = function (error) {
        _super.prototype.onDidFailSpawnProcess.call(this, error);
        console.error("Error starting kukulkan language server.", error);
    };
    DSLContribution = __decorate([
        inversify_1.injectable()
    ], DSLContribution);
    return DSLContribution;
}(node_1.BaseLanguageServerContribution));
//# sourceMappingURL=kukulkan-backend-module.js.map