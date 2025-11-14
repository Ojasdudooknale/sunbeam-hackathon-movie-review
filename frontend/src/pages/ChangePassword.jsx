import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { changePassword } from '../services/users';

const ChangePassword = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        oldPassword: '',
        newPassword: '',
        confirmNewPassword: '',
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { oldPassword, newPassword, confirmNewPassword } = formData;

        // Client-side validation
        if (newPassword !== confirmNewPassword) {
            toast.error("New passwords do not match.");
            return;
        }

        if (newPassword.length < 6) { // Example length check
            toast.error("New password must be at least 6 characters long.");
            return;
        }

        setLoading(true);
        try {
            const response = await changePassword(oldPassword, newPassword);

            if (response.status === 'success') {
                toast.success('Password changed successfully!');

                navigate('/home/movies');
            } else {

                toast.error(response.error || 'Failed to change password.');
            }
        } catch (error) {
            toast.error('An error occurred during password change.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mt-4">
            <h1>Change Password</h1>
            <form onSubmit={handleSubmit} className="mt-4">
                <div className="mb-3">
                    <label htmlFor="oldPassword" className="form-label">Current Password:</label>
                    <input
                        type="password"
                        id="oldPassword"
                        name="oldPassword"
                        className="form-control"
                        value={formData.oldPassword}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="newPassword" className="form-label">New Password:</label>
                    <input
                        type="password"
                        id="newPassword"
                        name="newPassword"
                        className="form-control"
                        value={formData.newPassword}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="confirmNewPassword" className="form-label">Confirm New Password:</label>
                    <input
                        type="password"
                        id="confirmNewPassword"
                        name="confirmNewPassword"
                        className="form-control"
                        value={formData.confirmNewPassword}
                        onChange={handleChange}
                        required
                    />
                </div>

                <button type="submit" className="btn btn-primary" disabled={loading}>
                    {loading ? 'Changing...' : 'Change Password'}
                </button>
                <button
                    type="button"
                    className="btn btn-secondary ms-2"
                    onClick={() => navigate(-1)}
                    disabled={loading}
                >
                    Cancel
                </button>
            </form>
        </div>
    );
};

export default ChangePassword;
