"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const io_1 = require("../util/io");
function createSearchRecord(pkg, skipDownloads) {
    return __awaiter(this, void 0, void 0, function* () {
        return {
            p: pkg.projectName,
            l: pkg.libraryName,
            g: pkg.globals,
            t: pkg.name,
            m: pkg.declaredModules,
            d: yield getDownloads(),
            r: pkg.isNotNeeded() ? pkg.sourceRepoURL : undefined
        };
        // See https://github.com/npm/download-counts
        function getDownloads() {
            return __awaiter(this, void 0, void 0, function* () {
                if (skipDownloads) {
                    return -1;
                }
                else {
                    const url = `https://api.npmjs.org/downloads/point/last-month/${pkg.name}`;
                    const json = yield io_1.fetchJson(url, { retries: true });
                    // Json may contain "error" instead of "downloads", because some packages aren't available on NPM.
                    return json.downloads || 0;
                }
            });
        }
    });
}
exports.createSearchRecord = createSearchRecord;
//# sourceMappingURL=search-index-generator.js.map