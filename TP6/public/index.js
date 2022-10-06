const server = io()

const renderProducts = (data) => {
    console.log('New prod render!');
    let table = '<table class="table table-stripped w-75 m-auto table-hover table-bordered">'
    table += '<thead><tr><th scope="col">ID #</th><th scope="col">Title</th><th scope="col">price</th><th scope="col">Thumnbnail</th></tr></thead>'
    table += '<tbody>'
    data.forEach(product => {
        table += `
        <tr class='text-center'>
            <th scope='row'> ${product.id} </th>
            <td class='text-center'><a href=${product.url}>${product.title}</a></td>
            <td class='text-center'>${product.price}</td>
            <td class='text-center'><img src=${product.thumbnail} class='w-25 h-auto' />
        </tr>`
    });
    table += '</tbody></table>'
    return table
    // const htmlProduct = data.map((product, index) => {
    //     return (`
    //     <tr class='text-center'>
    //         <th scope='row'> ${product.id} </th>
    //         <td class='text-center'><a href=${product.url}>${product.title}</a></td>
    //         <td class='text-center'>${product.price}</td>
    //         <td class='text-center'><img src=${product.thumbnail} class='w-25 h-auto' />
    //     </tr>`
    //     )
    //     });
}

const addProduct = (e) => {
    console.log('product happened!');
    const product = {
        title: document.getElementById('product-title').value,
        price: document.getElementById('product-price').value,
        thumbnail: document.getElementById('product-thumbnail').value,
    };
    server.emit('new-product', product);
    return false
};

server.on('products', data => {
    if (!data.length) {
        document.getElementById('product-container').innerHTML = '<div class="alert alert-danger" role="alert"><p>No products added yet!</p></div>'
    }else{
        document.getElementById('product-container').innerHTML = renderProducts(data)
    }
});

const renderMessages = (data) => {
    console.log('New msg render!');
    const htmlMessage = data.map((element, index) => {
        return (`
        <div class='text-center'>
            <span class="fw-bold text-blue">${element.author}</span>
            <span class='text-orange'>${element.date}</span>
            <span class="fst-italic text-green">${element.text}</span>
        </div>`
        )
        }).join('');
        console.log('rendering')
        console.log('expected output ' + htmlMessage)
        document.getElementById('messages').innerHTML = htmlMessage;
}

const addMessage = (e) => {
    console.log('message happened!');
    const message = {
        author: document.getElementById('message-author').value,
        text: document.getElementById('message-text').value,
        date: new Date().toLocaleString(),
    };
    server.emit('new-message', message);
    return false;
}

server.on('messages', data => {
    console.log('FRONT got msg');
    renderMessages(data);
});