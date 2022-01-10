import { useState } from 'react';
import useStore from '../../hooks/useStore';
import { useNavigate } from 'react-router-dom';

import ContextMenu, { MenuOption } from '../ContextMenu/ContextMenu';

export default function NavBar() {
    const { state } = useStore();
    const nav = useNavigate();
    const user = state?.user;
    const isLoggedIn = state?.isLoggedIn;

    const menuOptions: MenuOption[] = [
        {
            text: 'Account Settings',
            onClick: () => {
                nav('/account_settings');
            },
        },
        {
            text: 'Logout',
            onClick: () => {
                window.sessionStorage.removeItem('token');
                window.location.replace('/');
            },
        },
    ];
    const [showContextMenu, setShowContextMenu] = useState<boolean>(false);

    return (
        <header className="nav-bar">
            <div className="nav-bar__fixed-container">
                <h1>Sticky Notes</h1>
                {isLoggedIn && (
                    <div className="nav-bar__detail">
                        <span className="avatar" onClick={() => setShowContextMenu(true)}>
                            {user?.firstName.split('')[0]}
                            {user?.lastName.split('')[0]}
                        </span>
                        {showContextMenu && (
                            <ContextMenu
                                menuOptions={menuOptions}
                                destroy={() => setShowContextMenu(false)}
                            />
                        )}
                    </div>
                )}
            </div>
        </header>
    );
}
