import QueryParam from "./queryParam"

class Uri {
    private url: string
    private queryParam?: QueryParam

    constructor(url: string, queryParam?: QueryParam) {
        this.url = url
        this.queryParam = queryParam
    }

    toString = (domain: String) => {
        if (domain[domain.length - 1] != '/') {
            domain += '/'
        }

        if (this.url[0] == '/') {
            this.url = this.url.slice(1)
        }

        if (this.queryParam == null) {
            return domain + this.url
        }

        return domain + this.url + "?" + this.queryParam.toQueryParam()
    }
}

export default Uri;