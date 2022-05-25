"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const startScript = '<script>';
const endScript = '</script>';
const scriptTagRemover = (data, is_string, script) => {
    if (is_string) {
        while (data.toString().toLowerCase().indexOf(script) !== -1) {
            const start_idx = data.toString().toLowerCase().indexOf(script);
            const end_idx = start_idx + script.length;
            data = data.toString().substring(0, start_idx) + data.toString().substring(end_idx, JSON.stringify(data).length);
        }
    }
    else {
        while (JSON.stringify(data).toLowerCase().indexOf(script) !== -1) {
            const start_idx = JSON.stringify(data).toLowerCase().indexOf(script);
            const end_idx = start_idx + script.length;
            data = JSON.parse(JSON.stringify(data).substring(0, start_idx) + JSON.stringify(data).substring(end_idx, JSON.stringify(data).length));
        }
    }
    return data;
};
exports.default = {
    check: (data) => {
        if (data === undefined)
            return;
        for (const k in data) {
            if (!data.hasOwnProperty(k))
                continue;
            if (data[k] === undefined || data[k].constructor === Number || data[k].constructor === Boolean) {
                continue;
            }
            let isString = !(data[k].constructor === Array || data[k].constructor === Object);
            data[k] = scriptTagRemover(data[k], isString, startScript);
            data[k] = scriptTagRemover(data[k], isString, endScript);
        }
    }
};
//# sourceMappingURL=xss.js.map