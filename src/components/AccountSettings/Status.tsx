import { useState } from 'react';
import Form from '../Form/Form';
import useStore from '../../hooks/useStore';
import { deactivateMyAccount, activateMyAccount, deleteMyAccount } from '../../service/api';
import { toast } from 'react-toastify';
export default function Status() {
    const [selectedValue, setSelectedValue] = useState<HTMLInputElement | null>(null);
    const { state, refreshUserState } = useStore();
    const user = state?.user;
    function onChangeHandlerEvent(e: React.SyntheticEvent) {
        const target = e.target as HTMLInputElement;
        setSelectedValue(target);
    }

    async function onSaveHandlerEvent(obj: Record<string, any>) {
        if (obj.status === 'deactivate') {
            await deactivateMyAccount(user?._id as string);
            toast.info(`${user?.lastName}, you have deactivated your account.`);
            refreshUserState!(); // we know this defined already.
        } else if (obj.status === 'activate') {
            await activateMyAccount(user?._id as string);
            toast.success('Your account has been activated');
            refreshUserState!(); // we know this defined already.
        } else if (obj.status === 'delete') {
            await deleteMyAccount(user?._id as string);
            toast.warning('We are truly sorry to see that you have deleted your account.');
            window.sessionStorage.clear();
            window.location.reload();
        }

        selectedValue!.checked = false;
        setSelectedValue(null);
    }
    const userStatus = user?.userStatus ? 'deactivate' : 'activate';
    return (
        <Form
            inputNameFields={[
                {
                    name: 'status',
                    type: 'radio',
                },
                {
                    name: 'status',
                    type: 'radio',
                },
            ]}
            onSubmit={onSaveHandlerEvent}
        >
            <div className="account-settings__status">
                <h3>Update Account Status</h3>
                <fieldset id="status" onChange={onChangeHandlerEvent}>
                    <div className="account-settings__status-deactivate">
                        <input type="radio" name="status" id={userStatus} value={userStatus} />
                        <label htmlFor={userStatus}>{userStatus} Account</label>
                    </div>
                    <div className="account-settings__status-delete">
                        <input type="radio" name="status" id="delete" value="delete" />
                        <label htmlFor="delete">Delete Account</label>
                    </div>
                </fieldset>
            </div>
            {selectedValue && (
                <div className="account-settings__actions">
                    <button
                        className="button"
                        onClick={() => {
                            selectedValue.checked = false;
                            setSelectedValue(null);
                        }}
                    >
                        Cancel
                    </button>
                    <button className="button button--primary" type="submit">
                        Save
                    </button>
                </div>
            )}
        </Form>
    );
}
