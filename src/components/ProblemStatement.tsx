"use client";
import { useState } from "react"

const ProblemStatement = ({ name, statement }: { name: string, statement: string }) => {
    const [showStatement, setShowStatement] = useState(true)
    const toggleExplanation = () => {
        setShowStatement(!showStatement);
    };
    return (
        <div className="text-xl text-white text-left w-full h-fit ">

            <div className="flex items-center space-x-2 cursor-pointer h-fit overflow-auto" onClick={toggleExplanation}>
                <div> Q. {name}</div>
                <button onClick={toggleExplanation} className="">
                    <span className={`inline-block ${showStatement ? 'spin-once rotate-180' : 'spin-once-reverse'}`}>
                        ▼
                    </span>
                </button>
            </div>
            <div className={`transition-[max-height] duration-[800ms] ease-in-out overflow-hidden ${showStatement ? 'max-h-fit' : 'max-h-0'}`}>
                <p className="text-lg mt-4 bg-[#0F172A] rounded-md p-4">
                    {statement}
                </p>
            </div>

        </div>
    )
}

export default ProblemStatement
