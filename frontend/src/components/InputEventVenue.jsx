import React from 'react'

const InputEventVenue = () => {
  return (
    <div>
        <label htmlFor="venue">会場</label>
        <input name="venue" placeholder="会場" className="w-full border p-2 rounded" />
    </div>
  )
}

export default InputEventVenue;