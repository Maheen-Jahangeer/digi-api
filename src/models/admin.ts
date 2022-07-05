import { timeStamp } from 'console'
import moongose from 'mongoose'

export const AdminSchema = new moongose.Schema(
    {
        name: {
            type: String,
            min: 3,
            require: true,
        },
        email: {
            type: String,
            unique: true,
            require: true,
        },
        password: {
            type: String,
            min: 6,
        },
    },
    {
        timestamps: true,
    }
)

export default moongose.model('Admins', AdminSchema)
