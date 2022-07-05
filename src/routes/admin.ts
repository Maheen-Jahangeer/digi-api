import express, { Request, Response } from 'express'
import { response } from '../helper/response'
import admin from '../models/admin'
import bcrypt from 'bcrypt'

const adminRouter = express.Router()

adminRouter.post('/add-admin', async (req: Request, res: Response) => {
    if (req.body.adminSecretkey === 'maheen@1') {
        try {
            const hashedPassword = await bcrypt.hash(req.body.password, 10)
            const newAdmin = new admin({
                name: req.body.name,
                email: req.body.email,
                password: hashedPassword,
            })

            await newAdmin.save()
            res.status(200).send(
                response({
                    result: 'Admin added successfully',
                })
            )
        } catch (e) {
            res.status(401).send(
                response({
                    status: 'nok',
                    error: {
                        errorCode: '401',
                        message: e.message,
                    },
                })
            )
        }
    } else {
        res.status(401).send(
            response({
                status: 'nok',
                error: {
                    errorCode: '401',
                    message: 'Authentication failed',
                },
            })
        )
    }
})

//login
adminRouter.post('/login', async (req: Request, res: Response) => {
    try {
        const currentAdmin = await admin.findOne({ email: req.body.email })
        if (currentAdmin) {
            const validPassword = await bcrypt.compare(
                req.body.password,
                currentAdmin?.password
            )
            if (validPassword) {
                res.status(200).json(currentAdmin)
            } else {
                res.send(
                    response({
                        status: 'nok',
                        error: {
                            errorCode: '401',
                            message:
                                'Passwords are not same. Authentication failed',
                        },
                    })
                )
            }
        } else {
            res.status(401).send(
                response({
                    status: 'nok',
                    error: {
                        errorCode: '401',
                        message: 'This is not admin',
                    },
                })
            )
        }
    } catch (e) {
        res.send(
            response({
                status: 'nok',
                error: {
                    errorCode: '401',
                    message: e.message,
                },
            })
        )
    }
})

export default adminRouter
