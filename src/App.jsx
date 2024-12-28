import React, { useState } from "react";
import Header from "./componets/Header";
import Center from "./componets/Center";
import { useDispatch, useSelector } from "react-redux";
import boardsSlice from "./redux/boardsSlice";

function App() {
  const dispatch = useDispatch();

  const boards = useSelector((state) => state.boards);
  const activeBoard = boards.find((board) => board.isActive);

  if (!activeBoard && boards.length > 0) {
    dispatch(boardsSlice.actions.setBoardActive({ index: 0 }));
  }

  const [boardModalOpen, setBoardModalOpen] = useState(false);

  return (
    <div>
      {/* header */}

      <Header
        boardModalOpen={boardModalOpen}
        setBoardModalOpen={setBoardModalOpen}
      />

      {/* Center */}

      <Center />
    </div>
  );
}

export default App;
