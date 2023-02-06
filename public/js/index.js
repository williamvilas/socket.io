import { addDoc } from "../socket/index.js";

const listDocs = document.getElementById('lista-documentos');

function insertLinkDoc(name) {

    if (!listDocs) {
        return;
    }

    listDocs.innerHTML += `
    <a href="doc.html?nome=${name}" id="doc-${name}" class="list-group-item list-group-item-action">
        ${name}
    </a>`
}

function deleteLinkDoc(name) {
    const doc = document.getElementById(`doc-${name}`);
    listDocs.removeChild(doc);
}

const form = document.getElementById('form-adiciona-documento');
const inputDoc = document.getElementById('input-documento');

if (form) {
    form.addEventListener('submit', (event) => {

        event.preventDefault();
        addDoc(inputDoc.value);
        inputDoc.value = '';
    });
}


export { insertLinkDoc, deleteLinkDoc };