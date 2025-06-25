import AddTodos from "@/components/addTodo";
import Navbar from "@/components/navbar";
import TodoList from "@/components/todoList";
import { getCompletedTodosToday, getTodos } from "@/lib/todos";

export default async function Todos() {
  const { todos } = await getTodos();
  const {completedTodos} = await getCompletedTodosToday();
  return (
    <section>
      <Navbar />
      <div className="px-20">
        <AddTodos />
        <TodoList todos={todos ?? []} completedTodos={completedTodos ?? []} />
      </div>
    </section>
  );
}
