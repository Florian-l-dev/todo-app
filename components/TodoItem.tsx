"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface Todo {
  id: string;
  title: string;
  completed: boolean;
  createdAt: string;
}

export function TodoItem({ todo }: { todo: Todo }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const toggleComplete = async () => {
    setLoading(true);
    await fetch(`/api/todos/${todo.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ completed: !todo.completed }),
    });
    setLoading(false);
    router.refresh();
  };

  const deleteTodo = async () => {
    setLoading(true);
    await fetch(`/api/todos/${todo.id}`, { method: "DELETE" });
    setLoading(false);
    router.refresh();
  };

  return (
    <div
      className={`flex items-center gap-3 px-4 py-3 bg-white rounded-lg border transition-all ${
        loading ? "opacity-50" : "border-gray-100 hover:border-gray-200"
      }`}
    >
      <button
        onClick={toggleComplete}
        disabled={loading}
        className={`flex-shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
          todo.completed
            ? "bg-gray-900 border-gray-900"
            : "border-gray-300 hover:border-gray-500"
        }`}
        aria-label={todo.completed ? "Mark incomplete" : "Mark complete"}
      >
        {todo.completed && (
          <svg
            className="w-3 h-3 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={3}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>
        )}
      </button>

      <span
        className={`flex-1 text-sm ${
          todo.completed ? "line-through text-gray-400" : "text-gray-800"
        }`}
      >
        {todo.title}
      </span>

      <button
        onClick={deleteTodo}
        disabled={loading}
        className="flex-shrink-0 p-1 text-gray-300 hover:text-red-500 transition-colors rounded"
        aria-label="Delete task"
      >
        <svg
          className="w-4 h-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>
  );
}
