export default function Othello(props)
{
  const {board, possibleMoves} = {...props}
  return (
    <div className={'flex justify-center'}>
      {board.map((row, i) =>
        (
          <div key={i} className={'flex flex-col'}>
            {row.map((cell, j) =>
              (
                <div key={j} className={'flex flex-row'}>
                  <div className={`w-20 h-20 text-center`}>{cell}</div>
                  {/*<div className={'w-20 h-20 text-center'}>{possibleMoves[i][j]}</div>*/}
                </div>
              ))
            }
          </div>
        ))}
    </div>
  )
}