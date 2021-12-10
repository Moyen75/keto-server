const express = require('express')
const app = express()
const { MongoClient } = require('mongodb');
const cors = require('cors')
require('dotenv').config()
const port = process.env.PORT || 5000

// middleware
app.use(express.json())
app.use(cors())

// connect mongodb
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.aghhg.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run() {
    try {
        await client.connect()
        const database = client.db('keto')
        const roomsCollection = database.collection('rooms')
        const galleryCollection = database.collection('gallery')
        const blogsCollection = database.collection('blogs')

        app.get('/rooms', async (req, res) => {
            const cursor = roomsCollection.find({})
            const result = await cursor.toArray()
            res.send(result)
        })

        // get all gallery img

        app.get('/gallery', async (req, res) => {
            const cursor = galleryCollection.find({})
            const result = await cursor.toArray()
            res.send(result)
        })

        // get all blogs
        app.get('/blogs', async (req, res) => {
            const cursor = blogsCollection.find({})
            const result = await cursor.toArray()
            res.json(result)
        })
    }
    finally {
        //   await client.close()
    }
}
run().catch(console.dir())
app.get('/', (req, res) => {
    res.send('Hello from keto')
})
app.listen(port, () => {
    console.log('listening at the port ', port)
})