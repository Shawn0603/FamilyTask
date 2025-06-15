import './App.css';
import { useState } from 'react';
import AddTask from './components/AddTask';
import TaskItem from './components/TaskItem';
import { useTaskStore } from './store/useTaskStore';
import { useAuthStore } from './auth/useAuthStore';

function App() {
  
  const [viewMode, setViewMode] = useState<'main' | 'trash'>('main');

  const logout = useAuthStore(state => state.logout);

  const tasks = useTaskStore(state => state.tasks);
  const addTask = useTaskStore(state => state.addTask);
  const toggleTask = useTaskStore(state => state.toggleTask);
  const deleteTask = useTaskStore(state => state.deleteTask);
  const restoreTask = useTaskStore(state => state.restoreTask);
  const permanentlyDeleteTask = useTaskStore(state => state.permanentlyDeleteTask);
  const setTasks = useTaskStore(state => state.setTasks);

  
  const today = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="app-container">
      <div className="sticky-header">
        <div className="header">
          <h1>To-Do List</h1>
          <span className="date">{today}</span>
          <button className="logout-btn" onClick={logout}>Logout</button>
        </div>

        

        <AddTask onAddTask={addTask} />
      </div>

      <div className="feature-bar">
        {viewMode === 'main' ? (
          <>
            <button className="feature-button">⭐ Starred</button>
            <button className="feature-button">⏰ Reminders</button>
            <button
              className="feature-button"
              onClick={() => setViewMode('trash')}
            >
              🗑️ Trash
            </button>
          </>
        ) : (
          <>
            <button
              className="feature-button back-button"
              onClick={() => setViewMode('main')}
            >
              🔙 Back
            </button>
            <button
              className="feature-button danger"
              onClick={() => {
                const kept = tasks.filter(task => !task.deleted);
                setTasks(kept);
              }}
            >
              🧹 Clear All
            </button>
          </>
        )}
      </div>

      {viewMode === 'main' ? (
        <div className="task-columns">
          <div className="task-column">
            <h2>Active Tasks</h2>
            {tasks
              .filter(task => !task.completed && !task.deleted)
              .sort((a, b) => {
                if (a.important === b.important) {
                  return (
                    new Date(b.createdAt || 0).getTime() -
                    new Date(a.createdAt || 0).getTime()
                  );
                }
                return a.important ? -1 : 1;
              })
              .map(task => (
                <TaskItem
                  key={task.id}
                  task={task}
                  onToggle={toggleTask}
                  onDelete={deleteTask}
                />
              ))}
          </div>

          <div className="task-column">
            <h2>Completed Tasks</h2>
            {tasks
              .filter(task => task.completed && !task.deleted)
              .map(task => (
                <TaskItem
                  key={task.id}
                  task={task}
                  onToggle={toggleTask}
                  onDelete={deleteTask}
                />
              ))}
          </div>
        </div>
      ) : (
        <div className="task-column trash-view">
          <h2>Deleted Tasks</h2>
          {tasks
            .filter(task => task.deleted)
            .map(task => (
              <TaskItem
                key={task.id}
                task={task}
                onToggle={toggleTask}
                onDelete={permanentlyDeleteTask}
                onRestore={restoreTask}
                isInTrash={true}
              />
            ))}
        </div>
      )}
    </div>
  );
}

export default App;
