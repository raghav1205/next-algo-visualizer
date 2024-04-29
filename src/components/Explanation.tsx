"use client"
import { useState } from "react"

const Explanation = ({ explanationText }: { explanationText: string }) => {
    const [showExplanation, setShowExplanation] = useState(false);
    const toggleExplanation = () => {
        setShowExplanation(!showExplanation);
    };

    return (
        <div className="text-xl text-white text-left w-full">
            <div className="flex items-center space-x-2 cursor-pointer" onClick={toggleExplanation}>
                <h3 className="text-lg font-semibold">Explanation</h3>
                <button onClick={toggleExplanation} className="">
                    <span className={`inline-block ${showExplanation ? 'spin-once rotate-180' : 'spin-once-reverse'}`}>
                        ▼
                    </span>
                </button>
            </div>
            <div className={`transition-[max-height] duration-[800ms] ease-in-out overflow-hidden ${showExplanation ? 'max-h-96' : 'max-h-0'}`}>
                <p className="text-lg mt-4 bg-[#0F172A] p-4 rounded-md">
                    {explanationText}
                </p>
            </div>
        </div>
    );
}

export default Explanation
