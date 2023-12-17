import initializeApp from "./app";
import http from "http";
import clc from "cli-color"

initializeApp().then(app => {
    const server = http.createServer(app);
    server.listen(app.get("port"), function() {
        console.log(clc.green('======================================'));
        console.log(clc.green('SERVER RUNNING ON PORT ' + app.get("port")));
        console.log(clc.green('======================================'));
    });
}).catch(err => {
    throw new Error(err);
})