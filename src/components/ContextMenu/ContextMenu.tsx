import React, { useEffect } from 'react';
import classNamesDupe from 'classnames/dedupe';

export interface MenuOption {
    text: string;
    showDivider?: boolean;
    onClick?: () => void;
}

interface ContextMenuProps extends React.HTMLAttributes<HTMLDivElement> {
    menuOptions: MenuOption[];
    destroy: () => void;
}

export default function ContextMenu({ menuOptions, destroy, ...props }: ContextMenuProps) {
    const { className: extraClassName } = props;

    function onEventHandler(event: MouseEvent | UIEvent) {
        if (event.target instanceof HTMLButtonElement) {
            return;
        }
        destroy();
    }
    useEffect(() => {
        window.addEventListener('click', onEventHandler, true);
        window.addEventListener('resize', onEventHandler, true);

        return () => {
            window.removeEventListener('click', onEventHandler, true);
            window.removeEventListener('resize', onEventHandler, true);
        };
    });

    return (
        <div className={classNamesDupe('context-menu', extraClassName)} {...props}>
            <div className="context-menu__menus">
                {menuOptions.map((option, idx) => (
                    <button
                        className="button"
                        key={idx}
                        onClick={() => {
                            if (option.onClick) option.onClick();
                            destroy();
                        }}
                    >
                        {option.text}
                    </button>
                ))}
            </div>
        </div>
    );
}
