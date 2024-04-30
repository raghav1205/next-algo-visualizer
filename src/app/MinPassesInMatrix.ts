import React from "react";

type Matrix = number[][];

let r: number[] = [-1, 1, 0, 0];
let c: number[] = [0, 0, 1, -1];
let time = 250
function minimumPassesOfMatrix(matrix: Matrix, setMatrix: React.Dispatch<React.SetStateAction<Matrix>>, queue: [number, number][], setQueue: React.Dispatch<React.SetStateAction<[number, number][]>>, passes: number, setPasses: React.Dispatch<React.SetStateAction<number>>, setCurrentElement: React.Dispatch<React.SetStateAction<[number,number]>>, setIsRunning: React.Dispatch<React.SetStateAction<boolean>>, initialMatrix: number[][] ): Promise<number> {
    return minimumPassesHelper(matrix, setMatrix, queue, setQueue, passes, setPasses, setCurrentElement, setIsRunning, initialMatrix);
}
async function minimumPassesHelper(matrix: Matrix, setMatrix: React.Dispatch<React.SetStateAction<Matrix>>, queue: [number, number][], setQueue: React.Dispatch<React.SetStateAction<[number, number][]>>, passes: number, setPasses: React.Dispatch<React.SetStateAction<number>>, setCurrentElement: React.Dispatch<React.SetStateAction<[number,number]>>, setIsRunning: React.Dispatch<React.SetStateAction<boolean>>, initialMatrix: number[][]): Promise<number> {
    for (let row = 0; row < matrix.length; row++) {
        for (let col = 0; col < matrix[row].length; col++) {
            await new Promise(resolve => setTimeout(resolve, time));

            const value: number = matrix[row][col];
            if (value > 0) {
                queue.push([row, col]);
                setQueue([...queue]);
            }
        }
    }

    queue.push([-1, -1]);
    setQueue([...queue]);
    
    while (queue.length > 0) {
        await new Promise(resolve => setTimeout(resolve, time));

        const [row, col] = queue.shift()!;
        setQueue([...queue]);
        if (row === -1) {
            if (queue.length > 0) {
                passes++;
                setPasses((prev) => prev + 1);
                queue.push([-1, -1]);
                setQueue([...queue]);
            }
        } else {
            const element: number = matrix[row][col];
            setCurrentElement([row, col])
            if (element > 0) {
                for (let k = 0; k < 4; k++) {
                    await new Promise(resolve => setTimeout(resolve, time));

                    const newRow: number = r[k] + row;
                    const newCol: number = c[k] + col;
                    if (newRow >= 0 && newRow < matrix.length && newCol >= 0 && newCol < matrix[0].length) {
                        if (matrix[newRow][newCol] < 0) {
                            matrix[newRow][newCol] = -1 * matrix[newRow][newCol];
                            setMatrix([...matrix]);
                            queue.push([newRow, newCol]);
                            setQueue([...queue]);
                        }
                    }
                }
            }
        }
    }
    setCurrentElement([-1, -1])
    setIsRunning(false)
    setMatrix(() =>{
        return initialMatrix.map(row => [...row]);
    
    })
    setQueue([])
    if (containsNegative(matrix)) {
        return -1;
    }
    return passes;
}

function containsNegative(matrix: Matrix): boolean {
    for (let row = 0; row < matrix.length; row++) {
        for (let col = 0; col < matrix[row].length; col++) {
            const value: number = matrix[row][col];
            if (value < 0) {
                return true;
            }
        }
    }
    return false;
}

export { minimumPassesOfMatrix };
