import { useContext } from "react"
import { MessagesContext, MessagesDispatchContext } from "../contexts/messages"

const useStreaming = () => {
  const streamRes = async (path, question, update) => {
    const messages = useContext(MessagesContext) || []
    const SetMessages = useContext(MessagesDispatchContext)
    const url = "http://127.0.0.1:8080" + path
    const res = await fetch(url, {
      method: "POST",
      headers: {"content-type": "application/json"},
      body: JSON.stringify({text: question})
    })
    const data = res.body 
    const reader = data.getReader()
    const decoder = new TextDecoder()
    let text = ""
    let done = false
    while (!done) {
      const { value, done: doneReading } = await reader.read();
      done = doneReading
      text += decoder.decode(value);
      update(text + (done ? "" : "▊"))
    }
    SetMessages([...messages, {type: "bot", message: text}])
  }
  return streamRes
}

export { useStreaming }
