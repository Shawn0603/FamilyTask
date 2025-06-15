import type { Task } from '../types/task';
import { useNavigate } from 'react-router-dom';


interface TaskItemProps {
  task: Task;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
  onRestore?: (id: number) => void; 
  isInTrash?: boolean;   
}

function TaskItem({ task, onToggle, onDelete, onRestore, isInTrash }: TaskItemProps) {

  const navigate = useNavigate();




  return (
    <li className="task-item">
      <div
         className="task-indicator"
         style={{
              backgroundColor: task.completed
            ? '#34D399' // green for completed
           : task.important
            ? '#EF4444' // red for important
            : '#3B82F6' // blue for normal
          }}
         ></div>


      <div className="task-content">
      {isInTrash ? (
  <span style={{ color: '#888', cursor: 'not-allowed' }}>{task.text}</span>
) : (
  <span onClick={() => navigate(`/task/${task.id}`)}>{task.text}</span>
)}



        {isInTrash ? (
          <button
            className="toggle-btn"
            onClick={() => onRestore?.(task.id)}
          >
            Restore
          </button>
        ) : (
          <button
            className="toggle-btn"
            onClick={() => onToggle(task.id)}
          >
            {task.completed ? 'Activate' : 'Done'}
          </button>
        )}

        <button
          className="delete-btn"
          onClick={() => onDelete(task.id)}
        >
          Delete
        </button>
      </div>
    </li>
  );
}

export default TaskItem;
