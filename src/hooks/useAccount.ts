import { useState } from 'react';
import { ErrorType, } from '../types';
import { toast } from 'react-toastify';
export default function useAccount() {
    const [processing, setProcessing] = useState<boolean>(false);
    async function makeRequestWithPayload(payload: Record<string, string>, cb: (payload: Record<string, string>) => Promise<unknown>) {
        setProcessing(true);
        try {
            return await cb(payload);
        } catch (e: unknown) {
            const err = e as ErrorType;
            const error = JSON.parse(err.message);
            toast.error(error.message);
            throw e;
        } finally {
            setProcessing(false)
        }
    }

    return {
        makeRequestWithPayload,
        processing
    }
}
