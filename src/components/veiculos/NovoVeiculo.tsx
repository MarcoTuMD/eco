import { postVeiculo } from "@/services/VeiculoService";
import { Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button, MenuItem } from "@mui/material";
import React, { useState } from "react";


interface NewEquipmentDialogProps {
    open: boolean;
    onClose: () => void;
}

const NovoVeiculo: React.FC<NewEquipmentDialogProps> = ({
    open,
    onClose,
}) => {
    const [nome, setNome] = useState("");
    const [eficiencia, setEficiencia] = useState("");
    const [combustivel, setCombustivel] = useState("");

    const limparCampos = () => {
        setNome("");
        setEficiencia("");
        setCombustivel("");
    }

    const handleSaveClick = async () => {
        if (nome != "" && eficiencia != "" && combustivel != "" && +eficiencia > 0) {
            const veiculo = {
                id: 0,
                nome: nome,
                eficiencia: eficiencia,
                combustivel: combustivel,
            }
            postVeiculo(veiculo);
            onClose();
            limparCampos();
        }
    };

    const handleCancelClick = () => {
        onClose();
        limparCampos();
    };

    return (
        <Dialog open={open} onClose={onClose} >
            <DialogTitle>Novo Veículo</DialogTitle>
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

export default NovoVeiculo;