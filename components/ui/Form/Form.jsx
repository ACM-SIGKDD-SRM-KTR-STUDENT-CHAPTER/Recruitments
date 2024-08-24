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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const validateForm = () => {
        if (!formData.registration_number.startsWith("RA") || formData.registration_number.length !== 15) {
            toast.error("Registration number must start with 'RA' and be exactly 15 characters long.");
            return false;
        }

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

        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return; 
        }

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
        }
    };

    return (
        <>
            <ToastContainer />
            <SectionWrapper id="student-form" className='flex items-center justify-center min-h-screen bg-gray-900'>
                <LayoutEffect
                    className="duration-1000 delay-300"
                    isInviewState={{
                        trueState: "opacity-1 translate-y-0",
                        falseState: "opacity-0 translate-y-10"
                    }}
                >
                    <div className='w-full max-w-lg p-8 bg-gray-800 rounded-xl shadow-lg'>
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
                                    {[...Array(5)].map((_, index) => (
                                        <option key={index} value={index + 1}>{index + 1}</option>
                                    ))}
                                </select>
                                <select name="semester" className="input" onChange={handleChange} value={formData.semester}>
                                    <option value="">Select Semester</option>
                                    {[...Array(8)].map((_, index) => (
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
                                    <option value="CSE w/s BlockChain Technology">CSE w/s BlockChain Technology</option>
                                    <option value="Other">Other</option>
                                </select>

                                <input type="url" name="resume_link" placeholder="Resume Link [Google Drive with Everyone Access]" className="input col-span-2" onChange={handleChange} value={formData.resume_link} />
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
