import express, { Express } from "express"
import cors from "cors"
import Sejutacita from "../persistent/sejutacita"
import Fetch, {ForceResponseFormat } from "../utils/fetch"
import Persistent from "../persistent"
import FeeAssessmentUsecase from "../usecase/feeAssesment"
import Usecase from "../usecase"
import FeeAssessmentController from "../infrastructure/rest/controller/feeAssessment"
import Controller from "../infrastructure/rest/controller"
import Routes from "../infrastructure/rest/routes"
import Rest from "../infrastructure/rest"
import Infrastructure from "../infrastructure"
import bodyParser from "body-parser"
import dotenv from "dotenv"
import SejutacitaRedis from "../persistent/sejutacitaRedis"
import RedisClient from "../utils/redis"

const initializeApp = async (): Promise<Express> => {
    const app = express()

    app.use(cors())

    app.use(bodyParser.urlencoded({ extended: false }))
    app.use(bodyParser.json());

    dotenv.config()

    app.set("port", (process.env.PORT || 8000))

    const redisClient = new RedisClient({
        port: process.env.REDIS_PORT,
        host: process.env.REDIS_HOST,
        password: process.env.REDIS_PASSWORD,
        defaultTimeout: Number(process.env.REDIS_TIMEOUT),
    })

    await redisClient.connect()

    const sejutacitaPersist = new Sejutacita(new Fetch(process.env.SEJUTACITA_DOMAIN!, { forceResponseFormat: ForceResponseFormat.Json }))
    const sejutacitaRedis = new SejutacitaRedis(redisClient)
    const persist = new Persistent(sejutacitaPersist, sejutacitaRedis)

    const feeAssesmentUsec = new FeeAssessmentUsecase(persist)
    const usec = new Usecase(feeAssesmentUsec)

    const feeAssesmentCont = new FeeAssessmentController(usec)
    const cont = new Controller(feeAssesmentCont)

    const rout = new Routes(cont)

    const res = new Rest(rout)

    const infra = new Infrastructure(res)
    infra.register(app)

    return app;
}

export default initializeApp