import { Link } from 'react-router-dom';
import useAccount from '../../hooks/useAccount';
import Form from '../Form/Form';
import FormTextField, { FormTextFieldType } from '../Form/FormTextField';
import { makeLoginRequest } from '../../service/api';

export default function Login() {
    const inputFields = [
        { name: 'emailAddress', type: FormTextFieldType.EMAIL },
        { name: 'password', type: FormTextFieldType.PASSWORD },
    ];
    const { makeRequestWithPayload, processing } = useAccount();

    async function loginHandler(payload: Record<string, string>) {
        const response: Record<string, string> = (await makeRequestWithPayload(
            payload,
            makeLoginRequest
        )) as Record<string, string>;
        if (response) {
            window.sessionStorage.setItem('token', response.token);
            window.location.replace('/');
        }
    }

    return (
        <div className="login">
            <Form onSubmit={loginHandler} inputNameFields={inputFields} className="login__body">
                {inputFields.map(({ name, type }, index) => (
                    <FormTextField type={type} name={name} key={index} showLabel required />
                ))}
                <div className="login__form-actions">
                    <button type="submit" className="button" disabled={processing}>
                        Login
                    </button>
                    {!processing && (
                        <Link to="/sign_up" className="link">
                            Create Account?
                        </Link>
                    )}
                </div>
            </Form>
        </div>
    );
}
