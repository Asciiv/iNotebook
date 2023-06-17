

import { useState } from 'react';
import NoteContext from './noteContext';

const NoteState  = (props) =>{ 
    const notesInitial= [
        {
          "_id": "6489dc811bccf5a69bb73367",
          "user": "64885d9e8022c9e0b168a897",
          "title": "MyTitle",
          "description": "My Description",
          "tag": "General",
          "date": "2023-06-14T15:23:00.460Z",
          "__v": 0
        },
        {
          "_id": "6489e6fdbd3dca3ff31ef3fb",
          "user": "64885d9e8022c9e0b168a897",
          "title": "MyTitle3",
          "description": "My Description3",
          "tag": "New Tag",
          "date": "2023-06-14T16:07:51.491Z",
          "__v": 0
        },
        {
          "_id": "6489dc811bccf5a69bb73367",
          "user": "64885d9e8022c9e0b168a897",
          "title": "MyTitle",
          "description": "My Description",
          "tag": "General",
          "date": "2023-06-14T15:23:00.460Z",
          "__v": 0
        },
        {
          "_id": "6489e6fdbd3dca3ff31ef3fb",
          "user": "64885d9e8022c9e0b168a897",
          "title": "MyTitle3",
          "description": "My Description3",
          "tag": "New Tag",
          "date": "2023-06-14T16:07:51.491Z",
          "__v": 0
        },
        {
          "_id": "6489f23a17e7aa608fe0889f",
          "user": "64885d9e8022c9e0b168a897",
          "title": "MyTitle555",
          "description": "My Description555",
          "tag": "New Tag555",
          "date": "2023-06-14T16:54:33.114Z",
          "__v": 0
        },
        {
          "_id": "648ab557863efadec26afe4a",
          "user": "64885d9e8022c9e0b168a897",
          "title": "Today Session",
          "description": "Today's Work",
          "tag": "New Tag 3",
          "date": "2023-06-15T06:53:04.163Z",
          "__v": 0
        },
        {
          "_id": "6489f23a17e7aa608fe0889f",
          "user": "64885d9e8022c9e0b168a897",
          "title": "MyTitle555",
          "description": "My Description555",
          "tag": "New Tag555",
          "date": "2023-06-14T16:54:33.114Z",
          "__v": 0
        },
        {
          "_id": "648ab557863efadec26afe4a",
          "user": "64885d9e8022c9e0b168a897",
          "title": "Today Session",
          "description": "Today's Work",
          "tag": "New Tag 3",
          "date": "2023-06-15T06:53:04.163Z",
          "__v": 0
        }
      ]
      const [notes, setNotes] = useState(notesInitial);
    return(
        <NoteContext.Provider value={{notes,setNotes}}>
            {props.children}
        </NoteContext.Provider>
    )
}



export default NoteState;