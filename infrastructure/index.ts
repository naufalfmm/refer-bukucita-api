import { Express } from "express";
import Rest from "./rest";

class Infrastructure {
    rest: Rest

    constructor(res: Rest) {
        this.rest = res
    }

    register(app: Express) {
        this.rest.register(app)
    }
}

export default Infrastructure