import twilio from "twilio";
import config from '../config/globalConfig.js'
import { log, errorLog } from "./logger.js";

const accountSid = config.TWILIO_SID
const authToken = config.TWILIO_AUTH

const client = twilio(accountSid, authToken)

const sendSMS = async (recipient, body) => {
    try {
        const message = await client.messages.create({
            body: body,
            from: config.TWILIO_PHONE,
            to: recipient
        })
        log(message);
    } catch (error) {
        errorLog('SMS ERROR: ', error);
    }
}

const sendWpp = async (recipient, body) => {
    try {
        const message = await client.messages.create({
            body: body,
            mediaUrl: ['https://i.imgur.com/3oHh4La.png'],
            from: 'whatsapp:' + config.TWILIO_WPP,
            to: 'whatsapp:' + recipient
        })
        log(message);
    } catch (error) {
        errorLog('SMS ERROR: ', error);
    }
}

export {sendSMS, sendWpp}