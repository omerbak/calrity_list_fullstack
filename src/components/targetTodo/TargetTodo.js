import React from "react";
import styles from "./page.module.css";
import { toast } from "react-toastify";
const TargetTodo = ({
  targetTodo,
  setTargetTodo,
  setShowTargetTodo,
  mutate,
}) => {
  async function handleSubmit(e) {
    e.preventDefault();
    //console.log(targetTodo._id, targetTodo.todo);
    const res = await fetch("/api/todos/editTodo", {
      method: "put",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: targetTodo._id,
        todo: targetTodo.todo,
      }),
    });
    if (res.status === 200) {
      mutate();
      setShowTargetTodo(false);
      toast.success("todo was updated successfully");
    } else {
      toast.error("Sorry, todo can't be updated at the moment!");
    }
  }

  function handleChange(e) {
    setTargetTodo((prev) => ({ ...prev, todo: e.target.value }));
  }
  return (
    <div className={styles.form_box}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          type="text"
          name="todo"
          value={targetTodo.todo}
          onChange={handleChange}
          className={styles.form_input}
        />
        <button type="submit" className={`${styles.button} ${styles.cofirm}`}>
          Save
        </button>
        <button
          type="button"
          className={`${styles.button} ${styles.cancel}`}
          onClick={() => setShowTargetTodo(false)}
        >
          Cancel
        </button>
      </form>
    </div>
  );
};

export default TargetTodo;
