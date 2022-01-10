import React, { useRef } from 'react';
import classnames from 'classnames/dedupe';

interface FormProps extends React.FormHTMLAttributes<HTMLFormElement> {
    children: React.ReactNode;
    className?: string;
    onSubmit: <T extends Record<string, any>>(data: T) => void;
    inputNameFields?: Record<string, string>[];
}

export default function Form({
    children,
    onSubmit,
    inputNameFields,
    className: extraClassName,
    ...props
}: FormProps) {
    const formRef = useRef<HTMLFormElement>(null);
    function onSubmitHandler(event: React.FormEvent) {
        event.preventDefault();
        const formNode = formRef.current;
        const obj: Record<string, string> = {};
        inputNameFields?.forEach(({ name }) => {
            obj[name] = formNode?.[name].value;
        });
        onSubmit(obj);
    }
    return (
        <form
            {...props}
            className={classnames('form', extraClassName)}
            ref={formRef}
            onSubmit={onSubmitHandler}
        >
            {children}
        </form>
    );
}
