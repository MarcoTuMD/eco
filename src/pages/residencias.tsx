
import { Box, Divider, Paper, Button } from '@mui/material';
import Typography from '@mui/material/Typography'
import { useEffect, useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { getRestaurantes } from '@/services/RestauranteService';
import NovoRestaurante from '@/components/restaurantes/NovoRestaurante';
import ExcluirRestaurante from '@/components/restaurantes/ExcluirRestaurante';
import EditarRestaurante from '@/components/restaurantes/EditarRestaurante';
import { getResidencias } from '@/services/ResidenciaService';
import NovaResidencia from '@/components/residencias/NovaResidencia';
import ExcluirResidencia from '@/components/residencias/ExcluirResidencia';
import EditarResidencia from '@/components/residencias/EditarResidencia';



export default function Residencias() {
    const [open, setOpen] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);

    const [id, setId] = useState<string>("");
    const [nome, setNome] = useState<string>("");
    const [residencias, setResidencias] = useState<any>();

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);

    };

    const handleCloseEdit = () => {
        setOpenEdit(false);

    };

    const handleCloseDelete = () => {
        setOpenDelete(false);

    };

    const renderCellEdit = (params: GridRenderCellParams) => {
        return <Button
            variant="text"
            color="primary"
            startIcon={<EditIcon />}
            onClick={() => {
                setId(params.row.id);
                setOpenEdit(true);
            }}
        />
    };

    const renderCellDelete = (params: GridRenderCellParams) => {
        return <Button
            variant="text"
            color="primary"
            startIcon={<DeleteIcon />}
            onClick={() => {
                setId(params.row.id);
                setNome(params.row.nome)
                setOpenDelete(true);
            }}
        />
    };


    const columns: GridColDef[] = [
        { field: 'nome', headerName: 'Nome', flex: 1 },
        { field: 'editar', headerName: 'Editar', flex: 0.1, renderCell: renderCellEdit },
        { field: 'excluir', headerName: 'Excluir', flex: 0.1, renderCell: renderCellDelete }
    ];



    const rows = () => residencias?.map((d: any) => ({
        ...d,
        nome: d.nome,
    }))



    useEffect(() => {
        setResidencias(getResidencias());
    }, [open, openEdit, openDelete]);


    return (
        <>
            <NovaResidencia open={open} onClose={handleClose} />
            <ExcluirResidencia open={openDelete} onClose={handleCloseDelete} id={id} nome={nome} />
            <EditarResidencia open={openEdit} onClose={handleCloseEdit} id={id} />
            <Box sx={{ m: 3, bgcolor: '#ECF0F1', borderRadius: 2, p: 3 }}>
                <Typography variant="h4" color="initial">Residências</Typography>
                <Divider sx={{ bgcolor: "#AED6F1", height: 2, mt: 3 }} />
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', my: 3 }}>
                    <Button
                        variant="contained"
                        color="primary"
                        startIcon={<AddIcon />}
                        onClick={handleOpen}
                    >
                        Nova
                    </Button>
                </Box>

                <Paper elevation={3}>
                    <Box sx={{ height: 400, width: '100%' }}>
                        <DataGrid
                            rows={rows() || []}
                            columns={columns}
                            hideFooter
                        />
                    </Box>
                </Paper>

            </Box>
        </>

    )
}