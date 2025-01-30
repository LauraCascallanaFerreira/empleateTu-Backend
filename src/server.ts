import app from './app'
import {ErrorMiddleware} from './middlewares/error.middleware'

const PORT = process.env.PORT || 3000

app.use(ErrorMiddleware)
//El sistema sabe que cuando se cometa un error del cual tu no sabes se va a ejecutar y va a mostrar el error

app.listen(PORT, () => {
    console.log('servidor encendido en el puerto: '+PORT)
})