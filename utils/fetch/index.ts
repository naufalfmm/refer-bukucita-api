import Uri from "./uri";
import Resp from "./resp";

enum ForceResponseFormat {
    Json,
    Text
}

type Options = {
    forceResponseFormat?: ForceResponseFormat
}

class Fetch {
    domain: string
    opt?: Options

    constructor(domain: string, opt?: Options) {
        this.domain = domain;
        this.opt = opt
    }

    get = async (url: string | Uri): Promise<Resp> => {
        try {
            if (typeof url === "string") {
                url = new Uri(url)
            }

            const response = await fetch(url.toString(this.domain))

            if (this.opt?.forceResponseFormat !== undefined) {
                if (this.opt.forceResponseFormat === ForceResponseFormat.Json) {
                    return {
                        statusCode: response.status,
                        data: await response.json()
                    }
                }

                return {
                    statusCode: response.status,
                    data: await response.text()
                }
            }

            let contentType = response.headers.get("content-type")
            if (!contentType) {
                return {
                    statusCode: response.status,
                    data: await response.text()
                }
            }

            if (contentType.indexOf("json")) {
                return {
                    statusCode: response.status,
                    data: await response.json()
                }
            }
            
            return {
                statusCode: response.status,
                data: await response.text()
            }
        } catch (error) {
            throw error;
        }
    }

    post = async (url: string | Uri, body?: any): Promise<Resp> => {
        try {
            if (typeof url === "string") {
                url = new Uri(url)
            }

            const response = await fetch(url.toString(this.domain), {
                method: 'post',
                body: body
            })

            if (this.opt?.forceResponseFormat !== undefined) {
                if (this.opt.forceResponseFormat === ForceResponseFormat.Json) {
                    return {
                        statusCode: response.status,
                        data: await response.json()
                    }
                }

                return {
                    statusCode: response.status,
                    data: await response.text()
                }
            }

            let contentType = response.headers.get("content-type")
            if (!contentType) {
                return {
                    statusCode: response.status,
                    data: await response.text()
                }
            }

            if (contentType.indexOf("json")) {
                return {
                    statusCode: response.status,
                    data: await response.json()
                }
            }
            
            return {
                statusCode: response.status,
                data: await response.text()
            }
        } catch (error) {
            throw error;
        }
    }
}

export default Fetch;
export {Fetch, Options, ForceResponseFormat};