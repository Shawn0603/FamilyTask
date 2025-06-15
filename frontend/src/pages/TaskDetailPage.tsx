import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './TaskDetailPage.css';
import { useTaskStore } from '../store/useTaskStore';

function TaskDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as { from?: string })?.from || 'main';

  const tasks = useTaskStore(state => state.tasks);
  const updateTask = useTaskStore(state => state.updateTask);

  // Find the current task
  const task = tasks.find(t => t.id.toString() === id);

  // Local editing status
  const [title, setTitle] = useState('');
  const [notes, setNotes] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [isEditingTitle, setIsEditingTitle] = useState(false);

  useEffect(() => {
    if (task) {
      setTitle(task.text);
      setNotes(task.notes || '');
    }
  }, [task]);

  if (!task) {
    return (
      <div style={{ padding: '24px' }}>
        <p>Task not found.</p>
        <button
          onClick={() => navigate(from === 'trash' ? '/?view=trash' : '/')}
        >
          Back
        </button>
      </div>
    );
  }

  // Toggle Importance
  const toggleImportant = () => {
    updateTask(task.id, { important: !task.important });
  };

  // save editing
  const handleEditOrSave = () => {
    if (isEditing) {
      updateTask(task.id, { notes });
    }
    setIsEditing(prev => !prev);
  };

  // save task title
  const handleEditOrSaveTitle = () => {
    if (isEditingTitle) {
      updateTask(task.id, { text: title });
    }
    setIsEditingTitle(prev => !prev);
  };

  return (
    <div className="task-detail-container">
      <div className="task-header">
        {isEditingTitle ? (
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="title-input"
          />
        ) : (
          <h2>{title}</h2>
        )}
        <button className="edit-title-btn" onClick={handleEditOrSaveTitle}>
          {isEditingTitle ? 'Save' : 'Edit Title'}
        </button>
        <span className="created-time">
          Created at:{' '}
          {task.createdAt
            ? new Date(task.createdAt).toLocaleString()
            : 'Unknown'}
        </span>
      </div>

      <div className="task-actions">
        <button
          className={`action-btn ${task.important ? 'important' : ''}`}
          onClick={toggleImportant}
        >
          🚩
        </button>
        <button className="action-btn" disabled title="Not implemented">
          ⭐
        </button>
        <button className="action-btn" disabled title="Not implemented">
          ⏰
        </button>
      </div>

      <div className="task-note">
        <textarea
          placeholder="some note..."
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          readOnly={!isEditing}
        />
      </div>

      <div className="task-footer-buttons">
        <button className="action-btn" onClick={handleEditOrSave}>
          {isEditing ? '💾 Save' : '✏️ Edit'}
        </button>
        <button
          className="action-btn"
          onClick={() => navigate(from === 'trash' ? '/?view=trash' : '/')}
        >
          🔙 Back
        </button>
      </div>
    </div>
  );
}

export default TaskDetailPage;
