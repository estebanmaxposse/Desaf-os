import config from '../config/globalConfig.js'
import daoUsersMongo from './mongo/daoUsersMongo.js'
import daoUsersFile from './file/daoUsersFile.js'

let selectedDB = config.DATABASE;
let instance = null

class userFactory {
    //SINGLETON TEST
    constructor() {
        this.value = Math.random(100)
    }

    printValue() {
        console.log(this.value)
    }

    static getInstance() {
        if (!instance) {
            instance = new userFactory()
        }
        return instance
    }

    //FACTORY PATTERN
    createUserManager() {
        switch (selectedDB) {
            case 'mongo':
                return new daoUsersMongo()
                break;
            case 'file':
                return new daoUsersFile()
                break;
            default:
                return new daoUsersMongo()
                break;
        }
    }
}

//SINGLETON TEST
let factory = userFactory.getInstance()
// let con2 = messageFactory.getInstance()
// con1.printValue()
// con2.printValue()
// console.log(con1 === con2);
let userManager = instance.createUserManager()

export default userManager