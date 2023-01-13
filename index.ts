import { httpServer } from "./src/http_server/index";

import { WebSocketServer } from 'ws';
import { runCommand } from "./src/ws_server/cli";

const HTTP_PORT = 8181;
const WS_PORT = 8080;

console.log(`Start static http server on the ${HTTP_PORT} port!`);
console.log(`Start WebSocket server on the ${WS_PORT} port!`);

httpServer.listen(HTTP_PORT);
export const wsServer = new WebSocketServer({ port: WS_PORT });

wsServer.on('connection', function connection(ws) {
  ws.on('message', async function message(data) {
    console.log('received: %s', data);
    const responce = await runCommand(data.toString());
    ws.send(`${data.toString().split(' ')[0]} ${responce}`);
  });
}); 







