import { addDoc, deleteDoc, findDoc, getDocs, updateDoc } from "../database/docs.js";
import io from "../index.js";

io.on('connection', (socket) => {
    console.log('a user connected! ID: ', socket.id);

    socket.on('get_docs', async (callback) => {
        const docs = await getDocs();
        callback(docs);
    });

    socket.on('add_doc', async (name) => {

        const exists = (await findDoc(name)) !== null;

        if (exists) {
            socket.emit('doc_exists', name);
            return;
        }

        const result = await addDoc(name);

        if (result.acknowledged) {
            io.emit('doc_added', name);
        }
    });

    socket.on('doc_selected', async (titleDoc, callback) => {
        socket.join(titleDoc);

        const result = await findDoc(titleDoc);

        if (result) {
            callback(result.text);
        }
    });

    socket.on('text_edit', async ({text, title_doc}) => {
        //socket.broadcast.emit('text_edit_customer', text);
        //io.emit(`text_edit_customer`, text);

        const result = await updateDoc(title_doc,text);
        
        if (result.modifiedCount) {
            socket.to(title_doc).emit('text_edit_customer', text);
        }
    });

    socket.on('delete_doc', async (name) => {
        console.log('delete back', name);

        const result = await deleteDoc(name);

        if (result.deletedCount) {
            io.emit('deleted_doc', name);
        }
    })
});
