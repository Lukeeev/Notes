import React, { useState } from 'react'

export default function AddNote({ handleAddNote }) {

    const [noteText, setNoteText] = useState('');
    const characterLimit = 200;

    function handleNoteInput(e) {
        if (characterLimit - e.target.value.length >= 0)
            setNoteText(e.target.value);
    }

    function handleSaveClick() {
        if (noteText.trim().length > 0) 
        {
            handleAddNote(noteText)
            // empty the textare after saving a new note
            setNoteText('');
        } 
    }

  return (
    <div className='note new'>
        <textarea rows='10' cols='10' placeholder='Type to add note...' onChange={ handleNoteInput } value={noteText}></textarea>
        <div className="note-footer">
            <small>{ characterLimit - noteText.length} Remaining</small>
            <button className='save' onClick={ handleSaveClick }>Save</button>
        </div>
    </div>
  )
}
