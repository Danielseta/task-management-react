import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import elipsis from "../assets/icon-vertical-elipsis.svg";
import ElipsisMenu from "../componets/ElipsisMenu";
import Task from "../componets/Task";
import Subtask from "../componets/Subtask";
import boardsSlice from "../redux/boardsSlice";
import DeleteModal from "../modals/DeleteModal";
import AddEditTaskModal from "../modals/AddEditTaskModal";

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
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState(false);

  const setOpenEditModal = () => {
    setIsAddTaskModalOpen(true);
    setElipsisMenuOpen(false);
  };

  const setOpenDeleteModal = () => {
    setElipsisMenuOpen(false);
    setIsDeleteModalOpen(true);
  };

  const onClose = (e) => {
    if (e.target !== e.currentTarget) {
      return;
    }
    dispatch(
      boardsSlice.actions.setTaskStatus({
        taskIndex,
        colIndex,
        newColIndex,
        status,
      })
    );
    setIsTaskModalOpen(false);
  };

  const onChange = (e) => {
    setStatus(e.target.value);
    setNewColIndex(e.target.selectedIndex);
  };

  const onDeleteBtnClick = () => {
    dispatch(boardsSlice.actions.deleteTask({ taskIndex, colIndex }));
    setIsTaskModalOpen(false);
    setIsDeleteModalOpen(false);
  };

  return (
    <div
      onClick={onClose}
      className=" fixed right-8 left-0 top-0 px-2 py-4 overflow-scroll scrollbar-hide z-50 bottom-0 justify-center items-center flex bg-[#00000080]"
    >
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
                index={i}
                taskIndex={taskIndex}
                colIndex={colIndex}
                key={i}
              />
            );
          })}
        </div>
        {/** status */}

        <div className=" mt-8 flex flex-col space-y-3">
          <label className=" text-sm dark:text-white text-gray-500">
            Current Status
          </label>
          <select
            className=" select-status flex-grow px-4 py-2 rounded-md text-sm bg-transparent focus:border-0 border border-gray-300 focus:outline-[#635fc7] outline-none"
            value={status}
            onChange={onChange}
          >
            {columns.map((column, i) => (
              <option className=" status-option">{column.name}</option>
            ))}
          </select>
        </div>
      </div>
      {isDeleteModalOpen && (
        <DeleteModal
          setIsDeleteModalOpen={setIsDeleteModalOpen}
          onDeleteBtnClick={onDeleteBtnClick}
          title={task.title}
          type="task"
        />
      )}
      {isAddTaskModalOpen && (
        <AddEditTaskModal
          setIsAddTaskModalOpen={setIsAddTaskModalOpen}
          setIsTaskModalOpen={setIsTaskModalOpen}
          type="edit"
          taskIndex={taskIndex}
          prevColIndex={colIndex}
        />
      )}
    </div>
  );
}
export default TaskModal;
