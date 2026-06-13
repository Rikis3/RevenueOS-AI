import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DataTable } from "./DataTable";

interface RelatedListProps {
  title: string;
  icon: React.ReactNode;
  data: any[];
  columns: { header: string; accessor: string; format?: (val: any) => string }[];
  basePath?: string;
  idField?: string;
}

export function RelatedList({ title, icon, data, columns, basePath, idField }: RelatedListProps) {
  return (
    <Card className="rounded-[0.25rem] border border-[#dddbda] bg-white shadow-sm overflow-hidden">
      <CardHeader className="py-3 px-4 border-b border-[#dddbda] bg-[#f3f3f3]">
        <CardTitle className="text-sm font-bold flex items-center gap-2 text-[#080707]">
          {icon}
          {title} <span className="text-xs text-[#444444] font-normal ml-1">({data?.length || 0})</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <DataTable columns={columns} data={data} basePath={basePath} idField={idField} />
      </CardContent>
    </Card>
  );
}
