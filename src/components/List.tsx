import Link from 'next/link';
import React from 'react'

export interface Question {
    title: string;
    id: string;
}

const List = ({ questionsList }: { questionsList: Question[] }) => {
    console.log(questionsList)
    return (
        <div className='p-5 text-lg'>
            {/* <h2>Problems</h2> */}
            {
                questionsList?.map((question, i) => (
                    <div key={question.id}>
                    <span className='text-xl'>{i+1}.</span>
                        <div key={i} className='inline-flex text-xl p-5 pl-3'>
                            <Link href={`/question/${question.id}`} >
                                {question?.title}
                            </Link>
                        </div>
                    </div>
                ))
            }

        </div>
    )
}

export default List
