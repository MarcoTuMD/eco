
import { getLatLong } from "@/services/MapsService";
import { editRestaurante, getRestaurante } from "@/services/RestauranteService";
import { editVeiculo, getVeiculo } from "@/services/VeiculoService";
import { Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button, FormControl, InputLabel, Select, MenuItem, SelectChangeEvent, Divider } from "@mui/material";
import { useEffect, useState } from "react";

interface EditEquipmentDialogProps {
    open: boolean;
    onClose: () => void;
    id: string;
}

const EditarRestaurante: React.FC<EditEquipmentDialogProps> = ({
    open,
    onClose,
    id,
}) => {
    const [nome, setNome] = useState("");
    const [taxa, setTaxa] = useState("");

    const [logradouro, setLogradouro] = useState("");
    const [bairro, setBairro] = useState("");
    const [numero, setNumero] = useState("");
    const [cidade, setCidade] = useState("");
    const [estado, setEstado] = useState("");


    const getRes = async () => {
        const resp = await getRestaurante(id);
        if (resp) {
            setNome(resp.nome);
            setTaxa(resp.taxa);
            setLogradouro(resp.logradouro);
            setBairro(resp.bairro);
            setNumero(resp.numero);
            setCidade(resp.cidade);
            setEstado(resp.estado)
        }

    }

    const limparCampos = () => {
        setNome("");
        setTaxa("");
        setLogradouro("");
        setBairro("");
        setNumero("");
        setCidade("");
        setEstado("");
    }

    useEffect(() => {
        getRes();
    }, [open]);


    const handleSaveClick = async () => {
        if (nome != "" && taxa != "" && logradouro != "" && bairro != "" && numero != "" && cidade != "" && estado != "") {
            const latLng = await getLatLong(+numero, logradouro, bairro, cidade, estado);
            const restaurante = {
                id: id,
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
            editRestaurante(id, restaurante);
            onClose();
            limparCampos();
        }
    };

    const handleCancelClick = () => {
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose} >
            <DialogTitle>Editar Restaurante</DialogTitle>
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
                    label="numero"
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

export default EditarRestaurante;
