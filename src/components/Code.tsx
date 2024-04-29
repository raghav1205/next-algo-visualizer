"use client"
import { useState } from 'react'
import CodeDisplay, { CodeDisplayProps } from './CodeDisplay'


const Code = ({ code }: CodeDisplayProps) => {
   
    const [showCode, setShowCode] = useState(false)
    const toggleExplanation = () => {
        setShowCode(!showCode)
    }
    return (
        <div className=' '>
            <div className="text-xl text-white text-left w-full ">
                <div className="flex items-center space-x-2 cursor-pointer" onClick={toggleExplanation}>
                    <h3 className="text-lg font-semibold">Code</h3>
                    <button onClick={toggleExplanation} className="">
                        <span className={`inline-block ${showCode ? 'spin-once rotate-180' : 'spin-once-reverse'}`}>
                            ▼
                        </span>
                    </button>
                </div>
                <div className={`transition-[max-height] duration-[800ms] ease-in-out overflow-hidden  ${showCode ? 'max-h-fit' : 'max-h-0'}`}>
                    <p className="text-lg mt-4 rounded-md bg-[#0F172A] md:p-1">
                        <CodeDisplay code={code} />
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Code
