import { useState } from "react";
import LayoutEffect from "@/components/LayoutEffect";
import SectionWrapper from "@/components/SectionWrapper";

const faqsList = [
    {
        q: "What are the eligibility criteria?",
        a: "Any student currently enrolled at SRM Institute of Science and Technology with an interest in Data Science, Machine Learning, Deep Learning, or NLP is eligible to apply.",
    },
    {
        q: "Can I still join if I am a fresher with no prior experience?",
        a: "Absolutely! Freshers with a passion for learning and a curiosity about data-driven technologies are encouraged to join. No prior experience is required.",
    },
    {
        q: "Do I need prior experience in data science or machine learning to apply?",
        a: "No, prior experience in data science or machine learning is not necessary. The chapter is open to all levels, and you'll have opportunities to learn and grow.",
    },
    {
        q: "Is there a membership fee to join our club?",
        a: "There are no membership fees to join the club; however, acquiring ACM and SIGKDD memberships, which offer significant benefits, is highly recommended.",
    },
    {
        q: "How to become a member of the student chapter?",
        a: "Timely recruitments for the student chapter is conducted every semester that consists of test and interview rounds. Evaluation of the candidate after both rounds ensures selection in the student chapter.",
    },
    {
        q: "Does the club offer resources or mentorship for learning new technologies?",
        a: "Yes, we provide resources and mentorship to our members, fostering an environment where they can readily access support and guidance, empowering them to enhance their skills and remain abreast of the latest advancements in the field.",
    },
];

const FAQs = () => {
    const [openIndex, setOpenIndex] = useState(null);

    const toggleFAQ = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <SectionWrapper id="faqs">
            <div className="custom-screen text-gray-300">
                <div className="max-w-xl text-center xl:mx-auto">
                    <h2 className="text-gray-50 text-3xl font-extrabold sm:text-4xl">
                        Frequently Asked Questions
                    </h2>
                    <p className="mt-3">
                        Here are the most questions people always ask about.
                    </p>
                </div>
                <div className="mt-12">
                    <LayoutEffect
                        className="duration-1000 delay-300"
                        isInviewState={{
                            trueState: "opacity-1",
                            falseState: "opacity-0 translate-y-12"
                        }}
                    >
                        <ul className="space-y-8 gap-12 grid-cols-2 sm:grid sm:space-y-0 lg:grid-cols-3">
                            {faqsList.map((item, idx) => (
                                <li
                                    key={idx}
                                    className="space-y-3"
                                >
                                    <summary
                                        onClick={() => toggleFAQ(idx)}
                                        className="flex items-center justify-between font-semibold text-gray-100 cursor-pointer"
                                    >
                                        {item.q}
                                        <svg
                                            className={`w-5 h-5 transform transition-transform ${openIndex === idx ? "rotate-180" : ""
                                                }`}
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </summary>
                                    <p
                                        dangerouslySetInnerHTML={{ __html: item.a }}
                                        className={`leading-relaxed text-gray-300 transition-opacity duration-500 ${openIndex === idx ? "opacity-100 max-h-full" : "opacity-0 max-h-0"
                                            } overflow-hidden`}
                                    >
                                    </p>
                                </li>
                            ))}
                        </ul>
                    </LayoutEffect>
                </div>
            </div>
        </SectionWrapper>
    );
};

export default FAQs;
