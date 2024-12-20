import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";

function AddEditTaskModal({ type, device, setOpenAddEditTask }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [subtasks, setSubtasks] = useState([
    { title: "", isCompleted: false, id: uuidv4() },
    { title: "", isCompleted: false, id: uuidv4() },
  ]);

  return (
    <div
      onClick={(e) => {
        if (e.target !== e.currentTarget) {
          return;
        }
        setOpenAddEditTask(false);
      }}
      className={
        device === "mobile"
          ? " py-6 px-6 pb-40 absolute overflow-y-scroll left-0 flex right-0 bottom-[-100vh] top-0 bg-[#00000080]"
          : "py-6 px-6 pb-40 absolute overflow-y-scroll left-0 flex right-0 bottom-0 top-0 bg-[#00000080]"
      }
    >
      <div className=" scrollbar-hide overflow-y-scroll max-h-[95vh] my-auto bg-white dark:bg-[#2b2c37] text-black dark:text-white font-bold shadow-md shadow-[#364e73la] max-w-md max-auto w-full px-8 py-8 rounded-xl">
        <h3 className=" text-lg">
          {type === "edit" ? "Edit" : "Add New"} TasK
        </h3>

        <div className=" mt-8 flex flex-col space-y-1">
          <label className=" text-sm dark:text-white text-gray-500 ">
            Task Name
          </label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className=" bg-transparent px-4 py-2 outline-none focus:border-0 rounded-md text-sm border border-gray-600 focus:outline-[#635fc7] ring-0"
            type="text"
            placeholder="e.g Take coffe break"
          />
        </div>
        {/** discription */}
        <div className=" mt-8 flex flex-col space-y-1">
          <label className=" text-sm dark:text-white text-gray-500 ">
            Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className=" bg-transparent px-4 py-2 outline-none focus:border-0 min-h-[200px] rounded-md text-sm border border-gray-600 focus:outline-[#635fc7] ring-0"
            placeholder="e.g 15 minute break will recharge the batteries"
          />
        </div>
        {/** subtasks */}
        <div className=" mt-8 flex flex-col space-y-1">
          <label className=" text-sm dark:text-white text-gray-500 ">
            Subtasks
          </label>
          {subtasks.map((subtask, index) => {
            <div key={index} className=" flex items-center w-full">
              <input
                type="text"
                value={subtask.title}
                className=" bg-transparent outline-none"
              />
            </div>;
          })}
        </div>
      </div>
    </div>
  );
}

export default AddEditTaskModal;
