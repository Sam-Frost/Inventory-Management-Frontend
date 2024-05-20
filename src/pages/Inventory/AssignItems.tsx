import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import AssignTable from "./components/AssignTable";
import AssignedTable from "./components/AssignedTable";


import { Employee } from "@/types";

const ALL_EMPLOYEE: Employee[] = [
  {
    empId: 1,
    employeeName: "Samarth Negi",
  },
  {
    empId: 2,
    employeeName: "Ishaan Patel", // Random name
  },
  {
    empId: 3,
    employeeName: "Maya Garcia", // Random name
  },
  {
    empId: 4,
    employeeName: "Dominic Nguyen", // Random name
  },
  {
    empId: 5,
    employeeName: "Evelyn Kim", // Random name
  },
  {
    empId: 6,
    employeeName: "Anthony Lewis", // Random name
  },
  {
    empId: 7,
    employeeName: "Sophia Lopez", // Random name
  },
  {
    empId: 8,
    employeeName: "William Robinson", // Random name
  },
  {
    empId: 9,
    employeeName: "Ava Clark", // Random name
  },
  {
    empId: 10,
    employeeName: "Daniel Johnson", // Random name
  },
];

export type Inventory = {
  itemId: number;
  itemName: string;
  partNumber: string;
  quantity: number;
  price: number;
};

export function AssignItems() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredEmployees, setFilteredEmployees] = useState<Employee[]>([]);
  const [selectedEmployees, setselectedEmployees] = useState<Employee[]>([]);
  const [assignedItems, setAssignedItems] = useState<Inventory[]>([]);
  const [isEmployeeSearchFocused, setIsEmployeeSearchFocused] = useState<boolean>(false);

  function addAssignedItem(item: Inventory) {
    setAssignedItems([...assignedItems, item]);
    console.log(assignedItems);
  }

  useEffect(() => {
    setFilteredEmployees(
      // ALL_EMPLOYEE.filter((employee) => {
      //   if (!(searchTerm.length === 0)) {
      //     return employee.employeeName
      //       .toLowerCase()
      //       .startsWith(searchTerm.toLowerCase());
      //   }
      // })
      ALL_EMPLOYEE.filter((employee) => {
        const trimmedSearchTerm = searchTerm.trim();
        if (trimmedSearchTerm.length === 0) {
          return true; // Return all employees if searchTerm is empty or just whitespace
        }
        return employee.employeeName.toLowerCase().startsWith(trimmedSearchTerm.toLowerCase());
      })
      
    );
  }, [searchTerm]);

  function searchEmployeeClick(key: number, name: string) {
    console.log("Employee Clicked");
    console.log(name, key);

    const searchEmployee = {
      empId: key,
      employeeName: name,
    };

    console.log(searchEmployee);
    console.log(selectedEmployees);

    const employeeExists = selectedEmployees.some((employee) => {
      if (employee.empId == key) {
        return true;
      }
      return false;
    });

    if (employeeExists) {
      console.log("Employee already added!");
    } else {
      console.log("Employee doesn't exist");
      setselectedEmployees([...selectedEmployees, searchEmployee]);
    }
  }

  return (
    <div className="w-full h-[90vh] rounded bg-white p-4 flex flex-row justify-between">
      <div className="bg-slate-100 h-9/12 w-[35dvw] ml-4 p-3">
        <div className="font-bold text-2xl text-center">Selections</div>
          <Input
            type="text"
            onChange={(e) => {
              setSearchTerm(e.target.value);
              console.log(searchTerm);
            }}
            onFocus={() => {

              console.log("setting trues")
              setIsEmployeeSearchFocused(true);
            }}
            onBlur={() => {
              console.log("setting false via timeout")

              setTimeout(() => {
              setIsEmployeeSearchFocused(false);
              }, 100)
            }}
            placeholder="Search Employee..."
          />

          { isEmployeeSearchFocused ? (
            <div className="absolute rounded p-1 bg-white z-30 w-4/12 mt-0.5">
              <ul>
                {filteredEmployees.map((employee) => {
                  return (
                    <li
                      className="hover:bg-slate-300"
                      key={employee.empId}
                      onClick={() => {
                        searchEmployeeClick(
                          employee.empId,
                          employee.employeeName
                        );

                    console.log("setting false by click")
                      setIsEmployeeSearchFocused(false);

                      }}
                    >
                      {employee.employeeName}
                    </li>
                    
                  );
                })}
              </ul>
            </div>
          ) : (
            <></>
          )}

        <AssignTable addAssignedItem={addAssignedItem} />
      </div>

      <div className="bg-slate-300 w-[35dvw] mr-4">
        <AssignedTable assignedItems={assignedItems} selectedEmployees={selectedEmployees} />
      </div>
    </div>
  );
}

export default AssignItems;
