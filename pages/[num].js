import {useForm, SubmitHandler} from "react-hook-form";
import {useEffect, useState} from "react";
import {Matrix} from "@/components/matrix";
import {shuffle} from "@/public/ultis";
import React from "react";
export default function (props) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setValue
  } = useForm();
  const num = props.number
  const [isLoaded, setIsLoaded] = useState(false)
  const [isSent, setIsSent] = useState(false)
  const [time, setTime] = useState(0)
  const res = []

  const shuffleHandler = (data) => {
    const dum = []
    for (let i = 0; i < num; i++) {
      const tmp = []
      for (let j = 0; j < num; j++) {
        tmp.push(watch(`${i}${j}`))
      }
      dum.push(tmp)
    }
    const res = shuffle(dum, watch('iterations'))
    for (let i = 0; i < num; i++) {
      for (let j = 0; j < num; j++) {
        setValue(`${i}${j}`, res[i][j])
      }
    }
  }
  const [result, setResult] = useState(undefined)
  for (let i = 0; i < num; i++) {
    const tmp = []
    for (let j = 0; j < num; j++) {
      tmp.push(`${i}${j}`)
    }
    res.push(tmp)
  }

  // pagination
  const [page, setPage] = useState(0)

  const nextPage = () => {
    setPage(Math.min(page + 1, result.length - 1))
  }
  const prevPage = () => {
    setPage(Math.max(page - 1,0))
  }
  const desiredState = () =>
  {
    const n = num
    const res = []
    for (let i = 0; i < n; i++) {
      const tmp = []
      for (let j = 0; j < n; j++) {
        tmp.push(i*n+j)
      }
      res.push(tmp)
    }
    return res
  }
  const onSubmit = async (data) => {
    setPage(0)
    setIsSent(false)
    setResult(undefined)
    setIsLoaded(true)
    const dum = []
    for (let i = 0; i < num; i++) {
      const tmp = []
      for (let j = 0; j < num; j++) {
        tmp.push(data[`${i}${j}`])
      }
      dum.push(tmp)
    }
    const res = await fetch('http://localhost:8000/', {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        initial_state: dum,
        desired_state: desiredState(),
        method: {
          name: watch('method'),
          option: watch('max_depth'),

        }
      }),
    })

    const result = await res.json()
    if (result.is_found === true) {
      setResult(result.result)
      setTime(result.time)
    }
    setIsSent(true)
    setIsLoaded(false)
  }
  useEffect(()=>
  {
  }, [result])
  console.log(watch('method'))
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={''}>
        {
          res.map((row, i) =>
            <div className={'flex justify-center gap-2'} key={row}>
              {row.map((cell,j) =>
                <input className={'w-20 h-20 border-2 m-2 text-center text-3xl'}  defaultValue={i*num+j} min={0} max={num*num-1} type={'number'} key={cell} {...register(cell, {required: true, setValueAs: v => parseInt(v)})}/>)
              }
            </div>)
        }
        </div>
        <div className={'flex justify-center mt-6'}>
          <select className={'border-2'} {...register('method')}>
            <option value={'heuristic1'}>Heuristic 1</option>
            <option value={'dfs'}>DFS</option>
            <option value={'bfs'}>BFS</option>
            <option value={'lim_dfs'}>DFS Limit Depth</option>
          </select>
        </div>
        <div className={'flex justify-center'}>
          <input  className={'border-2'} type={'number'} defaultValue={1} {...register('iterations')} placeholder={'shuffle loop'}/>
          <input  className={'border-2'} type={'number'} {...register('max_depth', {setValueAs: v=>parseInt(v)})} placeholder={'Maximum Depth'}/>
        </div>
        <div className={'flex justify-center mt-6 '}>
          <input className={'border-2 p-4 rounded-[10px] hover:bg-blue-600 hover:text-white transition-all duration-300'} type={'submit'}/>
          <button className={'border-2 p-4 rounded-[10px] hover:bg-blue-600 hover:text-white transition-all duration-300'} type={'button'} onClick={shuffleHandler}>Shuffle</button>
        </div>
      </form>
    <div>
      {isLoaded &&
        <div className={'flex justify-center'}>
          <img className={'w-96 h-96'} src={'data:image/jpeg;base64,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'}/>
        </div>
      }
      {isSent === false ?
        <></>:
        result === undefined ?
          <div className={'flex justify-center'}>
            <img className={'w-96 h-96'} src={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNWkwwKsZdfhYQim4NLSHXExTU5Ne8_EFQVfF2O7HE3A&s'}/>
          </div>
        :<div className={'mt-4'}>
          <Matrix matrix={result[page]}/>
          <div className={'flex justify-center gap-2 mt-4'}>
            <button className={'border-2 p-4 rounded-[10px]'} onClick={prevPage}>Prev ({page})</button>
            <button className={'border-2 p-4 rounded-[10px]'} onClick={nextPage}>Next ({result.length - page-1})</button>
          </div>

          <div className={'flex justify-center mt-4'}>
            <p>Time: {time} s</p>
          </div>
        </div>
      }
    </div>
  </>
  )
}

export function getServerSideProps( context ) {
  const { params } = context
  return {
    props: {
      number: params.num
    }
  }
}