<script lang="ts">
  import type { Task } from "../app/core/entities/Task";
  import { deleteTask, updateTaskStatus } from "../client-fetch/task";
  import { navigateTo } from "../utils/navigateTo";
  import TaskCard from "./TaskCard.svelte";

  interface TaskListProps {
    tasks: Task[];
  }

  let { tasks = [] }: TaskListProps = $props();

  function handleEdit(task: Task) {
    navigateTo(`/task/${task.id}/edit`);
  }

  async function handleDelete(id: number) {
    const deletedTask = await deleteTask(id);

    if (!deletedTask) {
      console.error("Failed to delete task");

      return;
    }

    tasks = tasks.filter((task) => task.id !== id);
  }

  async function handleToggleStatus(id: number) {
    const task = tasks.find((task) => task.id === id);
    const updatedTask = await updateTaskStatus(id, !task?.completed);

    if (!updatedTask) {
      console.error("Failed to update task status");
      return;
    }

    tasks = tasks.map((task) =>
      task.id === id
        ? {
            ...task,
            completed: !task.completed,
          }
        : task,
    );
  }
</script>

{#each tasks as task (task.id)}
  <TaskCard
    {...task}
    onEdit={() => handleEdit(task)}
    onDelete={() => handleDelete(task.id)}
    onToggleStatus={() => handleToggleStatus(task.id)}
  />
{/each}
