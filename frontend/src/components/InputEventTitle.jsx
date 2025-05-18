import React from 'react'

const InputEventTitle = () => {
  return (
    <div>
        <label htmlFor="title">イベント名</label>
        <input name="title" placeholder="イベント名" className="w-full border p-2 rounded" />
    </div>
  )
}

export default InputEventTitle;