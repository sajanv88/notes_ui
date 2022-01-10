import Status from './Status';
import { Link } from 'react-router-dom';
import UpdatePassword from './UpdatePassword';
import FormTextField, { FormTextFieldType } from '../Form/FormTextField';
import useStore from '../../hooks/useStore';

export default function AccountSettings() {
    const { state } = useStore();
    return (
        <div className="account-settings">
            <h3>Account Settings</h3>
            <FormTextField
                type={FormTextFieldType.EMAIL}
                name="emailAddress"
                disabled
                defaultValue={state?.user?.emailAddress}
                title=""
                showLabel
            />

            <Status />
            <UpdatePassword />
            <Link to="/" className="link">
                Go Home
            </Link>
        </div>
    );
}
