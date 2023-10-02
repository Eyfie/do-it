import TaskForm from "./components/TaskForm"


function TaskApp() {


  return (
      <main>
        <h1>Do it</h1>
        <TaskForm taskTitle="" taskContent="" taskDeadline="" taskId="" taskPriority=""/>
      </main>
  )
}

export default TaskApp
