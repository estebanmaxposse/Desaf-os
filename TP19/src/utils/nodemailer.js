import { createTransport } from "nodemailer";
import config from '../config/globalConfig.js';
import { errorLog } from "./logger.js";

const TEST_MAIL = config.SENT_MAIL

const transporter = createTransport({
    service: "gmail",
    port: 587,
    auth: {
        user: TEST_MAIL,
        pass: 'zermzqcefqbkqnnv'
    }
});

const mailOptions = {
    from: 'Node Server API PUG',
    to: config.RECIEVE_MAIL,
    subject: '',
    html: ''
};

const mailUser = async (user) => {
    try {
        mailOptions.subject = 'New user registered!'
        mailOptions.html= `
            <h1>New User Registered!</h1>
            <br/>
            <img
                src=${user.avatar}
                alt="avatar"
                style="width: 150px"
            />
            <h2 id="profile-username">${user.username}</h2>
            <p id="profile-email">Email: ${user.email}</p>
            <p id="profile-full-name">Full name: ${user.fullName}</p>
            <p id="profile-address">Shipping address: ${user.shippingAddress}</p>
            <p id="profile-phone-number">Phone number: ${user.phoneNumber}</p>
            <p id="profile-age">Age: ${user.age}</p>
            `
        const info = await transporter.sendMail(mailOptions)
    } catch (error) {
        errorLog(error);
    }
};

const mailPurchase = async (user, cart) => {
    try {
        mailOptions.subject = `New purchase from ${user.fullName} with email ${user.email}`
        mailOptions.html= `
            <h1>Objects purchased: </h1>
            <br/>
            <ul>
            ${cart.products.map(product => `
                <li>
                   <p>Title: ${product.title}</p>
                   <p>Price: ${product.price}</p>
                </li>
            `)}
            </ul>
            `
        const info = await transporter.sendMail(mailOptions)
    } catch (error) {
        errorLog(error);
    }
};

export {mailUser, mailPurchase}