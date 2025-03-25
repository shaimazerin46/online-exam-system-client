import InfiniteScroll from "react-infinite-scroll-component";
import Headline from "../Components/Headline/Headline";
import ExamsCard from "../Components/SharedComponents/ExamsCard";
import useExam from "../hooks/useExam";
import { useState, useEffect, useCallback } from "react";

const AllExams = () => {
    const [displayedExams, setDisplayedExams] = useState([]);
    const [hasMore, setHasMore] = useState(true);
    const [currentIndex, setCurrentIndex] = useState(0);
    const batchSize = 10; // Number of exams to show per batch
    
    // Get all exams from your existing hook
    const [allExams] = useExam();
    
    // Load the next batch of exams
    const loadMoreExams = useCallback(() => {
        if (currentIndex >= allExams.length) {
            setHasMore(false);
            return;
        }
        
        const nextBatch = allExams.slice(currentIndex, currentIndex + batchSize);
        setDisplayedExams(prev => [...prev, ...nextBatch]);
        setCurrentIndex(prev => prev + batchSize);
        
        // Check if we've reached the end
        if (currentIndex + batchSize >= allExams.length) {
            setHasMore(false);
        }
    }, [allExams, currentIndex]);
    
    // Initial load
    useEffect(() => {
        if (allExams.length > 0) {
            loadMoreExams();
        }
    }, [allExams, loadMoreExams]);

    return (
        <div className="py-20">
            <div>
                <Headline text={"All exams"} />
            </div>
            
            <InfiniteScroll
                dataLength={displayedExams.length}
                next={loadMoreExams}
                hasMore={hasMore}
                loader={
                    <div className="text-center py-4">
                        Loading more exams...
                    </div>
                }
                endMessage={
                    <p className="text-center py-4">
                        You've seen all available exams!
                    </p>
                }
                scrollThreshold="100px"
            >
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5">
                    {displayedExams.map((exam) => (
                        <ExamsCard key={exam._id} exam={exam} />
                    ))}
                </div>
            </InfiniteScroll>
        </div>
    );
};

export default AllExams;