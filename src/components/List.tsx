import Link from 'next/link';
import React from 'react'

export interface Question {
    title: string;
    id: string;
}

const List = ({ questionsList }: { questionsList: Question[] }) => {
    console.log(questionsList)
    return (
        <div>
            {
                questionsList?.map((question, i) => (
                    <div key={i} className=' text-xl p-5'>
                        <Link href={`/question/${question.id}`} >
                            {question?.title}
                        </Link>
                    </div>
                ))
            }

        </div>
    )
}

export default List
