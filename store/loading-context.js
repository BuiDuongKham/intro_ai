import {createContext, useState} from "react";

export const LoadingContext = createContext({
  state: null , // initial value: isLoading, isEnd, message
  showLoading: function (){},
  hideLoading: function (){},
})

export const LoadingContextProvider = (props) =>
{
  const [state, setState] = useState(null)
  const showHandler = (message) => {
    setState({
      isLoading: true,
      isEnd: message.is_game_over,
      message: message.message,
    })
  }
  const hideHandler = () => {
    setState(null)
  }

  const context = {
    state: state,
    showLoading: showHandler,
    hideLoading: hideHandler,
  }

  return (
    <LoadingContext.Provider value={context}>
      {props.children}
    </LoadingContext.Provider>
  )
}