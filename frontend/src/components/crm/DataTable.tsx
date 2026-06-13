import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useRouter } from "next/navigation";

interface DataTableProps {
  columns: { header: string; accessor: string; format?: (val: any) => string }[];
  data: any[];
  onRowClick?: (row: any) => void;
  basePath?: string; // e.g. "/opportunities" -> automatically routes to /opportunities/[id]
  idField?: string;
}

export function DataTable({ columns, data, onRowClick, basePath, idField }: DataTableProps) {
  const router = useRouter();

  const handleRowClick = (row: any) => {
    if (onRowClick) onRowClick(row);
    if (basePath && idField && row[idField]) {
      router.push(`${basePath}/${row[idField]}`);
    }
  };

  if (!data || data.length === 0) {
    return <div className="p-4 text-sm text-[#444444] text-center bg-white border border-[#dddbda] rounded-[0.25rem]">No records to display.</div>;
  }

  return (
    <div className="rounded-[0.25rem] border border-[#dddbda] bg-white overflow-hidden shadow-sm">
      <Table>
        <TableHeader className="bg-[#fafaf9]">
          <TableRow className="border-[#dddbda] hover:bg-[#fafaf9]">
            {columns.map((col, i) => (
              <TableHead key={i} className="text-[#444444] font-bold text-[0.75rem] py-2">
                {col.header}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((row, i) => (
            <TableRow 
              key={i} 
              className={`border-[#dddbda] hover:bg-[#f3f3f3] ${basePath || onRowClick ? 'cursor-pointer' : ''}`}
              onClick={() => handleRowClick(row)}
            >
              {columns.map((col, j) => (
                <TableCell key={j} className={`text-sm py-2 ${j === 0 ? "text-[#0176d3] font-medium" : "text-[#080707]"}`}>
                  {col.format ? col.format(row[col.accessor]) : row[col.accessor]}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
