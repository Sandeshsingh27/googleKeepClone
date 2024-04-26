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