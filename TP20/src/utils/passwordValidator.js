import bcrypt from 'bcrypt'

const isValidPassword = (user, password) => {
    return bcrypt.compareSync(password, user.password)
}

export default isValidPassword