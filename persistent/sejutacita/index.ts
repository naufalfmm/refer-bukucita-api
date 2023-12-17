import Fetch from "../../utils/fetch";
import { FeeAssessmentBooksUri, FeeAssessmentCategoriesUri } from "../../constant";
import GetBooksRequest from "../../model/dto/sejutacita";
import Uri from "../../utils/fetch/uri";
import Resp from "../../utils/fetch/resp";

class Sejutacita {
    fetch!: Fetch

    constructor(fetch: Fetch) {
        this.fetch = fetch
    }

    getCategories = async(): Promise<Resp> => {
        return await this.fetch.get(new Uri(FeeAssessmentCategoriesUri))
    }

    getBooks =  async(body: GetBooksRequest): Promise<Resp> => {
        return await this.fetch.get(new Uri(FeeAssessmentBooksUri, body))
    }
}

export default Sejutacita;