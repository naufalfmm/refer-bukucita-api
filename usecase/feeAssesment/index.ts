import GetBooksRequest from "../../model/dto/sejutacita";
import Persistent from "../../persistent";
import Resp from "../../utils/fetch/resp";

class FeeAssessmentUsecase {
    persistent: Persistent

    constructor(persist: Persistent) {
        this.persistent = persist
    }

    getCategories = async (): Promise<Resp> => {
        try {
            const redisResp = await this.persistent.sejutacitaRedis.getCategories()
            if (redisResp) {
                return {
                    statusCode: 200,
                    data: JSON.parse(redisResp)
                }
            }

            const resp = await this.persistent.sejutacita.getCategories()

            await this.persistent.sejutacitaRedis.setCategories(resp.data, Number(process.env.REDIS_SEJUTACITA_GET_CATEGORIES_TIMEOUT))

            return resp
        } catch (error) {
            throw error;
        }
    }

    getBooks = async(bodyReq: GetBooksRequest): Promise<Resp> => {
        return await this.persistent.sejutacita.getBooks(bodyReq)
    }
}

export default FeeAssessmentUsecase