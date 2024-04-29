import List, { Question } from "../components/List";
import MinPassesInMatrix from "../components/MinPassesInMatrix";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function fetchData() {
  try {
    const data = await prisma.problem.findMany({
      select: {
        title: true,
        id: true,
      }
    })
    return data;
  }
  catch (e) {
    console.log(e);
    return [];
  }
}

export default async function Home() {
  const data: Question[] = await fetchData();
  return (
    <>
      <List questionsList={data} />
    </>
  );
}
