import array2Object from "../utils/randomNumber.js";

process.on('message', message => {
    let result = array2Object(message)
    process.send(result)
})