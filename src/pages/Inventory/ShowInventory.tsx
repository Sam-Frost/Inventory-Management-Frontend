import { useState } from "react"

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

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";


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
  
   
  export type Inventory = {
    itemId: number
    itemName: string
    partNumber: string
    quantity: number
    price: number
  }


export const columns: ColumnDef<Inventory>[] = [
    {
        accessorKey: "itemName",
        header: ({ column }) => {
          return (
            <Button
            // className="px-0"
              variant="ghost"
              onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
              Item Name
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          )
        },
        // header: "Item Name",
    },
    {
        accessorKey: "partNumber",
        header: () => <p className='px-4'>Part Number</p>,
        // header: "Part Number",
    },
    {
      accessorKey: "quantity",
      header: ({ column }) => {
        return (
          <Button
          // className="px-0"
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Quantity
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      // header: "Quantity",
    },
    {
        accessorKey: "price",
        // header: "Price",
        header: () => <p className='px-4'>Price</p>,
        cell: ({row}) => {
          const value = "₹ " +  row.getValue('price')
          return (
            value
          )
        }
    }
    
  ]

function ShowInventory() {

    const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>(
    []
  )
  const [columnVisibility, setColumnVisibility] =
    useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = useState({})
 
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
  })

  return (
    <div className="w-full h-[90vh] rounded bg-white p-4 flex flex-row  ">
      <div className="flex flex-col items-center w-full">
      <Input
          placeholder="Search Item..."
          value={(table.getColumn("itemName")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("itemName")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
    <div className="rounded-md border  overflow-auto h-[70vh] w-11/12 mt-4">
    
        <Table className=""> 
          <TableHeader className="sticky top-0 ">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} >
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} className="text-center">
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
                <TableRow className="text-center"
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
      </div>
    </div>
  )
}

export default ShowInventory