"use client"

import * as React from "react"
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"

import { ArrowUpDown  } from "lucide-react"

import { Button } from "@/components/ui/button"

import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import EmployeeProfile from "./EmployeeProfile"

const data: Payment[] = [
  { "id": 1, "name": "John Doe", phoneNumber: "+1234567890", "position": "Software Engineer" },
  { "id": 2, "name": "Jane Smith", phoneNumber: "+9876543210", "position": "Project Manager" },
  { "id": 3, "name": "Michael Lee", phoneNumber: "+5678901234", "position": "Marketing Director" },
  { "id": 4, "name": "Emily Jones", phoneNumber: "+3456789012", "position": "Human Resources Specialist" },
  { "id": 5, "name": "David Williams", phoneNumber: "+1098765432", "position": "Web Developer" },
  { "id": 6, "name": "Sarah Brown", phoneNumber: "+2345678901", "position": "Graphic Designer" },
  { "id": 7, "name": "Matthew Miller", phoneNumber: "+7890123456", "position": "Sales Manager" },
  { "id": 8, "name": "Jennifer Garcia", phoneNumber: "+8901234567", "position": "Accountant" },
  { "id": 9, "name": "Daniel Hernandez", phoneNumber: "+9012345678", "position": "Customer Service Representative" },
  { "id": 10, "name": "Ashley Moore", phoneNumber: "+0123456789", "position": "Content Writer" },
  { "id": 11, "name": "Kevin Robinson", phoneNumber: "+1234560987", "position": "Data Analyst" },
  { "id": 12, "name": "Amanda Allen", phoneNumber: "+2345601234", "position": "Network Engineer" },
  { "id": 13, "name": "Christopher Clark", phoneNumber: "+3456012345", "position": "Software Tester" },
  { "id": 14, "name": "Jessica Wright", phoneNumber: "+4560123456", "position": "Business Analyst" },
  { "id": 15, "name": "Andrew Johnson", phoneNumber: "+5601234567", "position": "Systems Administrator" },
  { "id": 16, "name": "Elizabeth Lopez", phoneNumber: "+6789012345", "position": "Quality Assurance Engineer" },
  { "id": 17, "name": "Joseph Lewis", phoneNumber: "+7890123456", "position": "Product Manager" },
  { "id": 18, "name": "Nicole Garcia", phoneNumber: "+8901234567", "position": "Front-End Developer" },
  { "id": 19, "name": "Robert Walker", phoneNumber: "+9012345678", "position": "Back-End Developer" },
  { "id": 20, "name": "Kimberly Young", phoneNumber: "+0123456789", "position": "Full-Stack Developer" }
]

export type Payment = {
  id: number
  name: string
  phoneNumber: string
  position: string
}

export const columns: ColumnDef<Payment>[] = [
     
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => <div className="capitalize">{row.getValue("name")}</div>,
  },
  {
    accessorKey: "phoneNumber",
    header: () => <div className="text-right">Phone Number</div>,
    cell: ({ row }) => {

      // const amount = parseFloat(row.getValue("amount"))

      // // Format the amount as a dollar amount
      // const formatted = new Intl.NumberFormat("en-US", {
      //   style: "currency",
      //   currency: "USD",
      // }).format(amount)

      return <div className="text-right font-medium">{row.getValue("phoneNumber")}</div>
    },
  },
  {
    accessorKey: "position",
    header: "Position",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("position")}</div>
    ),
  },
  {
    accessorKey: "position",
    header: "Profile",
    cell: () => (
      <EmployeeProfile />
    ),
  },
  
  
]

export function AllEmployee() {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
    initialState: {
      pagination: {
        pageSize: 15
      }
    }
  })

  return (
    <div className="w-full h-[90vh] rounded bg-white p-4">
      <div className="flex items-center justify-between py-4">
        <Input
          placeholder="Search Employee"
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >Download</Button>
        {/* <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                )
              })}
          </DropdownMenuContent>
        </DropdownMenu> */}
        
      </div>
      <div className="rounded-md border  overflow-auto h-[70vh]">
        <Table className=""> 
          <TableHeader className="sticky top-0">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="p-2">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )} 
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        {/* <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div> */}
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}


export default AllEmployee