import Sejutacita from "./sejutacita";
import SejutacitaRedis from "./sejutacitaRedis";

class Persistent {
    sejutacita: Sejutacita
    sejutacitaRedis: SejutacitaRedis

    constructor(sc: Sejutacita, scr: SejutacitaRedis) {
        this.sejutacita = sc
        this.sejutacitaRedis = scr
    }
}

export default Persistent