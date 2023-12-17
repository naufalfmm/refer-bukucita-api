import { query } from "express-validator"

const getBooksValidator = [
    query('categoryId').
        exists().withMessage("category must exists").
        isInt().withMessage("invalid data type"),
    query("page").
        isInt().withMessage("invalid data type").
        custom(function name({value}) {
            return (value >= 0)
        }).withMessage("minimum page is 0"),
    query("size").isInt().withMessage("invalid data type"),
]

export {
    getBooksValidator
}