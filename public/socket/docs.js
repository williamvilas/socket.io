import { alertDocDeleted, setTextEditCustomer } from "../js/doc.js";

const socket = io();

function selectedDoc(name) {
    socket.emit('doc_selected', name, (text) => {
        setTextEditCustomer(text);
    });
}

socket.on('text_edit_customer', (text) => {
    setTextEditCustomer(text);
});

socket.on('deleted_doc', (name) => {
    alertDocDeleted(name);
});

function emitTextEdit(data) {
    socket.emit("text_edit", data);
}

function deleteDoc(name) {
    socket.emit('delete_doc', name);
}

// socket.on('text_doc', (text) => {
//     setTextEditCustomer(text);
// });

export { emitTextEdit, selectedDoc, deleteDoc };