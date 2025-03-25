import { useState } from "react";
import useExam from "../../hooks/useExam";
import Headline from "../Headline/Headline";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import 'react-tabs/style/react-tabs.css';
import ExamsCard from "../SharedComponents/ExamsCard";
import { Link } from "react-router";
import WebButton from "../WebButton/WebButton";


const Features = () => {
    const [exams] = useExam();
    const categories = ['easy', 'medium', 'hard'];
    const [tabIndex, setTabindex] = useState(0);

    return (

        <div>
            <Headline text={"Features exam"}></Headline>

            <div className="max-w-7xl mx-auto">
                <Tabs selectedIndex={tabIndex} onSelect={(index) => setTabindex(index)}>
                <TabList className="flex justify-center mb-6 space-x-4">
    {categories?.map((category, idx) => (
        <Tab 
            key={idx}
            className="py-2 px-4 bg-[#205781]  font-semibold text-white  rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4F959D] focus:text-black"
        >
            {category.charAt(0).toUpperCase() + category.slice(1)}
        </Tab>
    ))}
</TabList>

                    {categories.map((category, idx) => (
                        <TabPanel key={idx}>
                            <div className="grid grid-cols-1 md:grid-cols-3 mb-5 lg:grid-cols-4 gap-5">
                                {exams
                                    .filter((exam) => exam.category === category)
                                    .slice(0, 6)
                                    .map((exam) => (
                                        <ExamsCard key={exam._id} exam={exam} />
                                    ))}
                                {exams.filter((exam) => exam.category === category).length === 0 && (
                                    <p>No exams available for this category.</p>
                                )}
                            </div>
                            <Link className="text-center" to='/allExams'>
                                <WebButton text={"See more"}></WebButton>
                            </Link>
                        </TabPanel>
                    ))}
                </Tabs>
            </div>
        </div>

    );
};

export default Features;
