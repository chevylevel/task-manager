<script lang="ts">
  import type { Task } from "../app/core/entities/Task";
  import TaskList from "./TaskList.svelte";
  import { setContext } from "svelte";
  import TasksFilter from "./TasksFilter.svelte";

  export interface Filters {
    priority?: string;
    completed?: boolean;
  }

  interface TaskBoardProps {
    initialTasks: Task[];
    filters: Filters;
  }

  let { initialTasks = [], filters }: TaskBoardProps = $props();

  setContext<Filters>("filters", {
    ...filters,
  });

  let tasks = [...initialTasks];
</script>

<section class=" mx-auto">
  <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
    <TasksFilter />

    {#if initialTasks.length === 0}
      <div class="text-center py-10">
        <p>No tasks yet.</p>
      </div>
    {:else}
      <TaskList tasks={tasks} />
    {/if}
  </div>
</section>
