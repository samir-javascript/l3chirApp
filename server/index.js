import path from "path"
import express from 'express'
import dotenv from 'dotenv'
import cors from "cors"
import cookieParser from 'cookie-parser'
import { notFound, errorHandler } from "./middlewares/errorMiddleware.js"
import bodyParser from 'body-parser'
import usersRoutes from './routes/userRoutes.js'
import productsRoutes from "./routes/productRoutes.js"
import ordersRoutes from './routes/orderRoutes.js'
import shippingRoutes from './routes/shippingRoutes.js'
import { connectToDb } from './config/db.js'

dotenv.config()
const app = express()
dotenv.config()

app.use(express.json({ limit: '100mb' })); 
app.use(bodyParser.json({limit: '100mb'}));
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    limit: '100mb',
    extended: true
}));

// for parsing application/json
app.use(express.urlencoded({ extended: true })); 
// for cookies;
app.use(cookieParser());
app.use(cors({ credentials: true, origin: '*' }));
const PORT = 5000;
connectToDb()


app.use("/api/users",usersRoutes)
app.use('/api/products', productsRoutes)
app.use('/api/orders', ordersRoutes)
app.use("/api/shipping",shippingRoutes)
app.use('/api/users',usersRoutes)
const __dirname = path.resolve()


if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/client/dist')));
  app.get('*', (req, res) =>
  res.sendFile(path.resolve(__dirname, 'client', 'dist', 'index.html'))
);
} else {
  app.get('/', (req, res) => {
    res.send('Api running....');
  })
}
app.use(notFound)
app.use(errorHandler)
app.listen(PORT, async()=> {
    console.log(`app is running on PORT ${PORT}`)
} )