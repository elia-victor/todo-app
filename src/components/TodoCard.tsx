import React from "react";
import Button from "./Button";
import { Pencil, Trash2 } from "lucide-react";

interface TodoCardProps {
  title: string;
  description?: string;
  completed?: boolean;
  onEdit?: () => void;
  onToggle?: () => void;
  onDelete?: () => void;
}

const TodoCard: React.FC<TodoCardProps> = ({
  title,
  description,
  completed = false,
  onEdit,
  onToggle,
  onDelete,
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-md p-4 flex gap-4 border border-gray-100 hover:shadow-lg transition">
      <div className="flex items-center justify-center">
        <input
          type="checkbox"
          checked={completed}
          onChange={onToggle}
          className="w-10 h-10 accent-green-600"
        />
      </div>
      <div className="flex-1 flex flex-col justify-center">
        <h3 className={`font-semibold text-lg ${completed ? "line-through text-gray-400" : "text-gray-800"}`}>
          {title}
        </h3>
        {description && (
          <p className={`text-sm mt-1 ${completed ? "text-gray-300" : "text-gray-600"}`}>
            {description}
          </p>
        )}
      </div>
      <div className="flex flex-col"> 
        {onEdit && (
          <Button variant="secondary" onClick={onEdit} leftIcon={<Pencil size={16} />}>Edit</Button>
        )}
        {onDelete && (
          <Button variant="danger" onClick={onDelete} leftIcon={<Trash2 size={16} />}>Delete</Button>
        )}
      </div>
    </div>
  );
};

export default TodoCard;
