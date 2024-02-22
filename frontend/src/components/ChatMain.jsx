import React, { useState, useRef, useEffect } from 'react'
import MessageCard from './MessageCard';
import { IoIosSend } from "react-icons/io";
import { useForm } from 'react-hook-form'


import Nav from './Nav'

const ChatMain = () => {
  const { handleSubmit, watch, register, reset } = useForm()
  const [inputValue, setInputValue] = useState('');
  const [textareaHeight, setTextareaHeight] = useState('auto');
  const [messages, setMessages] = useState([]);{}
  const messagesEndRef = useRef(null); 

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey && !e.metaKey && !e.altKey && !e.ctrlKey) {
      e.preventDefault();
      if (inputValue.replaceAll('\n', '') === "") {
        return 
      }
    }
  const submit = () => {
      setInputValue("")
      setMessages([...messages, {type: "user", message: inputValue}])
      setTextareaHeight('auto');
    }
  const enterPost = (keyEvent) => {
      if (!isCompositionend) {
        return
      }
      if (keyEvent.key === 'Enter' && (keyEvent.ctrlKey || keyEvent.metaKey)) {
        submit()
        setIsCompositionend(false)
      }
    }
  };
  return (
<>
  
  {/* <Nav /> */}
  <div className="flex flex-col justify-center h-screen lg:mx-60 xl:mx-96 ">
    <div className="flex flex-row min-w-full h-full my-8 overflow-hidden" >
      <div className='flex flex-col'>
      {messages.map((msg, idx) => {
        return <MessageCard key={idx} message={msg.message} type={msg.type} />
      })}
      <MessageCard key={0} message={"aaa"} type={"bot"} />
      </div>
      <div ref={messagesEndRef} />
      <div></div>
    </div>
    <form className="flex flex-row mb-4" onSubmit={2}>
      <textarea  type="text" className='sticky bottom-2 self-item-center bg-stone-800 text-gray-200 py-2 px-4 border-2 border-gray-400 rounded-xl text-md resize-none overflow-hidden w-full ' 
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        onInput={(e) => {
            e.target.style.height = 'auto';
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