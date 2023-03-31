import Link from "next/link";
import Layout from "../components/Layout";
import Task from "../components/Task";
import { getAllTasksData } from "../lib/tasks";
import useSWR from "swr";
import { useEffect } from "react";
import StateContextProvider from "../context/StateContext";
import TaskForm from "../components/TaskForm";

const fetcher = (url) => fetch(url).then((res) => res.json());
const apiUrl = `${process.env.NEXT_PUBLIC_RESTAPI_URL}api/list-task/`;

export async function getStaticProps() {

  const staticfilteredTasks = await getAllTasksData();
  return {
    props: {
      staticfilteredTasks
    },
    revalidate: 3,
  };
}

export default function TaskPage({staticfilteredTasks}) {

  const {data: tasks, mutate} = useSWR(apiUrl, fetcher, {
    fallbackData: staticfilteredTasks,
  });

  const filteredTasks = tasks?.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
  useEffect(() => {
    mutate();
  },[])
  return (
    <StateContextProvider>
  <Layout title="Task page">
    <TaskForm taskCreated={mutate}/>
      <ul>
        {filteredTasks && 
          filteredTasks.map((task) => <Task key={task.id} task={task} taskDeleted={mutate}/>)
        }
      </ul>
    <Link href="/main-page">
      <div className="flex cursor-pointer mt-12">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          className="w-6 h-6 mr-3"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3"
          />
        </svg>
        <span>Back to main page</span>
      </div>
    </Link>
  </Layout>
  </StateContextProvider>
  )
}