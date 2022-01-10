import { Link } from 'react-router-dom';
import Form from '../Form/Form';
import FormTextField, { FormTextFieldType } from '../Form/FormTextField';
import { makeAccountCreationRequest } from '../../service/api';
import useAccount from '../../hooks/useAccount';
import { toast } from 'react-toastify';

export default function CreateAccount() {
    const inputFields = [
        { name: 'firstName', type: FormTextFieldType.TEXT },
        { name: 'lastName', type: FormTextFieldType.TEXT },
        { name: 'emailAddress', type: FormTextFieldType.EMAIL },
        { name: 'password', type: FormTextFieldType.PASSWORD },
    ];
    const { makeRequestWithPayload } = useAccount();

    async function createAccountHandler(payload: Record<string, string>) {
        await makeRequestWithPayload(payload, makeAccountCreationRequest);
        toast.success(`Welcome ${payload.lastName}`);
    }

    return (
        <div className="create-account">
            <Form
                onSubmit={createAccountHandler}
                inputNameFields={inputFields}
                className="create-account__body"
            >
                <div className="create-account__grid">
                    {inputFields.map(({ name, type }, index) => (
                        <FormTextField type={type} name={name} key={index} showLabel required />
                    ))}
                </div>
                <div className="create-account__form-actions">
                    <button type="submit" className="button">
                        Create Account
                    </button>
                    <Link to="/sign_in" className="link">
                        Already Have an Account?
                    </Link>
                </div>
            </Form>
        </div>
    );
}
