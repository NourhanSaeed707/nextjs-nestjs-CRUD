import client from "@/client/client";
import { Todos } from "@/types/todos";
import { useState } from "react";
import useSWR from "swr";

export default function useGetAllTodos() {
  const USER_API_BASE_URL = "http://localhost:8080/todos/all";
  const [loading, setLoading] = useState(true);
  const { data: todos, error } = useSWR<Todos[]>(
    `http://localhost:8080/todos/all`,
    async () => {
      setLoading(true);
      const token = localStorage.getItem("authTokenKey");
      const { data } = await client.get("http://localhost:8080/todos/all", {
        headers: {
          "Content-type": "application/json",
          "Access-Control-Allow-Origin": "*",
          Authorization: `Bearer ${token}`, // notice the Bearer before your token
        },
      });
      setLoading(false);
      return data;
    },
    {
      dedupingInterval: 1000,
    }
  );
  return {
    todos,
    loading,
    error,
  };
}
