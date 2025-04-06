import React, { useState, useEffect } from "react";
import Button from "./Button";
import { Todo } from "../hooks/useTodos";

interface TodoFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (todo: Todo) => void;
  mode?: "add" | "edit";
  editData?: Todo;
}

const TodoFormModal: React.FC<TodoFormModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  mode = "add",
  editData,
}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState<{ title?: string; description?: string }>({});

  useEffect(() => {
    if (mode === "edit" && editData) {
      setTitle(editData.title);
      setDescription(editData.description);
    } else {
      setTitle("");
      setDescription("");
    }
    setErrors({});
  }, [editData, mode, isOpen]);

  const validate = () => {
    const newErrors: { title?: string; description?: string } = {};
    if (!title.trim()) newErrors.title = "Title is required.";
    if (!description.trim()) newErrors.description = "Description is required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;

    if (mode === "edit" && editData) {
      onSubmit({
        id: editData.id,
        title: title.trim(),
        description: description.trim(),
        completed: editData.completed,
      });
    } else {
      const newTodo: Todo = {
        id: editData?.id || crypto.randomUUID(),
        title: title.trim(),
        description: description.trim(),
        completed: editData?.completed ?? false,
      };

      onSubmit(newTodo);
    }

    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-6 shadow-lg w-full max-w-md space-y-4">
        <h2 className="text-xl font-bold text-gray-800">
          {mode === "edit" ? "Edit Todo" : "Add New Todo"}
        </h2>
        <div className="space-y-2">
          <div>
            <input
              type="text"
              placeholder="Title"
              className={`w-full border rounded-lg px-3 py-2 focus:outline-none ${
                errors.title
                  ? "border-red-500 focus:ring-red-400"
                  : "border-gray-300 focus:ring-2 focus:ring-blue-500"
              }`}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}
          </div>

          <div>
            <textarea
              placeholder="Description"
              className={`w-full border rounded-lg px-3 py-2 focus:outline-none ${
                errors.description
                  ? "border-red-500 focus:ring-red-400"
                  : "border-gray-300 focus:ring-2 focus:ring-blue-500"
              }`}
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}
          </div>
        </div>

        <div className="flex justify-end gap-2 pt-2">
          <Button variant="danger" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>
            {mode === "edit" ? "Save Changes" : "Add Todo"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TodoFormModal;
