import {LoadingContext} from "@/store/loading-context";
import {useContext} from "react";
export default function Layout(props){
  const loadingContext = useContext(LoadingContext)

  return (
    <>
      {props.children}
      {loadingContext.state && loadingContext.state.isLoading &&
         <div className={'fixed top-0 left-0 w-full h-full bg-gray-500 bg-opacity-50 flex justify-center items-center'}>
            <div className={'flex flex-col justify-center items-center'}>
              <div className={'flex flex-row justify-center items-center gap-2'}>
                <div className={'animate-bounce bg-red-500 w-5 h-5 rounded-full'}></div>
                <div className={'animate-bounce bg-green-500 w-5 h-5 rounded-full'}></div>
                <div className={'animate-bounce bg-blue-500 w-5 h-5 rounded-full'}></div>
              </div>
            </div>
           <div className={'flex flex-col justify-center text-2xl items-center'}> {loadingContext.state.message} </div>
           {loadingContext.state.is_game_over && <div className={'flex flex-col justify-center items-center'}> <button onClick={loadingContext.hideLoading}> Game Over </button> </div>}
          </div>
      }
    </>
  )
}