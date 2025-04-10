import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import {
    selectDemographic,
    selectError,
    selectLoading,
} from "../../_redux/demographic-data-slice";
import store from "@/app/store/store";
import { update_demographic_data_thunk, update_demographic_status_data_thunk } from "../../_redux/demographic-data-thunk";
import { router } from "@inertiajs/react";
import InputLabelComponent from "@/app/pages/components/input-label-component";
import InputTextComponent from "@/app/pages/components/input-text-component";
import SelectComponent from "@/app/pages/components/input-select";
import Button from "@/app/pages/components/button";
import EditMap from "../../../maps/edit-map";
import Swal from "sweetalert2";
import { CheckBadgeIcon, CheckCircleIcon, CheckIcon, HandThumbDownIcon, HandThumbUpIcon, TrashIcon } from "@heroicons/react/24/outline";

export default function DemographicDetailSection() {
    const demographic = useSelector(selectDemographic);
    const loading = useSelector(selectLoading);
    const error = useSelector(selectError);
    const [form, setForm] = useState({ family_members: [] });

    const formRef = useRef(null); // ✅ Keeps reference to the form

    useEffect(() => {
        if (demographic) {
            setForm((prev) => ({
                ...prev,
                ...demographic, // ✅ Prevents direct mutation
            }));
        }
    }, [demographic]); // ✅ Fix dependency

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;
    if (!demographic || Object.keys(demographic).length === 0)
        return <p>No data available.</p>;

    async function handleSubmit(e) {
        e.preventDefault();
        await store.dispatch(update_demographic_data_thunk(form));
        // router.visit("/admin/demographic_data");
        Swal.fire({
            icon: "success",
            title: "Your work has been saved",
            showConfirmButton: false,
            timer: 1500,
        });
    }

    const updateStatus = async (id, newStatus) => {
        try {
            await axios.patch(`/admin/demographic_data/${id}/status`, { status: newStatus });

            Swal.fire({
                icon: "success",
                title: `Status updated to ${newStatus}`,
                showConfirmButton: false,
                timer: 1500,
            });

            // Optionally refresh your data
            // fetchData(); or window.location.reload();
        } catch (error) {
            console.error("Status update failed", error);
            Swal.fire({
                icon: "error",
                title: "Failed to update status",
            });
        }
    };

    const handlePrint = () => {
        if (!formRef.current) {
            console.error("Form content not found.");
            return;
        }

        const printWindow = window.open("", "", "height=600,width=800");

        printWindow.document.write(`
          <html>
            <head>
              <title>Form Report</title>
              <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
              <style>
                @media print { .hidden-print { display: none; } }
              </style>
            </head>
            <body class="p-5">
              <div class="mx-auto bg-white shadow-lg p-6 rounded-lg">
                <h2 class="text-2xl font-semibold text-center mb-4">Location of the Affected Family</h2>
                ${formRef.current.outerHTML}
              </div>
            </body>
          </html>
        `);

        printWindow.document.close();
        setTimeout(() => printWindow.print(), 500);
    };

    const typeOptionsG = [
        { value: "Male", label: "Male" },
        { value: "Female", label: "Female" },
    ];

    const typeOptionsC = [
        { value: "Single", label: "Single" },
        { value: "Merried", label: "Merried" },
        { value: "Widowed", label: "Widowed" },
        { value: "Seperated", label: "Seperated" },
    ];

    return (
        <div
            className="mt-6 p-5 rounded-md shadow-2xl border-gray-100 bg-white"
            id="printable-form"
            ref={formRef}
        >
            <div className="flex justify-between">
                <h1 className="mb-5 font-bold text-3xl">
                    Demographic Data of : {demographic.head_last_name || "N/A"}{" "}
                    {demographic.head_first_name || "N/A"}
                </h1>
                <div className="flex gap-4">
                    {/* Print Button */}
                    <button
                        onClick={handlePrint}
                        className=" px-4 bg-blue-500 text-white rounded hover:bg-blue-700"
                    >
                        Print Form
                    </button>
                    {demographic?.status === "pending" && (
                        <>
                            <button
                                onClick={() => updateStatus(demographic.id, 'approved')}
                                className="px-4 bg-green-600 text-white rounded hover:bg-blue-700"
                            >
                                <HandThumbUpIcon className="h-6" />
                            </button>

                            <button
                                onClick={() => updateStatus(demographic.id, 'disapproved')}
                                className="px-4 bg-red-600 text-white rounded hover:bg-blue-700"
                            >
                                <HandThumbDownIcon className="h-6" />
                            </button>
                        </>
                    )}

                    {demographic?.status === "approved" && (
                        <>
                            <button
                                onClick={() => updateStatus(demographic.id, 'released')}
                                className="px-4 bg-green-600 text-white rounded hover:bg-blue-700"
                            >
                                <CheckIcon className="h-6" /> Release
                            </button>
                        </>
                    )}
                </div>

            </div>
            <hr />

            <div className="">
                <form onSubmit={handleSubmit}>
                    <h3 className="text-xl font-semibold mb-4">
                        Location of the affected family
                    </h3>
                    <div className="flex flex-wrap gap-6">
                        {/* Left Column */}
                        <div className="w-full md:flex-1">
                            <div className="mb-4">
                                <InputLabelComponent
                                    htmlFor="region"
                                    labelText="Region"
                                />
                                <InputTextComponent
                                    id="region"
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            [e.target.name]: e.target.value,
                                        })
                                    }
                                    name="region"
                                    type="text"
                                    required
                                    value={form?.region}
                                    placeholder="Region"
                                    readOnly
                                />
                            </div>

                            <div className="mb-4">
                                <InputLabelComponent
                                    htmlFor="province"
                                    labelText="Province"
                                />
                                <InputTextComponent
                                    id="province"
                                    name="province"
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            [e.target.name]: e.target.value,
                                        })
                                    }
                                    type="text"
                                    required
                                    value={form.province ?? ""}
                                    placeholder="Province"
                                    readOnly
                                />
                            </div>

                            <div className="mb-4">
                                <InputLabelComponent
                                    htmlFor="district"
                                    labelText="District"
                                />
                                <InputTextComponent
                                    id="district"
                                    name="district"
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            [e.target.name]: e.target.value,
                                        })
                                    }
                                    type="text"
                                    required
                                    value={form.district ?? ""}
                                    placeholder="District"
                                    readOnly
                                />
                            </div>
                        </div>
                        {/* Right Column */}
                        <div className="w-full md:flex-1">
                            <div className="mb-4">
                                <InputLabelComponent
                                    htmlFor="city"
                                    labelText="City/Municipality"
                                />
                                <InputTextComponent
                                    id="city"
                                    name="city"
                                    type="text"
                                    required
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            [e.target.name]: e.target.value,
                                        })
                                    }
                                    value={form.city ?? ""}
                                    placeholder="City/Municipality"
                                    readOnly
                                />
                            </div>

                            <div className="mb-4">
                                <InputLabelComponent
                                    htmlFor="barangay"
                                    labelText="Barangay"
                                />
                                <InputTextComponent
                                    id="barangay"
                                    name="barangay"
                                    type="text"
                                    required
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            [e.target.name]: e.target.value,
                                        })
                                    }
                                    value={form.barangay ?? ""}
                                    placeholder="Barangay"
                                />
                            </div>

                            <div className="mb-4">
                                <InputLabelComponent
                                    htmlFor="evacuation_site"
                                    labelText="Evacuation Site"
                                />
                                <InputTextComponent
                                    id="evacuation_site"
                                    name="evacuation_site"
                                    type="text"
                                    required
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            [e.target.name]: e.target.value,
                                        })
                                    }
                                    value={form.evacuation_site ?? ""}
                                    placeholder="Evacuation Site"
                                />
                            </div>
                        </div>
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
                                    value={form.head_last_name ?? ""}
                                    placeholder="Last Name"
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            [e.target.name]: e.target.value,
                                        })
                                    }
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
                                    value={form.head_first_name ?? ""}
                                    placeholder="First Name"
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            [e.target.name]: e.target.value,
                                        })
                                    }
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
                                    value={form.head_middle_name ?? ""}
                                    placeholder="Middle Name"
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            [e.target.name]: e.target.value,
                                        })
                                    }
                                />
                            </div>

                            <div className="mb-4">
                                <InputLabelComponent
                                    htmlFor="extension_name"
                                    labelText="Extension (Jr., Sr. etc.)"
                                />
                                <InputTextComponent
                                    id="extension_name"
                                    name="extension_name"
                                    type="text"
                                    required={false}
                                    value={form.extension_name ?? ""}
                                    placeholder="Jr., Sr. etc."
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            [e.target.name]: e.target.value,
                                        })
                                    }
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
                                    value={form.age ?? ""}
                                    placeholder="Age"
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            [e.target.name]: e.target.value,
                                        })
                                    }
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
                                    value={form.gender ?? ""}
                                    options={typeOptionsG}
                                    required
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            [e.target.name]: e.target.value,
                                        })
                                    }
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
                                    value={form.birthday ?? ""}
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            [e.target.name]: e.target.value,
                                        })
                                    }
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
                                    value={form.birth_place ?? ""}
                                    placeholder="Birth Place"
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            [e.target.name]: e.target.value,
                                        })
                                    }
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
                                    value={form.civil_status ?? ""}
                                    options={typeOptionsC}
                                    required
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            [e.target.name]: e.target.value,
                                        })
                                    }
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
                                    value={form.mother_maiden_name ?? ""}
                                    placeholder="Mother's Maiden Name"
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            [e.target.name]: e.target.value,
                                        })
                                    }
                                />
                            </div>

                            <div className="mb-4">
                                <InputLabelComponent
                                    htmlFor="religion"
                                    labelText="Religion"
                                />
                                <InputTextComponent
                                    id="religion"
                                    name="religion"
                                    type="text"
                                    required
                                    value={form.religion ?? ""}
                                    placeholder="Religion"
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            [e.target.name]: e.target.value,
                                        })
                                    }
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
                                    value={form.occupation ?? ""}
                                    placeholder="Occupation"
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            [e.target.name]: e.target.value,
                                        })
                                    }
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
                                    value={form.income ?? ""}
                                    placeholder="Monthly Family NET Income"
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            [e.target.name]: e.target.value,
                                        })
                                    }
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
                                    value={form.id_card_presented ?? ""}
                                    placeholder="ID Card Presented"
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            [e.target.name]: e.target.value,
                                        })
                                    }
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
                                    value={form.id_card_number ?? ""}
                                    placeholder="ID Card Number"
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            [e.target.name]: e.target.value,
                                        })
                                    }
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
                                    value={form.contact_number ?? ""}
                                    placeholder="Contact Number"
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            [e.target.name]: e.target.value,
                                        })
                                    }
                                />
                            </div>

                            <div className="mb-4">
                                <InputTextComponent
                                    id="role_id"
                                    name="role_id"
                                    type="hidden"
                                    required
                                    value={form.role_id ?? ""}
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            [e.target.name]: e.target.value,
                                        })
                                    }
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
                            value={form.permanent_address ?? ""}
                            placeholder="Permanent Address"
                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    [e.target.name]: e.target.value,
                                })
                            }
                        />
                    </div>

                    <div className=" px-4 py-6 sm:col-span-2 sm:px-0">
                        <hr className="mb-4" />
                        <dt className="text-xl font-medium leading-6 text-black ">
                            Family Members
                        </dt>

                        <div className="flex justify-between gap-20 w-1/4 text-lg text-lime-900"></div>
                        <div className="flex flex-wrap gap-4 border rounded-md mt-2 p-3">
                            {form?.family_members?.map((member, index) => (
                                <div key={index} className="">
                                    <div className="flex flex-wrap gap-4">
                                        <div className="flex-1">
                                            <InputLabelComponent
                                                htmlFor={`full_name-${index}`}
                                                labelText="Full Name"
                                            />
                                            <InputTextComponent
                                                id={`full_name-${index}`}
                                                name="full_name"
                                                type="text"
                                                required
                                                value={member.full_name}
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
                                                htmlFor={`age-${index}`}
                                                labelText="Age"
                                            />
                                            <InputTextComponent
                                                id={`age-${index}`}
                                                name="age"
                                                type="number"
                                                required
                                                value={member.age}
                                                placeholder="Age"
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
                                                htmlFor={`gender-${index}`}
                                                labelText="Sex"
                                            />
                                            <InputTextComponent
                                                id={`gender-${index}`}
                                                name="gender"
                                                type="text"
                                                required
                                                value={member.gender}
                                                placeholder="Sex"
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
                                                htmlFor={`age-${index}`}
                                                labelText="Highest Education"
                                            />
                                            <InputTextComponent
                                                id={`highest_education-${index}`}
                                                name="highest_education"
                                                type="text"
                                                required
                                                value={member.highest_education}
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
                                </div>
                            ))}
                            <EditMap setForm={setForm} form={form} />
                        </div>
                    </div>
                    <Button type="submit" variant="primary" size="md">
                        Save Changes
                    </Button>
                </form>
            </div>
        </div>
    );
}
