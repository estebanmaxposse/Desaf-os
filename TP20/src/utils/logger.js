import pino from "pino";

const loggerInfo = pino()
loggerInfo.level = 'info'

const loggerWarn = pino(pino.destination('./warn.log'))
loggerWarn.level = 'warn'

const loggerError = pino(pino.destination('./error.log'))
loggerError.level = 'error'

const routeLog = (req, res, next) => {
    loggerInfo.info('Url: %s. Method: %s', req.url, req.method)
    next()
}

const log = async (message) => {
    loggerInfo.info(message)
    return
}

const invalidRouteLog = (req, res, next) => {
    loggerInfo.info('Route: %s with Method: %s does not exist', req.url, req.method)
    loggerWarn.warn('Route: %s with Method: %s does not exist', req.url, req.method)
    next()
}

const errorLog = async (error, message) => {
    loggerInfo.info(error, message)
    loggerError.error(error, message)
    return
}

export {routeLog, invalidRouteLog, errorLog, log}
