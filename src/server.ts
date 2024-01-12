import cors from 'cors'
import express from 'express'
import helmet from 'helmet'
import morgan from 'morgan'

import 'dotenv/config'
import router from './lib/router'
import { errorHandler } from './middleware/error-handler'
import { i18n } from './middleware/i18n'
import { routes } from './routes'

const PORT = process.env.PORT || 3333

const app = express()

app.use(express.json())
app.use(morgan('dev'))
app.use(
  cors({
    origin: '*'
  })
)
app.use(helmet())
app.use(i18n)

app.use(router(routes))

app.use(errorHandler)

app.listen(PORT, () => {
  console.log()
  console.log('\x1b[1;37mDevOne - software solutions [node base project]\x1b[0m')
  console.log()
  console.log(`\x1b[1;36m[*] \x1b[1;33mRunning at port \x1b[1;32m${PORT}\x1b[0m`)
})
