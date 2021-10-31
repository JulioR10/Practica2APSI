import express from 'express';
import {MongoClient, ObjectId} from "mongodb";
import { resourceLimits } from 'worker_threads';

const uri = "mongodb+srv://JulioRD:Julio@cluster0.xqzvr.mongodb.net/Julio?retryWrites=true&w=majority";
const client = new MongoClient(uri);

export const router = express.Router();

router.get('/status', (req,res) => {
    res.status(200);
    res.send({Status: "200", Body: "OkProgramacion-I"});
})
//MOSTRAR TODOS LOS PERSONAJES
router.get("/characters", (req, res) => {
  try {
    client
      .connect()
      .then(() => {
        client
          .db("Julio")
          .collection("Rick&Morty")
          .find()
          .toArray()
          .then((collection) => {
            res.json({ Status: "200", Body: collection });
          });
      })
      .then(() => console.log("Mostrados."));
  } catch (e) {
    res.status(404).send({ Status: "404", Body: "Not found" });
  }
});
//MOSTRAR UN PERSONAJE
router.get("/characters/:id", (req, res) => {
  try {
    const id = req.params.id;
    client
      .connect()
      .then(() => {
        client
          .db("Julio")
          .collection("Rick&Morty")
          .find({ _id: new ObjectId(id) })
          .toArray()
          .then((result) => {
            res.json({ Status: "200", Body: result});
          });
      })
      .then(() => console.log("Mostrado."));
  } catch (e) {
    res.status(404).send({ Status: "404", Body: "Not found" });
  }
});
//ACTUALIZAR PERSONAJE (CAMBIAR A STATUS)
router.put("/characters/:id", (req, res) => {
  try {
    const id = req.params.id;
    const { status } = req.body;
    client
      .connect()
      .then(() => {
        client
          .db("Julio")
          .collection("Rick&Morty")
          .updateOne({ _id: new ObjectId(id) }, { $set: { status } })
          .then((result) => {
            res.json({ Status: "200", Body: result });
          });
      }).then(() => console.log("Actualizado."));
  } catch (e) {
    res.status(404).send({ Status: "404", Body: "Not found" });
  }
});
//ELIMINA UN PERSONAJE
router.delete("/characters/:id", (req, res) => {
  try {
    const id = req.params.id;
    client
      .connect()
      .then(() => {
        client
          .db("Julio")
          .collection("Rick&Morty")
          .deleteOne({ _id: new ObjectId(id) })
          .then((result) => {
            res.json({ Status: "200", Body: "Eliminado"});
          });
      })
      .then(() => console.log("Eliminado."));
  } catch (e) {
    res.status(404).send({ Status: "404", Body: "Not found" });
  }
});