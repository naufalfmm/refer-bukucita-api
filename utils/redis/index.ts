import { RedisClientType, createClient } from "redis";
import { NotFoundErr } from "./err";

type RedisClientOpts = {
    host?: string
    port?: string
    password?: string
    defaultTimeout?: number
}

class RedisClient {
    client!: RedisClientType
    defaultTimeout?: number

    constructor(opt: RedisClientOpts) {
        this.client = createClient({
            password: opt.password,
            socket: {
                host: opt.host,
                port: Number(opt.port)
            }
        })

        this.defaultTimeout = opt.defaultTimeout
    }

    connect = async() => {
        await this.client.connect()
    }

    set = async (key: string, data: any, timeout?: number) => {
        if (!this.defaultTimeout && !timeout) {
            return await this.client.set(key, JSON.stringify(data))
        }

        let tout = this.defaultTimeout
        if (timeout) {
            tout = timeout
        }

        return await this.client.setEx(key, tout!, JSON.stringify(data))
    }

    get = async (key: string): Promise<string> => {
        try {
            const resp = await this.client.get(key)
            if (resp === null) {
                throw NotFoundErr
            }

            return resp!
        } catch (error) {
            throw error
        }
    }

    getNull = async (key: string): Promise<string | null> => {
        try {
            return await this.client.get(key)
        } catch (error) {
            throw error;
        }
    }
}

export default RedisClient
export {RedisClientOpts}