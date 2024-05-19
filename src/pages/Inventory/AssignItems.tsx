import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input"
import AssignTable from "./components/AssignTable";


type Employee = {
  empId: number;
  employeeName: string;
};


const ALL_EMPLOYEE: Employee[] = [
  {
    "empId": 1,
    "employeeName": "Samarth Negi"
  },
  {
    "empId": 2,
    "employeeName": "Ishaan Patel"  // Random name
  },
  {
    "empId": 3,
    "employeeName": "Maya Garcia"  // Random name
  },
  {
    "empId": 4,
    "employeeName": "Dominic Nguyen"  // Random name
  },
  {
    "empId": 5,
    "employeeName": "Evelyn Kim"  // Random name
  },
  {
    "empId": 6,
    "employeeName": "Anthony Lewis"  // Random name
  },
  {
    "empId": 7, 
    "employeeName": "Sophia Lopez"  // Random name
  },
  {
    "empId": 8,
    "employeeName": "William Robinson"  // Random name
  },
  {
    "empId": 9,
    "employeeName": "Ava Clark"  // Random name
  },
  {
    "empId": 10,
    "employeeName": "Daniel Johnson"  // Random name
  }
]

const data: Inventory[] = [
  {
    itemId: 1,
    itemName: "Wrench",
    partNumber: "WR-001",
    quantity: 50,
    price: 12.99
  },
  {
    itemId: 2,
    itemName: "Screwdriver",
    partNumber: "SD-002",
    quantity: 150,
    price: 8.49
  },
  {
    itemId: 3,
    itemName: "Hammer",
    partNumber: "HM-003",
    quantity: 85,
    price: 15.75
  },
  {
    itemId: 4,
    itemName: "Pliers",
    partNumber: "PL-004",
    quantity: 60,
    price: 10.99
  },
  {
    itemId: 5,
    itemName: "Drill",
    partNumber: "DR-005",
    quantity: 30,
    price: 45.00
  },
  {
    itemId: 6,
    itemName: "Tape Measure",
    partNumber: "TM-006",
    quantity: 120,
    price: 6.89
  },
  {
    itemId: 7,
    itemName: "Utility Knife",
    partNumber: "UK-007",
    quantity: 200,
    price: 5.50
  },
  {
    itemId: 8,
    itemName: "Level",
    partNumber: "LV-008",
    quantity: 75,
    price: 9.99
  },
  {
    itemId: 9,
    itemName: "Allen Key Set",
    partNumber: "AK-009",
    quantity: 40,
    price: 18.25
  },
  {
    itemId: 10,
    itemName: "Socket Set",
    partNumber: "SS-010",
    quantity: 25,
    price: 35.00
  }
];

console.log(data)

 
export type Inventory = {
  itemId: number
  itemName: string
  partNumber: string
  quantity: number
  price: number
}
 


export function AssignItems() {

  const [searchTerm, setSearchTerm] = useState("");
  const [filteredEmployees, setFilteredEmployees] = useState<Employee[]>([]);
  const [selectedEmployees, setselectedEmployees] = useState<Employee[]>([]);


  useEffect(() => {
    setFilteredEmployees(ALL_EMPLOYEE.filter( (employee) => {

      if ( !(searchTerm.length === 0) ) 
        {
          return employee.employeeName.toLowerCase().startsWith(searchTerm.toLowerCase())
        }

    }))
  }, [searchTerm])
  

  function searchEmployeeClick(key: number, name: string) {
    console.log("Employee Clicked")
    console.log(name, key)
    

    const searchEmployee = {
      empId: key,
      employeeName: name
    }

    console.log(searchEmployee)
    console.log(selectedEmployees)

    const employeeExists = selectedEmployees.some((employee) => {
      if ( employee.empId == key ) {
        return true
      }
      return false
    })

    if ( employeeExists ) {
        console.log("Employee already added!")
      }
    else {
      console.log("Employee doesn't exist")
      setselectedEmployees([...selectedEmployees, searchEmployee])
    
    }

   
  }

  return (
    <div className="w-full h-[90vh] rounded bg-white p-4 flex flex-row">
      
      <div>
      <div>
            { selectedEmployees.length > 0 ? ( 
              <div>{selectedEmployees.map((employee) => {
                return <p key={employee.empId}> {employee.employeeName} </p>
              })}</div>
            ) : (
              <div>No Employee Selected!</div>
              )
            }
          </div>
          <Input type="text" onChange={(e) => {
                setSearchTerm(e.target.value);
                console.log(searchTerm)
              }} placeholder="Employee Name" />

              <div className="bg-slate-300">
                {
                  filteredEmployees.length > 0 ? (
                    <ul>
                      {filteredEmployees.map((employee) => {
                        return(
                          <li className='hover:bg-slate-300' key={employee.empId} onClick={() => { searchEmployeeClick(employee.empId, employee.employeeName) }}>{employee.employeeName}</li>
                        )
                      })}
                    </ul>
                  ) : ( 
                  // <p>No user found</p> 
                  <></>
                )}
              </div  >

            <AssignTable />
      </div>
      <div>
        Assigned Items
      </div>
      
       
          

    </div>
    
  )
}


export default AssignItems
