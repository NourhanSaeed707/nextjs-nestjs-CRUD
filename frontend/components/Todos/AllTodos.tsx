import React from "react";
import { Button } from "antd";
import Link from "next/link";
import { TodoTABLE, FORM } from "../../constants/text";
import MasterLayout from "../layout/MasterLayout";
import useGetAllTodos from "@/hooks/todos/getAllTodos";
import Todo from "./Todo";

function ListTodos() {
  const { todos, loading } = useGetAllTodos();

  return (
    <>
      <MasterLayout>
        <div className="container mx-auto my-8">
          <div>
            <Link href="/todos/add">
              <Button className="bg-gray-800 text-white">
                {FORM.ADDETodo}
              </Button>
            </Link>
          </div>
          <div className="flex shadow border-b">
            <table className="min-w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left font-medium text-gray-500 uppercase tracking-wide py-3 px-6">
                    {TodoTABLE.ID}
                  </th>
                  <th className="text-left font-medium text-gray-500 uppercase tracking-wide py-3 px-6">
                    {TodoTABLE.title}
                  </th>
                </tr>
              </thead>
              {loading === false && (
                <tbody className="bg-white">
                  {todos?.map((todo) => (
                    <Todo todo={todo} key={todo.id} />
                  ))}
                </tbody>
              )}
            </table>
          </div>
        </div>
      </MasterLayout>
    </>
  );
}

export default ListTodos;
