import React from 'react'

const MessageCard = ({message, type}) => {
  return (
    <div className={`text-blue-200 mb-8 py-2 px-4 `}>
      <div className="flex item-center mb-2">
        <img src={type === 'user' ? 'man.svg' : 'robot.svg'} alt="SVG" width={30} height={30} className={type === 'user' ? 'bg-green-500 rounded-full' : 'bg-sky-400 rounded-full'} />
        <span className='ml-4 text-xl font-semibold'>{type === 'user' ? 'あなた' : 'Bot'}</span>
      </div>
      <div className="text-md ml-8 ">
        {message}
      </div>
    </div>
  );
}

export default MessageCard