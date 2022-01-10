import { ErrorType, } from '../types';
import { toast } from 'react-toastify';
export default function useAccount() {


    async function makeRequestWithPayload(payload: Record<string, string>, cb: (payload: Record<string, string>) => Promise<unknown>) {
        try {
            return await cb(payload);
        } catch (e: unknown) {
            const err = e as ErrorType;
            const error = JSON.parse(err.message);
            toast.error(error.message);
        }
    }

    return {
        makeRequestWithPayload,
    }
}
