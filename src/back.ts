const express = require('express');
const path = require('path');
const http = require('http');
import WebSocket from 'ws';
import fs from 'fs';

const port = 19609;
const dirname = '/home/public/dixit'

const app = express();
const server = http.createServer(app);

// Serve static files from the ./client directory
app.use(express.static(path.join(dirname, 'client')));


class Card {
  img: string;
  tags: string[];
  
  constructor(img: string, tags: string[]) {
    this.img = img;
    this.tags = tags;
  }
}

class Deck {
  cards: Card[];

  constructor(cards?: Card[]) {
    if (cards)
      this.cards = cards;
    else {

      const cardDir = path.join(dirname, 'cards');
      this.cards = fs.readdirSync(cardDir).map((filename: string) => {
        return new Card(filename, []);
      });

    }
  }

  shuffle() {
    for (let i = this.cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
    }
  }

  draw() {
    return this.cards.pop();
  }

}

class User {
    username: string;
    matchid: Number = -1;
    socket: WebSocket;
    score = 0;
    current_vote = -1
    hand: string[] = [];
   
    constructor(socket: WebSocket, username: string) {
      console.log(``)
      this.username = username;
      this.socket = socket
    }

    send(message: string) {
      this.socket.send(message);
    }

    addcard(card: string) {
      this.hand.push(card);
    }

    resethand() {
      this.hand = [];
    }

    gethand() {
      return this.hand;
    }

    removecard(i: number) {
      this.hand.splice(i, 1);
    }
  }

  class Match {

    match_id: string;
    players: User[] = [];
    deck: Deck;
    never_master: User[] = [];
    master?: User;
    current_card?: Card;
    current_description?: string;

    constructor(deck: Deck) {
      this.match_id = Math.random().toString(36).substring(0, 8);
      this.deck = deck;
    }

    reciveMsg(message: string) {

      

    }

    sendall(message: string) {
      this.players.forEach(player => {
        player.send(message);
      });
    }

    addplayer(player: User) {

      player.send("match/" + this.match_id);
      this.sendall('list/' + this.players.map(player => player.username).join(','));

      this.players.push(player);

    }

  }

let userlist: User[] = [];
let matchlist: Match[] = [];
const wss = new WebSocket.Server({ port: 19709 });

wss.on('connection', (ws: WebSocket) => {
    console.log('New client connected');
  
    ws.on('message', (message: string) => {

      const [command, ...args] = message.split('/');

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

