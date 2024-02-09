import { SquarePen, Trash2 } from "lucide-react";
import { Button } from "../ui/button";
import { useAppDispatch } from "@/redux/hook";
import { removeTodo } from "@/redux/features/todoSlice";
import { useUpdateTodoMutation } from "@/redux/api/Api";

type TTodoCardProps = {
  _id: string;
  title: string;
  description: string;
  isCompleted?: boolean;
  priority: string;
};

const TodoCard = ({
  title,
  description,
  _id,
  isCompleted,
  priority,
}: TTodoCardProps) => {
  const dispatch = useAppDispatch();

  const [updateTodo, { isLoading }] = useUpdateTodoMutation();
  const toggleState = () => {
    const todoData = {
      title,
      description,
      priority,
      isCompleted: !isCompleted,
    };
    const options = {
      id: _id,
      data: todoData,
    };
    updateTodo(options);

    //! for local State management
    // dispatch(toggleComplete(_id));
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="bg-white flex justify-between p-3 rounded-lg border">
      <input
        onChange={toggleState}
        type="checkbox"
        name="complete"
        id="complete"
        className="mr-3"
        defaultChecked={isCompleted}
      />
      <p className="font-semibold flex-1 mt-2">{title}</p>
      <div className="flex-1 flex  items-center gap-3">
        <div
          className={`
          size-3 rounded-full 
          ${priority === "High" ? "bg-red-500" : null}
          ${priority === "Medium" ? "bg-green-500" : null}
          ${priority === "Low" ? "bg-yellow-500" : null}
          `}
        ></div>
        <p className="mt-2">{priority}</p>
      </div>
      <div className="flex-1  mt-2">
        {isCompleted ? (
          <p className="text-green-500">Done</p>
        ) : (
          <p className="text-red-500">Pending</p>
        )}
      </div>
      <p className="flex-[2]  mt-2">{description}</p>
      <div className="space-x-3">
        <Button className="bg-[#5C53FE]">
          <SquarePen />
        </Button>
        <Button
          onClick={() => dispatch(removeTodo(_id))}
          className="bg-red-500"
        >
          <Trash2 />
        </Button>
      </div>
    </div>
  );
};

export default TodoCard;
