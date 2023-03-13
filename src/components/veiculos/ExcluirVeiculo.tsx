
import { deleteVeiculo } from "@/services/VeiculoService";
import { Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button, Typography } from "@mui/material";

interface EditEquipmentDialogProps {
    open: boolean;
    onClose: () => void;
    id: string;
    nome: string
}

const ExcluirVeiculo: React.FC<EditEquipmentDialogProps> = ({
    open,
    onClose,
    id,
    nome,
}) => {


    const handleSaveClick = async () => {
        await deleteVeiculo(id);
        onClose();
    };

    const handleCancelClick = () => {
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose} >
            <DialogTitle>Excluir Veiculo</DialogTitle>
            <DialogContent>
                <Typography variant="h6" color="initial">Voce realmente deseja excluir o veiculo <strong>{nome}</strong> ?</Typography>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleCancelClick} variant="contained" color="error">
                    Cancelar
                </Button>
                <Button onClick={handleSaveClick} variant="contained" color="primary">
                    Excluir
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ExcluirVeiculo;
