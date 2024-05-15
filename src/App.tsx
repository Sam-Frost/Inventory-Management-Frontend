import AddItems from "./pages/Inventory/AddItems"
import AddEmployee from "./pages/Employee/AddEmployee"
import ShowInventory from "./pages/Inventory/ShowInventory"
import Login from "./pages/Login"
import AssignItems from "./pages/Inventory/AssignItems"


function App() {

  return (
      <div>
        <AddItems />
        <AddEmployee />
        <ShowInventory />
        <br />
        <Login />
        <br />
        <AssignItems />
      </div>
  )
}

export default App
