import { useCallback, useEffect, useState } from "react";
import { Todos } from "../../types/todos";
import { AxiosResponse } from "axios";
import client from "../../client/client";

export default function useAddTodo() {
  const [todo, setNewTodo] = useState<Todos>();
  const [storeResponse, setStoreResponse] = useState<AxiosResponse | null>();
  const [storeError, setStoreError] = useState<string | null>();

  const callAPI = useCallback(async (todo: Todos) => {
    setStoreError(null);
    const token = localStorage.getItem("authTokenKey");
    await client
      .post(`/todos/add`, todo, {
        headers: {
          "Content-type": "application/json",
          "Access-Control-Allow-Origin": "*",
          Authorization: `Bearer ${token}`, // notice the Bearer before your token
        },
      })
      .then((res) => {
        setStoreResponse(res);
      })
      .catch((err) => {
        setStoreError(err);
      });
  }, []);

  useEffect(() => {
    if (todo) {
      callAPI(todo);
    }
  }, [callAPI, todo]);

  return {
    setNewTodo,
    storeError,
    storeResponse,
  };
}
