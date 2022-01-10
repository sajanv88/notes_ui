import { useState, useEffect } from 'react';
import debounce from 'lodash.debounce';
import { useSearchParams } from 'react-router-dom';
import FormTextField from '../Form/FormTextField';
import CreateNote from './CreateNote';
import MyNote from './MyNote';
import Modal from '../Modal/Modal';
import { getNotes } from '../../service/api';
import { NotesResponse, ErrorType } from '../../types';

async function fetchNotes(err: (e: any) => void, done: (list: NotesResponse) => void) {
    try {
        const search = new URLSearchParams(window.location.search);
        const response = (await getNotes(search)) as NotesResponse;
        if (response) {
            done(response);
        }
    } catch (e: any) {
        err(JSON.parse(e.message));
    }
}
export default function StickyNotes() {
    const [notes, setNotes] = useState<NotesResponse>();
    const [notesError, setNotesError] = useState<ErrorType | null>(null);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [searchParams, setSearchParams] = useSearchParams();

    useEffect(() => {
        async function init() {
            await fetchNotes(setNotesError, setNotes);
        }
        init();
    }, [searchParams]);

    function onSearchEventHandler(event: React.SyntheticEvent<HTMLInputElement>) {
        const target = event.target as HTMLInputElement;
        const { value } = target;
        if (value) {
            searchParams.set('search', value);
        } else {
            searchParams.delete('search');
        }

        setSearchParams(searchParams);
    }
    function onSortEventHandler(event: React.SyntheticEvent<HTMLSelectElement>) {
        const target = event.target as HTMLSelectElement;
        const { value } = target;
        if (value) {
            searchParams.set('sort', value);
        } else {
            searchParams.delete('sort');
        }

        setSearchParams(searchParams);
    }
    return (
        <div className="sticky-notes">
            {notesError && <span className="sticky-notes__error">{notesError.message}</span>}
            {showModal && (
                <Modal title="Create Note" onDismiss={() => setShowModal(false)}>
                    <CreateNote
                        onComplete={async (status) => {
                            setShowModal(false);
                            if (status === 'success') await fetchNotes(setNotesError, setNotes);
                        }}
                    />
                </Modal>
            )}
            <div className="sticky-notes__background">
                <div className="sticky-notes__your-notes">
                    <h2>Your Notes</h2>
                    <button className="button" onClick={() => setShowModal(true)}>
                        + Create a Note
                    </button>
                </div>
                <div className="sticky-notes__actions">
                    <FormTextField
                        type="text"
                        name="search"
                        placeholder="Search notes..."
                        defaultValue={notes?.searchQuery}
                        onChange={debounce(onSearchEventHandler, 800)}
                    />
                    <select
                        className="select-box"
                        onChange={onSortEventHandler}
                        value={searchParams.get('sort') || ''}
                    >
                        <option value="">Select Sort</option>
                        <option value="newest">Newest</option>
                        <option value="oldest">Oldest</option>
                    </select>
                </div>
                {notes?.matchedRecordsCount === 0 && (
                    <div className="sticky-notes__no-record-found">No Record Found</div>
                )}

                <div className="sticky-notes__draggable-area">
                    {notes?.list.map((note) => (
                        <MyNote
                            note={note}
                            key={note._id}
                            onDeleteEvent={async () => await fetchNotes(setNotesError, setNotes)}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
