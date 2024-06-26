import useSWR from "swr";
import client from "../../client/client";
import { useState } from "react";
import { Todos } from "@/types/todos";

export default function useGetTodo(id: Number) {
  const [isSubmitting, setIsSubmitting] = useState<Boolean>(false);

  const { data: todo, error } = useSWR<Todos>(
    `/todos/get/todo-id`,
    async () => {
      setIsSubmitting(true);
      const token = localStorage.getItem("authTokenKey");
      const { data } = await client.get(`/todos/get/${id}`, {
        headers: {
          "Content-type": "application/json",
          "Access-Control-Allow-Origin": "*",
          Authorization: `Bearer ${token}`, // notice the Bearer before your token
        },
      });

      if (data) {
        setIsSubmitting(false);
      } else {
        setIsSubmitting(false);
      }
      return data;
    }
  );
  return {
    todo,
    isSubmitting,
    error,
    isLoading: !error && !todo,
  };
}
