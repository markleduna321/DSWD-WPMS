import React from 'react'
import { useSelector } from 'react-redux';
import { selectDemographic, selectError, selectLoading } from '../../_redux/demographic-data-slice';
import InputTextComponent from '@/app/pages/components/input-text-component';
import InputLabelComponent from '@/app/pages/components/input-label-component';
import SelectComponent from '@/app/pages/components/input-select';

export default function DemographicDetailSection() {
    const demographic = useSelector(selectDemographic); // Use selector to access purchase order
    const loading = useSelector(selectLoading); // Use selector to access loading state
    const error = useSelector(selectError); // Use selector to access error state

    console.log('Purchase Orders State:', { demographic, loading, error }); // Log current state

    // Handle loading state
    if (loading) {
        return <p>Loading...</p>;
    }

    // Handle error state
    if (error) {
        return <p>Error: {error}</p>;
    }

    // Check if purchaseOrder exists
    if (!demographic || Object.keys(demographic).length === 0) {
        return <p>No purchase order details available.</p>;
    }

    const typeOptionsG = [
        { value: 'Male', label: 'Male' },
        { value: 'Female', label: 'Female' },
    ];

    const typeOptionsC = [
        { value: 'Single', label: 'Single' },
        { value: 'Merried', label: 'Merried' },
        { value: 'Widowed', label: 'Widowed' },
        { value: 'Seperated', label: 'Seperated' },
    ];


    return (
        <div className="mt-6 border-gray-100">
            <h1 className='mb-5 font-bold text-3xl'>Demographic Data of : {demographic.head_last_name || 'N/A'}</h1>
            <hr />

            <div className=' overflow-auto h-[700px]'>
                <h3 className="text-xl font-semibold mb-4">Location of the affected family</h3>
                <div className="flex flex-wrap gap-6">

                    {/* Left Column */}
                    <div className="w-full md:flex-1">

                        <div className="mb-4">
                            <InputLabelComponent htmlFor="region" labelText="Region" />
                            <InputTextComponent
                                id="region"
                                name="region"
                                type="text"
                                required
                                value={demographic.region}
                                placeholder="Region"


                            />
                        </div>

                        <div className="mb-4">
                            <InputLabelComponent htmlFor="province" labelText="Province" />
                            <InputTextComponent
                                id="province"
                                name="province"
                                type="text"
                                required
                                value={demographic.province}
                                placeholder="Province"


                            />
                        </div>

                        <div className="mb-4">
                            <InputLabelComponent htmlFor="district" labelText="District" />
                            <InputTextComponent
                                id="district"
                                name="district"
                                type="text"
                                required
                                value={demographic.district}
                                placeholder="District"


                            />
                        </div>
                    </div>
                    {/* Right Column */}
                    <div className="w-full md:flex-1">
                        <div className="mb-4">
                            <InputLabelComponent htmlFor="city" labelText="City/Municipality" />
                            <InputTextComponent
                                id="city"
                                name="city"
                                type="text"
                                required
                                value={demographic.city}
                                placeholder="City/Municipality"


                            />
                        </div>

                        <div className="mb-4">
                            <InputLabelComponent htmlFor="barangay" labelText="Barangay" />
                            <InputTextComponent
                                id="barangay"
                                name="barangay"
                                type="text"
                                required
                                value={demographic.barangay}
                                placeholder="Barangay"


                            />
                        </div>

                        <div className="mb-4">
                            <InputLabelComponent htmlFor="evacuation_site" labelText="Evacuation Site" />
                            <InputTextComponent
                                id="evacuation_site"
                                name="evacuation_site"
                                type="text"
                                required
                                value={demographic.evacuation_site}
                                placeholder="Evacuation Site"


                            />
                        </div>


                    </div>
                </div>
                <h3 className="text-xl font-semibold mb-4">Head of the family</h3>
                <div className="flex flex-wrap gap-6">
                    <div className="w-full md:flex-1">
                        <div className="mb-4">
                            <InputLabelComponent htmlFor="head_last_name" labelText="Last Name" />
                            <InputTextComponent
                                id="head_last_name"
                                name="head_last_name"
                                type="text"
                                required
                                value={demographic.head_last_name}
                                placeholder="Last Name"


                            />
                        </div>

                        <div className="mb-4">
                            <InputLabelComponent htmlFor="head_first_name" labelText="First Name" />
                            <InputTextComponent
                                id="head_first_name"
                                name="head_first_name"
                                type="text"
                                required
                                value={demographic.head_first_name}
                                placeholder="First Name"


                            />
                        </div>

                        <div className="mb-4">
                            <InputLabelComponent htmlFor="head_middle_name" labelText="Middle Name" />
                            <InputTextComponent
                                id="head_middle_name"
                                name="head_middle_name"
                                type="text"
                                required
                                value={demographic.head_middle_name}
                                placeholder="Middle Name"


                            />
                        </div>

                        <div className="mb-4">
                            <InputLabelComponent htmlFor="extension_name" labelText="Extension (Jr., Sr. etc.)" />
                            <InputTextComponent
                                id="extension_name"
                                name="extension_name"
                                type="text"
                                required
                                value={demographic.extension_name}
                                placeholder="Jr., Sr. etc."


                            />
                        </div>

                        <div className="mb-4">
                            <InputLabelComponent htmlFor="age" labelText="Age" />
                            <InputTextComponent
                                id="age"
                                name="age"
                                type="text"
                                required
                                value={demographic.age}
                                placeholder="Age"


                            />
                        </div>

                        <div className="mb-4">
                            <InputLabelComponent htmlFor="gender" labelText="Gender" />
                            <SelectComponent
                                id="gender"
                                name="gender"
                                value={demographic.gender}

                                options={typeOptionsG}
                                required

                            />
                        </div>

                        <div className="mb-4">
                            <InputLabelComponent htmlFor="birthday" labelText="Date of Birth" />
                            <InputTextComponent
                                id="birthday"
                                name="birthday"
                                type="date"
                                required
                                value={demographic.birthday}


                            />
                        </div>

                        <div className="mb-4">
                            <InputLabelComponent htmlFor="birth_place" labelText="Birth Place" />
                            <InputTextComponent
                                id="birth_place"
                                name="birth_place"
                                type="text"
                                required
                                value={demographic.birth_place}
                                placeholder="Birth Place"


                            />
                        </div>
                    </div>

                    {/* Right Column */}
                    <div className="w-full md:flex-1">
                        <div className="mb-4">
                            <InputLabelComponent htmlFor="civil_status" labelText="Civil Status" />
                            <SelectComponent
                                id="civil_status"
                                name="civil_status"
                                value={demographic.civil_status}

                                options={typeOptionsC}
                                required

                            />
                        </div>

                        <div className="mb-4">
                            <InputLabelComponent htmlFor="mother_maiden_name" labelText="Mother's Maiden Name" />
                            <InputTextComponent
                                id="mother_maiden_name"
                                name="mother_maiden_name"
                                type="text"
                                required
                                value={demographic.mother_maiden_name}
                                placeholder="Mother's Maiden Name"


                            />
                        </div>

                        <div className="mb-4">
                            <InputLabelComponent htmlFor="religion" labelText="Religion" />
                            <InputTextComponent
                                id="religion"
                                name="religion"
                                type="text"
                                required
                                value={demographic.religion}
                                placeholder="Religion"


                            />
                        </div>

                        <div className="mb-4">
                            <InputLabelComponent htmlFor="occupation" labelText="Occupation" />
                            <InputTextComponent
                                id="occupation"
                                name="occupation"
                                type="text"
                                required
                                value={demographic.occupation}
                                placeholder="Occupation"


                            />
                        </div>

                        <div className="mb-4">
                            <InputLabelComponent htmlFor="income" labelText="Monthly Family NET Income" />
                            <InputTextComponent
                                id="income"
                                name="income"
                                type="number"
                                required
                                value={demographic.income}
                                placeholder="Monthly Family NET Income"


                            />
                        </div>

                        <div className="mb-4">
                            <InputLabelComponent htmlFor="id_card_presented" labelText="ID Card Presented" />
                            <InputTextComponent
                                id="id_card_presented"
                                name="id_card_presented"
                                type="text"
                                required
                                value={demographic.id_card_presented}
                                placeholder="ID Card Presented"


                            />
                        </div>

                        <div className="mb-4">
                            <InputLabelComponent htmlFor="id_card_number" labelText="ID Card Number" />
                            <InputTextComponent
                                id="id_card_number"
                                name="id_card_number"
                                type="text"
                                required
                                value={demographic.id_card_number}
                                placeholder="ID Card Number"


                            />
                        </div>

                        <div className="mb-4">
                            <InputLabelComponent htmlFor="contact_number" labelText="Contact Number" />
                            <InputTextComponent
                                id="contact_number"
                                name="contact_number"
                                type="number"
                                required
                                value={demographic.contact_number}
                                placeholder="Contact Number"


                            />
                        </div>

                        <div className="mb-4">
                            <InputTextComponent
                                id="role_id"
                                name="role_id"
                                type="hidden"
                                required
                                value={demographic.role_id}


                            />
                        </div>
                    </div>
                </div>
                <div className="mb-4">
                    <InputLabelComponent htmlFor="permanent_address" labelText="Permanent Address" />
                    <InputTextComponent
                        id="permanent_address"
                        name="permanent_address"
                        type="text"
                        required
                        value={demographic.permanent_address}
                        placeholder="Permanent Address"


                    />
                </div>

                <div className=" px-4 py-6 sm:col-span-2 sm:px-0">
                    <hr className="mb-4" />
                    <dt className="text-xl font-medium leading-6 text-black ">Family Members</dt>

                    <div className="flex justify-between gap-20 w-1/4 text-lg text-lime-900">

                    </div>
                    <div className="flex flex-wrap gap-4">
                        {demographic.family_members && demographic.family_members.length > 0 ? (
                            demographic.family_members.map((item) => (
                                <div key={item.id} className="flex justify-between gap-2">
                                    <div>
                                        <InputLabelComponent htmlFor="fullname" labelText="Full Name" />
                                        <InputTextComponent
                                            id="fullname"
                                            name="fullname"
                                            type="text"
                                            required
                                            value={item.full_name}
                                            placeholder="Full Name"
                                        />
                                    </div>
                                    <div>
                                        <InputLabelComponent htmlFor="relation" labelText="Relation" />
                                        <InputTextComponent
                                            id="relation"
                                            name="relation"
                                            type="text"
                                            required
                                            value={item.relation}
                                            placeholder="Relation"
                                        />
                                    </div>
                                    <div>
                                        <InputLabelComponent htmlFor="birth_date" labelText="Birthday" />
                                        <InputTextComponent
                                            id="birth_date"
                                            name="birth_date"
                                            type="date"
                                            required
                                            value={item.birth_date}
                                            placeholder="Birthday"
                                        />
                                    </div>
                                    <div>
                                        <InputLabelComponent htmlFor="gender" labelText="Gender" />
                                        <InputTextComponent
                                            id="gender"
                                            name="gender"
                                            type="text"
                                            required
                                            value={item.gender}
                                            placeholder="Gender"
                                        />
                                    </div>
                                    <div>
                                        <InputLabelComponent htmlFor="highest_education" labelText="Highest Education" />
                                        <InputTextComponent
                                            id="highest_education"
                                            name="highest_education"
                                            type="text"
                                            required
                                            value={item.highest_education}
                                            placeholder="Highest Education"
                                        />
                                    </div>
                                    <div>
                                        <InputLabelComponent htmlFor="occupation" labelText="Occupation" />
                                        <InputTextComponent
                                            id="occupation"
                                            name="occupation"
                                            type="text"
                                            required
                                            value={item.occupation}
                                            placeholder="Occupation"
                                        />
                                    </div>
                                    <div>
                                        <InputLabelComponent htmlFor="remarks" labelText="Remarks" />
                                        <InputTextComponent
                                            id="remarks"
                                            name="remarks"
                                            type="text"
                                            required
                                            value={item.remarks}
                                            placeholder="Remarks"
                                        />
                                    </div>
                                    {console.log('familyMember ID', item.id)}
                                </div>
                            ))
                        ) : (
                            <div>No Family Member Found.</div>
                        )}
                    </div>


                </div>
            </div>
        </div>
    )
}
