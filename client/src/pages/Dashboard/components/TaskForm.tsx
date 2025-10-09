import type React from "react";
import type { PostTaskRequestBody } from "types/index";

export function TaskForm({
  onSubmit,
  disabled,
  error,
}: {
  onSubmit: (values: PostTaskRequestBody) => Promise<void>;
  disabled: boolean;
  error: string | null;
}) {
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const title = formData.get("title") as string;
    const description = formData.get("description") as string | null;

    if (!title || !description) return;

    await onSubmit({ title, description, completed: false });
    form.reset();
  };

  return (
    <section>
      <form
        style={{ display: "flex", flexFlow: "column", width: "50%" }}
        onSubmit={handleSubmit}
      >
        <input name="title" type="text" placeholder="Task Title" required />

        <textarea name="description" placeholder="Task Description"></textarea>

        <button disabled={disabled} type="submit">
          Add Task
        </button>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>
    </section>
  );
}
