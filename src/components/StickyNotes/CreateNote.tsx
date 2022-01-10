import { useState, useRef } from 'react';
import Form from '../Form/Form';
import { ErrorType } from '../../types';
import Editable from '../Editable/Editable';
import { createNote } from '../../service/api';
import useStore from '../../hooks/useStore';
import { toast } from 'react-toastify';
interface CreateNoteProps {
    onComplete: (status: 'dismissed' | 'success') => void;
}

export default function CreateNote({ onComplete }: CreateNoteProps) {
    const editableRef = useRef<HTMLDivElement>(null);
    const [processing, setProcessing] = useState<boolean>(false);
    const [createNoteError, setCreateNoteError] = useState<ErrorType | null>(null);
    const { state } = useStore();
    const user = state?.user;
    async function createNoteHandler() {
        try {
            setProcessing(true);
            await createNote({
                description: editableRef.current?.innerHTML as string,
                createdBy: {
                    userId: user?._id as string,
                    fullName: `${user?.firstName} ${user?.lastName}`,
                },
            });
            toast.success(`${user?.lastName}, Note has been created.`);
            onComplete('success');
        } catch (e: any) {
            setCreateNoteError(JSON.parse(e.message));
        } finally {
            setProcessing(false);
        }
    }

    return (
        <Form className="create-note" onSubmit={createNoteHandler}>
            {createNoteError && (
                <span className="create-note__error">{createNoteError.message}</span>
            )}

            <div className="create-note__body">
                <Editable ref={editableRef} className="create-note__body-editable" />
            </div>
            <div className="create-note__actions">
                <button
                    type="submit"
                    className="button"
                    onClick={() => onComplete('dismissed')}
                    disabled={processing}
                >
                    Cancel
                </button>
                <button type="submit" className="button" disabled={processing}>
                    Save
                </button>
            </div>
        </Form>
    );
}
