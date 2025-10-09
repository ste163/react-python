import type React from "react";

export function TaskForm({
  onSubmit,
  disabled,
  error,
}: {
  onSubmit: (e: React.FormEvent) => void;
  disabled: boolean;
  error: string | null;
}) {
  return (
    <section>
      <form
        style={{ display: "flex", flexFlow: "column", width: "50%" }}
        onSubmit={onSubmit}
      >
        <input type="text" placeholder="Task Title" required />

        <textarea placeholder="Task Description"></textarea>

        <button disabled={disabled} type="submit">
          Add Task
        </button>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>
    </section>
  );
}
