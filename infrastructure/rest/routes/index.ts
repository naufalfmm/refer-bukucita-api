import { Express } from "express";
import Controller from "../controller";
import { getBooksValidator } from "../../../validator";

class Routes {
    controller: Controller

    constructor(contr: Controller) {
        this.controller = contr
    }

    register(app: Express) {
        app.get("/categories", this.controller.feeAssessmentController.getCategories)
        app.get("/books", getBooksValidator, this.controller.feeAssessmentController.getBooks)
    }
}

export default Routes