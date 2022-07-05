import React from 'react'

function Square({ player, onClick, idx }) {
    player = player.toUpperCase();

    const scale = player ? "scale-100" : "scale-0";
    const textColor = player === 'X' ? 'text-yellow-200' : "text-fuchsia-300";
    const hoverStyle = "transition duration-500 hover:scale-105 transform"

  return (
    <div 
    data-cell-index ={idx}
    {...{onClick}}
    className={`h-36 border-solid border-4 font-display text-7xl text-center flex justify-center items-center text-white border-slate-200 cursor-pointer ${hoverStyle}`}>
        <span
            data-cell-index={idx}
            className={`transform transition-all duration-150 
                        ease-out ${scale} ${textColor}`}
        >
            {player}
        </span>
    </div>
  )
}

export default Square