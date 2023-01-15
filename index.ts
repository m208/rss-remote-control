import { httpServer } from "./src/http_server/index";
import { WebSocketServer, createWebSocketStream } from 'ws';
import { runCommand } from "./src/ws_server/cli";
import { readFile } from 'node:fs/promises';

const HTTP_PORT = 8181;
const WS_PORT = 8080;

console.log(`Start static http server on the ${HTTP_PORT} port!`);
console.log(`Start WebSocket server on the ${WS_PORT} port!`);

httpServer.listen(HTTP_PORT);
export const wsServer = new WebSocketServer({ port: WS_PORT });

wsServer.on('connection', function connection(ws) {

  const duplex = createWebSocketStream(ws, { decodeStrings: false });
  duplex.on('data', async (data) => {
    console.log('received: %s', data);
    const responce = await runCommand(data.toString());
    let msg = responce? responce.data : '';

    if (responce && responce.type === 'file') {
      try {
        msg = await readFile(responce.data, {encoding: 'base64'});
      }
      catch { }
    } 
    duplex.write(`${data.toString().split(' ')[0]} ${msg}`);
  });
  duplex.on('close', () => { 
    console.log("the duplex channel has closed")
  });
}); 







