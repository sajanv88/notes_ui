import Form from '../Form/Form';
import FormTextField, { FormTextFieldType } from '../Form/FormTextField';
import { updateMyPassword } from '../../service/api';
import useStore from '../../hooks/useStore';

export default function UpdatePassword() {
    const { state } = useStore();
    const inputFields = [
        {
            name: 'currentPassword',
            type: FormTextFieldType.PASSWORD,
        },
        {
            name: 'newPassword',
            type: FormTextFieldType.PASSWORD,
        },
    ];
    async function onSaveHandlerEvent(obj: Record<string, string>) {
        const id = state?.user?._id as string;
        await updateMyPassword(id, obj);
    }
    return (
        <Form inputNameFields={inputFields} onSubmit={onSaveHandlerEvent}>
            <div className="account-settings__update-password">
                <h3>Update Password</h3>
                {inputFields.map(({ name, type }, idx) => (
                    <FormTextField name={name} type={type} showLabel key={idx} required />
                ))}
            </div>

            <div className="account-settings__actions">
                <button className="button button--primary" type="submit">
                    Save
                </button>
            </div>
        </Form>
    );
}
