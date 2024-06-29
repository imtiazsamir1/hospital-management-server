const express = require("express");
const cors = require("cors");
const app = express();
const { MongoClient, ServerApiVersion } = require("mongodb");

const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("User management running");
});

//hospitalSystem
//LVRKxT2oXKh8Ml9n

//app.post("users", (req, res) => {
// console.log(req, body);
// const newUser = req.body;
//newUser.id = users.length + 1;
// users.push(newUser);
//res.send(newUser);
//});
//const database = client.db("userDB");
//const usearCollection = database.collection("users");

//app.post("/users", async (req, res) => {
//const user = req.body;
//console.log("new user", user);
//const result = await usearCollection.insertOne(user);
//res.send(result);

const uri =
  "mongodb+srv://hospitalSystem:LVRKxT2oXKh8Ml9n@cluster0.btgo63g.mongodb.net/?appName=Cluster0";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    const database = client.db("usersDB");
    const usearCollection = database.collection("users");

    app.get("/users", async (req, res) => {
      const cursor = usearCollection.find();
      const result = await cursor.toArray();
      res.send(result);
    });

    app.post("/users", async (req, res) => {
      const user = req.body;
      console.log("new user", user);
      const result = await usearCollection.insertOne(user);
      res.send(result);
    });

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    //await client.close();
  }
}
run().catch(console.log);

app.listen(port, () => {
  console.log(`server is running on PORT:${port}`);
});
