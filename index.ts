import { httpServer } from "./src/http_server/index";
import { mouse } from "@nut-tree/nut-js";

import { WebSocketServer } from 'ws';

const HTTP_PORT = 8181;
const WS_PORT = 8080;

console.log(`Start static http server on the ${HTTP_PORT} port!`);
httpServer.listen(HTTP_PORT);

export const wsServer = new WebSocketServer({ port: WS_PORT });

wsServer.on('connection', function connection(ws) {
  ws.on('message', function message(data) {
    console.log('received: %s', data);
    ws.send(data.toString());
  });

  ws.send('something');
});
