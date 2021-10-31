import express from 'express';
import {MongoClient} from "mongodb";
import { router } from './routes/routes';

const app = express();
const port = process.env.PORT || 9000;

app.use(express.json());
app.use('/api', router);

// routes
app.get("/", (req, res) => {
    res.send("Welcome to my API") ;
});

// mongodb connection
const uri = "mongodb+srv://JulioRD:Julio@cluster0.xqzvr.mongodb.net/Julio?retryWrites=true&w=majority";
const client = new MongoClient(uri);
client.connect().then(() => {
    console.log("Me he conectado a la base e datos");
}).catch((e) => {
    console.log(e);
})

app.listen(port, () => console.log('server listening on port', port));