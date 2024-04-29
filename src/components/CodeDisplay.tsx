"use client"
import { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { materialDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

export interface CodeDisplayProps {
    code: { [key: string]: string[] }
}

const CodeDisplay = ({ code }: CodeDisplayProps) => {
    const [currentSelectedLanguage, setCurrentSelectedLanguage] = useState<string>(() => {
        return Object.keys(code)[0];
    });
    const [currentCode, setCurrentCode] = useState<string>(() => {
        return code[currentSelectedLanguage][0]
    });
    return (
        <div className="p-4  rounded-lg overflow-auto">
            <div className='flex justify-between'>
                <SolutionSelector code={code[currentSelectedLanguage]} currentCode={currentCode} setCurrentCode={setCurrentCode} />
                <select
                    name="language"
                    id="language"
                    className="bg-[#0F172A] text-white rounded-md p-2"
                    onChange={(e) => {
                        const selectedLanguage = e.target.value;
                        console.log(selectedLanguage, "ASDF");
                        setCurrentSelectedLanguage(selectedLanguage);
                        setCurrentCode(code[selectedLanguage][0]);
                    }}
                >
                    {Object.keys(code).map((c, i) => (
                        <option key={i} value={c}>
                            {c}
                        </option>
                    ))}
                </select>
            </div>
            <SyntaxHighlighter language={currentSelectedLanguage} style={materialDark} className="rounded-sm">
                {currentCode}
            </SyntaxHighlighter>
        </div>
    );
};

const SolutionSelector = ({ code, currentCode, setCurrentCode }: { code: string[], currentCode: string, setCurrentCode: (code: string) => void }) => {
    // console.log(code)
    return (
        <div className="flex items-center justify-between">

            <div className={`bg-black rounded-sm `}>
                {code.map((c, i) => (
                    <button key={i} onClick={() => setCurrentCode(c)} className={`bg-[#0F172A] text-white p-2 rounded-md ${currentCode === c ? 'bg-blue-500' : ""} `}>Solution {i + 1}</button>
                ))}
            </div>
        </div>
    )
}

export default CodeDisplay;
