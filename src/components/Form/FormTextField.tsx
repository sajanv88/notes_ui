import React from 'react';
import classnames from 'classnames/dedupe';

export enum FormTextFieldType {
    EMAIL = 'email',
    PASSWORD = 'password',
    TEXT = 'text',
}
interface FormTextFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
    className?: string;
    showInlineError?: {
        message: string;
    };
    showLabel?: boolean;
    type: `${FormTextFieldType}`;
}

const withSpaceForCamelCaseString = (str: string | undefined) => str?.replace(/([A-Z]+)/g, ' $1');
export default function FormTextField({
    className: extraClassName,
    showInlineError,
    showLabel,
    type,
    ...restProps
}: FormTextFieldProps) {
    return (
        <div className="form-text-field">
            {showLabel && (
                <span className="form-text-field__show-label">
                    {withSpaceForCamelCaseString(restProps.name)}
                </span>
            )}
            <input className={classnames(extraClassName)} type={type} {...restProps} />
            {showInlineError && (
                <span className="form-text-field__show-inline-error">
                    {showInlineError.message}
                </span>
            )}
        </div>
    );
}
