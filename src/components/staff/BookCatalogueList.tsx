import { BookFormats } from "@/lib/types/bookFormat";
import { GetStaffCatalogueBooksDTO } from "@/lib/types/DTO/bookCatalogue";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

const columns: GridColDef<(typeof rows)[number]>[] = [
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

const rows = [
  {
    id: 1,
    title: "The Stellar Horizon",
    author: "Gene Rodriquez",
    format: BookFormats[BookFormats.Paperback],
    reservedAt: new Date().toLocaleDateString(),
    borrowedAt: new Date().toLocaleDateString(),
    l_name: "Snow",
    f_name: "Jon",
    returnBy: new Date().toLocaleDateString(),
  },
  { id: 2, l_name: "Lannister", f_name: "Cersei" },
  { id: 3, l_name: "Lannister", f_name: "Jaime" },
  { id: 4, l_name: "Stark", f_name: "Arya" },
  { id: 5, l_name: "Targaryen", f_name: "Daenerys" },
  { id: 6, l_name: "Melisandre", f_name: null },
  { id: 7, l_name: "Clifford", f_name: "Ferrara" },
  { id: 8, l_name: "Frances", f_name: "Rossini" },
  { id: 9, l_name: "Roxie", f_name: "Harvey" },
  { id: 10, l_name: "Snow", f_name: "Jon" },
  { id: 11, l_name: "Lannister", f_name: "Cersei" },
  { id: 12, l_name: "Lannister", f_name: "Jaime" },
  { id: 13, l_name: "Stark", f_name: "Arya" },
  { id: 14, l_name: "Targaryen", f_name: "Daenerys" },
  { id: 15, l_name: "Melisandre", f_name: null },
  { id: 16, l_name: "Clifford", f_name: "Ferrara" },
  { id: 17, l_name: "Frances", f_name: "Rossini" },
  { id: 18, l_name: "Roxie", f_name: "Harvey" },
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
        ? new Date(String(data.reserved_at)).toLocaleDateString()
        : "",
      borrowedAt: data.borrowed_at
        ? new Date(String(data.borrowed_at)).toLocaleDateString()
        : "",
      l_name: data.user?.l_name ?? "",
      f_name: data.user?.f_name ?? "",
      returnBy: data.return_by
        ? new Date(String(data.return_by)).toLocaleDateString()
        : "",
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
