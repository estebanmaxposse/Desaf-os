import supertest from "supertest";
import startServer from "../src/models/server.js";
import { describe } from "mocha";
import { expect } from "chai";
import MongoClient from '../src/config/configMongo.js';
import config from "../src/config/globalConfig.js";
import mockProducts from "../src/utils/mockProducts.js";

const generateProducts = new mockProducts()
const client = new MongoClient(config.MONGOATLAS_URL);
let request
let server

const mockUpdateProduct = {
    price: 80,
    stock: 0,
};
let productId

describe('Product api test', function () {

    before(async () => {
        console.log('STARTING SERVER');
        server = startServer()
        await client.connectDb()
        request = supertest('http://localhost:8080/api/products')

    })

    describe('GET ALL PRODUCTS', () => {
        it('Should return status 200 + all products', async () => {
            let response = await request.get('/')
            // console.log(response.status);
            // console.log(response.body);
            expect(response.status).to.eql(200)
        });
    })

    describe('GET SINGLE PRODUCT', () => {
        it('Should return Gamecube Controller Adapter', async () => {
            let response = await request.get('/636bd97f8b94654de74ee272')
            // console.log(response.status);
            // console.log(response.body);
            expect(response.status).to.eql(200)
        });
    })

    describe('POST MOCK PRODUCT', () => {
        it('Should post mock product', async () => {
            let mockPostProduct = generateProducts.singleProduct()
            let response = await request.post('/').send(mockPostProduct)
            // console.log(response.status);
            // console.log(response.body);
            expect(response.status).to.eql(201)

            productId = response.body.product

        })
    })
    describe('UPDATE MOCK PRODUCT', () => {
        it('Should update mock product', async () => {
            let response = await request.put(`/${productId}`).send(mockUpdateProduct)
            // console.log(response.status);
            // console.log(response.body);
            expect(response.status).to.eql(201)

        });
    })
    describe('DELETE MOCK PRODUCT', () => {
        it('Should delete mock product', async () => {
            let response = await request.delete(`/${productId}`)
            // console.log(response.status);
            // console.log(response.body);
            expect(response.status).to.eql(201)
        });
    })
})