import { httpServer } from "./src/http_server/index";
import { WSServer } from "./src/ws_server/WsServer";

const HTTP_PORT = 8181;
const WS_PORT = 8080;

httpServer.listen(HTTP_PORT);
const wsServer = new WSServer({ port: WS_PORT });

console.log(`Start static http server on the ${HTTP_PORT} port!`);
console.log(`Start WebSocket server on the ${WS_PORT} port!`);





