

import { useState } from 'react';
import NoteContext from './noteContext';

const NoteState  = (props) =>{ 
    const host = "http://localhost:5000"
    const notesInitial= []
      const [notes, setNotes] = useState(notesInitial);
// Get all Notes

      const getNotes = async () => {
        // API call to edit a note
        
        const response = await fetch(`${host}/api/notes/fetchallnotes`, {
          method: "GET", // *GET, POST, PUT, DELETE, etc.
          headers: {
            "Content-Type": "application/json",
            "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ4ODVkOWU4MDIyYzllMGIxNjhhODk3In0sImlhdCI6MTY4NjY3MDI3Mn0.M-u1mITmlTISNcPJHhqX0f5I4MEIvzccN5G8vwe84WM"
          }
        });
        const json = await response.json();
        setNotes(json)
    }

      // Add a Note
    const addNote = async (title, description ,tag) => {
        // API call to edit a note
        
        const response = await fetch(`${host}/api/notes/addnotes`, {
          method: "POST", // *GET, POST, PUT, DELETE, etc.
          headers: {
            "Content-Type": "application/json",
            "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ4ODVkOWU4MDIyYzllMGIxNjhhODk3In0sImlhdCI6MTY4NjY3MDI3Mn0.M-u1mITmlTISNcPJHhqX0f5I4MEIvzccN5G8vwe84WM"
          },
          body: JSON.stringify({title,description,tag}), // body data type must match "Content-Type" header
        });
        const json = await response.json();
        console.log(json);
      
      console.log("Adding a note")
    const note ={
        "_id": "648ab557863efadec26afe34a",
        "user": "64885d9e8022c9e0b168a897",
        "title": title,
        "description": description,
        "tag": tag,
        "date": "2023-06-15T06:53:04.163Z",
        "__v": 0
      };
      setNotes(notes.concat(note))
    }
    // delete a Note
const deleteNote = async(id) => {
  const response = await fetch(`${host}/api/notes/deletenotes/${id}`, {
    method: "DELETE", // *GET, POST, PUT, DELETE, etc.
    headers: {
      "Content-Type": "application/json",
      "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ4ODVkOWU4MDIyYzllMGIxNjhhODk3In0sImlhdCI6MTY4NjY3MDI3Mn0.M-u1mITmlTISNcPJHhqX0f5I4MEIvzccN5G8vwe84WM"
    },
  });
  const json = response.json();
 const newNotes = notes.filter((note) => {return note._id!==id})
  setNotes(newNotes)
}
// Edit a Note
   const editNote = async (id, title, description, tag)=>{
    // API call to edit a note
    
    const response = await fetch(`${host}/api/notes/updatenotes/${id}`, {
      method: "PUT", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ4ODVkOWU4MDIyYzllMGIxNjhhODk3In0sImlhdCI6MTY4NjY3MDI3Mn0.M-u1mITmlTISNcPJHhqX0f5I4MEIvzccN5G8vwe84WM"
      },
      body: JSON.stringify({title, description,tag}), // body data type must match "Content-Type" header
    });
    const json = await response.json();
 

    let newNotes = JSON.parse(JSON.stringify(notes))
  
    // Logic to edit in client
for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if(element._id ===id){
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;  
      }
    }
    console.log(notes);
   setNotes(notes);
}

 
    return(
        <NoteContext.Provider value={{notes, addNote, deleteNote, editNote,getNotes}} >
            {props.children}
        </NoteContext.Provider>
    )
}



export default NoteState;