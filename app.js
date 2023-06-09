require("dotenv").config()
require("express-async-errors")

// extra security packages
const helmet = require("helmet")
const cors = require("cors")
const xss = require("xss-clean")
const rateLimiter = require("express-rate-limit")

// Swagger
const swaggerUI = require("swagger-ui-express")
const YAML = require("yamljs")
const swaggerDocument = YAML.load("./swagger.yaml")

const express = require("express")
const app = express()
const mongoose = require("mongoose")

// Routers
const jobsRouter = require("./routes/jobs")
const authRouter = require("./routes/auth")

const notFound = require("./middleware/not-found")
const errorHandler = require("./middleware/error-handler")
const authenticateUser = require("./middleware/authentication")

// middleware
app.set("trust proxy", 1)
app.use(express.json())
app.use(helmet())
app.use(cors())
app.use(xss())
app.use(rateLimiter({ windowMs: 15 * 60 * 1000, max: 100 }))

app.get("/", (req, res) => {
  res.send('<h1>Jobs API</h1><a href="/api-docs">Documentation</a>')
})

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument))

// routes
app.use("/api/v1/auth", authRouter)
app.use("/api/v1/jobs", authenticateUser, jobsRouter)

app.use(notFound)

app.use(errorHandler)

const port = process.env.PORT || 3000

const start = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI)
    console.log("CONNECTED TO DB")
    app.listen(port, console.log(`Server is listening on port ${port}...`))
  } catch (error) {
    console.log(error)
  }
}

start()

// aQX73ZwADAwxxlrx
