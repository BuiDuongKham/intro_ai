import useSWR from "swr";
import {useEffect, useState} from "react";
import Othello from "@/components/othello";
import {LoadingContext} from "@/store/loading-context";
import {useContext} from "react";
export default function Home() {
  const loadingContext = useContext(LoadingContext)
  const [dummyBoard, setDummyBoard] = useState([
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, -1, 0, 0, 0],
    [0, 0, 0, -1, 1, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
  ])
  const [move, setMove] = useState([])
  const [dummyPossibleMoves, setDummyPossibleMoves] = useState([
    [2, 3],
    [3, 2],
    [4, 5],
    [5, 4],
  ])

  const fetchTrigger = async (board, move, turn) => {
    loadingContext.showLoading({message: 'Bình tĩnh, có anh cứu...', is_game_over:false})
    const res = await fetch('http://localhost:8000/',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },

        body: JSON.stringify(
          {
            board: board,
            move: move,
            turn: turn
          }
        ),
    })
    const data = await res.json()
    console.log('last move:', data.move)
    console.log(data)
    if (data.is_game_over) {
      loadingContext.showLoading({message: 'Game Over', is_game_over:true})
    }else {loadingContext.hideLoading()}


    setDummyBoard(data.board)
    setDummyPossibleMoves(data.possible_moves)
    }

    if (dummyPossibleMoves.length === 0) {
    }


  return (
    <Othello board={dummyBoard} possibleMoves={dummyPossibleMoves} setHandler={setDummyBoard} fetchTrigger={fetchTrigger}/>
  )
}
