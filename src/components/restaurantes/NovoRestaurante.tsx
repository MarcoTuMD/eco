import { getLatLong } from "@/services/MapsService";
import { postRestaurante } from "@/services/RestauranteService";
import { postVeiculo } from "@/services/VeiculoService";
import { Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button, MenuItem, Divider } from "@mui/material";
import React, { useState } from "react";


interface NewEquipmentDialogProps {
    open: boolean;
    onClose: () => void;
}

const NovoRestaurante: React.FC<NewEquipmentDialogProps> = ({
    open,
    onClose,
}) => {
    const [nome, setNome] = useState("");
    const [taxa, setTaxa] = useState("");

    const [logradouro, setLogradouro] = useState("");
    const [bairro, setBairro] = useState("");
    const [numero, setNumero] = useState("");
    const [cidade, setCidade] = useState("");
    const [estado, setEstado] = useState("");

    const limparCampos = () => {
        setNome("");
        setTaxa("");
        setLogradouro("");
        setBairro("");
        setNumero("");
        setCidade("");
        setEstado("");
    }

    const handleSaveClick = async () => {
        if (nome != "" && taxa != "" && logradouro != "" && bairro != "" && numero != "" && cidade != "" && estado != "" && +numero > 0 && +taxa >= 0) {
            try {
                const latLng = await getLatLong(+numero, logradouro, bairro, cidade, estado);
                const restaurante = {
                    id: 0,
                    nome: nome,
                    taxa: taxa,
                    logradouro: logradouro,
                    bairro: bairro,
                    numero: numero,
                    cidade: cidade,
                    estado: estado,
                    lat: latLng.lat,
                    lng: latLng.lng,
                }
                postRestaurante(restaurante);
                onClose();
                limparCampos();
            } catch (error) {
                alert("Endereço inválido!")
            }


        }
    };

    const handleCancelClick = () => {
        onClose();
        limparCampos();
    };

    return (
        <Dialog open={open} onClose={onClose} >
            <DialogTitle>Novo Restaurante</DialogTitle>
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
                    id="taxa"
                    label="Taxa de entrega"
                    type="number"
                    fullWidth
                    value={taxa}
                    onChange={(ev) => { setTaxa(ev.target.value); }}
                    required
                />
                <Divider>Endereço</Divider>
                <TextField
                    autoFocus
                    margin="dense"
                    id="logradouro"
                    label="Logradouro"
                    type="text"
                    fullWidth
                    value={logradouro}
                    onChange={(ev) => { setLogradouro(ev.target.value); }}
                    required
                />
                <TextField
                    autoFocus
                    margin="dense"
                    id="bairro"
                    label="Bairro"
                    type="text"
                    fullWidth
                    value={bairro}
                    onChange={(ev) => { setBairro(ev.target.value); }}
                    required
                />
                <TextField
                    autoFocus
                    margin="dense"
                    id="numero"
                    label="Número"
                    type="number"
                    fullWidth
                    value={numero}
                    onChange={(ev) => { setNumero(ev.target.value); }}
                    required
                />
                <TextField
                    autoFocus
                    margin="dense"
                    id="cidade"
                    label="Cidade"
                    type="text"
                    fullWidth
                    value={cidade}
                    onChange={(ev) => { setCidade(ev.target.value); }}
                    required
                />
                <TextField
                    autoFocus
                    margin="dense"
                    id="estado"
                    label="Estado"
                    type="text"
                    fullWidth
                    value={estado}
                    onChange={(ev) => { setEstado(ev.target.value); }}
                    required
                />

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

export default NovoRestaurante;