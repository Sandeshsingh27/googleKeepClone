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
    const { title, body, isPinned, created, updated, note_id } = note;
    
    // Set a default title if title is missing
    const defaultTitle = body.substring(0, 15); // Use first 15 characters of body as title
    const noteTitle = title.trim() ? title : defaultTitle;

    if (!body.trim()) {
        // Show a pop-up or alert message indicating that body is necessary
        alert("Body is necessary to enter.");
        return Promise.reject("Body is necessary to enter.");
    }

    return axios.post('http://127.0.0.1:8000/Note/', {
        title: noteTitle,
        body: body,
        isPinned: false,
        note_id: note_id,
        updated: updated,
        created: created,
        isArchive: false
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