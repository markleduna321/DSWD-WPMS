import Button from "@/app/pages/components/button";
import InputLabelComponent from "@/app/pages/components/input-label-component";
import SelectComponent from "@/app/pages/components/input-select";
import InputTextComponent from "@/app/pages/components/input-text-component";
import InputTextareaComponent from "@/app/pages/components/input-textarea-component";
import Modal from "@/app/pages/components/modal";
import InputError from "@/Components/InputError";
import { PlusIcon, XMarkIcon } from "@heroicons/react/24/outline";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { create_demographic_thunk, get_demographics_thunk } from "../_redux/demographic-data-thunk";
import store from "@/app/store/store";
import AddMap from "../../maps/add-map";
import Swal from "sweetalert2";

export default function DemographicDataCreateSection() {
    const [isModalOpen, setModalOpen] = useState(false);
    const [newAgent, setNewAgent] = useState({
        name: "",
        address: "",
        email: "",
        contact_number: "",
        role_id: "",
        region: "IV",
        province: "Negros Occidental",
        city: "Calatrava",
        district: "II",
        lng: 123.4813,
        lat: 10.5946,
    });

    const dispatch = useDispatch();
    const { data, error } = useSelector((state) => state.demographic);
    const [isLoading, setIsLoading] = useState(false);
    const [familyMembers, setFamilyMembers] = useState([]);

    // Open and close modal functions
    const openModal = () => setModalOpen(true);
    const closeModal = () => setModalOpen(false);

    // Handle form input changes
    const handleChange = (e) => {
        const { name, value } = e.target;

        setNewAgent((prevState) => {
            const updatedState = {
                ...prevState,
                [name]: value,
            };

            if (name === "birthday") {
                const birthDate = new Date(value);
                const today = new Date();
                let age = today.getFullYear() - birthDate.getFullYear();
                const m = today.getMonth() - birthDate.getMonth();
                if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
                    age--;
                }
                updatedState.age = age;
            }

            return updatedState;
        });
    };


    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const result = await store.dispatch(
                create_demographic_thunk({
                    ...newAgent,
                    familyMembers: familyMembers,
                    status: "pending",
                })
            );
            await store.dispatch(get_demographics_thunk())
            console.log("result", result);
            setNewAgent({
                name: "",
                address: "",
                email: "",
                contact_number: "",
                role_id: "",
                region: "IV",
                province: "Negros Occidental",
                city: "Calatrava",
                district: "II",
                lng: 123.4813,
                lat: 10.5946,
            });
            Swal.fire({
                icon: "success",
                title: "Your work has been saved",
                showConfirmButton: false,
                timer: 1500,
            });
            setIsLoading(false);
            setModalOpen(false);
        } catch (error) {
            setIsLoading(false);
        }
    };

    // Handle family member input changes
    const handleFamilyMemberChange = (index, e) => {
        const { name, value } = e.target;
        const updatedMembers = [...familyMembers];

        updatedMembers[index] = { ...updatedMembers[index], [name]: value };

        // Automatically calculate age when birth_date changes
        if (name === "birth_date") {
            const birthDate = new Date(value);
            const today = new Date();
            let age = today.getFullYear() - birthDate.getFullYear();
            const m = today.getMonth() - birthDate.getMonth();
            if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
                age--;
            }
            updatedMembers[index].age = age;
        }

        setFamilyMembers(updatedMembers);
    };


    // Add a new family member input group
    const addFamilyMember = () => {
        setFamilyMembers([
            ...familyMembers,
            {
                firstName: "",
                lastName: "",
                middleName: "",
                extName: "",
                gender: "",
                dob: "",
                relation: "",
            },
        ]);
    };

    // Remove a family member input group
    const removeFamilyMember = (index) => {
        const updatedMembers = familyMembers.filter((_, i) => i !== index);
        setFamilyMembers(updatedMembers);
    };

    const typeOptionsG = [
        { value: "Male", label: "Male" },
        { value: "Female", label: "Female" },
    ];

    const typeOptionsC = [
        { value: "Single", label: "Single" },
        { value: "Married", label: "Married" },
        { value: "Widowed", label: "Widowed" },
        { value: "Seperated", label: "Seperated" },
    ];

    const typeOptionsR = [
        { value: "Roman Catholic", label: "Roman Catholic" },
        { value: "Iglesia ni Cristo (Church of Christ)", label: "Iglesia ni Cristo (Church of Christ)" },
        { value: "Baptist", label: "Baptist" },
        { value: "Church of Christ (non-INC}", label: "Church of Christ (non-INC}" },
        { value: "Islam", label: "Islam" },
        { value: "Jehovah’s Witnesses", label: "Jehovah’s Witnesses" },
        { value: "The Church of Jesus Christ of Latter-day Saints (Mormons)", label: "The Church of Jesus Christ of Latter-day Saints (Mormons)" },
        { value: "Seventh-day Adventist Church", label: "Seventh-day Adventist Church" },
        { value: "Evangelical Christianity", label: "Evangelical Christianity" },
        { value: "Methodist", label: "Methodist" },
        { value: "Iglesia Filipina Independiente", label: "Iglesia Filipina Independiente" },
        { value: "Pentecostal (Assemblies of God)", label: "Pentecostal (Assemblies of God)" },
        { value: "Indigenous Philippine Folk Religions (Animism, Anito worship)", label: "Indigenous Philippine Folk Religions (Animism, Anito worship)" },
        { value: "Taoism", label: "Taoism" },
        { value: "Chinese Folk Religion", label: "Chinese Folk Religion" },
        { value: "Grace Communion International", label: "Grace Communion International" },
        { value: "Pentecostal Missionary Church of Christ", label: "Pentecostal Missionary Church of Christ" },
        { value: "Baháʼí Faith", label: "Baháʼí Faith" },
        { value: "Buddhism", label: "Buddhism" },
        { value: "Non-religious / Atheism/Agnosticism", label: "Non-religious / Atheism/Agnosticism" },
    ];

    const typeOptionsS = [
        { value: "Jr.", label: "Jr." },
        { value: "Sr.", label: "Sr." },
        { value: "II", label: "II" },
        { value: "III", label: "III" },
        { value: "IV", label: "IV" },
        { value: "V", label: "V" },
        { value: "VI", label: "VI" },
        { value: "VII", label: "VII" },
    ];

    const typeOptionsP = [
        { value: "Pantawid Pamilyang Pilipino Program(4 P's)", label: "Pantawid Pamilyang Pilipino Program(4 P's)" },
        { value: "Sustainable Livelihood Program(SLP)", label: "Sustainable Livelihood Program(SLP)" },
        { value: "Kapit Bisig Laban sa Kahirapan-Comprehensive and Integrated Delivery of Social Services(KALAHI-CIDSS)", label: "Kapit Bisig Laban sa Kahirapan-Comprehensive and Integrated Delivery of Social Services(KALAHI-CIDSS)" },
        { value: "Walang Gutom Program", label: "Walang Gutom Program" },
    ];

    const typeEvac = [
        {
            value: "Calatrava Evacuation Center",
            label: "Calatrava Evacuation Center",
        },
        {
            value: "Bantayanon Evacuation Center",
            label: "Bantayanon Evacuation Center",
        },
        { value: "Agpangi", label: "Agpangi" },
        { value: "Ani-e", label: "Ani-e" },
        { value: "Bagacay", label: "Bagacay" },
        { value: "Bantayanon", label: "Bantayanon" },
        { value: "Buenavista", label: "Buenavista" },
        { value: "Cabungahan", label: "Cabungahan" },
        { value: "Calampisawan", label: "Calampisawan" },
        { value: "Cambayobo", label: "Cambayobo" },
        { value: "Castellano", label: "Castellano" },
        { value: "Cruz", label: "Cruz" },
        { value: "Dolis", label: "Dolis" },
        { value: "Hilub-Ang", label: "Hilub-Ang" },
        { value: "Hinab-Ongan", label: "Hinab-Ongan" },
        { value: "Ilaya", label: "Ilaya" },
        { value: "Laga-an", label: "Laga-an" },
        { value: "Lalong", label: "Lalong" },
        { value: "Lemery", label: "Lemery" },
        { value: "Lipat-on", label: "Lipat-on" },
        { value: "Lo-ok (Poblacion)", label: "Lo-ok (Poblacion)" },
        { value: "Ma-aslob", label: "Ma-aslob" },
        { value: "Macasilao", label: "Macasilao" },
        { value: "Malanog", label: "Malanog" },
        { value: "Malatas", label: "Malatas" },
        { value: "Marcelo", label: "Marcelo" },
        { value: "Mina-utok", label: "Mina-utok" },
        { value: "Menchaca", label: "Menchaca" },
        { value: "Minapasuk", label: "Minapasuk" },
        { value: "Mahilum", label: "Mahilum" },
        { value: "Paghumayan", label: "Paghumayan" },
        { value: "Pantao", label: "Pantao" },
        { value: "Patun-an", label: "Patun-an" },
        { value: "Pinocutan", label: "Pinocutan" },
        { value: "Refugio", label: "Refugio" },
        { value: "San Benito", label: "San Benito" },
        { value: "San Isidro", label: "San Isidro" },
        { value: "Suba (Poblacion)", label: "Suba (Poblacion)" },
        { value: "Telim", label: "Telim" },
        { value: "Tigbao", label: "Tigbao" },
        { value: "Tigbon", label: "Tigbon" },
        { value: "Winaswasan", label: "Winaswasan" },
    ];

    const barangay = [
        { value: "Agpangi", label: "Agpangi" },
        { value: "Ani-e", label: "Ani-e" },
        { value: "Bagacay", label: "Bagacay" },
        { value: "Bantayanon", label: "Bantayanon" },
        { value: "Buenavista", label: "Buenavista" },
        { value: "Cabungahan", label: "Cabungahan" },
        { value: "Calampisawan", label: "Calampisawan" },
        { value: "Cambayobo", label: "Cambayobo" },
        { value: "Castellano", label: "Castellano" },
        { value: "Cruz", label: "Cruz" },
        { value: "Dolis", label: "Dolis" },
        { value: "Hilub-Ang", label: "Hilub-Ang" },
        { value: "Hinab-Ongan", label: "Hinab-Ongan" },
        { value: "Ilaya", label: "Ilaya" },
        { value: "Laga-an", label: "Laga-an" },
        { value: "Lalong", label: "Lalong" },
        { value: "Lemery", label: "Lemery" },
        { value: "Lipat-on", label: "Lipat-on" },
        { value: "Lo-ok (Poblacion)", label: "Lo-ok (Poblacion)" },
        { value: "Ma-aslob", label: "Ma-aslob" },
        { value: "Macasilao", label: "Macasilao" },
        { value: "Malanog", label: "Malanog" },
        { value: "Malatas", label: "Malatas" },
        { value: "Marcelo", label: "Marcelo" },
        { value: "Mina-utok", label: "Mina-utok" },
        { value: "Menchaca", label: "Menchaca" },
        { value: "Minapasuk", label: "Minapasuk" },
        { value: "Mahilum", label: "Mahilum" },
        { value: "Paghumayan", label: "Paghumayan" },
        { value: "Pantao", label: "Pantao" },
        { value: "Patun-an", label: "Patun-an" },
        { value: "Pinocutan", label: "Pinocutan" },
        { value: "Refugio", label: "Refugio" },
        { value: "San Benito", label: "San Benito" },
        { value: "San Isidro", label: "San Isidro" },
        { value: "Suba (Poblacion)", label: "Suba (Poblacion)" },
        { value: "Telim", label: "Telim" },
        { value: "Tigbao", label: "Tigbao" },
        { value: "Tigbon", label: "Tigbon" },
        { value: "Winaswasan", label: "Winaswasan" },
    ];

    return (
        <div>
            <div className="mb-4 flex justify-between items-center">
                <Button
                    type="button"
                    variant="primary"
                    size="md"
                    isLoading={false}
                    disabled={false}
                    icon={<PlusIcon className="h-5 w-5" />}
                    onClick={openModal}
                >
                    Add Data
                </Button>

                <Modal isOpen={isModalOpen} width="w-3/4">
                    <h2 className="text-xl font-semibold mb-4 flex justify-between">
                        FAMILY ASSISTANCE IN EMERGENCY AND DISASTER (FACED)
                        <button
                            className=" top-2 right-2 text-gray-500 hover:text-gray-700"
                            onClick={closeModal}
                        >
                            <b><XMarkIcon className="h-6" /></b>
                        </button>
                    </h2>
                    <div className="overflow-y-auto max-h-[calc(100vh-4rem)] sm:max-h-[calc(100vh-8rem)]">
                        <form onSubmit={handleSubmit}>
                            <h3 className="text-xl font-semibold mb-4">
                                Location of the affected family
                            </h3>
                            <div className="flex flex-1  gap-6">
                                {/* Left Column */}
                                <div className="w-full mb-6">
                                    {/* <InputLabelComponent htmlFor="region" labelText="Region" /> */}
                                    <InputTextComponent
                                        id="region"
                                        name="region"
                                        type="hidden"
                                        required
                                        value={newAgent.region}
                                        placeholder="Region"
                                        onChange={handleChange}
                                    />

                                    {/* <InputLabelComponent htmlFor="province" labelText="Province" /> */}
                                    <InputTextComponent
                                        id="province"
                                        name="province"
                                        type="hidden"
                                        required
                                        value={newAgent.province}
                                        placeholder="Province"
                                        onChange={handleChange}
                                    />

                                    {/* <InputLabelComponent htmlFor="district" labelText="District" /> */}
                                    <InputTextComponent
                                        id="district"
                                        name="district"
                                        type="hidden"
                                        required
                                        value={newAgent.district}
                                        placeholder="District"
                                        onChange={handleChange}
                                    />
                                    <InputTextComponent
                                        id="city"
                                        name="city"
                                        type="hidden"
                                        required
                                        value={newAgent.city}
                                        placeholder="City/Municipality"
                                        onChange={handleChange}
                                    />

                                    <div className="flex flex-1 gap-5 w-full">
                                        <div className="mb-4 w-full">
                                            <InputLabelComponent
                                                htmlFor="barangay"
                                                labelText="Barangay"
                                            />
                                            <SelectComponent
                                                id="barangay"
                                                name="barangay"
                                                value={newAgent.barangay}
                                                onChange={handleChange}
                                                options={barangay}
                                                required
                                            />
                                        </div>

                                        <div className="mb-4 w-full">
                                            <InputLabelComponent
                                                htmlFor="evacuation_site"
                                                labelText="Evacuation Site"
                                            />
                                            <SelectComponent
                                                id="evacuation_site"
                                                name="evacuation_site"
                                                value={newAgent.evacuation_site}
                                                onChange={handleChange}
                                                options={typeEvac}
                                                required
                                            />
                                        </div>
                                    </div>
                                </div>
                                {/* Right Column */}
                                {/* <InputLabelComponent htmlFor="city" labelText="City/Municipality" /> */}

                            </div>
                            <h3 className="text-xl font-semibold mb-4">
                                Head of the family
                            </h3>
                            <div className="flex flex-wrap gap-6">
                                <div className="w-full md:flex-1">
                                    <div className="mb-4">
                                        <InputLabelComponent
                                            htmlFor="head_last_name"
                                            labelText="Last Name"
                                        />
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
                                        <InputLabelComponent
                                            htmlFor="head_first_name"
                                            labelText="First Name"
                                        />
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
                                        <InputLabelComponent
                                            htmlFor="head_middle_name"
                                            labelText="Middle Name"
                                        />
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
                                        <InputLabelComponent
                                            htmlFor="extension_name"
                                            labelText="Suffix (Jr., Sr. etc.)"
                                        />
                                        {/* <InputTextComponent
                                            id="extension_name"
                                            name="extension_name"
                                            type="text"
                                            value={newAgent.extension_name}
                                            placeholder="Jr., Sr. etc."
                                            onChange={handleChange}
                                        /> */}

                                        <SelectComponent
                                            id="extension_name"
                                            name="extension_name"
                                            value={newAgent.extension_name}
                                            onChange={handleChange}
                                            options={typeOptionsS}
                                            required
                                        />
                                    </div>

                                    <div className="mb-4">
                                        <InputLabelComponent
                                            htmlFor="birthday"
                                            labelText="Date of Birth"
                                        />
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
                                        <InputLabelComponent
                                            htmlFor="age"
                                            labelText="Age"
                                        />
                                        <InputTextComponent
                                            id="age"
                                            name="age"
                                            type="text"
                                            required
                                            value={newAgent.age}
                                            placeholder="Age"
                                            disabled
                                            readOnly
                                        />
                                    </div>



                                    <div className="mb-4">
                                        <InputLabelComponent
                                            htmlFor="gender"
                                            labelText="Gender"
                                        />
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
                                        <InputLabelComponent
                                            htmlFor="birth_place"
                                            labelText="Birth Place"
                                        />
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
                                        <InputLabelComponent
                                            htmlFor="civil_status"
                                            labelText="Civil Status"
                                        />
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
                                        <InputLabelComponent
                                            htmlFor="mother_maiden_name"
                                            labelText="Mother's Maiden Name"
                                        />
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
                                        <InputLabelComponent
                                            htmlFor="religion"
                                            labelText="Religion"
                                        />
                                        {/* <InputTextComponent
                                            id="religion"
                                            name="religion"
                                            type="text"
                                            required
                                            value={newAgent.religion}
                                            placeholder="Religion"
                                            onChange={handleChange}
                                        /> */}
                                        <SelectComponent
                                            id="religion"
                                            name="religion"
                                            value={newAgent.religion}
                                            onChange={handleChange}
                                            options={typeOptionsR}
                                            required
                                        />
                                    </div>

                                    <div className="mb-4">
                                        <InputLabelComponent
                                            htmlFor="occupation"
                                            labelText="Occupation"
                                        />
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
                                        <InputLabelComponent
                                            htmlFor="income"
                                            labelText="Monthly Family NET Income"
                                        />
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
                                        <InputLabelComponent
                                            htmlFor="id_card_presented"
                                            labelText="ID Card Presented"
                                        />
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
                                        <InputLabelComponent
                                            htmlFor="id_card_number"
                                            labelText="ID Card Number"
                                        />
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
                                        <InputLabelComponent
                                            htmlFor="contact_number"
                                            labelText="Contact Number"
                                        />
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
                                <InputLabelComponent
                                    htmlFor="permanent_address"
                                    labelText="Permanent Address"
                                />
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
                            <div className="mb-4">
                                <InputLabelComponent
                                    htmlFor="program"
                                    labelText="Program"
                                />
                                {/* <InputTextComponent
                                            id="religion"
                                            name="religion"
                                            type="text"
                                            required
                                            value={newAgent.religion}
                                            placeholder="Religion"
                                            onChange={handleChange}
                                        /> */}
                                <SelectComponent
                                    id="program"
                                    name="program"
                                    value={newAgent.program}
                                    onChange={handleChange}
                                    options={typeOptionsP}
                                    required
                                />
                            </div>
                            <AddMap
                                setNewAgent={setNewAgent}
                                newAgent={newAgent}
                            />
                            {/* Family Members Section */}
                            <div className="flex justify-start gap-3 pt-10">
                                <div className="px-4 sm:px-0">
                                    <h3 className="text-lg font-semibold leading-7 text-gray-900">
                                        Family Members
                                    </h3>
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
                                <div
                                    key={index}
                                    className="mb-4 border p-4 rounded-md"
                                >
                                    <div className="flex flex-wrap gap-4">
                                        <div className="flex-1">
                                            <InputLabelComponent
                                                htmlFor={`fullname-${index}`}
                                                labelText="Full Name"
                                            />
                                            <InputTextComponent
                                                id={`fullname-${index}`}
                                                name="fullname"
                                                type="text"
                                                required
                                                value={member.fullname}
                                                placeholder="Full Name"
                                                onChange={(e) =>
                                                    handleFamilyMemberChange(
                                                        index,
                                                        e
                                                    )
                                                }
                                            />
                                        </div>

                                        <div className="flex-1">
                                            <InputLabelComponent
                                                htmlFor={`relation-${index}`}
                                                labelText="Relation"
                                            />
                                            <InputTextComponent
                                                id={`relation-${index}`}
                                                name="relation"
                                                type="text"
                                                required
                                                value={member.relation}
                                                placeholder="Relation"
                                                onChange={(e) =>
                                                    handleFamilyMemberChange(
                                                        index,
                                                        e
                                                    )
                                                }
                                            />
                                        </div>

                                        <div className="flex-1">
                                            <InputLabelComponent
                                                htmlFor={`birth_date-${index}`}
                                                labelText="Birth Date"
                                            />
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

                                        <div className="flex-1">
                                            <InputLabelComponent
                                                htmlFor={`age-${index}`}
                                                labelText="Age"
                                            />
                                            <InputTextComponent
                                                id={`age-${index}`}
                                                name="age"
                                                type="text"
                                                required
                                                value={member.age}
                                                placeholder="Age"
                                                disabled // make it read-only
                                                readOnly
                                            />
                                        </div>


                                        <div className="flex-1">
                                            <InputLabelComponent
                                                htmlFor={`gender-${index}`}
                                                labelText="Sex"
                                            />
                                            <SelectComponent
                                                id="gender"
                                                name="gender"
                                                value={member.gender}
                                                onChange={(e) =>
                                                    handleFamilyMemberChange(
                                                        index,
                                                        e
                                                    )
                                                }
                                                options={typeOptionsG}
                                                required
                                            />
                                        </div>

                                        <div className="flex-1">
                                            <InputLabelComponent
                                                htmlFor={`age-${index}`}
                                                labelText="Highest Education"
                                            />
                                            <InputTextComponent
                                                id={`highest_educational_attainment-${index}`}
                                                name="highest_educational_attainment"
                                                type="text"
                                                required
                                                value={
                                                    member.highest_educational_attainment
                                                }
                                                placeholder="Highest Educational Attainment"
                                                onChange={(e) =>
                                                    handleFamilyMemberChange(
                                                        index,
                                                        e
                                                    )
                                                }
                                            />
                                        </div>

                                        <div className="flex-1">
                                            <InputLabelComponent
                                                htmlFor={`occupation-${index}`}
                                                labelText="Occupation"
                                            />
                                            <InputTextComponent
                                                id={`occupation-${index}`}
                                                name="occupation"
                                                type="text"
                                                required
                                                value={member.occupation}
                                                placeholder="Occupation"
                                                onChange={(e) =>
                                                    handleFamilyMemberChange(
                                                        index,
                                                        e
                                                    )
                                                }
                                            />
                                        </div>

                                        <div className="flex-1">
                                            <InputLabelComponent
                                                htmlFor={`remarks-${index}`}
                                                labelText="Remarks"
                                            />
                                            <InputTextComponent
                                                id={`remarks-${index}`}
                                                name="remarks"
                                                type="text"
                                                required
                                                value={member.remarks}
                                                placeholder="Remarks"
                                                onChange={(e) =>
                                                    handleFamilyMemberChange(
                                                        index,
                                                        e
                                                    )
                                                }
                                            />
                                        </div>
                                    </div>

                                    <div className="flex gap-4 mt-4">
                                        <Button
                                            type="button"
                                            variant="danger"
                                            size="sm"
                                            onClick={() =>
                                                removeFamilyMember(index)
                                            }
                                        >
                                            Remove Member
                                        </Button>
                                    </div>
                                </div>
                            ))}

                            <div className="flex flex-col md:flex-row justify-end gap-3 mt-4">
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
                                    Cancel
                                </Button>
                            </div>
                        </form>
                    </div>
                </Modal>
            </div>
        </div>
    );
}
