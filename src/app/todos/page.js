"use client";
import React from "react";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import styles from "./page.module.css";
import fetcher from "@/utils/fetcher";
import useSWR from "swr";
import { useEffect, useState } from "react";
import { redirect } from "next/navigation";
import { toast } from "react-toastify";
import { ColorRing } from "react-loader-spinner";
import TargetTodo from "@/components/targetTodo/TargetTodo";

const Todos = () => {
  const [targetTodo, setTargetTodo] = useState({});
  const [showTargetTodo, setShowTargetTodo] = useState(false);
  function handleEdit(todo) {
    setShowTargetTodo(true);
    setTargetTodo(todo);
  }
  const session = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/login");
    },
  });
  /* 
  console.log("session", session); */
  const shouldFetch = session.status === "authenticated";
  const {
    data: todos,
    mutate,
    error,
    isLoading,
  } = useSWR(
    shouldFetch ? `/api/todos?email=${session?.data?.user?.email}` : null,
    fetcher
  );

  let todosLeft = null;
  if (todos) {
    todosLeft = todos.filter((item) => !item.completed).length;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const text = e.target.text.value;
    try {
      const res = await fetch("/api/todos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: session.data.user.email,
          todoText: text,
        }),
      });
      if (res.status === 201) {
        toast.success("todo was created successfully", {
          position: "top-right",
        });
      } else {
        toast.error("Some thing went wrong, can't create todo", {
          position: "top-right",
        });
      }
      mutate();
      e.target.reset();
    } catch (err) {
      console.log("create todo error: ", err);
    }
  };

  const handleDelete = async (id) => {
    console.log(id);
    try {
      const res = await fetch("/api/todos/deleteTodo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      console.log("delete res: ", res);
      mutate();
    } catch (err) {
      console.log("delete err: ", err);
    }
  };

  const handleComplete = async (id, status) => {
    console.log(status);
    if (status) {
      try {
        const res = await fetch("/api/todos/markIncomplete", {
          method: "put",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id }),
        });
        mutate();
        /* console.log("mark incomplete:", res); */
      } catch (err) {
        console.log("mark incomplete err: ", err);
      }
    } else {
      /* console.log("mark complete"); */
      try {
        const res = await fetch("/api/todos/markComplete", {
          method: "put",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id }),
        });
        mutate();
        /* console.log("mark incomplete:", res); */
      } catch (err) {
        console.log("mark incomplete err: ", err);
      }
    }
  };

  if (session?.status !== "authenticated") {
    return <div>you are not logged in</div>;
  }
  if (error) {
    return <div>Can't fetch data</div>;
  }
  if (isLoading) {
    return (
      <div className={styles.spinner}>
        <ColorRing
          visible={true}
          height="80"
          width="80"
          ariaLabel="blocks-loading"
          wrapperStyle={{}}
          wrapperClass="blocks-wrapper"
          colors={["#4b7c3f", "#74985b", "#91af7f", "#cfdcc7", "#cfdcc7"]}
        />
      </div>
    );
  }
  console.log("left", todosLeft);
  return (
    <div>
      <div className={styles.app_box}>
        <h1 className={styles.h1}>todos</h1>
        <form onSubmit={handleSubmit} className={styles.form}>
          <input
            type="text"
            className={styles.input}
            name="text"
            placeholder="Create a new todo ..."
          />
          <button className={styles.button}>
            <i className="ri-add-line"></i>
          </button>
        </form>
        <div className={styles.todos_box}>
          {todos &&
            todos.map((todo) => {
              return (
                <div key={todo._id} className={styles.todo_item}>
                  <span
                    className={`${styles.checkmark} ${
                      todo.completed && styles.checkmark_complete
                    }`}
                    onClick={() => handleComplete(todo._id, todo.completed)}
                  >
                    {todo.completed && <i className="ri-check-line"></i>}
                  </span>
                  <p
                    className={`${styles.todo_text} ${
                      todo.completed && styles.todo_complete
                    }`}
                  >
                    {todo.todo}
                  </p>
                  <span
                    className={styles.edit_todo}
                    onClick={() => handleEdit(todo)}
                  >
                    <i className="ri-edit-line"></i>
                  </span>
                  <span
                    className={styles.delete_todo}
                    onClick={() => handleDelete(todo._id)}
                  >
                    <i className="ri-delete-bin-3-line"></i>
                  </span>
                </div>
              );
            })}
          <div className={styles.todo_item}>
            <p>
              Tasks left:{" "}
              <span className={styles.todos_left}>
                {todosLeft && todosLeft}
              </span>
            </p>
          </div>
        </div>
        {showTargetTodo && (
          <TargetTodo
            targetTodo={targetTodo}
            setTargetTodo={setTargetTodo}
            setShowTargetTodo={setShowTargetTodo}
            mutate={mutate}
          />
        )}
      </div>
    </div>
  );
};

export default Todos;
