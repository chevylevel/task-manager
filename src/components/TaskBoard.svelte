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
    tasks: Task[];
    tasksCount: number;
    filters: Filters;
  }

  let { tasks = [], tasksCount, filters }: TaskBoardProps = $props();

  setContext<Filters>("filters", {
    ...filters,
  });
</script>

<section class=" mx-auto">
  {#if tasksCount === 0}
    <div class="text-center py-10">
      <p>No tasks yet</p>
    </div>
  {:else}
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      <TasksFilter />
      {#if tasks.length === 0}
        <div class="text-center py-10">
          <p>No tasks found</p>
        </div>
      {/if}
      <TaskList {tasks} />
    </div>
  {/if}
</section>
