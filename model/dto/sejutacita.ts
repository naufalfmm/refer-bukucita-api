import QueryParam from "../../utils/fetch/queryParam"

class GetBooksRequest implements QueryParam {
    categoryId?: number
    size?: number
    page?: number

    constructor(query: any) {
        if (query.categoryId) {
            this.categoryId = query.categoryId
        }

        if (query.size) {
            this.size = query.size
        }

        if (query.page) {
            this.page = query.page
        }
    }

    toQueryParam = () => {
        const param: Record<string, any> = {}
        if (this.categoryId) {
            param.categoryId = this.categoryId
        }

        if (this.size) {
            param.size = this.size
        }

        if (this.page) {
            param.page = this.page
        }

        return new URLSearchParams(param).toString()

        // return new URLSearchParams({ categoryId: this.categoryId!.toString(), size: this.size!.toString(), page: this.page!.toString() }).toString()
    }
}

export default GetBooksRequest;