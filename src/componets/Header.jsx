import React, { useState } from "react";
import logo from "../assets/logo-mobile.svg";
import iconDown from "../assets/icon-chevron-down.svg";
import iconUp from "../assets/icon-chevron-up.svg";
import elipsis from "../assets/icon-vertical-elipsis.svg";
import HeaderDropdown from "./HeaderDropdown";
import AddEditBoardModal from "../modals/AddEditBoardModal";
import { useDispatch, useSelector } from "react-redux";
import AddEditTaskModal from "../modals/AddEditTaskModal";

function Header({ setBoardModalOpen, boardModalOpen }) {
  const [openDropdown, setOpenDropdown] = useState(false);
  const [openAddEditTask, setOpenAddEditTask] = useState(false);
  const [boardType, setBoardType] = useState("add");

  const dispatch = useDispatch();

  const boards = useSelector((state) => state.boards);
  const board = boards.find((board) => board.isActive);

  return (
    <div className=" p-4 fixed left-0 bg-white dark:bg-[#2b2c37] z-50 right-0">
      <header className="flex justify-between dark:text-white items-center">
        {/* left side */}

        <div className=" flex items-center space-x-2 md:space-x-4 ">
          <img src={logo} alt="logo" className=" h-6 w-6" />
          <h3 className=" hidden md:inline-block font-bold font-sans md:text-4xl ">
            Task
          </h3>
          <div className=" flex items-center ">
            <h3 className=" truncate max-w-[200px] md:text-2xl text-xl font-bold md:ml-20 font-sans ">
              {board.name}
            </h3>
            <img
              src={openDropdown ? iconUp : iconDown}
              alt="dropdown icon"
              className=" w-3 ml-2 cursor-pointer md:hidden "
              onClick={() => setOpenDropdown((state) => !state)}
            />
          </div>
        </div>

        {/** Right */}

        <div className=" flex space-x-4 items-center md:space-x-6">
          <button className=" hidden md:block button">+ Add New Task</button>

          <button
            onClick={() => {
              setOpenAddEditTask((state) => !state);
            }}
            className=" button py-1 px-3 md:hidden"
          >
            +
          </button>
          <img src={elipsis} alt="elipsis" className=" cursor-pointer h-6" />
        </div>
      </header>

      {openDropdown && (
        <HeaderDropdown
          setBoardModalOpen={setBoardModalOpen}
          setOpenDropdown={setOpenDropdown}
        />
      )}

      {boardModalOpen && (
        <AddEditBoardModal
          type={boardType}
          setBoardModalOpen={setBoardModalOpen}
        />
      )}
      {openAddEditTask && (
        <AddEditTaskModal
          setOpenAddEditTask={setOpenAddEditTask}
          device="mobile"
        />
      )}
    </div>
  );
}

export default Header;
