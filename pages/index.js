import useSWR from "swr";
import {useEffect} from "react";
import Othello from "@/components/othello";
export default function Home() {
  const dummyBoard = [
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, -1, 0, 0, 0],
    [0, 0, 0, -1, 1, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
  ]
  const dummyPossibleMoves = [
    [2, 3],
    [3, 2],
    [4, 5],
    [5, 4]
  ]
  return (
    <Othello board={dummyBoard} possibleMoves={dummyPossibleMoves}/>
  )
}
