import React from 'react'
import { useFormStatus } from 'react-dom'

const SubmitButton = () => {
    const { pending } = useFormStatus()
  return (
    <button
        type="submit"
        disabled={pending}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        {pending ? '送信中...' : '登録'}
      </button>
  )
}

export default SubmitButton

