import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import elipsis from "../assets/icon-vertical-elipsis.svg";
import ElipsisMenu from "../componets/ElipsisMenu";
import Task from "../componets/Task";
import Subtask from "../componets/Subtask";

function TaskModal({ taskIndex, colIndex, setIsTaskModalOpen }) {
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
  const [elipsisMenuOpen, setElipsisMenuOpen] = useState(false);

  const setOpenEditModal = () => {
    //time time
  };

  const setOpenDeleteModal = () => {};

  return (
    <div className=" fixed right-8 left-0 top-0 px-2 py-4 overflow-scroll scrollbar-hide z-50 bottom-0 justify-center items-center flex bg-[#00000080]">
      {/** modal */}
      <div className="scrollbar-hide overflow-y-scroll max-h-[95vh]  my-auto  bg-white dark:bg-[#2b2c37] text-black dark:text-white font-bold shadow-md shadow-[#364e7e1a] max-w-md mx-auto  w-full px-8  py-8 rounded-xl">
        <div className=" relative flex justify-between w-full items-center">
          <h1 className=" text-lg">{task.title}</h1>
          <img
            src={elipsis}
            onClick={() => {
              setElipsisMenuOpen((state) => !state);
            }}
            className=" cursor-pointer h-6"
          />
          {elipsisMenuOpen && (
            <ElipsisMenu
              setOpenEditModal={setOpenEditModal}
              setOpenDeleteModal={setOpenDeleteModal}
              type={Task}
            />
          )}
        </div>
        <p className=" text-gray-500 font-semibold tracking-wide text-sm pt-6">
          {task.description}
        </p>
        <p className=" pt-6 text-gray-500 tracking-widest text-sm">
          Subtasks ({completed} of {subtasks.length})
        </p>
        {/** subtasks */}
        <div className=" mt-3 space-y-2">
          {subtasks.map((subtask, i) => {
            return (
              <Subtask
                index={index}
                taskIndex={taskIndex}
                colIndex={colIndex}
                key={index}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
export default TaskModal;
