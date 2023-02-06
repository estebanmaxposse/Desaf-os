import productsRepo from '../daos/repos/productsRepo.js';
import messagesRepo from '../daos/repos/messagesRepo.js';
import { log } from './logger.js';

const productsRepository = new productsRepo()
const messagesRepository = new messagesRepo()

const socketConfig = async (io, socket) => {
    socket.emit('products', await productsRepository.getAll());
    socket.emit('messages', await messagesRepository.getMessages())

    socket.on('new-product', async data => {
        await productsRepository.postProduct(data)
        io.sockets.emit('products', await productsRepository.getAll());
    });

    socket.on('new-message', async data => {
        data.date = new Date().toLocaleString();
        log(data);
        await messagesRepository.saveMessage(data)
        io.sockets.emit('messages', await messagesRepository.getMessages());
    })
}

export default socketConfig