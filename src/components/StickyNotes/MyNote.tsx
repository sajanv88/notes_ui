import { useRef, useState } from 'react';
import { updateNote, deleteNote } from '../../service/api';
import { Note } from '../../types';
import Editable from '../Editable/Editable';
import { toast } from 'react-toastify';

interface MyNoteProps {
    note: Note;
    onDeleteEvent: (id: string) => void;
}
export default function MyNote({ note, onDeleteEvent }: MyNoteProps) {
    const descriptionRef = useRef<HTMLDivElement>(null);
    const [edit, setEdit] = useState<boolean>(false);

    async function onEditEventHandler(event: React.MouseEvent<HTMLButtonElement>) {
        setEdit((edit) => !edit);

        if (event.currentTarget.textContent?.toLowerCase() === 'save') {
            await updateNote(note._id, {
                description: descriptionRef.current?.innerHTML as string,
                userId: note.createdBy.userId,
            });
            toast.success('Note has been updated.');
        }
    }

    async function onDeleteEventHandler() {
        await deleteNote(note._id);
        toast.success('Note has been deleted.');
        onDeleteEvent(note._id);
    }

    return (
        <div className="my-note">
            <div className="my-note__header">
                <button className="button button--small" onClick={onEditEventHandler}>
                    {!edit ? 'Edit' : 'Save'}
                </button>
                <button
                    className="button button--small button--danger"
                    onClick={onDeleteEventHandler}
                >
                    Delete
                </button>
            </div>
            <div className="my-note__body">
                <Editable enable={edit} ref={descriptionRef} text={note.description} />
            </div>
            <div className="my-note__footer">
                <div className="my-note__footer-owner-name">
                    By {note.createdBy.fullName} <br /> on {new Date(note.createdAt).toDateString()}
                </div>
            </div>
        </div>
    );
}
