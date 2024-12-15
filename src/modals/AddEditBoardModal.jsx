import React, { useState } from "react";

function AddEditBoardModal({ setBoardModalOpen, type }) {
  const [name, setName] = useState("");
  const [newColumns, setnewColumns] = useState(
    [
      {name : 'TODO' , task : [] , id : ''}
      {name : 'Doing' , task : [] , id : ''}
    ]
  )
  return (
    <div
      onClick={(e) => {
        if (e.target !== e.currentTarget) {
          return;
        }
        setBoardModalOpen(false);
      }}
      className=" 
    fixed right-0 left-0 top-0 bottom-8 px-2 scroll py-4 overflow-scroll-bar-hide z-50 justify-center items-center flex bg-[#00000080]
    "
    >
      {/** modal section */}
      <div className=" scrollbar-hide overflow-y-scroll max-h-[95vh] bg-white dark:bg-[#2b2c37] text-black dark:text-white font-bold shadow-md shadow-[#364e7e1a] max-w-md mx-auto w-full px-8 py-8 rounded-xl">
        <h3 className=" text-lg">
          {type === "edit" ? "Edit" : "Add Now"} Board
        </h3>
        {/** task name */}
        <div className="mt-8 flex flex-col space-y-3">
          <label className=" text-sm dark:text-white text-gray-500">
            Board Column
          </label>
          <input
            className="bg-transparent px-4 py-2 rounded-md text-sm border border-gray-600 outline-none focus:outline-[#635fc7] outline-1 ring-0"
            placeholder=" e.g Ui Design"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
            id="board-name-input"
          />
        </div>
        {/** Columns */}
        <div className=" mt-8 flex flex-col space-y-3">
          <label className="text-sm dark:text-white text-gray-500">
            Board Columns
          </label>
        </div>
      </div>
    </div>
  );
}

export default AddEditBoardModal;
