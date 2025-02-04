import express, {Request, Response, Router} from 'express'
import authRouter from './routes/auth.routes'
import userRoute  from './routes/user.routes'
import offertRoute from './routes/offert.routes'
import rateLimit from 'express-rate-limit'
import helmet from 'helmet'
import compression from 'compression'
import cookieParser from 'cookie-parser'
import cors from 'cors'



const app = express()
app.use(cookieParser())

app.use(cors({
    origin:'*',
    methods:['GET', 'POST', 'DELETE', 'PUT'], 
    credentials: true
}))

//Permitir que comprenda los datos en json
app.use(express.json())
app.use(helmet())
app.use(compression())


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