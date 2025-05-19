// 'use client';

import Link from 'next/link';
import React from "react";

const InputEventActors = ({onClick}) => {
  return (
    <>
    <div>
      <label>出演アーティスト</label>
      </div>  
    <div>
      <Link href='/actors/select'>
      <button
      type="button"
      onClick={onClick} 
      className="bg-blue-600 text-white px-4 py-2 rounded">
        追加
      </button>
      </Link>
    </div>
    </>
  );
};

export default InputEventActors;
