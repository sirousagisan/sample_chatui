import React, { useState, useRef, useEffect } from 'react'
import MessageCard from './MessageCard';
import { IoIosSend } from "react-icons/io";
import { useForm } from 'react-hook-form'


import Nav from './Nav'

const ChatMain = () => {
  const { handleSubmit, watch, register, reset } = useForm()
  const [inputValue, setInputValue] = useState('');
  const [textareaHeight, setTextareaHeight] = useState('48px');
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null); 

  const onSubmit = (data) => {
    setInputValue("")
    setTextareaHeight("48px")
    setMessages([...messages, {type: "user", message: inputValue}])
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

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);
  
  return (
<>
  
  {/* <Nav /> */}
  <div className="flex flex-col justify-center h-screen lg:mx-60 xl:mx-96 ">
    <div className="flex flex-row min-w-full h-full my-8 overflow-hidden" >
      <div className='flex flex-col'>
        {/* sample content */}
      <MessageCard key={0} message={"こんにちは。質問をどうぞ！"} type={"bot"} />
      {messages.map((msg, idx) => {
        return <MessageCard key={idx} message={msg.message} type={msg.type} />
      })}
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