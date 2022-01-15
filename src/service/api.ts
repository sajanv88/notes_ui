import { NotesResponse, UpdateNote, CreateNote, ErrorType } from '../types';
import { toast } from 'react-toastify';


interface RequestProps {
    headers?: Record<string, string>;
    body?: Record<string, any>;
    method: 'POST' | 'GET' | 'PUT' | 'DELETE'
}

const request = async <T>(path: string, { headers, body, method }: RequestProps) => {
    const res = await fetch(path,
        {
            method: method,
            headers: { ...headers, 'content-type': 'application/json' },
            body: JSON.stringify(body),

        });
    if (res.ok && res.status === 200) {
        return await res.json() as T;
    } else if (res.ok && [201, 202, 204].includes(res.status)) {
        return 'ok';
    } else {
        const error = await res.json() as ErrorType;
        throw new Error(JSON.stringify(error))
    }
}

export const makeLoginRequest = async ({ emailAddress, password }: Record<string, string>) => {
    return request('/api/users/signin', {
        body: { emailAddress, password },
        method: 'POST',
    })
}

export const makeAccountCreationRequest = async ({ firstName, lastName, emailAddress, password }: Record<string, string>) => {
    return request('/api/users/signup', {
        body: {
            firstName,
            lastName,
            emailAddress,
            password,
        },
        method: 'POST'
    });

}

export const verifyUser = async () => {
    return request('/api/user/verify_auth', {
        headers: { "Authorization": window.sessionStorage.getItem('token') ?? '' },
        method: 'GET'
    });
}

export const deactivateMyAccount = async (userId: string) => {
    try {
        return await request(`/api/users/${userId}/deactivate`, {
            headers: { "Authorization": window.sessionStorage.getItem('token') ?? '' },
            method: 'PUT'
        });
    } catch (e: unknown) {
        const error = e as ErrorType;
        const err = JSON.parse(error.message);
        toast.error(err.message)
    }
}

export const activateMyAccount = async (userId: string) => {
    try {
        return await request(`/api/users/${userId}/activate`, {
            headers: { "Authorization": window.sessionStorage.getItem('token') ?? '' },
            method: 'PUT'
        });
    } catch (e: unknown) {
        const error = e as ErrorType;
        const err = JSON.parse(error.message);
        toast.error(err.message)
    }

}

export const deleteMyAccount = async (userId: string) => {
    try {
        return await request(`/api/users/${userId}/delete`, {
            headers: { "Authorization": window.sessionStorage.getItem('token') ?? '' },
            method: 'DELETE'
        });
    } catch (e: unknown) {
        const error = e as ErrorType;
        const err = JSON.parse(error.message);
        toast.error(err.message)
    }
}


export const updateMyPassword = async (userId: string, payload: Record<string, string>) => {
    try {

        return await request(`/api/users/${userId}/update_password`, {
            headers: { "Authorization": window.sessionStorage.getItem('token') ?? '' },
            body: payload,
            method: 'PUT'
        });
    } catch (e: unknown) {
        const error = e as ErrorType;
        const err = JSON.parse(error.message);
        toast.error(err.message)
    }
}



export const getNotes = async (searchParams?: URLSearchParams) => {
    const path = searchParams ? `/api/notes?${searchParams.toString()}` : '/api/notes'
    try {
        return await request<NotesResponse>(path, {
            method: 'GET',
            headers: { "Authorization": window.sessionStorage.getItem('token') ?? '' },
        })
    } catch (e: unknown) {
        const error = e as ErrorType;
        const err = JSON.parse(error.message);
        toast.error(err.message)
    }
}

export const createNote = async (payload: CreateNote) => {
    return request('/api/notes', {
        method: 'POST',
        body: payload,
        headers: { "Authorization": window.sessionStorage.getItem('token') ?? '' },
    })
}

export const updateNote = async (noteId: string, payload: UpdateNote) => {
    try {

        return await request(`/api/notes/${noteId}`, {
            method: 'PUT',
            body: payload,
            headers: { "Authorization": window.sessionStorage.getItem('token') ?? '' },
        })
    } catch (e: unknown) {
        const error = e as ErrorType;
        const err = JSON.parse(error.message);
        toast.error(err.message)
        throw e;
    }
}

export const deleteNote = async (noteId: string) => {
    try {
        return await request(`/api/notes/${noteId}`, {
            method: 'DELETE',
            headers: { "Authorization": window.sessionStorage.getItem('token') ?? '' },
        })
    } catch (e: unknown) {
        const error = e as ErrorType;
        const err = JSON.parse(error.message);
        toast.error(err.message)
        throw e;
    }
}