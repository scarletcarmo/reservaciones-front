import Paper from "@mui/material/Paper";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Button } from "@mui/material";
import { AddIcCallOutlined } from "@mui/icons-material";

type GenericTableProps<T> = {
    rows: T[];
    columns: GridColDef[];
    onAddClick?: () => void;
    addButtonText?: string;
};

export default function GenericTable<T>({
    rows,
    columns,
    onAddClick,
    addButtonText = "Agregar",
}: GenericTableProps<T>) {
    return (
        <Paper>
            <DataGrid
                rows={rows}
                columns={columns}
                pageSizeOptions={[5, 10]}
                checkboxSelection
                sx={{ border: 0 }}
                getRowId={(row) => (row as any).id}
            />
            {onAddClick && (
                <Button
                    variant="contained"
                    startIcon={<AddIcCallOutlined />}
                    sx={{ mb: 2 }}
                    onClick={onAddClick}
                >
                    {addButtonText}
                </Button>
            )}
        </Paper>
    );
}
