import Link from "next/link";
import React, { useEffect } from "react";
import { mutate } from "swr";
import { Button } from "antd";
import useDeleteTodo from "../../hooks/todos/deleteTodos";
import { FORM } from "../../constants/text";
import { Todos } from "@/types/todos";

function Todo({ todo }: any) {
  const { deleteResponse, setDeleteTodoId } = useDeleteTodo();

  useEffect(() => {
    if (deleteResponse) {
      mutate("http://localhost:8080/todo/all");
    }
  }, [deleteResponse]);

  return (
    <tr key={todo.id}>
      <td className="text-left px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-500">{todo.id}</div>
      </td>
      <td className="text-left px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-500">{todo.title}</div>
      </td>

      <td className="text-right px-6 py-4 whitespace-nowrap">
        <div className="flex justify-evenly">
          <Link href={`/todos/edit/${todo.id}`}>
            <Button
              type="primary"
              className="bg-blue-500 hover:bg-blue-600 text-white"
            >
              {FORM.EDIT}
            </Button>
          </Link>
          <Button
            type="primary"
            className="bg-red-500 text-white hover:bg-red-600"
            onClick={() => setDeleteTodoId(Number(todo.id))}
          >
            {FORM.DELETE}
          </Button>
        </div>
      </td>
    </tr>
  );
}

export default Todo;
