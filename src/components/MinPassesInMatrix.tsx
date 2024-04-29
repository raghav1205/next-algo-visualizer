"use client"
import { useState } from 'react'
import { minimumPassesOfMatrix } from '../app/MinPassesInMatrix'

function MinPassesInMatrix() {
    const [matrix, setMatrix] = useState<number[][]>([
        [0, -2, -1],
        [-5, 2, 0],
        [-6, -2, 0]
    ])
    const [queue, setQueue] = useState<[number, number][]>([])
    const [passes, setPasses] = useState<number>(0)
    const [currentELement, setCurrentElement] = useState<[number, number]>([-1, -1])

    const handleSolve = (matrix: number[][]) => {
        minimumPassesOfMatrix(matrix, setMatrix, queue, setQueue, passes, setPasses, setCurrentElement)
    }


    return (
        <div className='bg-[#030712]  overflow-auto text-black'>
            

            <div className='flex justify-center items-center  max-w-screen-2xl mx-auto w-full  '>

                <div className='flex flex-col items-center justify-center  w-full'>

                    <div className={`grid grid-cols-3 grid-cols-${matrix[0].length} w-fit bg-[#F9FAFB] `}>
                        {
                            matrix.map((row, i) => (
                                row.map((col, j) => (
                                    <div key={`${i}-${j}`} className={`flex items-center justify-center font-semibold text-2xl w-20 h-20 border-2 border-black 
              ${j > 0 && j < 3 ? 'border-l-0' : ''}
              ${i > 0 && i < 3 ? 'border-t-0' : ''}
              ${queue.some(([r, c]) => r === i && c === j) ? 'bg-red-500' : ''}
              ${currentELement[0] === i && currentELement[1] === j ? 'bg-blue-500' : ''}
              `}>
                                        {col}
                                    </div>
                                ))
                            ))
                        }
                    </div>
                    <div className='grid grid-cols-4 border text-white mt-10 p-2 rounded-md md:w-[25%]  text-lg'>
                        {
                            <div className=' h-full pr-2 font-semibold col-span-1 '>
                                <p>Queue: </p>
                                <p>Passes: </p>
                            </div>

                        }
                        <div className='flex flex-col justify-between col-span-3  h-full   bg-[#0F172A]'>
                            <div className='flex '>
                                {
                                    queue.map(([r, c], i) => (
                                        r === -1 ?
                                            <div className='  flex justify-center items-center w-5 h-5' key={i}>
                                                <p className='text-md text-center bg-black w-full h-full'></p>
                                            </div>
                                            :
                                            <div key={i} className='text-md text-center flex justify-center items-center border-r border-black bg-white text-black font-semibold w-5 h-5'>

                                                {matrix[r][c]}

                                            </div>

                                    ))
                                }
                            </div>
                            {<p className='pl-1'>
                                {queue.length > 0 ? passes : ''}
                            </p>}
                        </div>
                    </div>

                    <div className='flex justify-center mt-2 text-md font-semibold'>
                        <button className='bg-[#F9FAFB] text-black border rounded-md p-2 px-3 disabled:bg-slate-300 ' disabled={queue?.length > 0 } onClick={() => handleSolve(matrix)}>
                            Run Algorithm
                        </button>
                    </div>
                </div>
            </div>


        </div>
    )
}

export default MinPassesInMatrix
