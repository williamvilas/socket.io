import { deleteDoc, emitTextEdit, selectedDoc } from "../socket/docs.js";

const textEdit = document.getElementById('editor-texto');
const params = new URLSearchParams(window.location.search);
const nameDoc = params.get('nome');

const titleDoc = document.getElementById('titulo-documento');
titleDoc.textContent = nameDoc || 'Documento sem titulo';
selectedDoc(nameDoc);

const buttonDelete = document.getElementById('excluir-documento');

buttonDelete.addEventListener("click", () => {
    deleteDoc(nameDoc);
});

textEdit.addEventListener("keyup", () => {
    emitTextEdit({
        text: textEdit.value, 
        title_doc: nameDoc
    });
});

function setTextEditCustomer(text) {
    textEdit.value = text;
}

function alertDocDeleted(name) {

    if (name !== nameDoc) {
        return;
    }
    
    alert(`O documento ${name} foi excluido!`);
    window.location.href = '/';
}

export { setTextEditCustomer, alertDocDeleted };