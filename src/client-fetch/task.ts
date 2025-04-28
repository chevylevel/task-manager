import type { Task } from "../app/core/entities/Task";

export const deleteTask = async (id: number): Promise<Task | undefined> => {
  try {
    const response = await fetch(`/api/task?id=${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Failed to delete task status. Server responded: ${errorText}`);
      return undefined;
    }

    const { data } = await response.json();

    return data.task;
  } catch (error) {
    console.error(`Error deleting task with id ${id}`, error);
  }
}

export const updateTaskStatus = async (id: number, completed: boolean): Promise<Task | undefined> => {
  try {
    const response = await fetch("/api/task", {
      method: "PATCH",
      body: JSON.stringify({ id, completed }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Failed to update task status. Server responded: ${errorText}`);
      return undefined;
    }

    const { data } = await response.json();

    return data.task;
  } catch (error) {
    console.error(`Error updating task with id ${id}`, error);
  }
};
