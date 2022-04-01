import React, { useRef, useState } from 'react'
import noteContext from '../context/notes/noteContext';
import { useContext, useEffect } from 'react';
import NoteItem from './NoteItem';
import AddNote from './AddNote';
import { useNavigate } from 'react-router-dom';
const Notes = (props) => {
    const context = useContext(noteContext)
    const { notes, getNote, editNote } = context;
    const [note, setNote] = useState({ id: "", etitle: "", edescription: "", etag: "" })
    let redirect = useNavigate()
    const ref = useRef(null)
    const refClose = useRef(null)

    const { showAlert } = props
    useEffect(() => {
        if (localStorage.getItem('token')) {
            getNote();
        }
        else{
            redirect("/login")
        }
        // eslint-disable-next-line
    }, [])

    const updateNotes = (currentNote) => {
        ref.current.click()
        setNote({ id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag })
    }

    const handleClick = (e) => {
        console.log("Updating Notes", note);
        editNote(note.id, note.etitle, note.edescription, note.etag);
        refClose.current.click()
        setNote({ id: "", etitle: "", edescription: "", etag: "" })
        showAlert("your Notes has been updated", "success")
        e.preventDefault();
    }

    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }

    return (
        <div>
            <button type="button" ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>

            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="etitle" className="form-label">Title:</label>
                                    <input type="text" className="form-control" id="etitle" name='etitle' value={note.etitle} aria-describedby="emailHelp" minLength={5} required onChange={onChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="edescription" className="form-label">Description:</label>
                                    <input type="text" className="form-control" id="edescription" name="edescription" minLength={5} required value={note.edescription} onChange={onChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="etag" className="form-label">Tag:</label>
                                    <input type="text" className="form-control" id="etag" name="etag" value={note.etag} onChange={onChange} />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button disabled={note.etitle.length < 5 || note.edescription.length < 5} onClick={handleClick} type="button" className="btn btn-primary">Update Note</button>
                        </div>
                    </div>
                </div>
            </div>
            <AddNote showAlert={props.showAlert} />
            <div className="row my-3">
                <div className="container mx-3">
                    {notes.length === 0 && 'No notes to display'}
                </div>

                {notes.map((note) => {
                    return <NoteItem key={note._id} note={note} showAlert={props.showAlert} updateNotes={updateNotes} />;
                })}
            </div>
        </div>
    )
}

export default Notes
