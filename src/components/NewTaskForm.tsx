import { useForm } from 'react-hook-form'

const NewTaskForm = ({ onNewTask }: { onNewTask: () => void }) => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>()

  const onSubmit = async (data: FormData) => {
    const myHeaders = new Headers()
    myHeaders.append('Content-Type', 'application/json')
    myHeaders.append('Accept', 'application/json')
    myHeaders.append('Authorization', 'Bearer 3|jrV9AINSDRbh2V2q08rdCAjoOc5K44rQfwXWTZGBefeafad5')

    const requestOptions: RequestInit = {
      method: 'POST',
      headers: myHeaders,
      body: JSON.stringify(data)
    }

    try {
      const response = await fetch('https://prueba-tecnica-cobra-backend.test/api/tasks', requestOptions)

      if (!response.ok) {
        throw new Error('Error al enviar los datos')
      }

      onNewTask()
      reset()
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="task-form p-4 mb-4">
      <div className="mb-3 row">
        <label htmlFor="title" className="col-sm-3 col-form-label">Título</label>
        <div className="col-sm-9">
          <input type="text" className="form-control" id="title" {...register('title', { required: true, maxLength: 128 })}/>
          {errors.title != null && errors.title.type === 'required' && <span>Este campo es requerido</span>}
          {errors.title != null && errors.title.type === 'maxLength' && <span>Has superado el límite de 128 caracteres.</span>}
        </div>
      </div>
      <div className="mb-3 row">
        <label htmlFor="description" className="col-sm-3 col-form-label">Descripción</label>
        <div className="col-sm-9">
          <textarea className="form-control" id="description" {...register('description', { required: true })}/>
          {errors.description != null && errors.description.type === 'required' && <span>Este campo es requerido</span>}
        </div>
      </div>
      <div className="form-check form-switch mb-3 d-flex justify-content-center gap-3">
        <input className="form-check-input" type="checkbox" id="completed" {...register('completed')}/>
        <label className="form-check-label" htmlFor="completed">
          Completado
        </label>
      </div>
      <div className='text-center'>
        <button type='submit' className="btn btn-primary">Guardar nota</button>
      </div>
    </form>
  )
}

export default NewTaskForm
