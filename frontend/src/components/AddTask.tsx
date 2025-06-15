import { useState } from 'react';

interface AddTaskProps {
  onAddTask: (text: string) => void;
}

function AddTask({ onAddTask }: AddTaskProps) {
  const [input, setInput] = useState('');

  const handleAdd = () => {
    if (!input.trim()) return;
    onAddTask(input); 
    setInput('');
  };

  return (
    <div className="add-task">
      <input
        type="text"
        placeholder="Enter new task"
        value={input}
        onChange={e => setInput(e.target.value)}
      />
      <button onClick={handleAdd}>Add</button>
    </div>
  );
}

export default AddTask;
