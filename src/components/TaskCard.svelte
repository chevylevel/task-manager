<script lang="ts">
  import type { TaskPriority } from "../app/core/entities/Task";

  interface TaskCardProps {
    id: number;
    title: string;
    completed: boolean;
    priority: TaskPriority;
    description: string;
    onEdit: (id: number) => void;
    onDelete: (id: number) => void;
    onToggleStatus: (id: number) => void;
  }

  let {
    id,
    title,
    completed,
    priority,
    description,
    onEdit,
    onDelete,
    onToggleStatus,
  }: TaskCardProps = $props();

  let handleToggleStatus = (e: MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();

    onToggleStatus(id);
  };

  function handleNavigate() {
    window.location.href = `/task/${id}`;
  }

  function handleKeydown(e: KeyboardEvent) {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleNavigate();
    }
  }

  function handleEdit(e: MouseEvent) {
    e.stopPropagation();
    onEdit(id);
  }

  function handleDelete(e: MouseEvent) {
    e.stopPropagation();
    onDelete(id);
  }
</script>

<div
  role="link"
  tabindex="0"
  aria-label={`Open task: ${title}`}
  class="p-4 rounded-lg shadow-sm bg-white hover:bg-gray-50 transition cursor-pointer"
  onclick={handleNavigate}
  onkeydown={handleKeydown}
>
  <div class="flex flex-col gap-3 h-full">
    <div class="flex items-center gap-2">
      <div
        class={`font-medium text-lg ${completed ? "line-through text-gray-400" : ""}`}
      >
        {title}
      </div>

      <input
        data-testid="toggle-checkbox"
        class="ml-auto"
        type="checkbox"
        checked={completed}
        onclick={handleToggleStatus}
      />
    </div>

    <div class="text-xs text-gray-500">
      Priority: {priority}
    </div>
    <div class="text-xs text-gray-500">
      {description}
    </div>
    <div class="flex gap-2 py-2 mt-auto">
      <button
        data-testid="edit-btn"
        onclick={handleEdit}
        class="text-blue-500 hover:underline text-sm cursor-pointer"
      >
        Edit
      </button>
      <button
        data-testid="delete-btn"
        onclick={handleDelete}
        class="text-red-500 hover:underline text-sm cursor-pointer"
      >
        Delete
      </button>
    </div>
  </div>
</div>
