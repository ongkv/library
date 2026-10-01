import { getDateFromJSONString } from "@/lib/helpers/date";
import { BookFormats } from "@/lib/types/bookFormat";
import { GetStaffCatalogueBooksDTO } from "@/lib/types/DTO/bookCatalogue";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 90 },
  {
    field: "title",
    headerName: "Title",
    width: 250,
  },
  {
    field: "author",
    headerName: "Author",
    width: 200,
  },
  {
    field: "format",
    headerName: "Format",
    width: 150,
  },
  {
    field: "reservedAt",
    headerName: "Reserved At",
    width: 150,
  },
  {
    field: "borrowedAt",
    headerName: "Borrowed At",
    width: 150,
  },
  {
    field: "recipient",
    headerName: "Recipient",
    width: 160,
    valueGetter: (value, row) => `${row.f_name || ""} ${row.l_name || ""}`,
  },
  {
    field: "returnBy",
    headerName: "Return By",
    width: 150,
  },
];

type BookCatalogueListProps = {
  data: GetStaffCatalogueBooksDTO[];
};

export default function BookCatalogueList({ data }: BookCatalogueListProps) {
  const formattedData = data.map((data) => {
    return {
      id: data.id,
      title: data.book.title,
      author: data.book.author,
      format: BookFormats[data.book.book_format_id],
      reservedAt: data.reserved_at
        ? getDateFromJSONString(data.reserved_at)
        : "",
      borrowedAt: data.borrowed_at
        ? getDateFromJSONString(data.borrowed_at)
        : "",
      l_name: data.user?.l_name ?? "",
      f_name: data.user?.f_name ?? "",
      returnBy: data.return_by ? getDateFromJSONString(data.return_by) : "",
    };
  });

  return (
    <Box sx={{ height: 675, width: "100%" }}>
      <DataGrid
        rows={formattedData}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
            },
          },
        }}
        pageSizeOptions={[10]}
        checkboxSelection
        disableRowSelectionOnClick
      />
    </Box>
  );
}
