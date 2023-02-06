import { MongoClient } from "mongodb";

const uri = "mongodb://mongo:27017";

const client = new MongoClient(uri);

let docsCollections;

try {
    await client.connect();

    const database = client.db('socket');
    docsCollections = database.collection('docs');
    console.log('banco de dados conectado!');

} catch(error) {
    console.log('Falha ao conectar no banco de dados');
} finally {
    // Ensures that the client will close when you finish/error
    //await client.close();
}

export { docsCollections };