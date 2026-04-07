"use client";

import { TodoItem } from "./TodoItem";

interface Todo {
  id: string;
  title: string;
  completed: boolean;
  createdAt: string | Date;
}

export function TodoList({ initialTodos }: { initialTodos: Todo[] }) {
  const active = initialTodos.filter((t) => !t.completed);
  const completed = initialTodos.filter((t) => t.completed);

  if (initialTodos.length === 0) {
    return (
      <div className="text-center py-16 text-gray-400">
        <p className="text-sm">No tasks yet. Add one above!</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {active.length > 0 && (
        <section>
          <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
            Active — {active.length}
          </h2>
          <div className="space-y-2">
            {active.map((todo) => (
              <TodoItem key={todo.id} todo={todo} />
            ))}
          </div>
        </section>
      )}

      {completed.length > 0 && (
        <section>
          <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
            Completed — {completed.length}
          </h2>
          <div className="space-y-2">
            {completed.map((todo) => (
              <TodoItem key={todo.id} todo={todo} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
