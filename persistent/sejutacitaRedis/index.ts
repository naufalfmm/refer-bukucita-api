import { SejutacitaGetCategoriesRedis } from "../../constant"
import RedisClient from "../../utils/redis"

class SejutacitaRedis {
    client!: RedisClient

    constructor(client: RedisClient) {
        this.client = client
    }

    getCategories = async () => {
        try {
            return await this.client.getNull(SejutacitaGetCategoriesRedis)
        } catch (error) {
            throw error
        }
    }

    setCategories = async (data: any, timeout?: number) => {
        try {
            return await this.client.set(SejutacitaGetCategoriesRedis, data, timeout)
        } catch (error) {
            throw error;
        }
    }
}

export default SejutacitaRedis