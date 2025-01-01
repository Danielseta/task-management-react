import { shuffle } from "lodash";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function Column({ colIndex }) {
  const colors = [
    "bg-red-500",
    "bg-orange-500",
    "bg-blue-500",
    "bg-purple-500",
    "bg-green-500",
    "bg-indigo-500",
    "bg-yellow-500",
    "bg-pink-500",
    "bg-sly-500",
  ];

  const [color, setColor] = useState(null);

  const dispatch = useDispatch();
  const boards = useSelector((state) => state.boards);
  const board = boards.find(board.isActive);
  const col = board.column.find((col, i === colIndex));

  useEffect(() => {
    setColor(shuffle(colors).pop()); // OTP
  }, [dispatch]);

  return <div></div>;
}

export default Column;
