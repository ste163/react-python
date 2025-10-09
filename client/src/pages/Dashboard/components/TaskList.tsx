import type { Task } from "types/index";

export function TaskList(props: { tasks: Task[] }) {
  return (
    <div>
      {props.tasks.length === 0 ? (
        <p>No tasks found</p>
      ) : (
        <ul>
          {props.tasks.map((task) => (
            <li key={task.id}>
              <strong>{task.title}</strong>
              {task.description && <p>{task.description}</p>}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
