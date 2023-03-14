import Result from "@/components/Result";
import { getResidencias } from "@/services/ResidenciaService";
import { getRestaurantes } from "@/services/RestauranteService";
import { getVeiculos } from "@/services/VeiculoService";
import { Box, Typography, Divider, Paper, MenuItem, TextField, Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";

export default function Home() {
  const [open, setOpen] = useState(false);

  const [veiculos, setVeiculos] = useState<any>([]);
  const [restaurantes, setRestaurantes] = useState<any>([]);
  const [residencias, setResidencias] = useState<any>([]);

  const [veiculo, setVeiculo] = useState("");
  const [restaurante, setRestaurante] = useState("");
  const [residencia, setResidencia] = useState("");

  const handleClose = () => {
    setOpen(false);
  };

  const handleButton = () => {
    if (restaurante != "" && veiculo != "" && residencia != "") {
      setOpen(true);
    }
  }



  useEffect(() => {
    setVeiculos(getVeiculos);
    setRestaurantes(getRestaurantes);
    setResidencias(getResidencias);
  }, []);


  return (
    <>
      <Box width={"full"}>
        <Result open={open} onClose={handleClose} idRestaurante={restaurante} idResidencia={residencia} idVeiculo={veiculo} />
      </Box>
      <Box sx={{ m: 3, bgcolor: '#ECF0F1', borderRadius: 2, p: 3, display: 'flex', justifyContent: 'center', mt: '10%' }}>
        <Divider sx={{ bgcolor: "#AED6F1", height: 2, mt: 3 }} />
        <Paper elevation={3} sx={{ width: "40%", p: 3 }}>
          <Box>
            <TextField
              autoFocus
              margin="dense"
              id="restaurante"
              label="Restaurante"
              type="text"
              fullWidth
              value={restaurante}
              onChange={(ev) => { setRestaurante(ev.target.value); }}
              required
              select
            >
              {restaurantes?.map((item: any) => {
                return <MenuItem key={item.id} value={item.id}>{item.nome}</MenuItem>
              })}

            </TextField>

            <TextField
              autoFocus
              margin="dense"
              id="residencia"
              label="Residência"
              type="text"
              fullWidth
              value={residencia}
              onChange={(ev) => { setResidencia(ev.target.value); }}
              required
              select
            >
              {residencias?.map((item: any) => {
                return <MenuItem key={item.id} value={item.id}>{item.nome}</MenuItem>
              })}
            </TextField>

            <TextField
              autoFocus
              margin="dense"
              id="veiculo"
              label="Veículo"
              type="text"
              fullWidth
              value={veiculo}
              onChange={(ev) => { setVeiculo(ev.target.value); }}
              required
              select
            >
              {veiculos?.map((item: any) => {
                return <MenuItem key={item.id} value={item.id}>{item.nome}</MenuItem>
              })}
            </TextField>
            <Button variant="contained" color="primary" sx={{ width: '100%', my: 1 }} onClick={handleButton}>
              Calcular
            </Button>
          </Box>
        </Paper>

      </Box>

    </>
  )
}
