const randomNumber = (min, max) => {
    min = Math.ceil(min);
    max = Math.ceil(max);
    return Math.floor(Math.random() * (max - min) + min)
}

const generateNumbers = (cant) => {
    const iterator = cant || 100000000;
    const numbers = []
    for (let index = 0; index < iterator; index++) {
        const element = randomNumber(1, 1000)
        numbers.push(element)
    }
    return numbers
}

const array2Object = (cant) => {
    let numbers = generateNumbers(cant)
    let numberObject = {}
    for (const element of numbers) {
        if (numberObject[element]) {
            numberObject[element] += 1
        } else {
            numberObject[element] = 1
        }
    }
    return numberObject
}

export default array2Object