import { useState } from 'react';
import CTA from "@/components/ui/CTA";
import FAQs from "@/components/ui/FAQs";
import Form from "@/components/ui/Form";

export default function Home() {
    const [showForm, setShowForm] = useState(false); // State to manage form visibility

    const handleStartNowClick = () => {
        setShowForm(true); // Show the form when the button is clicked
    };

    return (
        <>
            <CTA onStartNowClick={handleStartNowClick} />
            {showForm && <Form />} {/* Conditionally render the form */}
            <FAQs />
        </>
    );
}
