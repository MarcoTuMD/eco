import { getVeiculo, postVeiculo } from "@/services/VeiculoService";
import { Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button, MenuItem, Typography, Box, Divider } from "@mui/material";
import { DistanceMatrixService, LoadScript } from "@react-google-maps/api";
import React, { useEffect, useState } from "react";
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import Map from "./Map";
import { getLatLong } from "@/services/MapsService";
import { getRestaurante } from "@/services/RestauranteService";
import { getResidencia } from "@/services/ResidenciaService";



interface NewEquipmentDialogProps {
    open: boolean;
    onClose: () => void;
    idRestaurante: string;
    idResidencia: string;
    idVeiculo: string;
}

const Result: React.FC<NewEquipmentDialogProps> = ({
    open,
    onClose,
    idRestaurante,
    idResidencia,
    idVeiculo
}) => {
    const [restaurante, setRestaurante] = useState<any>();
    const [residencia, setResidencia] = useState<any>();
    const [veiculo, setVeiculo] = useState<any>();

    useEffect(() => {
        setRestaurante(getRestaurante(idRestaurante));
        setResidencia(getResidencia(idResidencia));
        setVeiculo(getVeiculo(idVeiculo));
        console.log(open);
    }, [open]);

    const handleExit = () => {
        onClose();
    };

    return (
        <>

            <Dialog open={open} onClose={onClose} fullWidth>
                <DialogTitle>Resultados</DialogTitle>
                <DialogContent>
                    <Box sx={{ m: 2, bgcolor: '#ECF0F1', borderRadius: 2, p: 2 }}>
                        <Map restaurante={restaurante} residencia={residencia} veiculo={veiculo} />
                    </Box>

                </DialogContent>
                <DialogActions>
                    <Button onClick={handleExit} variant="contained" color="primary">
                        Sair
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default Result;