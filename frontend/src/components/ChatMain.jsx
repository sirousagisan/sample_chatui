import React, { useState, useRef, useEffect, useContext } from 'react'
import { IoIosSend } from "react-icons/io";
import { useForm } from 'react-hook-form'

import MessageCard from './MessageCard';
import { MessagesContext, MessagesDispatchContext } from './contexts/messages';

const ChatMain = () => {
  const { handleSubmit, watch, register, reset } = useForm()
  const [inputValue, setInputValue] = useState('');
  const [textareaHeight, setTextareaHeight] = useState('48px');
  const messagesEndRef = useRef(null); 
  const messages = useContext(MessagesContext) || []
  const setMessages = useContext(MessagesDispatchContext)
  const [ botMsg, setBotMsg ] = useState("")

  const streamRes = async (path, question, update) => {
    // const messages = useContext(MessagesContext) || []
    // const SetMessages = useContext(MessagesDispatchContext)
    
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
      if (messagesEndRef.current) {
        messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setMessages((prev) => [...prev, { type: "bot", message: text }]);
    update("")
    
  }
  const onSubmit = () => {
  
    // console.log(res);
    setTextareaHeight("48px");
    setMessages((prev) => 
      [...prev, {type: "user", message: inputValue}]
    );
    streamRes("/chat", inputValue, (value) => {
      setBotMsg(value)
    })
    
    setInputValue("");
    reset();
    
  };

  const onError = (errors) => {
    // バリデーションエラー時の処理
    console.error(errors);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && (event.ctrlKey || event.metaKey)) {
      handleSubmit(onSubmit, onError)();
    }
  };

  // useEffect(() => {
  //   if (messagesEndRef.current) {
  //     messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
  //   }
  // }, [botMsg]);
  
  return (
<>
  
  {/* <Nav /> */}
  <div className="flex flex-col justify-center h-screen lg:mx-60 xl:mx-96 ">
    <div className="flex flex-row min-w-full h-full my-8 overflow-scroll" >
      <div className='flex flex-col'>
        {/* sample content */}
      <MessageCard key={0} message={"こんにちは。質問をどうぞ！"} type={"bot"} />
      {messages.map((msg, idx) => {
        return <MessageCard key={idx} message={msg.message} type={msg.type} />
      })}
      {botMsg!="" ? <MessageCard key={999} message={botMsg} type={"bot"} /> : <></>}
      </div>
      <div ref={messagesEndRef} />
      <div></div>
    </div>
    <form className="flex flex-row mb-4" onSubmit={handleSubmit(onSubmit, onError)}>
      <textarea  type="text" className='sticky bottom-2 self-item-center bg-stone-800 text-gray-200 py-2 px-4 border-2 border-gray-400 rounded-xl text-md resize-none overflow-hidden w-full ' 
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        onInput={(e) => {
            e.target.style.height = '48px';
            e.target.style.height = e.target.scrollHeight + 'px';
            setTextareaHeight(e.target.scrollHeight + 'px');
          }}
          style={{ height: textareaHeight }}
            />
      <button onClick={handleKeyDown} className='absolute bottom-4 right-80'>
        <IoIosSend className='text-sky-400 text-5xl mx-2'/>
      </button>
    </form>
  </div>
</>
  )
}

export default ChatMain
