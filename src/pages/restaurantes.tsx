
import { Box, Divider, Paper, Button } from '@mui/material';
import Typography from '@mui/material/Typography'
import { useEffect, useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { getVeiculos } from '@/services/VeiculoService';
import NovoVeiculo from '@/components/veiculos/NovoVeiculo';
import ExcluirVeiculo from '@/components/veiculos/ExcluirVeiculo';
import EditarVeiculo from '@/components/veiculos/EditarVeiculo';
import { getRestaurantes } from '@/services/RestauranteService';
import NovoRestaurante from '@/components/restaurantes/NovoRestaurante';
import ExcluirRestaurante from '@/components/restaurantes/ExcluirRestaurante';
import EditarRestaurante from '@/components/restaurantes/EditarRestaurante';



export default function Restaurantes() {
    const [open, setOpen] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);

    const [id, setId] = useState<string>("");
    const [nome, setNome] = useState<string>("");
    const [restaurantes, setRestaurantes] = useState<any>();

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
        { field: 'taxa', headerName: 'Taxa de Entrega', flex: 0.5 },
        { field: 'editar', headerName: 'Editar', flex: 0.1, renderCell: renderCellEdit },
        { field: 'excluir', headerName: 'Excluir', flex: 0.1, renderCell: renderCellDelete }
    ];



    const rows = () => restaurantes?.map((d: any) => ({
        ...d,
        nome: d.nome,
        taxa: d.taxa,
    }))



    useEffect(() => {
        setRestaurantes(getRestaurantes());
    }, [open, openEdit, openDelete]);


    return (
        <>
            <NovoRestaurante open={open} onClose={handleClose} />
            <ExcluirRestaurante open={openDelete} onClose={handleCloseDelete} id={id} nome={nome} />
            <EditarRestaurante open={openEdit} onClose={handleCloseEdit} id={id} />
            <Box sx={{ m: 3, bgcolor: '#ECF0F1', borderRadius: 2, p: 3 }}>
                <Typography variant="h4" color="initial">Restaurantes</Typography>
                <Divider sx={{ bgcolor: "#AED6F1", height: 2, mt: 3 }} />
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', my: 3 }}>
                    <Button
                        variant="contained"
                        color="primary"
                        startIcon={<AddIcon />}
                        onClick={handleOpen}
                    >
                        Novo
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