import config from '../config/globalConfig.js'
import daoCartsMongo from './mongo/daoCartsMongo.js';
import daoCartsFile from './file/daoCartsFile.js';

const selectedDB = config.DATABASE;
let instance = null

class cartFactory {
    //SINGLETON TEST
    constructor() {
        this.value = Math.random(100)
    }

    printValue() {
        console.log(this.value)
    }

    static getInstance() {
        if (!instance) {
            instance = new cartFactory()
        }
        return instance
    }

    //FACTORY PATTERN
    createCartManager() {
        switch (selectedDB) {
            case 'mongo':
                return new daoCartsMongo()
                break;
            case 'file':
                return daoCartsFile()
                break;
            default:
                return new daoCartsMongo()
                break;
        }
    }
}

//SINGLETON TEST
let factory = cartFactory.getInstance()
// let con2 = cartFactory.getInstance()
// con1.printValue()
// con2.printValue()
// console.log(con1 === con2);

let cartManager = instance.createCartManager()

export default cartManager