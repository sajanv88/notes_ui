import { useContext } from 'react';
import { Context } from '../store/StoreProvider';

export default function useStore() {
    const ctx = useContext(Context);
    return ctx;
}
