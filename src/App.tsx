import { useEffect, useState } from 'react'
import ToDoCard from './components/ToDoCard'
import NewTaskForm from './components/NewTaskForm'

const App = () => {
  const [data, setData] = useState<any[] | null>(null)
  const [reload, setReload] = useState(false)

  const handleNewTask = () => {
    setReload(!reload)
  }

  useEffect(() => {
    const fetchData = async () => {
      const myHeaders = new Headers()
      myHeaders.append('Content-Type', 'application/json')
      myHeaders.append('Accept', 'application/json')
      myHeaders.append('Authorization', 'Bearer 3|jrV9AINSDRbh2V2q08rdCAjoOc5K44rQfwXWTZGBefeafad5')

      const requestOptions: RequestInit = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
      }

      try {
        const response = await fetch('https://prueba-tecnica-cobra-backend.test/api/tasks', requestOptions)
        const result = await response.json()
        setData(result.data)
      } catch (error) {
        console.log('Error: ', error)
      }
    }

    fetchData()
  }, [reload])

  return (
    <div className="container">
      <h1 className="text-center mb-4">To Do App</h1>

      <NewTaskForm onNewTask={handleNewTask}/>

      {data?.map((task) => (
        <ToDoCard key={task.id} task={task}/>
      ))}
    </div>
  )
}

export default App
