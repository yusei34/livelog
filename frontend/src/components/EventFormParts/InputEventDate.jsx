import React from 'react'

const InputEventDate = () => {
  return (
    <div>
        <label htmlFor="date">開催日</label>
        <input type='date' name="event_date" placeholder="開催日" className="w-full border p-2 rounded" />
    </div>
  )
}

export default InputEventDate;