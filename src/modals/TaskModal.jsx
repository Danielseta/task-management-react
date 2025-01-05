import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function TaskModal({ colIndex, taskIndex, setIsTaskModalOpen }) {
  const dispatch = useDispatch();
  const boards = useSelector((state) => state.boards);
  const board = boards.find((board) => board.isActive === true);
  const columns = board.columns;
  const col = columns.find((col, i) => i === colIndex);
  const task = col.tasks.find((task, i) => i === taskIndex);
  const subtasks = task.subtasks;

  let completed = 0;
  subtasks.forEach((subtasks) => {
    if (subtasks.isCompleted) {
      completed++;
    }
  });

  const [status, setStatus] = useState(task.status);
  const [newColIndex, setNewColIndex] = useState(columns.indexOf(col));

  return (
    <div
      className=" fixed right-0 left-0 top-0 px-2 py-4 overflow-scroll scrollbar-hide 
    z-50 bottom-0 justify-center items-center flex bg-[#00000080]"
    >
      {/** modal */}
      <div
        className=" scrollbar-hide overflow-y-scroll max-h-[95vh] my-auto bg-white
      dark:bg-[#2b2c37] text-black dark:text-white font-bold shadow-md shadow-[364e7e1a] max-w-md mx-auto w-full px-8 py-8 rounded-xl
      "
      ></div>
      <div className=" relative flex justify-between w-full items-center">
        <h1 className=" text-lg">{text.title}</h1>
        <img />
      </div>
    </div>
  );
}
export default TaskModal;
