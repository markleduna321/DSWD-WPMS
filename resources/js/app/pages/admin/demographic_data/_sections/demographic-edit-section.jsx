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

    const [familyMembers, setFamilyMembers] = useState(
        selectedDemographic.familyMembers || []
      );

    

    useEffect(() => {
        setDemographicData({
            name: selectedDemographic.name,
            email: selectedDemographic.email,
            password: "", // Reset password field on user change
            role_id: selectedDemographic.role_id,
            is_online: selectedDemographic.is_online,
        });
        setFamilyMembers(selectedDemographic.familyMembers || []);
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

                    {/* Family Members */}
                    <div>
    <form onSubmit={handleSubmit}>
        <div className="space-y-4">
            {/* Existing Inputs */}
            <div>
                <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                    City
                </label>
                <input
                    type="text"
                    name="city"
                    id="city"
                    value={demographicData.city}
                    onChange={(e) => setDemographicData({ ...demographicData, city: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
                />
                <InputError message={errors?.city} />
            </div>

            {/* Family Members */}
            <div>
                <h3 className="text-lg font-semibold text-gray-700">Family Members</h3>
                {familyMembers.length > 0 ? (
                    familyMembers.map((member, index) => (
                        <div key={index} className="mt-4 p-4 bg-gray-50 rounded-md shadow-sm space-y-2">
                            {/* Relation */}
                            <div>
                                <label
                                    htmlFor={`relation-${index}`}
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Relation
                                </label>
                                <input
                                    type="text"
                                    id={`relation-${index}`}
                                    value={member.relation}
                                    onChange={(e) => {
                                        const updatedMembers = [...familyMembers];
                                        updatedMembers[index].relation = e.target.value;
                                        setFamilyMembers(updatedMembers);
                                    }}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
                                />
                            </div>

                            {/* Name */}
                            <div>
                                <label
                                    htmlFor={`name-${index}`}
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Name
                                </label>
                                <input
                                    type="text"
                                    id={`name-${index}`}
                                    value={member.name}
                                    onChange={(e) => {
                                        const updatedMembers = [...familyMembers];
                                        updatedMembers[index].name = e.target.value;
                                        setFamilyMembers(updatedMembers);
                                    }}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
                                />
                            </div>

                            {/* Age */}
                            <div>
                                <label
                                    htmlFor={`age-${index}`}
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Age
                                </label>
                                <input
                                    type="number"
                                    id={`age-${index}`}
                                    value={member.age}
                                    onChange={(e) => {
                                        const updatedMembers = [...familyMembers];
                                        updatedMembers[index].age = e.target.value;
                                        setFamilyMembers(updatedMembers);
                                    }}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
                                />
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-sm text-gray-500">No family members available.</p>
                )}
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
