import axios from "axios"
// import React from "react"

export function getNote() {
    return axios.get('http://127.0.0.1:8000/Note/')
    .then(res => {
        return res.data; // Return the data from the axios response
    })
    .catch(error => {
        console.error("Error fetching notes:", error);
        throw error; // Re-throw the error to handle it further up the call stack if needed
    });
}

export function addNote(note) {
    // console.log("note:-", note)
    // console.log("type:-", typeof note)
    // const { title, body } = note;
    // console.log("new:-",title, body)
    // return axios.post('http://127.0.0.1:8000/Note/',{
    //     // note_id: null,
    //     title: title,
    //     body: body,
    //     // created: null,
    //     // updated: null,
    //     // isPinned: false,
    //     // isArchived: false,
    // })
    // .then(res => {
    //     console.log("Type:-", typeof res.data)
    //     return res.data; // Return the data from the axios response
    // })
    // .catch(error => {
    //     console.error("Error fetching notes:", error);
    //     throw error; // Re-throw the error to handle it further up the call stack if needed
    // });
    const { title, body, isPinned } = note;
    return axios.post('http://127.0.0.1:8000/Note/', {
        title: title,
        body: body,
        isPinned: isPinned,  // Include the isPinned field in the request
    })
    .then(res => {
        return res.data;
    })
    .catch(error => {
        console.error("Error adding note:", error);
        throw error;
    });
}

export function permanentDeleteNote(id) {
    return axios.delete('http://127.0.0.1:8000/Note/'+id+'/')
    .then(res => {
        return res.data; // Return the data from the axios response
    })
    .catch(error => {
        console.error("Error fetching notes:", error);
        throw error; // Re-throw the error to handle it further up the call stack if needed
    });
}