"use client"
import React, { useState } from 'react'


const Page = () => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [mainTask, setMainTask] = useState([]);
  const [editIndex, setEditIndex] = useState(-1);

  const submitHandler = (e) => {
    if (title.trim() === "") {
    alert("Title cannot be empty!"); // Show an alert message
    return; // Exit the function early
  }
    e.preventDefault();
    if (editIndex === -1) {
      setMainTask([...mainTask, { title, desc }]);
    } else {
      const updatedTasks = [...mainTask];
      updatedTasks[editIndex] = { title, desc };
      setMainTask(updatedTasks);
      setEditIndex(-1);
    }
    setTitle("");
    setDesc("");
  };

  const deleteHandler = (i) => {
    let copytask = [...mainTask];
    copytask.splice(i, 1);
    setMainTask(copytask);
  };

  const updateHandler = (i) => {
    setTitle(mainTask[i].title);
    setDesc(mainTask[i].desc);
    setEditIndex(i);
  };

  let renderTask = <h2 className='text-center text-gray-500'>No task available</h2>;
  if (mainTask.length > 0) {
    renderTask = mainTask.map((t, i) => (
      <li key={i} className='flex items-center justify-between mb-8 bg-white p-5 rounded-lg shadow-md'>
        <div className='flex justify-between mb-5 w-2/3'>
          <h5 className='text-2xl font-semibold text-blue-600'>{t.title}</h5>
          <h6 className='text-xl font-semibold text-gray-500'>{t.desc}</h6>
        </div>
        <div className='flex space-x-4'>
          <button
            onClick={() => deleteHandler(i)}
            className='bg-red-400 text-white px-4 py-2 rounded font-bold hover:bg-red-500 transition'
          >
            Delete
          </button>
          <button
            onClick={() => updateHandler(i)}
            className='bg-yellow-400 text-white px-4 py-2 rounded font-bold hover:bg-yellow-500 transition'
          >
            Update
          </button>
        </div>
      </li>
    ));
  }

  return (
    <>
      <h1 className='bg-gradient-to-r from-blue-500 to-purple-600 text-white p-5 text-5xl font-bold text-center rounded-lg shadow-lg'>
        My ToDoList
      </h1>
      <form onSubmit={submitHandler} className='bg-white p-8 rounded-lg shadow-md'>
        <input
          type='text'
          className='text-2xl border border-gray-300 rounded-lg m-5 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
          placeholder='Enter Title Here '
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type='text'
          className='text-2xl border border-gray-300 rounded-lg m-5 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
          placeholder='Enter Description Here '
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />
        <button className='font-bold text-2xl border-4 bg-green-400 text-white px-4 py-2 m-5 rounded-lg hover:bg-green-500 transition'>
          {editIndex === -1 ? 'Add Task' : 'Save Task'}
        </button>
      </form>
      <hr />
      <div className='p-8 m-5 bg-gray-100 rounded-lg shadow-lg'>
        <ul>
          {renderTask}
        </ul>
      </div>
    </>
  );
}

export default Page;
