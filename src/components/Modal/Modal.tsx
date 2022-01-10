import { ReactNode, useEffect } from 'react';
import ReactDOM from 'react-dom';
interface ModalProps {
    title?: string;
    onDismiss: () => void;
    children: ReactNode;
}
export default function Modal({ title, onDismiss, children }: ModalProps) {
    function keyPressHandlerEvent(event: KeyboardEvent) {
        if (event.key === 'Escape') onDismiss();
    }
    useEffect(() => {
        window.addEventListener('keydown', keyPressHandlerEvent, true);

        return () => {
            window.removeEventListener('keydown', keyPressHandlerEvent, true);
        };
    });

    return ReactDOM.createPortal(
        <div className="modal">
            <div className="modal__content-wrapper">
                <div className="modal__header">
                    {title && <h1>{title}</h1>}
                    <button className="button button--small" onClick={onDismiss}>
                        <span className="modal__header-dismiss">x</span>
                    </button>
                </div>
                <div className="modal__body">{children}</div>
            </div>
        </div>,
        document.body
    );
}
