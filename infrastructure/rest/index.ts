import { Express } from "express";
import Routes from "./routes";

class Rest {
    routes: Routes

    constructor(rout: Routes) {
        this.routes = rout
    }

    register(app: Express) {
        this.routes.register(app)
    }
}

export default Rest