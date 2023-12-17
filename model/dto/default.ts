import Resp from "../../utils/fetch/resp"

type Default = {
    ok: boolean
    message: string
    data?: any
}

function newResFromFetchResp(res: any, resp: Resp) {
    if (resp.statusCode >= 400) {
        let message: string = "Error"
        if (resp.data) {
            message = resp.data
        }

        return res.status(resp.statusCode).json({
            ok: false,
            message: message,
            data: []
        })
    }

    return res.status(resp.statusCode).json({
        ok: true,
        message: "Success",
        data: resp.data
    })
}

function newResFromError(res: any, err: Error) {
    return res.status(500).json({
        ok: false,
        message: err.message,
        data: err
    })
}

export {
    Default,
    newResFromFetchResp,
    newResFromError
}