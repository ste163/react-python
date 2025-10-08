import { useEffect, useState } from "react";
import { ErrorBoundary } from "components/ErrorBoundary";
import { httpClient } from "httpClient";
import type { GetTaskResponse, Task } from "types";

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await httpClient.get<GetTaskResponse>("/tasks/");
        setTasks(response);
      } catch (err) {
        setError("Failed to fetch tasks");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchTasks();
  }, []);

  if (loading) return <div>Loading tasks...</div>;

  if (error) return <div>{error}</div>;

  return (
    <div>
      <h1>Task Manager</h1>
      <ErrorBoundary fallback={<div>An unexpected error occurred.</div>}>
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
      </ErrorBoundary>
    </div>
  );
}

export default App;
