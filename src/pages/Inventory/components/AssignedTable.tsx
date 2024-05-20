import { Button } from "@/components/ui/button"
import { Employee, Item } from "@/types";


type SelectedEmployees = Employee[];
type AssignedItems = Item[];

interface AssignedTableProps  {
  selectedEmployees: SelectedEmployees,
  assignedItems: AssignedItems

}

function AssignedTable({assignedItems, selectedEmployees}: AssignedTableProps) {
  return (
    <div>
    <div>Assignments</div>
    <div>
          {selectedEmployees.length > 0 ? (
            <div>
              {selectedEmployees.map((employee: Employee) => {
                return <p key={employee.empId}> {employee.employeeName} </p>;
              })}
            </div>
          ) : (
            <div>No Employee Selected!</div>
          )}
      </div>
     { assignedItems.length > 0 ?
          <div>
            {assignedItems.map((item: Item) => {
              return (
                <div key={item.itemId}>{item.itemName} | {item.partNumber} | {item.quantity}| {item.price}</div>
              )
            })}
          </div>
          
         : <div>Item Not Found</div>
        
        }
    <Button variant='outline'>Assign</Button>
    </div>
  )
}

export default AssignedTable