"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const port = 19609;
const dirname = '/home/public/dixit';
const app = (0, express_1.default)();
// Serve static files from the ./client directory
app.use(express_1.default.static(path_1.default.join(dirname, 'client')));
const SECRET_KEY = "0x4AAAAAAA48Fs8NvyurfxGqhyrPd15WePg";
async function handlePost(request) {
    const body = await request.formData();
    // Turnstile injects a token in "cf-turnstile-response".
    const token = body.get("cf-turnstile-response");
    const ip = request.headers.get("CF-Connecting-IP");
    // Validate the token by calling the
    // "/siteverify" API endpoint.
    let formData = new FormData();
    formData.append("secret", SECRET_KEY);
    formData.append("response", token);
    formData.append("remoteip", ip);
    const url = "https://challenges.cloudflare.com/turnstile/v0/siteverify";
    const result = await fetch(url, {
        body: formData,
        method: "POST",
    });
    const outcome = await result.json();
    if (outcome.success) {
        // ...
    }
}
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
    //palle culo  
});
