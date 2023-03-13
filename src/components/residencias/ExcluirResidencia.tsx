
import { deleteResidencia } from "@/services/ResidenciaService";
import { Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button, Typography } from "@mui/material";

interface EditEquipmentDialogProps {
    open: boolean;
    onClose: () => void;
    id: string;
    nome: string
}

const ExcluirResidencia: React.FC<EditEquipmentDialogProps> = ({
    open,
    onClose,
    id,
    nome,
}) => {


    const handleSaveClick = async () => {
        await deleteResidencia(id);
        onClose();
    };

    const handleCancelClick = () => {
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose} >
            <DialogTitle>Excluir Residência</DialogTitle>
            <DialogContent>
                <Typography variant="h6" color="initial">Voce realmente deseja excluir a residência <strong>{nome}</strong> ?</Typography>
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

export default ExcluirResidencia;
