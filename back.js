"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const path = require('path');
const http = require('http');
const ws_1 = __importDefault(require("ws"));
const port = 19609;
const dirname = '/home/public/dixit';
const app = express();
const server = http.createServer(app);
// Serve static files from the ./client directory
app.use(express.static(path.join(dirname, 'client')));
class User {
    username;
    socket;
    score = 0;
    hand = [];
    constructor(socket, username) {
        this.username = username;
        this.socket = socket;
    }
    addcard(card) {
        this.hand.push(card);
    }
    resethand() {
        this.hand = [];
    }
    gethand() {
        return this.hand;
    }
    removecard(i) {
        this.hand.splice(i, 1);
    }
}
let userlist = [];
const wss = new ws_1.default.Server({ port: 19709 });
wss.on('connection', (ws) => {
    console.log('New client connected');
    ws.on('message', (message) => {
        userlist.push(new User(ws, message));
    });
    ws.on('close', () => {
        console.log('Client disconnected');
    });
});
server.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
    //palle culo  
});
