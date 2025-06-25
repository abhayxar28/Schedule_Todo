'use client'

import { useState } from 'react'
import { Todo } from "@prisma/client";
import FutureTodos from './futureTodos';
import PastTodos from './pastTodos';

type ScheduleTodosProps = {
  futureTodo: Todo[];  
  pastTodo: Todo[];
}

export default function ScheduleTodos({ futureTodo, pastTodo }: ScheduleTodosProps) {
  const [activeTab, setActiveTab] = useState<'future' | 'past'>('future')

  return (
    <div className="h-100 mx-5 bg-[#f7f9fa] mt-5">
      <div className="border h-12 mt-5 w-full flex p-1 bg-[#f5f5f5] rounded">
        <button
          className={`w-1/2 text-center p-2 font-medium ${
            activeTab === 'future' ? 'bg-white' : 'bg-[#f5f5f5]'
          }`}
          onClick={() => setActiveTab('future')}
        >
          Future Tasks
        </button>
        <button
          className={`w-1/2 text-center p-2 font-medium ${
            activeTab === 'past' ? 'bg-white' : 'bg-[#f5f5f5]'
          }`}
          onClick={() => setActiveTab('past')}
        >
          Past Tasks
        </button>
      </div>

      <div className="">
        {activeTab === 'future' && 
            <div>
                <FutureTodos futureTodo={futureTodo}/>
            </div>
        }
        {activeTab === 'past' && 
            <div>
                <PastTodos pastTodo={pastTodo}/>
            </div>
        }
      </div>
    </div>
  )
}
