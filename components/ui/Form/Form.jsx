import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LayoutEffect from "@/components/LayoutEffect";
import SectionWrapper from "@/components/SectionWrapper";
import Button from "../Button";
import axios from "axios";

const StudentForm = () => {
    const [formData, setFormData] = useState({
        name: "",
        registration_number: "",
        section: "",
        department: "",
        year: "",
        semester: "",
        phone_number: "",
        srm_email: "",
        personal_email: "",
        resume_link: "",
        gender: "",
        domain: "",
        branch: "",
    });

    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        // Convert the value of the section field to uppercase
        const formattedValue = name === "section" ? value.toUpperCase() : value;
        setFormData({ ...formData, [name]: formattedValue });
    };

    const validateForm = () => {
        const srmEmailPrefix = formData.srm_email.split("@")[0];
        if (!formData.srm_email.endsWith("@srmist.edu.in") || srmEmailPrefix.length !== 6) {
            toast.error("SRM email must have 6 characters before '@srmist.edu.in'.");
            return false;
        }

        if (formData.phone_number.length !== 10) {
            toast.error("Phone number must be exactly 10 digits long.");
            return false;
        }

        if (!formData.name) {
            toast.error("Name is required.");
            return false;
        }

        if (!formData.personal_email) {
            toast.error("Personal email is required.");
            return false;
        }

        if (!formData.branch) {
            toast.error("Branch is required.");
            return false;
        }

        if (!formData.domain) {
            toast.error("Domain is required.");
            return false;
        }

        if (!formData.gender) {
            toast.error("Gender is required.");
            return false;
        }

        if (!formData.year) {
            toast.error("Year is required.");
            return false;
        }

        if (!formData.department) {
            toast.error("Department is required.");
            return false;
        }
        if (
            (formData.domain === "Research & Development" || formData.domain === "Web/App Development") &&
            !formData.resume_link
        ) {
            toast.error("Resume link is required for Research & Development and Web/App Development domains.");
            return false;
        }

        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setIsSubmitting(true); // Show overlay

        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}`, formData);

            console.log("Success:", response.data);
            toast.success("Registration successful!");
            setFormData({
                name: "",
                registration_number: "",
                section: "",
                department: "",
                year: "",
                semester: "",
                phone_number: "",
                srm_email: "",
                personal_email: "",
                resume_link: "",
                gender: "",
                domain: "",
                branch: "",
            });
        } catch (error) {
            console.error("Error:", error);

            if (error.response) {
                const message = error.response.data.message;
                switch (message) {
                    case 'Registration number already exists.':
                        toast.error("This registration number is already registered.");
                        break;
                    case 'SRM email already exists.':
                        toast.error("This SRM email is already registered.");
                        break;
                    case 'Personal email already exists.':
                        toast.error("This personal email is already registered.");
                        break;
                    case 'Phone number already exists.':
                        toast.error("This phone number is already registered.");
                        break;
                    default:
                        toast.error("Registration failed. Please try again.");
                        break;
                }
            } else {
                toast.error("Registration failed. Please try again.");
            }
        } finally {
            setIsSubmitting(false); // Hide overlay
        }
    };

    return (
        <>
            <ToastContainer />
            <SectionWrapper id="student-form" className='card flex items-center justify-center min-h-screen bg-gray-900'>
                <LayoutEffect
                    className="duration-1000 delay-300"
                    isInviewState={{
                        trueState: "opacity-1 translate-y-0",
                        falseState: "opacity-0 translate-y-10"
                    }}
                >
                    <div className='w-full max-w-lg p-8 bg-gray-800 rounded-xl shadow-lg relative'>
                        {isSubmitting && (
                            <div className='absolute inset-0 flex items-center justify-center bg-black bg-opacity-80 z-10 rounded-xl'>
                                <div className='text-white text-xl font-bold'>BAKING YOUR SUBMISSION... 🤩</div>
                            </div>
                        )}
                        <div className='text-center mb-8'>
                            <h2 className='text-gray-50 text-3xl font-semibold'>
                                Student Registration Form
                            </h2>
                        </div>
                        <form className='space-y-4' onSubmit={handleSubmit}>
                            <div className='grid gap-4'>
                                <input type="text" name="name" placeholder="Name" className="input" onChange={handleChange} value={formData.name} required />
                                <input type="text" name="registration_number" placeholder="Registration Number" className="input" onChange={handleChange} value={formData.registration_number} required />
                                <input type="email" name="srm_email" placeholder="SRM Email" className="input" onChange={handleChange} value={formData.srm_email} required />
                                <input type="email" name="personal_email" placeholder="Personal Email" className="input" onChange={handleChange} value={formData.personal_email} required />
                                <input type="tel" name="phone_number" placeholder="Phone Number" className="input" onChange={handleChange} value={formData.phone_number} required />
                                <input type="text" name="section" placeholder="Class Section" className="input" onChange={handleChange} value={formData.section} />
                                
                                <select name="year" className="input" onChange={handleChange} value={formData.year}>
                                    <option value="">Select Year</option>
                                    {[...Array(3)].map((_, index) => (
                                        <option key={index} value={index + 1}>{index + 1}</option>
                                    ))}
                                </select>
                                <select name="semester" className="input" onChange={handleChange} value={formData.semester}>
                                    <option value="">Select Semester</option>
                                    {[...Array(6)].map((_, index) => (
                                        <option key={index} value={index + 1}>{index + 1}</option>
                                    ))}
                                </select>
                                <select name="gender" className="input" onChange={handleChange} value={formData.gender}>
                                    <option value="">Select Gender</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                </select>
                                
                                <select name="domain" className="input" onChange={handleChange} value={formData.domain}>
                                    <option value="">Select Domain</option>
                                    <option value="Research & Development">Research & Development</option>
                                    <option value="Web/App Development">Web/App Development</option>
                                    <option value="Creatives">Creatives</option>
                                    <option value="Corporate">Corporate</option>
                                </select>

                                <select name="department" className="input" onChange={handleChange} value={formData.department}>
                                    <option value="">Select Department</option>
                                    <option value="DSBS">DSBS</option>
                                    <option value="Cintel">Cintel</option>
                                    <option value="C-Tech">C-Tech</option>
                                    <option value="NWC">NWC</option>
                                    <option value="Other">Other</option>
                                </select>

                                <select name="branch" className="input" onChange={handleChange} value={formData.branch}>
                                    <option value="">Select Branch</option>
                                    <option value="CSE Core">CSE Core</option>
                                    <option value="CSE w/s Big Data Analytics">CSE w/s Big Data Analytics</option>
                                    <option value="CSE w/s Data Science">CSE w/s Data Science</option>
                                    <option value="CSE w/s Software">CSE w/s Software Engineering</option>
                                    <option value="CSE w/s Cloud Computing">CSE w/s Cloud Computing</option>
                                    <option value="CSE w/s Cyber Security">CSE w/s Cyber Security</option>
                                    <option value="CSE w/s Gaming Technology">CSE w/s Gaming Technology</option>
                                    <option value="CSE w/s BlockChain Technology">CSE w/s Blockchain Technology</option>
                                    <option value="CSE w/s Artificial Intelligence and Machine Learning">CSE w/s Artificial Intelligence and Machine Learning</option>
                                    <option value="CSE w/s Business Systems">CSE w/s Business Systems</option>
                                    <option value="CSE w/s Cloud Computing">CSE w/s Cloud Computing</option>
                                    <option value="CSE w/s Internet of Things">CSE w/s Internet of Things</option>
                                    <option value="CSE w/s Information Technology">CSE w/s Information Technology</option>
                                     <option value="CSE w/s Computer Networking">CSE w/s Computer Networking</option>
                                    <option value="Other">Other</option>
                                </select>

                                <input type="url" name="resume_link" placeholder="Resume Link [Only for R&D and Web/App Dev]" className="input col-span-2" onChange={handleChange} value={formData.resume_link} />
                            </div>
                            <div className="pt-8">
                                <Button type="submit" className="w-full rounded-xl text-white bg-blue-400 hover:bg-blue-500 active:bg-blue-700 ring-blue-600">
                                    Submit
                                </Button>
                            </div>
                        </form>
                    </div>
                </LayoutEffect>
            </SectionWrapper>
        </>
    );
};

export default StudentForm;
