import { createContext, useState } from 'react'

const EditContext = createContext()

export default function ToggleEdit({children}) {

  const [edit, setEdit] = useState(false)

  return (
    <EditContext.Provider value={{edit, setEdit}}>
      {children}
    </EditContext.Provider>
  )
}

export { EditContext }
