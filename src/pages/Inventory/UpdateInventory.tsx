import { useState, useEffect } from "react";

import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import { UpdateDialog } from "./components/UpdateDialog";
import { BACKEND_URL } from "@/constants";

// import { data } from "@/constants";
import { Item } from "@/types";

import axios from "axios";

import { useRecoilValue } from "recoil";
import { adminInfoState } from "@/Atoms/admin";

function UpdateInventory() {
  const columns: ColumnDef<Item>[] = [
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
        );
      },
      // header: "Item Name",
    },
    {
      accessorKey: "partNumber",
      header: () => <p className="px-4">Part Number</p>,
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
        );
      },
      // header: "Quantity",
    },
    {
      accessorKey: "price",
      // header: "Price",
      header: () => <p className="px-4">Price</p>,
      cell: ({ row }) => {
        const value = "₹ " + row.getValue("price");
        return value;
      },
    },
    {
      accessorKey: "itemId",
      header: () => <p className="px-4">Update</p>,
      cell: ({ row }) => {
        return (
          <UpdateDialog item={row.original} onSuccess={fetchData}>
            <Button variant="outline"> Update </Button>
          </UpdateDialog>
        );
      },
    },
  ];

  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});

  const [data, setData] = useState<Item[]>([]);

  const adminInfo = useRecoilValue(adminInfoState);

  const fetchData = async () => {
    try {
      console.log("GETINNG ITEM DSTA");
      console.log(adminInfo);
      const response = await axios.get(
        `${BACKEND_URL}/item/${adminInfo?.location}`
      );
      console.log(response);
      setData(response.data);
      console.log("DONENENNE");
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    // getPaginationRowModel: getPaginationRowModel(),
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
  });

  return (
    <div className="w-full h-[90vh] rounded bg-white p-4 flex flex-row  ">
      <div className="flex flex-col items-center w-full">
        <Input
          placeholder="Search Item..."
          value={
            (table.getColumn("itemName")?.getFilterValue() as string) ?? ""
          }
          onChange={(event) =>
            table.getColumn("itemName")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <div className="rounded-md border  overflow-auto h-[70vh] w-11/12 mt-4">
          <Table className="">
            <TableHeader className="sticky top-0 ">
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
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
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    className="text-center"
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
  );
}

export default UpdateInventory;
