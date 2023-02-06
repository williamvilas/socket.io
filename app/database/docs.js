import { docsCollections } from "./connect.js";

function getDocs() {
    return docsCollections.find().toArray();
}

function addDoc(name) {
    return docsCollections.insertOne({name: name, text: ''});
}

function findDoc(name) {
    return docsCollections.findOne({name: name});
}

function updateDoc(name, newText) {
    return docsCollections.updateOne({name}, {
        $set: {
            text: newText
        }
    });
}

function deleteDoc(name) {
    return docsCollections.deleteOne({name: name});
}

 export { findDoc, updateDoc, getDocs, addDoc, deleteDoc };