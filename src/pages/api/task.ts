export const prerender = false;
import type { APIRoute } from "astro";
import { deleteTask } from "../../app/controllers/task/delete.controller";
import { updateTask } from "../../app/controllers/task/update.controller";

export const DELETE: APIRoute = async ({ request }) => {
  try {
    const id = new URL(request.url).searchParams.get('id');

    const deletedTask = await deleteTask({ id: Number(id) });

    if (!deletedTask) {
      return new Response(
        JSON.stringify({ message: "Task not found" }),
        {
          status: 404,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    return new Response(
      JSON.stringify({
        message: `task with id ${id} was deleted`,
        data: { task: deletedTask },
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" }
      },
    );
  } catch (error) {
    console.error("API error:", error);
    return new Response(
      JSON.stringify({ message: "Server error" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
};

export const PATCH: APIRoute = async ({ request }) => {
  try {
    const { id, completed } = await request.json();

    const updatedTask = await updateTask({ id, completed });

    if (!updatedTask) {
      return new Response(
        JSON.stringify({ message: "Task not found" }),
        {
          status: 404,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    return new Response(
      JSON.stringify({
        message: `Task with id ${id} updated successfully.`,
        data: { task: updatedTask },
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("API error:", error);
    return new Response(
      JSON.stringify({ message: "Server error" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
};