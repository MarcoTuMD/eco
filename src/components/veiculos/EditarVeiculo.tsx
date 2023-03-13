
import { editVeiculo, getVeiculo } from "@/services/VeiculoService";
import { Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button, FormControl, InputLabel, Select, MenuItem, SelectChangeEvent } from "@mui/material";
import { useEffect, useState } from "react";

interface EditEquipmentDialogProps {
    open: boolean;
    onClose: () => void;
    id: string;
}

const EditarVeiculo: React.FC<EditEquipmentDialogProps> = ({
    open,
    onClose,
    id,
}) => {
    const [nome, setNome] = useState("");
    const [eficiencia, setEficiencia] = useState("");
    const [combustivel, setCombustivel] = useState("");


    const getVei = async () => {
        const resp = await getVeiculo(id);
        if (resp) {
            setNome(resp.nome);
            setEficiencia(resp.eficiencia);
            setCombustivel(resp.combustivel);
        }

    }

    const limparCampos = () => {
        setNome("");
        setEficiencia("");
        setCombustivel("");
    }

    useEffect(() => {
        getVei();
    }, [open]);


    const handleSaveClick = async () => {
        if (nome != "" && eficiencia != "" && combustivel != "" && +eficiencia > 0) {
            const veiculo = {
                id: id,
                nome: nome,
                eficiencia: eficiencia,
                combustivel: combustivel,
            }
            editVeiculo(id, veiculo);
            onClose();
            limparCampos();
        }
    };

    const handleCancelClick = () => {
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose} >
            <DialogTitle>Editar Veículo</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Nome"
                    type="text"
                    fullWidth
                    value={nome}
                    onChange={(ev) => { setNome(ev.target.value); }}
                    required
                />
                <TextField
                    autoFocus
                    margin="dense"
                    id="eficiencia"
                    label="Eficiência Km/L"
                    type="number"
                    fullWidth
                    value={eficiencia}
                    onChange={(ev) => { setEficiencia(ev.target.value); }}
                    required
                />
                <TextField
                    autoFocus
                    margin="dense"
                    id="combustivel"
                    label="Combustível"
                    type="text"
                    fullWidth
                    value={combustivel}
                    onChange={(ev) => { setCombustivel(ev.target.value); }}
                    required
                    select
                >

                    <MenuItem key={"gasolina"} value={"gasolina"}>Gasolina</MenuItem>
                    <MenuItem key={"alcool"} value={"alcool"}>Alcool</MenuItem>
                    <MenuItem key={"diesel"} value={"diesel"}>Diesel</MenuItem>

                </TextField>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleCancelClick} variant="contained" color="error">
                    Cancelar
                </Button>
                <Button onClick={handleSaveClick} variant="contained" color="primary">
                    Salvar
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default EditarVeiculo;
