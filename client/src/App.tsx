import { useEffect, useState } from "react";
import type { Task } from "./types";

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // todo add env for api url
    const fetchTasks = async () => {
      try {
        const res = await fetch("http://localhost:8000/tasks/");
        const data: Task[] = await res.json();
        setTasks(data);
        setLoading(false);
      } catch (err) {
        setError((err as Error).message);
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  if (loading) return <div>Loading tasks...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>Task Manager</h1>
      <div>
        {tasks.length === 0 ? (
          <p>No tasks found</p>
        ) : (
          <ul>
            {tasks.map((task) => (
              <li key={task.id}>
                <strong>{task.title}</strong>
                {task.description && <p>{task.description}</p>}
                <p>Completed: {task.completed ? "Yes" : "No"}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default App;
