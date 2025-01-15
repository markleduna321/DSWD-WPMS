import Button from '@/app/pages/components/button';
import InputLabelComponent from '@/app/pages/components/input-label-component';
import SelectComponent from '@/app/pages/components/input-select';
import InputTextComponent from '@/app/pages/components/input-text-component';
import InputTextareaComponent from '@/app/pages/components/input-textarea-component';
import Modal from '@/app/pages/components/modal';
import InputError from '@/Components/InputError';
import { PlusIcon, XMarkIcon } from '@heroicons/react/24/outline';
import React, { useState } from 'react'

export default function DemographicDataCreateSection() {
    const [isModalOpen, setModalOpen] = useState(false);
    const [newAgent, setNewAgent] = useState({
        name: '',
        address: '',
        email: '',
        contact_number: '',
        role_id: '',
    });

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

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const newAgentData = {
                name: newAgent.name,
                address: newAgent.address,  // Match API naming
                email: newAgent.email,
                contact_number: newAgent.contact_number,
                role_id: newAgent.role_id,
            };
           await store.dispatch(create_profiling_thunk(newAgentData))
           await store.dispatch(get_profiling_thunk())
           closeModal();
        } catch (error) {
            console.error('Error saving product:', error);
        }
    }; 

    const typeOptions = [
        { value: '3', label: 'Household' },
      ];

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
      <InputLabelComponent htmlFor="purok" labelText="Purok" />
      <InputTextComponent
        id="purok"
        name="purok"
        type="text"
        required
        value={newAgent.purok}
        placeholder="Purok"
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
    </div>
     {/* Right Column */}
  <div className="w-full md:flex-1">
  <div className="mb-4">
      <InputLabelComponent htmlFor="purok" labelText="Purok" />
      <InputTextComponent
        id="purok"
        name="purok"
        type="text"
        required
        value={newAgent.purok}
        placeholder="Purok"
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
  </div>
    </div>
    <h3 className="text-xl font-semibold mb-4">Head of the family</h3>
    <div className="flex flex-wrap gap-6">
    <div className="w-full md:flex-1">
    <div className="mb-4">
      <InputLabelComponent htmlFor="last_name" labelText="Last Name" />
      <InputTextComponent
        id="last_name"
        name="last_name"
        type="text"
        required
        value={newAgent.last_name}
        placeholder="Last Name"
        onChange={handleChange}
        
      />
    </div>

    <div className="mb-4">
      <InputLabelComponent htmlFor="first_name" labelText="First Name" />
      <InputTextComponent
        id="first_name"
        name="first_name"
        type="text"
        required
        value={newAgent.first_name}
        placeholder="First Name"
        onChange={handleChange}
        
      />
    </div>

    <div className="mb-4">
      <InputLabelComponent htmlFor="middle_name" labelText="Middle Name" />
      <InputTextComponent
        id="middle_name"
        name="middle_name"
        type="text"
        required
        value={newAgent.middle_name}
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
        value={newAgent.first_name}
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
        value={newAgent.extension_name}
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
      <InputLabelComponent htmlFor="mothername" labelText="Mother's Maiden Name" />
      <InputTextComponent
        id="mothername"
        name="mothername"
        type="text"
        required
        value={newAgent.extension_name}
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
        value={newAgent.extension_name}
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
        value={newAgent.extension_name}
        placeholder="Occupation"
        onChange={handleChange}
        
      />
    </div>

    <div className="mb-4">
      <InputLabelComponent htmlFor="income" labelText="Monthly Family NET Income" />
      <InputTextComponent
        id="income"
        name="income"
        type="text"
        required
        value={newAgent.extension_name}
        placeholder="Monthly Family NET Income"
        onChange={handleChange}
        
      />
    </div>

    <div className="mb-4">
      <InputLabelComponent htmlFor="idcardpresented" labelText="ID Card Presented" />
      <InputTextComponent
        id="idcardpresented"
        name="idcardpresented"
        type="text"
        required
        value={newAgent.extension_name}
        placeholder="ID Card Presented"
        onChange={handleChange}
        
      />
    </div>

    <div className="mb-4">
      <InputLabelComponent htmlFor="idcardnumber" labelText="ID Card Number" />
      <InputTextComponent
        id="idcardnumber"
        name="idcardnumber"
        type="text"
        required
        value={newAgent.extension_name}
        placeholder="ID Card Number"
        onChange={handleChange}
        
      />
    </div>

    <div className="mb-4">
      <InputLabelComponent htmlFor="contactnumber" labelText="Contact Number" />
      <InputTextComponent
        id="contactnumber"
        name="contactnumber"
        type="number"
        required
        value={newAgent.extension_name}
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
      <InputLabelComponent htmlFor="permanentaddress" labelText="Permanent Address" />
      <InputTextComponent
        id="permanentaddress"
        name="permanentaddress"
        type="text"
        required
        value={newAgent.extension_name}
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
                    <InputLabelComponent htmlFor={`firstName-${index}`} labelText="First Name" />
                    <InputTextComponent
                      id={`firstName-${index}`}
                      name="firstName"
                      type="text"
                      required
                      value={member.firstName}
                      placeholder="First Name"
                      onChange={(e) => handleFamilyMemberChange(index, e)}
                      
                    />
                  </div>
                  <div className="flex-1">
                    <InputLabelComponent htmlFor={`lastName-${index}`} labelText="Last Name" />
                    <InputTextComponent
                      id={`lastName-${index}`}
                      name="lastName"
                      type="text"
                      required
                      value={member.lastName}
                      placeholder="Last Name"
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
                isLoading={false}
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
