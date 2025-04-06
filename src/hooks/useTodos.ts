// src/hooks/useTodos.ts
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  onSnapshot,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase";

export interface Todo {
  id: string;
  title: string;
  description: string;
  completed: boolean;
}

export function useTodos() {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "todos"), (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Omit<Todo, "id">),
      }));
      setTodos(data);
    });

    return () => unsubscribe();
  }, []);

  const addTodo = async (title: string, description: string) => {
    await addDoc(collection(db, "todos"), {
      title,
      description,
      completed: false,
    });
  };

  const updateTodo = async (updatedTodo: Todo) => {
    const { id, title, description, completed } = updatedTodo;
    const docRef = doc(db, "todos", id);
    await updateDoc(docRef, { title, description, completed });
  };

  const deleteTodo = async (id: string) => {
    const docRef = doc(db, "todos", id);
    await deleteDoc(docRef);
  };

  return {
    todos,
    addTodo,
    updateTodo,
    deleteTodo,
  };
}
