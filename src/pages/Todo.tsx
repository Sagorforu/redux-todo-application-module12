import TodoContainer from "@/components/todo/TodoContainer";
import Container from "@/components/ui/Container";

const Todo = () => {
  return (
    <Container>
      <h2 className="text-center text-3xl font-semibold my-10">My todo</h2>
      <TodoContainer></TodoContainer>
    </Container>
  );
};

export default Todo;
