import { useEffect, useState } from "react";
import { httpClient } from "./httpClient";
import type { GetTaskResponse, Task } from "./types";

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // use `use` and <Suspsense> instead of this approach
  // and an error boundary
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const data = await httpClient.get<GetTaskResponse>("/tasks/");
        setTasks(data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
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
