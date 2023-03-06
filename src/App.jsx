import { useEffect, useState } from 'react'
import './App.css'
import NotesList from './components/NotesList'
import { nanoid } from 'nanoid'
import SearchNote from './components/SearchNote';

const LOCAL_STORAGE_KEY = 'notes-app-data';

function App() {
  const [notes, setNotes] = useState([{
    id: nanoid(),
    text: 'This is my first Note!',
    date: '10/01/2023',
  },
  {
    id: nanoid(),
    text: 'This is my second Note!',
    date: '10/02/2023',
  },
  {
    id: nanoid(),
    text: 'This is my third Note!',
    date: '10/03/2023',
  }
  ]);

  const [searchText, setSearchText] = useState('');

  useEffect(()=> {
    const savedNotes = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));

    if(savedNotes){
      setNotes(savedNotes);
    }

  }, [])

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(notes))
  }, [notes]);

  function addNote(text) {
    const date = new Date();
    const newNote = {
      id: nanoid(),
      text: text,
      date: date.toLocaleDateString()
    };

    const newNotes = [...notes, newNote];
    setNotes(newNotes);
  }

  const deleteNote = (id) => {
    const newNotes = notes.filter((note) => note.id !== id);
    setNotes(newNotes);
  }


  return (
    <div className='container'>
      <h1>Notes</h1>
      <SearchNote handleSearchNote={ setSearchText } />
      <NotesList notes={notes.filter((note)=> note.text.toLowerCase().includes(searchText.toLowerCase()))} handleAddNote={addNote} handleDeleteNote={deleteNote} />
    </div>
  )
}

export default App
