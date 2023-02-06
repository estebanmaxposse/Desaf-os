import config from '../config/globalConfig.js'
import daoProductsMongo from './mongo/daoProductsMongo.js'
import daoProductsFile from './file/daoProductsFile.js'

let selectedDB = config.DATABASE;
let instance = null

class productFactory {
    //SINGLETON TEST
    constructor() {
        this.value = Math.random(100)
    }

    printValue() {
        console.log(this.value)
    }

    static getInstance() {
        if (!instance) {
            instance = new productFactory()
        }
        return instance
    }

    //FACTORY PATTERN
    createProductManager() {
        switch (selectedDB) {
            case 'mongo':
                return new daoProductsMongo()
                break;
            case 'file':
                return new daoProductsFile()
                break;
            default:
                return new daoProductsMongo()
                break;
        }
    }
}

//SINGLETON TEST
let factory = productFactory.getInstance()
// let con2 = messageFactory.getInstance()
// con1.printValue()
// con2.printValue()
// console.log(con1 === con2);
let productManager = instance.createProductManager()

export default productManager