import { createContext, useEffect, useState } from 'react';
import {getNote} from '../services/ApiService';

export const DataContext = createContext(null);

const DataProvider = ({ children }) => {

    const [notes, setNotes] = useState([]);
    const [archiveNotes, setAcrchiveNotes] = useState([]);
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

    return (
        <DataContext.Provider value={{
            notes,
            setNotes,
            archiveNotes,
            setAcrchiveNotes,
            deleteNotes,
            setDeleteNotes
        }}
        >
            {children}
        </DataContext.Provider>
    )
}

export default DataProvider;