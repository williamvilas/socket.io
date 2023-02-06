import express from "express";
import url from "url";
import path from "path";
import http from "http";
import { Server } from "socket.io";

import "./database/connect.js";

const app = express();
const porta = process.env.porta || 3000;

const caminhoAtual = url.fileURLToPath(import.meta.url);
const diretorioPublico = path.join(caminhoAtual, "../..", "public/html");
app.use(express.static(diretorioPublico));

const server = http.createServer(app);

server.listen(porta, () => console.log(`Servidor escutando na porta ${porta}`));

const io = new Server(server);
export default io;
