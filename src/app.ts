import express, {Request, Response, Router} from 'express'
import authRouter from './routes/auth.routes'
import userRoute  from './routes/user.routes'
import offertRoute from './routes/offert.routes'
import rateLimit from 'express-rate-limit'
import helmet from 'helmet'
import compression from 'compression'
import cookieParser from 'cookie-parser'

const app = express()

//Permitir que comprenda los datos en json
app.use(express.json())
app.use(helmet())
app.use(compression())
app.use(cookieParser())

const limiter = rateLimit({
    //maximo numero de intentos
    max:3,
    //por x tiempo
    windowMs: 1000 * 15 * 60
})
app.use(limiter)

app.use('/api/auth',authRouter)
app.use('/api/user', userRoute)
app.use('/api/offerts', offertRoute)

app.get('/', (req:Request, res:Response) => {
    res.send('Bienvenido al backend (api rest)')
})

export default app