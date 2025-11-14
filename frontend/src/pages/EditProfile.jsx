// In src/pages/EditProfile.jsx

import React, { useState } from 'react'; // Removed useEffect, added useState
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { editProfile } from '../services/users'; // Only editProfile is needed

const EditProfile = () => {
    const navigate = useNavigate();
    // No loading state needed since we don't fetch data on mount

    // Initialize form data with empty strings
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        mobileNo: '',
        birthDate: '',
    });

    // We remove the useEffect hook that called getProfileDetails()

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.firstName) {
            toast.error("First name is required.");
            return;
        }

        try {
            // ONLY pass the parameters that the backend SQL query expects
            const response = await editProfile(
                formData.firstName,
                formData.lastName,
                formData.mobileNo,
                formData.birthDate
            );

            if (response.status === 'success') {
                toast.success('Profile updated successfully!');
                navigate('/home/movies'); // Navigate back to profile view
            } else {
                toast.error(response.error || 'Failed to update profile.');
            }
        } catch (error) {
            toast.error('An error occurred during update.');
        }
    };

    // No loading check needed

    return (
        <div className="container mt-4">
            <h1>Edit Profile</h1>
            <p>Please fill in all the details you wish to update.</p>
            <form onSubmit={handleSubmit} className="mt-4">
                <div className="mb-3">
                    <label htmlFor="firstName" className="form-label">First Name:</label>
                    <input type="text" id="firstName" name="firstName" className="form-control" value={formData.firstName} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="lastName" className="form-label">Last Name:</label>
                    <input type="text" id="lastName" name="lastName" className="form-control" value={formData.lastName} onChange={handleChange} />
                </div>
                {/* Email and Password fields removed entirely as they are not used in this scenario */}
                <div className="mb-3">
                    <label htmlFor="mobileNo" className="form-label">Mobile Number:</label>
                    <input type="text" id="mobileNo" name="mobileNo" className="form-control" value={formData.mobileNo} onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="birthDate" className="form-label">Date of Birth:</label>
                    <input type="date" id="birthDate" name="birthDate" className="form-control" value={formData.birthDate} onChange={handleChange} />
                </div>

                <button type="submit" className="btn btn-primary">Save Changes</button>
                <button type="button" className="btn btn-secondary ms-2" onClick={() => navigate(-1)}>Cancel</button>
            </form>
        </div>
    );
};

export default EditProfile;
