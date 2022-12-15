import { faker } from '@faker-js/faker';

const { datatype, commerce, random, image } = faker
faker.locale = 'en_US';

const generateProducts = () => {
    return {
        title: commerce.product(),
        description: commerce.productDescription(),
        price: datatype.number({ min: 10, max: 100 }),
        stock: datatype.number({ min: 0, max: 50 }),
        code: random.alphaNumeric(6),
        category: commerce.department(),
        thumbnail: image.technics(1000, 1000)
    }
};

export { generateProducts };

