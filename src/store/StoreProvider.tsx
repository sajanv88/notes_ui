import { createContext, ReactNode, useState, useEffect, useMemo } from 'react';
import { User, ErrorType } from '../types';
import { verifyUser } from '../service/api';

type StateProps = {
    user: User | null;
    isLoggedIn: boolean;
    pendingVerification: boolean;
    appError: ErrorType | null;
};

type ContextProps = {
    state: StateProps;
    refreshUserState: () => void;
};

export const Context = createContext<Partial<ContextProps>>({});
Context.displayName = 'StoreProviderContext';

async function verify(state: StateProps, cb: (state: StateProps) => void) {
    const response = await verifyUser().catch((e) =>
        cb({ ...state, appError: JSON.parse(e.message) })
    );
    if (response) {
        const user = response as User;
        cb({
            ...state,
            user,
            isLoggedIn: true,
            pendingVerification: false,
            appError: null,
        });
    }
}

interface StoreProviderProps {
    children: ReactNode;
}
export default function StoreProvider({ children }: StoreProviderProps) {
    const [state, setState] = useState<StateProps>({
        user: null,
        isLoggedIn: false,
        pendingVerification: true,
        appError: null,
    });

    useEffect(() => {
        if (!state.user && !state.appError) verify(state, setState);
    }, [state]);

    const contextMemo = useMemo(() => {
        function refreshUserState(): void {
            verify(state, setState);
        }
        return { state, refreshUserState };
    }, [state]);

    return <Context.Provider value={contextMemo}>{children}</Context.Provider>;
}
