'use client';
import React from "react";

const InputEventActors = ({onClick}) => {
  return (
    <>
    <div>
      <label>出演アーティスト</label>
      </div>  
    <div>
      <button
      type="button"
      onClick={onClick} 
      className="bg-blue-600 text-white px-4 py-2 rounded">
        追加
      </button>
    </div>
    </>
  );
};

export default InputEventActors;
