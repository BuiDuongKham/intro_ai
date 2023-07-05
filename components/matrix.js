export const Matrix = (props) => {
  const {matrix} = {...props}
  return(
    <div className={'flex justify-center'}>
      <table className={'border-2'}>
        <tbody>
        {
          matrix.map((row, i) =>
            <tr key={row}>
              {row.map((cell, j) =>
                <td className={`w-20 h-20 text-center ${cell === 0 && 'bg-red-800 text-red-800'}`} key={cell}>{cell}</td>)

              }
            </tr>)
        }
        </tbody>
      </table>
    </div>
  )
}