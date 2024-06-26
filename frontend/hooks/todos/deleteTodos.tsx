import { AxiosResponse } from "axios";
import { useCallback, useEffect, useState } from "react";
import client from "../../client/client";

export default function useDeleteTodo() {
  const USER_API_BASE_URL = "http://localhost:8080/todos";
  const [deleteResponse, setDeleteResponse] = useState<AxiosResponse | null>();
  const [deleteError, setDeleteError] = useState<string | null>();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [deleteTodoId, setDeleteTodoId] = useState<number>();

  const callAPI = useCallback(async (Id: number) => {
    setDeleteResponse(null);
    setDeleteError(null);
    setIsSubmitting(true);
    const token = localStorage.getItem("authTokenKey");
    await client
      .delete(`${USER_API_BASE_URL}/${Id}`, {
        headers: {
          "Content-type": "application/json",
          "Access-Control-Allow-Origin": "*",
          Authorization: `Bearer ${token}`, // notice the Bearer before your token
        },
      })
      .then((res) => {
        setDeleteResponse(res);
      })
      .catch((err) => {
        setDeleteError(err);
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  }, []);

  useEffect(() => {
    if (deleteTodoId) {
      callAPI(deleteTodoId);
    }
  }, [callAPI, deleteTodoId]);

  return {
    setDeleteTodoId,
    deleteResponse,
    deleteError,
    isSubmitting,
  };
}
