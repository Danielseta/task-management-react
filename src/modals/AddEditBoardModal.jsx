import React, { useState } from "react";
import { v4 as uuidv4, validate } from "uuid";
import crossIcon from "../assets/icon-cross.svg";
import { useDispatch, useSelector } from "react-redux";
import boardSlices from "../redux/boardsSlice";

function AddEditBoardModal({ setBoardModalOpen, type }) {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const [isValid, setIsValid] = useState(true);
  const board = useSelector((state) => state.boards).find(
    (board) => board.iSActive
  );

  const [newColumns, setnewColumns] = useState([
    { name: "TODO", task: [], id: uuidv4() },
    { name: "Doing", task: [], id: uuidv4() },
  ]);

  if (type === "edit" && isFirstLoad) {
    setnewColumns(
      board.columns.map((col) => {
        return { ...col, id: uuidv4() };
      })
    );
    setName(board.name);
    setIsFirstLoad(false);
  }

  const onChange = (id, newValue) => {
    setnewColumns((pervState) => {
      const newState = [...pervState];
      const column = newState.find((col) => col.id === id);
      column.name = newValue;
      return newState;
    });
  };

  const onDelete = (id) => {
    setnewColumns((perState) => perState.filter((el) => el.id !== id));
  };
  const validate = () => {
    setIsValid(false);
    if (!name.trim()) {
      return false;
    }
    for (let i = 0; i < newColumns.length; i++) {
      if (!newColumns[i].name.trim()) {
        return false;
      }
    }
    setIsValid(true);
    return true;
  };
  const onSubmit = (type) => {
    setBoardModalOpen(false);
    if (type === "add") {
      dispatch(boardSlices.actions.addBoard({ name, newColumns }));
    } else {
      dispatch(boardSlices.actions.editBoardBoard({ name, newColumns }));
    }
  };
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
          {newColumns.map((column, index) => (
            <div key={index} className=" flex items-center w-full">
              <input
                className=" bg-transparent flex-grow px-4 py-2 rounded-md text-sm border border-gray-600 outline-none focus:outline-[#735fc7] "
                onChange={(e) => {
                  onChange(column.id, e.target.value);
                }}
                value={column.name}
                type="text"
              />
              <img
                src={crossIcon}
                className=" cursor-pointer m-4"
                onClick={() => {
                  onDelete(column.id);
                }}
              />
            </div>
          ))}
        </div>
        <div>
          <button
            className=" w-full items-center hover:opacity-75 dark:text-[#635fc7] dark:bg-white text-white bg-[#635fc7] mt-2 py-2 rounded-full"
            onClick={() => {
              setnewColumns((state) => [
                ...state,
                { name: "", task: [], id: uuidv4() },
              ]);
            }}
          >
            + Add new column
          </button>
          <button
            className=" w-full items-center hover:opacity-75 dark:text-white dark:bg-[#635fc7] mt-8 relative text-white bg-[#635fc7] py-2 rounded-full"
            onClick={() => {
              const isValid = validate();
              if (isValid === true) onSubmit(type);
            }}
          >
            {type === "add" ? "Create New Board" : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddEditBoardModal;
