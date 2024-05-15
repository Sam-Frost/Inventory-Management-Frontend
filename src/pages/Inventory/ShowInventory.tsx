import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  ColumnDef,
  SortingState,
  getSortedRowModel,
  ColumnFiltersState,
  getFilteredRowModel,

} from "@tanstack/react-table";

import { ArrowUpDown } from "lucide-react"
import { useState } from "react";

const data: Item[] = [
  {
    itemName: "Laptop",
    partNumber: "PN-001",
    quantity: 15,
    price: 899.99,
  },
  {
    itemName: "Smartphone",
    partNumber: "PN-002",
    quantity: 30,
    price: 499.99,
  },
  {
    itemName: "Tablet",
    partNumber: "PN-003",
    quantity: 25,
    price: 299.99,
  },
  {
    itemName: "Monitor",
    partNumber: "PN-004",
    quantity: 10,
    price: 199.99,
  },
  {
    itemName: "Keyboard",
    partNumber: "PN-005",
    quantity: 50,
    price: 49.99,
  },
  {
    itemName: "Mouse",
    partNumber: "PN-006",
    quantity: 40,
    price: 29.99,
  },
  {
    itemName: "Printer",
    partNumber: "PN-007",
    quantity: 8,
    price: 159.99,
  },
  {
    itemName: "Headphones",
    partNumber: "PN-008",
    quantity: 20,
    price: 99.99,
  },
  {
    itemName: "Webcam",
    partNumber: "PN-009",
    quantity: 12,
    price: 59.99,
  },
  {
    itemName: "Speakers",
    partNumber: "PN-010",
    quantity: 15,
    price: 79.99,
  },
];

type Item = {
  itemName: string;
  partNumber: string;
  quantity: number;
  price: number;
};

export default function ShowInventory() {
  const columns: ColumnDef<Item>[] = [
    {
      header: ({ column }) => {
        return (
          <button
            // variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Email
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </button>
        )
      },
      accessorKey: "itemName",
    },
    {
      header: "Part Number",
      accessorKey: "partNumber",
    },
    {
      header: "Quantity",
      accessorKey: "quantity",
    },
    {
      header: "Price",
      accessorKey: "price",
      cell: ({ row }) => {
        const amount = parseFloat(row.getValue("price"));
        const formatted = new Intl.NumberFormat("en-IN", {
          style: "currency",
          currency: "INR", // Update currency to "INR"
        }).format(amount);

        return formatted;
      },
    },
  ];

  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters
    },
  });

  return (
    <div>
      <h1>Items Table</h1>
      <div className="flex items-center py-4">
        <input
          placeholder="Filter emails..."
          value={(table.getColumn("itemName")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("itemName")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
      </div>
      <table>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
