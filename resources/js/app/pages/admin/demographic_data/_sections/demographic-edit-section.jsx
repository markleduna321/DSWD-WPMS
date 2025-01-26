import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { update_user_thunk } from '../../user_management/_redux/user-management-thunk';

const InputError = ({ message, className = "" }) => {
    if (!message) return null;
    return <p className={`text-red-500 text-sm ${className}`}>{message}</p>;
};

export default function DemographicEditSection({ selectedDemographic, onClose }) {
    if (!selectedDemographic) return null;

    const dispatch = useDispatch();

    // State for user data and errors
    const [demographicData, setDemographicData] = useState({
        city: selectedDemographic.city,
        email: selectedDemographic.email,
        password: "", // Keep the password field empty
        role_id: selectedDemographic.role_id,
        is_online: selectedDemographic.is_online,
    });

    const [errors, setErrors] = useState({});

    useEffect(() => {
        setDemographicData({
            name: selectedDemographic.name,
            email: selectedDemographic.email,
            password: "", // Reset password field on user change
            role_id: selectedDemographic.role_id,
            is_online: selectedDemographic.is_online,
        });
    }, [selectedDemographic]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { name, email, password, role_id, is_online } = demographicData;

        // Only add the password if it's provided
        const formData = { name, email, role_id, is_online };
        if (password) {
            formData.password = password; // Add password only if it's not empty
        }

        try {
            await dispatch(update_user_thunk(selectedDemographic.id, formData));
            

        } catch (error) {
            
            setErrors(error?.response?.data?.errors || {});
        } finally {
            // Automatically close the alert after 10 seconds (10000ms)
             // 10000ms = 5 seconds

            // Close the modal after the action
            onClose();
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
            <div className="space-y-4">
                {/* Name Input */}
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                        Name
                    </label>
                    <input
                        type="text"
                        name="name"
                        id="name"
                        value={demographicData.city}
                        onChange={(e) => setDemographicData({ ...demographicData, city: e.target.value })}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
                    />
                    <InputError message={errors?.name} />
                </div>

                {/* Email Input */}
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                        Email
                    </label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        value={demographicData.email}
                        onChange={(e) => setDemographicData({ ...demographicData, email: e.target.value })}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
                    />
                    <InputError message={errors?.email} />
                </div>

                {/* Password Input */}
                <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                        Password
                    </label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        value={demographicData.password}
                        onChange={(e) => setDemographicData({ ...demographicData, password: e.target.value })}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
                    />
                    <InputError message={errors?.password} />
                </div>

                {/* Role Selection */}
                <div>
                    <label htmlFor="role_id" className="block text-sm font-medium text-gray-700">
                        Role
                    </label>
                    <select
                        id="role_id"
                        name="role_id"
                        value={demographicData.role_id}
                        onChange={(e) => setDemographicData({ ...demographicData, role_id: e.target.value })}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
                    >
                        <option value="1">Admin</option>
                        <option value="2">User</option>
                    </select>
                    <InputError message={errors?.role_id} />
                </div>

                

                {/* Submit and Cancel Buttons */}
                <div className="flex justify-end space-x-4">
                    <button
                        type="button"
                        onClick={onClose}
                        className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="bg-indigo-600 text-white px-4 py-2 rounded-md"
                    >
                        Save
                    </button>
                </div>
            </div>  
        </form>
        </div>
    )
}
