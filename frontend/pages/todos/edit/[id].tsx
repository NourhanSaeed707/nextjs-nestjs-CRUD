import React from "react";
import { useRouter } from "next/router";
import EditTodoComponent from "@/components/Todos/EditTodo";

function EditTodo() {
  const router = useRouter();
  const { id } = router.query;

  return <EditTodoComponent />;
}

export default EditTodo;
