import {BsCircle, BsCircleFill} from "react-icons/bs";
import {AiOutlineChrome} from "react-icons/ai";
import {deepCopy} from "@/public/ultis";
import {
  getWordsAndWhitespaces
} from "next/dist/client/components/react-dev-overlay/internal/components/hot-linked-text/get-words-and-whitespaces";
import {useEffect} from "react";

export default function Othello(props) {
  const {board, possibleMoves, setHandler, fetchTrigger} = {...props}

  const count = () => {
    let black = 0
    let white = 0
    for (let i = 0; i < 8; ++i) {
      for (let j = 0; j < 8; ++j) {
        if (board[i][j] === -1) {
          ++black
        } else if (board[i][j] === 1) {
          ++white
        }
      }
    }
    return {black: black, white: white}
  }

  const checkPossibleMove = (i, j) => {
    for (let k = 0; k < possibleMoves.length; ++k) {
      if (possibleMoves[k][0] === i && possibleMoves[k][1] === j) {
        return true
      }
    }
    return false
  }
  const clickHandler = async (i, j) => {
    const newBoard = deepCopy(board)
    const oldBoard = deepCopy(board)
    newBoard[i][j] = -1
    // change the board
    for (let m of [-1, 0, 1]) {
      for (let n of [-1, 0, 1]) {
        if (m === 0 && n === 0) continue
        let x = i + m
        let y = j + n
        while (x >= 0 && x < 8 && y >= 0 && y < 8 && newBoard[x][y] !== -1) {
          x += m
          y += n
        }
        if (x >= 0 && x < 8 && y >= 0 && y < 8 && newBoard[x][y] === -1) {

          // check the line from (i,j) to (x,y) contains only 1

          let k = true

          for (let u = i + m, v = j + n; u !== x || v !== y; u += m, v += n) {
            if (newBoard[u][v] !== 1) {
              k = false
              break
            }
          }

          if (k) {

            while (x !== i || y !== j) {
              if (newBoard[x][y] === 1) {
                newBoard[x][y] = -1
              }
              x -= m
              y -= n
            }
          }
        }
      }
    }
    setHandler(newBoard)
    console.log('sent board', oldBoard)
    console.log('sent pos', [i, j])
    setTimeout(async () => {
      await fetchTrigger(oldBoard, [i, j], -1)
    }, 1000)
  }

  return (
    <div className={'flex flex-col items-center justify-center'}>
      {board.map((row, i) =>
        (
          <div key={i} className={'flex'}>
            {row.map((cell, j) =>
              (
                <div key={j} className={'flex flex-row gap-10'}>
                  <div className={`flex justify-center items-center border-2 w-20 h-20 text-justify`}>
                    <button disabled={!checkPossibleMove(i, j)}
                            className={'w-full h-full flex justify-center items-center'} onClick={async () => {
                      await clickHandler(i, j)
                    }}>{cell === 1 ? <BsCircle size={30} className={'text-black'}/> : cell === -1 ?
                      <BsCircleFill size={30} className={'text-black'}/> : checkPossibleMove(i, j) ? (
                        <AiOutlineChrome size={30} className={'animate-pulse duration-1000 text-red-500'}/>) : <> <BsCircle
                        className={'text-white'}/> </>} </button>
                  </div>
                </div>
              ))
            }
          </div>
        ))}
      <div>
        <div className={'flex flex-row justify-center items-center gap-2'}>
          Your score: {count().black}
        </div>
        <div className={'flex flex-row justify-center items-center gap-2'}>
          Computer score: {count().white}
        </div>
      </div>
    </div>
  )
}