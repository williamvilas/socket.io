import { deleteLinkDoc, insertLinkDoc } from "../js/index.js";

const socket = io();

socket.emit('get_docs', (docs) => {
    docs.forEach(element => {
        insertLinkDoc(element.name);
    });
});

socket.on('doc_exists', (name) => {
    alert(`O documento ${name} ja existe!`);
});

socket.on('doc_added', (name) => {
    insertLinkDoc(name);
});

socket.on('deleted_doc', (name) => {
    deleteLinkDoc(name);
});

function addDoc(name) {
    socket.emit('add_doc', name);
}

export {addDoc};