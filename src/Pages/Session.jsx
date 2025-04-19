import { useEffect, useState } from "react";
import Headline from "../Components/Headline/Headline";
import useSession from "../hooks/useSession";
import { motion } from "framer-motion";

const Session = () => {
    const [sessions] = useSession();
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000 * 60); 

        return () => clearInterval(timer);
    }, []);

    const getEndTime = (startTime, duration) => {
        const now = new Date();
        const [hourStr, minuteStr] = startTime.replace(/ AM| PM/i, "").split(":");
        let hour = parseInt(hourStr);
        const minute = parseInt(minuteStr);
        const isPM = startTime.toLowerCase().includes("pm");

        if (isPM && hour !== 12) hour += 12;
        if (!isPM && hour === 12) hour = 0;

        const sessionStart = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hour, minute);
        const sessionEnd = new Date(sessionStart.getTime() + duration * 60000);
        return { sessionStart, sessionEnd };
    };
    
   


   

    return (
        <div className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <Headline text={"Support Sessions"} />

        <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12"
            initial="hidden"
            animate="show"
            variants={{
                hidden: { opacity: 0 },
                show: {
                    opacity: 1,
                    transition: { staggerChildren: 0.1 },
                },
            }}
        >
            {sessions.map((session) => {
                const { sessionStart, sessionEnd } = getEndTime(session.scheduledTime, session.durationMinutes);
                const isLive = currentTime >= sessionStart && currentTime <= sessionEnd;

                return (
                    <motion.div
                        key={session?.id}
                        className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-100"
                        variants={{
                            hidden: { opacity: 0, y: 20 },
                            show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
                        }}
                        whileHover={{ y: -5 }}
                    >
                        <div className="p-6">
                            <div className="flex items-start justify-between">
                                <h2 className="text-xl font-bold text-gray-800 mb-3">
                                    {session.title}
                                </h2>
                                <span className={`inline-block text-xs px-2 py-1 rounded-full font-medium ${
                                    isLive ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-500"
                                }`}>
                                    {isLive ? "Live" : "Closed"}
                                </span>
                            </div>

                            <p className="text-gray-600 mb-4">{session?.description}</p>

                            <div className="space-y-3 mt-6">
                                <div className="flex items-center">
                                    <svg className="w-5 h-5 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                    <span className="text-sm text-gray-600">{session?.speaker}</span>
                                </div>

                                <div className="flex items-center">
                                    <svg className="w-5 h-5 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <span className="text-sm text-gray-600">
                                        {session?.scheduledTime} • {session?.durationMinutes} mins
                                    </span>
                                </div>
                            </div>

                            <a
                                href={isLive ? session?.link : "#"}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`mt-6 inline-flex items-center px-4 py-2 rounded-lg w-full justify-center transition-colors duration-300 ${
                                    isLive
                                        ? "bg-indigo-600 text-white hover:bg-indigo-700"
                                        : "bg-gray-300 text-gray-600 cursor-not-allowed pointer-events-none"
                                }`}
                            >
                                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                </svg>
                                {isLive ? "Join Session" : "Session Ended"}
                            </a>
                        </div>
                    </motion.div>
                );
            })}
        </motion.div>
    </div>
    );
};

export default Session;