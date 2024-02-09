// import { useAppSelector } from "@/redux/hook";
import { useState } from "react";
import AddTodoModal from "./AddTodoModal";
import TodoCard from "./TodoCard";
import TodoFilter from "./TodoFilter";
import { useGetTodosQuery } from "@/redux/api/Api";

const TodoContainer = () => {
  const [priority, setPriority] = useState("");

  // From local state
  // const { todos } = useAppSelector((state) => state.todos);

  // From server
  const { data: todos, error, isLoading } = useGetTodosQuery(priority);

  if (isLoading) {
    return <p>loading...</p>;
  }
  if (error) {
    return <p>something went wrong</p>;
  }

  return (
    <div>
      <div className="flex justify-between mb-5">
        <AddTodoModal />
        <TodoFilter priority={priority} setPriority={setPriority} />
      </div>
      <div className="bg-primary-gradient w-full rounded-lg p-2 ">
        <div className="bg-white space-y-2 w-full h-full rounded-lg p-5">
          {todos.map((todo) => (
            <TodoCard key={todo._id} {...todo} />
          ))}
        </div>

        {/* <div className="bg-white flex justify-center items-center p-3 rounded-lg text-2xl font-bold">
          <h1>There is no task pending</h1>
        </div> */}
      </div>
    </div>
  );
};

export default TodoContainer;
