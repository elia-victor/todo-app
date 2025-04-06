import { useState } from "react";
import { Plus } from "lucide-react";

import "./App.css";

import TitleText from "./components/TitleText";
import DescriptionText from "./components/DescriptionText";
import TodoCard from "./components/TodoCard";
import Button from "./components/Button";
import TodoFormModal from "./components/TodoFormModal";

import { useTodos, Todo } from "./hooks/useTodos";

function App() {
  const { todos, addTodo, updateTodo, deleteTodo } = useTodos();
  const [showModal, setShowModal] = useState(false);
  const [editData, setEditData] = useState<Todo | null>(null);

  const handleAdd = (todo: Todo) => {
    addTodo(todo.title, todo.description);
  };

  const handleEdit = (updated: Todo) => {
    updateTodo(updated);
  };

  const handleToggleCompleted = (todo: Todo) => {
    const updatedTodo = {
      ...todo,
      completed: !todo.completed,
    };
    updateTodo(updatedTodo);
  };  

  const handleDelete = (id: string) => {
    deleteTodo(id);
  };

  const handleOpenAdd = () => {
    setEditData(null);
    setShowModal(true);
  };

  const handleOpenEdit = (todo: Todo) => {
    setEditData(todo);
    setShowModal(true);
  };

  return (
    <>
      <div className="items-center justify-center">
        <TitleText text="Todo List" size="xl" className="text-black-600" />
        <DescriptionText
          text="This is an example project for todo list"
          size="md"
          className="italic"
        />
      </div>

      <div className="p-4 flex justify-end">
        <Button leftIcon={<Plus size={16} />} onClick={handleOpenAdd}>
          Add New
        </Button>
      </div>

      <div className="space-y-4 p-4">
        {todos.map((todo) => (
          <TodoCard
            key={todo.id}
            title={todo.title}
            description={todo.description}
            completed={todo.completed}
            onEdit={() => handleOpenEdit(todo)}
            onToggle={() => handleToggleCompleted(todo)}
            onDelete={() => handleDelete(todo.id)}
          />
        ))}
      </div>

      <TodoFormModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onSubmit={editData ? handleEdit : handleAdd}
        mode={editData ? "edit" : "add"}
        editData={editData ?? undefined}
      />
    </>
  );
}

export default App;
