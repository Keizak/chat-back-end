import express from 'express';
import http from 'http';
import cors from 'cors';
import {connectToDataBase} from "./db/connectDB";
import {AuthRouter} from "./routes/auth-router";
import bodyParser from "body-parser";


const app = express();
const server = http.createServer(app);

app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())
app.use(cors())
app.use("/api/auth",AuthRouter)


app.get('/login', (req, res) => {
    res.send('<h1>Hello world</h1>');
});

server.listen(3000, async () => {
    await connectToDataBase()
    // createWebSocketServer(server)
    console.log('listening on *:3000');
});
