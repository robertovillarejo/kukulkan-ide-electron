"use strict";
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
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
var inversify_1 = require("inversify");
var browser_1 = require("@theia/languages/lib/browser");
var DslClientContribution = /** @class */ (function (_super) {
    __extends(DslClientContribution, _super);
    function DslClientContribution(workspace, languages, languageClientFactory) {
        var _this = _super.call(this, workspace, languages, languageClientFactory) || this;
        _this.workspace = workspace;
        _this.languages = languages;
        _this.languageClientFactory = languageClientFactory;
        _this.id = "kukulkan";
        _this.name = "kukulkan";
        return _this;
    }
    Object.defineProperty(DslClientContribution.prototype, "globPatterns", {
        get: function () {
            return [
                '**/*.3k'
            ];
        },
        enumerable: true,
        configurable: true
    });
    DslClientContribution = __decorate([
        inversify_1.injectable(),
        __param(0, inversify_1.inject(browser_1.Workspace)),
        __param(1, inversify_1.inject(browser_1.Languages)),
        __param(2, inversify_1.inject(browser_1.LanguageClientFactory)),
        __metadata("design:paramtypes", [Object, Object, browser_1.LanguageClientFactory])
    ], DslClientContribution);
    return DslClientContribution;
}(browser_1.BaseLanguageClientContribution));
exports.DslClientContribution = DslClientContribution;
// register language with monaco on first load
registerDSL();
function registerDSL() {
    // initialize monaco
    monaco.languages.register({
        id: 'kukulkan',
        aliases: ['kukulkan'],
        extensions: ['.3k'],
        mimetypes: ['text/kukulkan']
    });
    monaco.languages.setLanguageConfiguration('kukulkan', {
        comments: {
            lineComment: "//",
            blockComment: ['/*', '*/']
        },
        brackets: [['{', '}'], ['(', ')']],
        autoClosingPairs: [
            {
                open: '{',
                close: '}'
            },
            {
                open: '(',
                close: ')'
            }
        ]
    });
    monaco.languages.setMonarchTokensProvider('kukulkan', {
        // Set defaultToken to invalid to see what you do not tokenize yet
        // defaultToken: 'invalid',
        keywords: [
            'ManyToMany', 'ManyToOne', 'OneToMany', 'OneToOne', 'dto', 'entity', 'max', 'maxbytes', 'maxlength', 'min', 'minbytes', 'minlength', 'pattern', 'required'
        ],
        typeKeywords: [],
        operators: [],
        // we include these common regular expressions
        symbols: /[=><!~?:&|+\-*\/\^%]+/,
        escapes: /\\(?:[abfnrtv\\"']|x[0-9A-Fa-f]{1,4}|u[0-9A-Fa-f]{4}|U[0-9A-Fa-f]{8})/,
        // The main tokenizer for our languages
        tokenizer: {
            root: [
                // identifiers and keywords
                [/[a-z_$][\w$]*/, {
                        cases: {
                            '@typeKeywords': 'keyword',
                            '@keywords': 'keyword',
                            '@default': 'identifier'
                        }
                    }],
                [/[A-Z][\w\$]*/, 'type.identifier'],
                // whitespace
                { include: '@whitespace' },
                // delimiters and operators
                [/[{}()\[\]]/, '@brackets'],
                [/[<>](?!@symbols)/, '@brackets'],
                [/@symbols/, {
                        cases: {
                            '@operators': 'operator',
                            '@default': ''
                        }
                    }]
            ],
            whitespace: [
                [/[ \t\r\n]+/, 'white'],
                [/\/\*/, 'comment', '@comment'],
                [/\/\/.*$/, 'comment'],
            ],
            comment: [
                [/[^\/*]+/, 'comment'],
                [/\/\*/, 'comment.invalid'],
                ["\\*/", 'comment', '@pop'],
                [/[\/*]/, 'comment']
            ],
            string: [
                [/[^\\"]+/, 'string'],
                [/@escapes/, 'string.escape'],
                [/\\./, 'string.escape.invalid'],
                [/"/, 'string', '@pop']
            ],
        },
    });
}
exports.registerDSL = registerDSL;
//# sourceMappingURL=language-contribution.js.map