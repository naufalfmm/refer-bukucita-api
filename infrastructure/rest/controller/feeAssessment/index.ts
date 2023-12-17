import GetBooksRequest from "../../../../model/dto/sejutacita";
import { newResFromError, newResFromFetchResp } from "../../../../model/dto/default";
import Usecase from "../../../../usecase";

class FeeAssessmentController {
    usecase: Usecase

    constructor(usec: Usecase) {
        this.usecase = usec
    }

    getCategories = (_req: any, res: any) => {
        this.usecase.feeAssesment.getCategories()
            .then(resp => {
                newResFromFetchResp(res, resp)
            })
            .catch(err => {
                newResFromError(res, err)
            })
    }

    getBooks = (req: { query: any; }, res: any) => {
        this.usecase.feeAssesment.getBooks(new GetBooksRequest(req.query))
            .then(resp => {
                newResFromFetchResp(res, resp)
            })
            .catch(err => {
                newResFromError(res, err)
            })
    }
}

export default FeeAssessmentController