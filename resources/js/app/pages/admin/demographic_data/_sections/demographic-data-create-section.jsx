import Button from '@/app/pages/components/button';
import InputLabelComponent from '@/app/pages/components/input-label-component';
import SelectComponent from '@/app/pages/components/input-select';
import InputTextComponent from '@/app/pages/components/input-text-component';
import InputTextareaComponent from '@/app/pages/components/input-textarea-component';
import Modal from '@/app/pages/components/modal';
import InputError from '@/Components/InputError';
import { PlusIcon, XMarkIcon } from '@heroicons/react/24/outline';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { create_demographic_thunk } from '../_redux/demographic-data-thunk';
import store from '@/app/store/store';

export default function DemographicDataCreateSection() {
  const [isModalOpen, setModalOpen] = useState(false);
  const [newAgent, setNewAgent] = useState({
    name: '',
    address: '',
    email: '',
    contact_number: '',
    role_id: '',
  });

  const dispatch = useDispatch();
  const { data, error } = useSelector((state) => state.demographic);
  const [isLoading, setIsLoading] = useState(false)
  const [familyMembers, setFamilyMembers] = useState([]);

  // Open and close modal functions
  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewAgent((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true)
    try {
      const result = await store.dispatch(create_demographic_thunk({
        ...newAgent,
        familyMembers: familyMembers
      }));
      console.log('result', result)
      setIsLoading(false)
      setModalOpen(false);
    } catch (error) {
      setIsLoading(false)
    }
  };

  // Handle family member input changes
  const handleFamilyMemberChange = (index, e) => {
    const { name, value } = e.target;
    const updatedMembers = [...familyMembers];
    updatedMembers[index] = { ...updatedMembers[index], [name]: value };
    setFamilyMembers(updatedMembers);
  };

  // Add a new family member input group
  const addFamilyMember = () => {
    setFamilyMembers([
      ...familyMembers,
      {
        firstName: '',
        lastName: '',
        middleName: '',
        extName: '',
        gender: '',
        dob: '',
        relation: '',
      },
    ]);
  };

  // Remove a family member input group
  const removeFamilyMember = (index) => {
    const updatedMembers = familyMembers.filter((_, i) => i !== index);
    setFamilyMembers(updatedMembers);
  };

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
    <div>
      <div className='mb-4 flex justify-between items-center'>
        <Button
          type="button"
          variant="primary"
          size="md"
          isLoading={false}
          disabled={false}
          icon={<PlusIcon className="h-5 w-5" />}
          onClick={openModal}
        >
          Add Content
        </Button>

        <Modal isOpen={isModalOpen} onClose={closeModal} width='w-3/4'>
          <h2 className="text-xl font-semibold mb-4">FAMILY ASSISTANCE IN EMERGENCY AND DISASTER (FACED)</h2>
          <div className="overflow-y-auto max-h-[calc(100vh-4rem)] sm:max-h-[calc(100vh-8rem)]">
            <form onSubmit={handleSubmit}>
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
                      value={newAgent.purok}
                      placeholder="Region"
                      onChange={handleChange}

                    />
                  </div>

                  <div className="mb-4">
                    <InputLabelComponent htmlFor="province" labelText="Province" />
                    <InputTextComponent
                      id="province"
                      name="province"
                      type="text"
                      required
                      value={newAgent.province}
                      placeholder="Province"
                      onChange={handleChange}

                    />
                  </div>

                  <div className="mb-4">
                    <InputLabelComponent htmlFor="district" labelText="District" />
                    <InputTextComponent
                      id="district"
                      name="district"
                      type="text"
                      required
                      value={newAgent.district}
                      placeholder="District"
                      onChange={handleChange}

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
                      value={newAgent.city}
                      placeholder="City/Municipality"
                      onChange={handleChange}

                    />
                  </div>

                  <div className="mb-4">
                    <InputLabelComponent htmlFor="barangay" labelText="Barangay" />
                    <InputTextComponent
                      id="barangay"
                      name="barangay"
                      type="text"
                      required
                      value={newAgent.barangay}
                      placeholder="Barangay"
                      onChange={handleChange}

                    />
                  </div>

                  <div className="mb-4">
                    <InputLabelComponent htmlFor="evacuation_site" labelText="Evacuation Site" />
                    <InputTextComponent
                      id="evacuation_site"
                      name="evacuation_site"
                      type="text"
                      required
                      value={newAgent.purok}
                      placeholder="Evacuation Site"
                      onChange={handleChange}

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
                      value={newAgent.head_last_name}
                      placeholder="Last Name"
                      onChange={handleChange}

                    />
                  </div>

                  <div className="mb-4">
                    <InputLabelComponent htmlFor="head_first_name" labelText="First Name" />
                    <InputTextComponent
                      id="head_first_name"
                      name="head_first_name"
                      type="text"
                      required
                      value={newAgent.head_first_name}
                      placeholder="First Name"
                      onChange={handleChange}

                    />
                  </div>

                  <div className="mb-4">
                    <InputLabelComponent htmlFor="head_middle_name" labelText="Middle Name" />
                    <InputTextComponent
                      id="head_middle_name"
                      name="head_middle_name"
                      type="text"
                      required
                      value={newAgent.head_middle_name}
                      placeholder="Middle Name"
                      onChange={handleChange}

                    />
                  </div>

                  <div className="mb-4">
                    <InputLabelComponent htmlFor="extension_name" labelText="Extension (Jr., Sr. etc.)" />
                    <InputTextComponent
                      id="extension_name"
                      name="extension_name"
                      type="text"
                      required
                      value={newAgent.extension_name}
                      placeholder="Jr., Sr. etc."
                      onChange={handleChange}

                    />
                  </div>

                  <div className="mb-4">
                    <InputLabelComponent htmlFor="age" labelText="Age" />
                    <InputTextComponent
                      id="age"
                      name="age"
                      type="text"
                      required
                      value={newAgent.age}
                      placeholder="Age"
                      onChange={handleChange}

                    />
                  </div>

                  <div className="mb-4">
                    <InputLabelComponent htmlFor="gender" labelText="Gender" />
                    <SelectComponent
                      id="gender"
                      name="gender"
                      value={newAgent.gender}
                      onChange={handleChange}
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
                      value={newAgent.birthday}
                      onChange={handleChange}

                    />
                  </div>

                  <div className="mb-4">
                    <InputLabelComponent htmlFor="birth_place" labelText="Birth Place" />
                    <InputTextComponent
                      id="birth_place"
                      name="birth_place"
                      type="text"
                      required
                      value={newAgent.birth_place}
                      placeholder="Birth Place"
                      onChange={handleChange}

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
                      value={newAgent.civil_status}
                      onChange={handleChange}
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
                      value={newAgent.mother_maiden_name}
                      placeholder="Mother's Maiden Name"
                      onChange={handleChange}

                    />
                  </div>

                  <div className="mb-4">
                    <InputLabelComponent htmlFor="religion" labelText="Religion" />
                    <InputTextComponent
                      id="religion"
                      name="religion"
                      type="text"
                      required
                      value={newAgent.religion}
                      placeholder="Religion"
                      onChange={handleChange}

                    />
                  </div>

                  <div className="mb-4">
                    <InputLabelComponent htmlFor="occupation" labelText="Occupation" />
                    <InputTextComponent
                      id="occupation"
                      name="occupation"
                      type="text"
                      required
                      value={newAgent.occupation}
                      placeholder="Occupation"
                      onChange={handleChange}

                    />
                  </div>

                  <div className="mb-4">
                    <InputLabelComponent htmlFor="income" labelText="Monthly Family NET Income" />
                    <InputTextComponent
                      id="income"
                      name="income"
                      type="number"
                      required
                      value={newAgent.income}
                      placeholder="Monthly Family NET Income"
                      onChange={handleChange}

                    />
                  </div>

                  <div className="mb-4">
                    <InputLabelComponent htmlFor="id_card_presented" labelText="ID Card Presented" />
                    <InputTextComponent
                      id="id_card_presented"
                      name="id_card_presented"
                      type="text"
                      required
                      value={newAgent.id_card_presented}
                      placeholder="ID Card Presented"
                      onChange={handleChange}

                    />
                  </div>

                  <div className="mb-4">
                    <InputLabelComponent htmlFor="id_card_number" labelText="ID Card Number" />
                    <InputTextComponent
                      id="id_card_number"
                      name="id_card_number"
                      type="text"
                      required
                      value={newAgent.id_card_number}
                      placeholder="ID Card Number"
                      onChange={handleChange}

                    />
                  </div>

                  <div className="mb-4">
                    <InputLabelComponent htmlFor="contact_number" labelText="Contact Number" />
                    <InputTextComponent
                      id="contact_number"
                      name="contact_number"
                      type="number"
                      required
                      value={newAgent.contact_number}
                      placeholder="Contact Number"
                      onChange={handleChange}

                    />
                  </div>

                  <div className="mb-4">
                    <InputTextComponent
                      id="role_id"
                      name="role_id"
                      type="hidden"
                      required
                      value={newAgent.role_id}
                      onChange={handleChange}

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
                  value={newAgent.permanent_address}
                  placeholder="Permanent Address"
                  onChange={handleChange}

                />
              </div>
              {/* Family Members Section */}
              <div className="flex justify-start gap-3 pt-10">
                <div className="px-4 sm:px-0">
                  <h3 className="text-lg font-semibold leading-7 text-gray-900">Family Members</h3>
                </div>
                <div className="">
                  <div>
                    <div className="">
                      <Button
                        type="button"
                        variant="success"
                        size="sm"
                        onClick={addFamilyMember}
                      >
                        <PlusIcon className="h-5 w-5" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              {familyMembers.map((member, index) => (
                <div key={index} className="mb-4 border p-4 rounded-md">
                  <div className="flex flex-wrap gap-4">
                    <div className="flex-1">
                      <InputLabelComponent htmlFor={`fullname-${index}`} labelText="Full Name" />
                      <InputTextComponent
                        id={`fullname-${index}`}
                        name="fullname"
                        type="text"
                        required
                        value={member.fullname}
                        placeholder="Full Name"
                        onChange={(e) => handleFamilyMemberChange(index, e)}

                      />
                    </div>

                    <div className="flex-1">
                      <InputLabelComponent htmlFor={`relation-${index}`} labelText="Relation" />
                      <InputTextComponent
                        id={`relation-${index}`}
                        name="relation"
                        type="text"
                        required
                        value={member.relation}
                        placeholder="Relation"
                        onChange={(e) => handleFamilyMemberChange(index, e)}

                      />
                    </div>

                    <div className="flex-1">
                      <InputLabelComponent htmlFor={`birth_date-${index}`} labelText="Birth Date" />
                      <InputTextComponent
                        id={`birth_date-${index}`}
                        name="birth_date"
                        type="date"
                        required
                        value={member.birth_date}
                        placeholder="Birth Date"
                        onChange={(e) => handleFamilyMemberChange(index, e)}

                      />
                    </div>

                    {/* <div className="flex-1">
                      <InputLabelComponent htmlFor={`age-${index}`} labelText="Age" />
                      <InputTextComponent
                        id={`age-${index}`}
                        name="age"
                        type="number"
                        required
                        value={member.birthdate}
                        placeholder="Age"
                        onChange={(e) => handleFamilyMemberChange(index, e)}

                      />
                    </div> */}

                    <div className="flex-1">
                      <InputLabelComponent htmlFor={`gender-${index}`} labelText="Sex" />
                      <InputTextComponent
                        id={`gender-${index}`}
                        name="gender"
                        type="text"
                        required
                        value={member.gender}
                        placeholder="Sex"
                        onChange={(e) => handleFamilyMemberChange(index, e)}

                      />
                    </div>

                    <div className="flex-1">
                      <InputLabelComponent htmlFor={`age-${index}`} labelText="Highest Education" />
                      <InputTextComponent
                        id={`highest_educational_attainment-${index}`}
                        name="highest_educational_attainment"
                        type="text"
                        required
                        value={member.highest_educational_attainment}
                        placeholder="Highest Educational Attainment"
                        onChange={(e) => handleFamilyMemberChange(index, e)}

                      />
                    </div>

                    <div className="flex-1">
                      <InputLabelComponent htmlFor={`occupation-${index}`} labelText="Occupation" />
                      <InputTextComponent
                        id={`occupation-${index}`}
                        name="occupation"
                        type="text"
                        required
                        value={member.occupation}
                        placeholder="Occupation"
                        onChange={(e) => handleFamilyMemberChange(index, e)}

                      />
                    </div>

                    <div className="flex-1">
                      <InputLabelComponent htmlFor={`remarks-${index}`} labelText="Remarks" />
                      <InputTextComponent
                        id={`remarks-${index}`}
                        name="remarks"
                        type="text"
                        required
                        value={member.remarks}
                        placeholder="Remarks"
                        onChange={(e) => handleFamilyMemberChange(index, e)}

                      />
                    </div>
                  </div>

                  <div className="flex gap-4 mt-4">
                    <Button
                      type="button"
                      variant="danger"
                      size="sm"
                      onClick={() => removeFamilyMember(index)}
                    >
                      Remove Member
                    </Button>
                  </div>
                </div>
              ))}



              <div className='flex flex-col md:flex-row justify-end gap-4 mt-4'>
                <Button
                  type="submit"
                  variant="primary"
                  size="md"
                  isLoading={isLoading}
                  disabled={false}
                >
                  Save
                </Button>

                <Button
                  type="button"
                  variant="danger"
                  size="md"
                  isLoading={false}
                  disabled={false}
                  onClick={closeModal}
                >
                  <XMarkIcon className="h-5 w-5" />
                </Button>
              </div>
            </form>
          </div>
        </Modal>
      </div>
    </div>
  )
}
