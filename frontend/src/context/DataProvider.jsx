import { createContext, useEffect, useState } from 'react';
import {getNote, addNote, deleteNote} from '../services/ApiService';

export const DataContext = createContext(null);

const DataProvider = ({ children }) => {

    const [notes, setNotes] = useState([]);
    const [archiveNotes, setArchiveNotes] = useState([]);
    const [deleteNotes, setDeleteNotes] = useState([]);

    useEffect(() => {
        let mount = true;
        getNote()
        .then(res =>{
            console.log("res from api",res);
            setNotes(res);
        });

        return () => {
            mount = false; // Cleanup logic here if needed
        };
    }, []);

    // useEffect(() => {
    //     let mount = true;
    //     addNote()
    //     .then(res =>{
    //         console.log("res from api",res);
    //         setNotes(res);
    //     });

    //     return () => {
    //         mount = false; // Cleanup logic here if needed
    //     };
    // }, []);

    // useEffect(() => {
    //     let mount = true;
    //     deleteNote()
    //     .then(res =>{
    //         console.log("res from api",res);
    //         setNotes(res);
    //     });

    //     return () => {
    //         mount = false; // Cleanup logic here if needed
    //     };
    // }, []);

    return (
        <DataContext.Provider value={{
            notes,
            setNotes,
            archiveNotes,
            setArchiveNotes,
            deleteNotes,
            setDeleteNotes
        }}
        >
            {children}
        </DataContext.Provider>
    )
}

export default DataProvider;