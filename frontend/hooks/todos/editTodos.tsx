import { AxiosResponse } from "axios";
import { useCallback, useEffect, useState } from "react";
import { Todos } from "../../types/todos";
import client from "../../client/client";

export default function useEditTodo() {
  const USER_API_BASE_URL = "http://localhost:8080/todos";
  const [updateResponse, setUpdateResponse] = useState<AxiosResponse | null>();
  const [updateError, setUpdateError] = useState<string | null>();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [updatedTodo, setUpdatedTodo] = useState<Todos>();

  const callAPI = useCallback(async (updateTodo: Todos) => {
    setUpdateError(null);
    setUpdateResponse(null);
    setIsSubmitting(true);
    const token = localStorage.getItem("authTokenKey");
    console.log("beeeeeeeeeefore update: ");
    console.log(updateTodo);
    await client
      .put(
        `${USER_API_BASE_URL}/update/${updateTodo?.id}`,
        {
          ...updateTodo,
        },
        {
          headers: {
            "Content-type": "application/json",
            "Access-Control-Allow-Origin": "*",
            Authorization: `Bearer ${token}`, // notice the Bearer before your token
          },
        }
      )
      .then((res) => {
        setUpdateResponse(res);
      })
      .catch((err) => {
        setUpdateError(err);
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  }, []);

  useEffect(() => {
    if (updatedTodo) {
      callAPI(updatedTodo);
    }
  }, [callAPI, updatedTodo]);

  return {
    setUpdatedTodo,
    updateResponse,
    updateError,
    isSubmitting,
    updatedTodo,
  };
}
