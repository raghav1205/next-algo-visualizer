import ProblemStatement from "@/components/ProblemStatement"
import prisma from "@/db"
import MinPassesInMatrix from "@/components/MinPassesInMatrix"
import Code from "@/components/Code"
import Explanation from "@/components/Explanation"

interface TransformedData {
    title: string | null;
    description: string;
    explanation?: string;
    componentName: string;
    solutions: { [key: string]: string[] }
}

const getQuestionData = async (questionId: string) => {
    console.log(questionId)
    const data = await prisma.problem.findUnique({
        where: {
            id: questionId
        },
        select: {
            title: true,
            description: true,
            explanation: true,
            componentName: true,
            solutions: {
                select: {
                    language: true,
                    code: true
                }
            }
        }
    })
    const tranformedData: TransformedData = { 
        ...data,
        title: data?.title ?? null,
        description: data?.description ?? '',
        componentName: data?.componentName ?? '',
        solutions: {} 
    };
    if (data) {
        tranformedData.solutions = transformSolutions(data.solutions);
    }
    // console.log(tranformedData)
    return tranformedData;
}

function transformSolutions(solutions: { language: string; code: string }[]) {
    const transformed: { [key: string]: string[] } = {};
    solutions.forEach(solution => {
        if (!transformed[solution.language]) {
            transformed[solution.language] = [];
        }
        transformed[solution.language].push(`${solution.code}`);
    });
    // console.log(transformed)
    return transformed;
}





export default async function ({ params }: { params: { questionId: string } }) {

    const data = await getQuestionData(params.questionId)
    const componentNames: { [key: string]: () => JSX.Element } = {
        'MinPassesInMatrix': MinPassesInMatrix
    }
    const getComponent = (type: string) => {
        const Component = componentNames[type]
        return <Component />
    }

    return (
        <div className="overflow-auto">
            <div className='text-center p-10 h-fit '>
                <ProblemStatement name={data?.title ?? ''} statement={data?.description ?? ''} />
            </div>
            <div>
                {getComponent(data?.componentName ?? '')}
            </div>

            <div className='text-center p-10 flex flex-col gap-3'>
                <Explanation explanationText={data?.explanation ?? ''} />
                {/* {data.solutions && <Code solutions={data?.solutions} />} */}

            </div>
        </div>
    )
}


