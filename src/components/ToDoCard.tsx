const ToDoCard = ({ task }: { task: Task }) => {
  return (
    <div className="todo-card p-4 bg-light border-botom">
      <div className="todo-card__header mb-3 d-flex justify-content-between align-center gap-4">
        <h2 className="todo-card__title">{task.title}</h2>
        {task.completed
          ? (
          <span className="badge rounded-pill text-bg-success">Completada</span>
            )
          : (
          <span className="badge rounded-pill text-bg-danger">Pendiente</span>
            )}
      </div>
      <div className="todo-card__description">
        {task.description}
      </div>
    </div>
  )
}

export default ToDoCard
