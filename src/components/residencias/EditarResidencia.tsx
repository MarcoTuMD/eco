
import { getLatLong } from "@/services/MapsService";
import { editResidencia, getResidencia, getResidencias } from "@/services/ResidenciaService";
import { Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button, FormControl, InputLabel, Select, MenuItem, SelectChangeEvent, Divider } from "@mui/material";
import { useEffect, useState } from "react";

interface EditEquipmentDialogProps {
    open: boolean;
    onClose: () => void;
    id: string;
}

const EditarResidencia: React.FC<EditEquipmentDialogProps> = ({
    open,
    onClose,
    id,
}) => {
    const [nome, setNome] = useState("");

    const [logradouro, setLogradouro] = useState("");
    const [bairro, setBairro] = useState("");
    const [numero, setNumero] = useState("");
    const [cidade, setCidade] = useState("");
    const [estado, setEstado] = useState("");


    const getRes = async () => {
        const resp = await getResidencia(id);
        if (resp) {
            setNome(resp.nome);
            setLogradouro(resp.logradouro);
            setBairro(resp.bairro);
            setNumero(resp.numero);
            setCidade(resp.cidade);
            setEstado(resp.estado)
        }

    }

    const limparCampos = () => {
        setNome("");
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
        if (nome != "" && logradouro != "" && bairro != "" && numero != "" && cidade != "" && estado != "" && +numero > 0) {
            try {
                const latLng = await getLatLong(+numero, logradouro, bairro, cidade, estado);
                const residencia = {
                    id: id,
                    nome: nome,
                    logradouro: logradouro,
                    bairro: bairro,
                    numero: numero,
                    cidade: cidade,
                    estado: estado,
                    lat: latLng.lat,
                    lng: latLng.lng,
                }
                editResidencia(id, residencia);
                onClose();
                limparCampos();
            } catch (error) {
                alert("Endereço inválido");
            }


        }
    };

    const handleCancelClick = () => {
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose} >
            <DialogTitle>Editar Residência</DialogTitle>
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

export default EditarResidencia;
