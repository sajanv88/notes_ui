import { ReactNode } from 'react';
import NavBar from '../NavBar/NavBar';
import useStore from '../../hooks/useStore';
import { Link } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
interface LayoutProps {
    children: ReactNode;
}
export default function Layout({ children }: LayoutProps) {
    const { state } = useStore();

    if (state?.pendingVerification && !state?.appError) {
        return (
            <div className="layout">
                <div className="layout--loading-state">
                    <span>Loading...</span>
                </div>
            </div>
        );
    }
    const user = state?.user && !state?.user.userStatus;
    return (
        <div className="layout">
            <NavBar />
            <ToastContainer
                hideProgressBar={true}
                position="bottom-center"
                theme="dark"
                newestOnTop
            />
            {user && (
                <div className="layout__warning">
                    <p>
                        Your account has been deactivated. This means temporarily you cannot perform
                        actions with your existing notes (If any). Also, you cannot create new
                        Notes.
                    </p>
                    <p>
                        You can activate your account on your
                        <Link to="/account_settings" className="link link--inline">
                            Account Settings
                        </Link>
                        page.
                    </p>
                </div>
            )}
            {children}
        </div>
    );
}
