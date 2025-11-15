import Paper from "@mui/material/Paper";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Box, Button } from "@mui/material";
import { useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import HotelDetails from "../pages/hotel/HotelDetails";
import HotelPut from "../pages/hotel/HotelPut";

// Props del componente
type TblInformationProps = {
  data: any[];
  fieldTranslations?: Record<string, string>;  // prop opcional
};

// Paginación inicial
const paginationModel = { page: 0, pageSize: 5 };

// Función para generar las columnas
const generateColumns = (data: any[], fieldTranslations?: Record<string, string>, onOpen?: (row: any) => void, onOpenEdit?: (row: any) => void): GridColDef[] => {

  if (data.length === 0) return [];
  const keys = Object.keys(data[0]); //devuelve un arreglo con las claves de ese objeto
  //const filteredKeys = keys.filter(key => key !== "id"); //crea un nuevo arreglo con los elementos que sean diferentes a id
  const filteredKeys = keys.filter(key => key !== "id" && key !== "user");

  const dynamicColumns: GridColDef[] = filteredKeys.map((key) => ({
    field: key,
    headerName: fieldTranslations[key],
    //(fieldTranslations && fieldTranslations[key]) ||
    //key.charAt(0).toUpperCase() + key.slice(1),
    width: 150,
    flex: 1,
  }));

  //column personalizada
  dynamicColumns.push({
    field: "actions",
    headerName: "Acciones",
    width: 150,
    sortable: false, //Evita que el usuario pueda ordenar la tabla por esta columna.
    filterable: false, //Evita que el usuario pueda filtrar por esta columna.
    //Personaliza el contenido de cada celda de la columna
    renderCell: (params) => (
      <Box display={'flex'} gap={1} justifyContent="center" sx={{ m: 1 }}>
        {/* Botón Ver */}
        <Button sx={{
          bgcolor: 'primary.paper',
        }}
          variant="outlined"
          size="small"
          fullWidth
          //navigate && navigate(`/hotel/list/detail/${params.row.id}`);
          //onClick={() => navigate ? navigate(`/hotel/list/detail/${params.row.id}`) : null}
          onClick={() => onOpen && onOpen(params.row)}
        >
          <VisibilityIcon />
        </Button>
        {/* Botón Editar */}
        <Button
          sx={{
            bgcolor: 'primary.paper',
          }}
          variant="outlined"
          size="small"
          fullWidth
          onClick={() => onOpenEdit && onOpenEdit(params.row)}
        >
          <EditIcon />
        </Button>
      </Box>
    ),
  });

  return dynamicColumns;
};

// Componente principal
const TblInformation = ({ data, fieldTranslations }: TblInformationProps) => {
  const [selectedRow, setSelectedRow] = useState<any | null>(null);
  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  
  const rows = data.map((e, index) => ({
    ...e,
    id: e.id, 
  }));

  const onOpen = (row: any) => {
    setSelectedRow(row);
    setOpen(true);
  }

  const onClose = () => {
    setOpen(false);
    setSelectedRow(null);
  }

  const onOpenEdit = (row: any) => {
    setSelectedRow(row);
    setOpenEdit(true);
  };

  const onCloseEdit = () => {
    setSelectedRow(null);
    setOpenEdit(false);
  };


  const columns = generateColumns(rows, fieldTranslations, onOpen, onOpenEdit);

  return (
    <>
      <Paper sx={{ p: 2 }}>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{ pagination: { paginationModel } }}
          pageSizeOptions={[5, 10]}
          checkboxSelection
          sx={{ border: 0 }}
        />
      </Paper>
      {/* MODAL de detalles */}
      <HotelDetails
        openDetails={open}
        onClose={onClose}
        selectedRow={selectedRow}
        fieldTranslations={fieldTranslations}
      />
      {/* MODAL de update */}
      {selectedRow?.id && (
        <HotelPut
          id={selectedRow.id}
          openEdit={openEdit}
          onCloseEdit={onCloseEdit}
        />
      )}
    </>
  );
};

export default TblInformation;
