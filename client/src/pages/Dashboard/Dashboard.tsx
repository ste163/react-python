import { useEffect, useState } from "react";
import { httpClient } from "httpClient";
import { TaskForm, TaskList } from "./components";
import {
  type PostTaskRequestBody,
  type GetTaskResponse,
  type Task,
  type PostTaskResponse,
} from "types";

export function Dashboard() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [submittingTask, setSubmittingTask] = useState<boolean>(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await httpClient.get<GetTaskResponse>("/tasks/");
        setTasks(response);
      } catch (err) {
        setFetchError("Failed to fetch tasks");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchTasks();
  }, []);

  const onSubmit = async (values: PostTaskRequestBody) => {
    try {
      setSubmitError(null);
      setSubmittingTask(true);
      const response = await httpClient.post<PostTaskResponse>("/tasks/", {
        body: JSON.stringify(values),
      });
      setTasks((prevTasks) => [...prevTasks, response]);
    } catch (error) {
      console.error(error);
      setSubmitError("Failed to submit task");
    } finally {
      setSubmittingTask(false);
    }
  };

  if (loading) return <div>Loading tasks...</div>;

  if (fetchError) return <div>{fetchError}</div>;

  return (
    <div>
      <h1>Task Manager</h1>
      <TaskForm
        error={submitError}
        disabled={submittingTask}
        onSubmit={onSubmit}
      />
      <TaskList tasks={tasks} />
    </div>
  );
}
