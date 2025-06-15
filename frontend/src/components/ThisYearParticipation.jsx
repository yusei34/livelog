'use client';

import React, { useEffect, useState } from 'react'

const ThisYearParticipation = () => {
    
    const [date, setDate] = useState('');

    const now = new Date();
    useEffect(() => {
       setDate(now.getFullYear())
    }, [])

        
    
  return (
    <div className='flex flex-col border border-green-500 rounded-xl'>
        <div className='font-bold text-lg text-green-500'>今年の参戦数</div>
        <div className='self-center font-extrabold text-2xl text-green-600'>2回</div>
        <div>{date}</div>

    </div>
  )
}

export default ThisYearParticipation