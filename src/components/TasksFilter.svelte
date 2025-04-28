<script lang="ts">
  import { getContext } from "svelte";
  import type { Filters } from "./TaskBoard.svelte";

  const filters = getContext<Filters>("filters");
  const { priority, completed } = filters;
</script>

<form
  method="GET"
  class="p-4 bg-white rounded-lg shadow-md border border-gray-200"
>
  <div class="flex flex-col gap-4 h-full">
    <div class="flex flex-col w-full md:w-auto">
      <label for="priority" class="text-sm text-gray-700 mb-1">
        Priority
      </label>
      <select
        class="p-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        id="priority"
        name="priority"
      >
        <option>-- Select Priority --</option>
        <option value="low" selected={priority === "low"}>Low</option>
        <option value="medium" selected={priority === "medium"}>Medium</option>
        <option value="high" selected={priority === "high"}>High</option>
      </select>
    </div>

    <div class="flex flex-col">
      <label for="completed" class="text-sm text-gray-700 mb-1"> Status </label>
      <div class="flex items-center gap-2">
        <input
          class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          type="checkbox"
          id="completed"
          name="completed"
          checked={completed}
        />
        <span class="text-gray-600 text-sm">Completed</span>
      </div>
    </div>
    <button
      type="submit"
      class="mt-auto px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
    >
      Apply Filters
    </button>
  </div>
</form>
