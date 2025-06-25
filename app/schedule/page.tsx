import Navbar from "@/components/navbar";
import ScheduleAddTodo from "@/components/scheduleAddTodo";
import ScheduleTodos from "@/components/scheduleTodos";
import { getFutureTodos, getPastTodos } from "@/lib/todos";

export default async function SchedulePage() {
  const future = await getFutureTodos();
  const past = await getPastTodos();

  const futureTodo = future.todos ?? [];
  const pastTodo = past.todos ?? [];


  return (
    <section className="bg-[#f7f9fa] h-screen">
      <Navbar />
      <div className="sm:px-5 lg:px-45 py-5">
        <div className="flex justify-between items-center mx-4 my-5">
          <div className="flex flex-col gap-2">
            <h2 className="text-4xl font-bold">Scheduled To-Dos</h2>
            <h3 className="text-gray-700 text-lg">Plan ahead and track your progress</h3>
          </div>
          <ScheduleAddTodo />
        </div>

        <ScheduleTodos futureTodo={futureTodo} pastTodo={pastTodo} />
      </div>
    </section>
  );
}
