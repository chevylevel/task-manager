import { beforeEach, describe, expect, it, vi } from "vitest";
import { render, fireEvent, waitFor } from "@testing-library/svelte";
import TaskList from "../TaskList.svelte";
import * as taskApi from "../../client-fetch/task";
import type { Task } from "../../app/core/entities/Task";
import { navigateTo } from "../../utils/navigateTo";

const tasksMock: Task[] = [
  { id: 1, title: "Task 1", completed: false, description: "Description 1", priority: "high", dueDate: new Date("2023-12-31") },
  { id: 2, title: "Task 2", completed: true, description: "Description 2", priority: "low", dueDate: new Date("2023-11-30") },
];

vi.mock("../../client-fetch/task", () => ({
  deleteTask: vi.fn(),
  updateTaskStatus: vi.fn(),
}));

describe("TaskList component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders a TaskCard for each task", () => {
    const { getByText } = render(TaskList, { tasks: tasksMock });

    expect(getByText("Task 1")).toBeInTheDocument();
    expect(getByText("Task 2")).toBeInTheDocument();
  });

  it("navigates to the edit page when edit event triggered", async () => {
    const { getAllByTestId } = render(TaskList, { tasks: tasksMock });

    const editButtons = getAllByTestId("edit-btn");
    await fireEvent.click(editButtons[0]);

    vi.mock('../../utils/navigateTo', () => ({
      navigateTo: vi.fn(),
    }));

    await fireEvent.click(editButtons[0]);

    expect(navigateTo).toHaveBeenCalledWith(`/task/${tasksMock[0].id}/edit`);
  });

  it("deletes a task on delete event and removes it from UI", async () => {
    (vi.mocked(taskApi).deleteTask).mockResolvedValue(tasksMock[0]);

    const { getAllByTestId, queryByText } = render(TaskList, { tasks: tasksMock });

    const deleteButtons = getAllByTestId("delete-btn");

    await fireEvent.click(deleteButtons[0]);

    await waitFor(() => {
      expect(taskApi.deleteTask).toHaveBeenCalledWith(tasksMock[0].id);
      expect(queryByText("Task 1")).not.toBeInTheDocument();
    });

    expect(queryByText("Task 2")).toBeInTheDocument();
  });

  it("logs error if delete fails", async () => {
    (vi.mocked(taskApi).deleteTask).mockResolvedValue(undefined);

    const consoleErrorSpy = vi.spyOn(console, "error").mockImplementation(() => { });

    const { getAllByTestId } = render(TaskList, { tasks: tasksMock });
    const deleteButtons = getAllByTestId("delete-btn");

    await fireEvent.click(deleteButtons[0]);

    await waitFor(() => {
      expect(consoleErrorSpy).toHaveBeenCalledWith("Failed to delete task");
    });

    consoleErrorSpy.mockRestore();
  });

  it("toggles task status and updates UI", async () => {
    const updatedTask = { ...tasksMock[0], completed: true };
    (vi.mocked(taskApi).updateTaskStatus).mockResolvedValue(updatedTask);

    const { getAllByTestId, getByText } = render(TaskList, { tasks: tasksMock });

    const toggleCheckboxes = getAllByTestId("toggle-checkbox");

    await fireEvent.click(toggleCheckboxes[0]);

    await waitFor(() => {
      expect(taskApi.updateTaskStatus).toHaveBeenCalledWith(tasksMock[0].id, true);
      const taskTitle = getByText("Task 1");
      const classList = taskTitle.getAttribute("class") || "";

      expect(classList).toContain("line-through");
      expect(classList).toContain("text-gray-400");
    });
  });

  it("logs error if toggle fails", async () => {
    (vi.mocked(taskApi).updateTaskStatus).mockResolvedValue(undefined);

    const consoleErrorSpy = vi.spyOn(console, "error").mockImplementation(() => { });

    const { getAllByTestId } = render(TaskList, { tasks: tasksMock });
    const toggleCheckboxes = getAllByTestId("toggle-checkbox");

    await fireEvent.click(toggleCheckboxes[0]);

    await waitFor(() => {
      expect(consoleErrorSpy).toHaveBeenCalledWith("Failed to update task status");
    });

    consoleErrorSpy.mockRestore();
  });
});
