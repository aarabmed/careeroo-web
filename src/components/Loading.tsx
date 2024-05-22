import React from 'react'

export default function index() {
    return (
        <div className='blink w-14 h-14 flex items-center justify-center'>
            <div className={"justify-center shapeshifter mb-2 play scale-125 flex items-end"} style={{backgroundImage: "url(/svg/sprite_60fps.svg)"}}>
                <p className='text-xs'>loading...</p>
            </div>
        </div>
    )
}
