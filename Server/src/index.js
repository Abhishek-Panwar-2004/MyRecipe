import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import { userRouter } from './routes/users.js'
import { recipesRouter } from './routes/recipes.js'

const app = express()
app.use(express.json())
app.use(cors())

app.use("/auth", userRouter)

app.use("/recipes", recipesRouter)

app.get('/', (req, res) => {
    res.send("Hello World")
})

mongoose.connect(
    "mongodb+srv://Metrix:catdog@recipe.j9gqs2b.mongodb.net/Recipe?retryWrites=true&w=majority"
)

app.listen(8000, () => console.log("Server started"))

