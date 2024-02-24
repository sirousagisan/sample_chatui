import { useState, createContext } from "react";
import MessageCard from "../MessageCard";

const MessagesContext = createContext()
const MessagesDispatchContext = createContext()

const MessageProvider = ({children}) => {
  const [ state, SetState ] = useState([])
  return (
    <MessagesContext.Provider value={state}>
      <MessagesDispatchContext.Provider value={SetState}>
        { children }
      </MessagesDispatchContext.Provider>
    </MessagesContext.Provider>
  )
}

export {MessageProvider, MessagesContext, MessagesDispatchContext}