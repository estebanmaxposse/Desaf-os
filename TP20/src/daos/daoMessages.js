import config from '../config/globalConfig.js'
import daoMessagesMongo from './mongo/daoMessagesMongo.js';
import daoMessagesFile from './file/daoMessagesFile.js'

let selectedDB = config.DATABASE;
let instance = null

class messageFactory {

    //SINGLETON TEST
    constructor() {
        this.value = Math.random(100)
    }

    printValue() {
        console.log(this.value)
    }

    static getInstance() {
        if (!instance) {
            instance = new messageFactory()
        }
        return instance
    }

    //FACTORY PATTERN
    createMessageManager() {
        switch (selectedDB) {
            case 'mongo':
                return new daoMessagesMongo()
                break;
            case 'file':
                return new daoMessagesFile()
                break;
            default:
                return new daoMessagesMongo()
                break;
        }
    }
}

//SINGLETON TEST
let factory = messageFactory.getInstance()
// let con2 = messageFactory.getInstance()
// con1.printValue()
// con2.printValue()
// console.log(con1 === con2);

let messageManager = instance.createMessageManager()

export default messageManager