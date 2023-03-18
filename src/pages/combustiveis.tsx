
import { Box, Divider, TextField, IconButton, Button } from '@mui/material';
import Typography from '@mui/material/Typography'
import EditIcon from '@mui/icons-material/Edit';
import { useEffect, useState } from 'react';
import { getCombustiveis, postCombustiveis } from '@/services/CombustivelService';

export default function Combustiveis() {
    const [gasComum, setGasComum] = useState("");
    const [gasAdi, setGasAdi] = useState("");
    const [alcool, setAlcool] = useState("");
    const [diesel, setDiesel] = useState("");

    const [gasComumDis, setGasComumDis] = useState(true);
    const [gasAdiDis, setGasAdiDis] = useState(true);
    const [alcoolDis, setAlcoolDis] = useState(true);
    const [dieselDis, setDieselDis] = useState(true);

    const handleChange = () => {
        if (+gasComum >= 0 && +gasAdi >= 0 && +alcool >= 0 && +diesel >= 0) {
            const combustiveis = {
                gasolinaComum: gasComum,
                gasolinaAditivada: gasAdi,
                alcool: alcool,
                diesel: diesel,
            }
            postCombustiveis(combustiveis);
        } else {
            alert("Valores negativos")
        }
    }

    const getCombu = () => {
        const combustiveis = getCombustiveis();
        setGasComum(combustiveis.gasolinaComum);
        setGasAdi(combustiveis.gasolinaAditivada);
        setAlcool(combustiveis.alcool);
        setDiesel(combustiveis.diesel);
    }

    useEffect(() => {
        getCombu();
    }, []);



    return (
        <>
            <Box sx={{ m: 3, bgcolor: '#ECF0F1', borderRadius: 2, p: 3 }}>
                <Typography variant="h4" color="initial">Combustíveis</Typography>
                <Divider sx={{ bgcolor: "#AED6F1", height: 2, mt: 3 }} />
                <Box sx={{ m: 1, bgcolor: '#ECF0F1', borderRadius: 2, p: 3 }}>
                    <Typography variant="h6" color="initial">Gasolina comum</Typography>
                    <Divider sx={{ bgcolor: "#AED6F1", height: 1, mt: 1 }} />
                    <Box sx={{ display: "flex", flexDirection: "row", width: '100%', p: 2 }}>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="valor"
                            label="Valor"
                            type="number"
                            fullWidth
                            required
                            value={gasComum}
                            disabled={gasComumDis}
                            onChange={(ev) => { setGasComum(ev.target.value); }}
                        />
                        <IconButton aria-label="delete" color="primary" onClick={() => { setGasComumDis(!gasComumDis) }}>
                            <EditIcon />
                        </IconButton>
                    </Box>

                </Box>
                <Box sx={{ m: 1, bgcolor: '#ECF0F1', borderRadius: 2, p: 3 }}>
                    <Typography variant="h6" color="initial">Gasolina aditivada</Typography>
                    <Divider sx={{ bgcolor: "#AED6F1", height: 1, mt: 1 }} />
                    <Box sx={{ display: "flex", flexDirection: "row", width: '100%', p: 2 }}>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="valor"
                            label="Valor"
                            type="number"
                            fullWidth
                            required
                            value={gasAdi}
                            disabled={gasAdiDis}
                            onChange={(ev) => { setGasAdi(ev.target.value); }}
                        />
                        <IconButton aria-label="delete" color="primary" onClick={() => { setGasAdiDis(!gasAdiDis) }}>
                            <EditIcon />
                        </IconButton>
                    </Box>

                </Box>
                <Box sx={{ m: 1, bgcolor: '#ECF0F1', borderRadius: 2, p: 3 }}>
                    <Typography variant="h6" color="initial">Alcool</Typography>
                    <Divider sx={{ bgcolor: "#AED6F1", height: 1, mt: 1 }} />
                    <Box sx={{ display: "flex", flexDirection: "row", width: '100%', p: 2 }}>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="valor"
                            label="Valor"
                            type="number"
                            fullWidth
                            required
                            value={alcool}
                            disabled={alcoolDis}
                            onChange={(ev) => { setAlcool(ev.target.value); }}
                        />
                        <IconButton aria-label="delete" color="primary" onClick={() => { setAlcoolDis(!alcoolDis) }}>
                            <EditIcon />
                        </IconButton>
                    </Box>
                </Box>
                <Box sx={{ m: 1, bgcolor: '#ECF0F1', borderRadius: 2, p: 3 }}>
                    <Typography variant="h6" color="initial">Diesel</Typography>
                    <Divider sx={{ bgcolor: "#AED6F1", height: 1, mt: 1 }} />
                    <Box sx={{ display: "flex", flexDirection: "row", width: '100%', p: 2 }}>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="valor"
                            label="Valor"
                            type="number"
                            fullWidth
                            required
                            value={diesel}
                            disabled={dieselDis}
                            onChange={(ev) => { setDiesel(ev.target.value); }}
                        />
                        <IconButton aria-label="delete" color="primary" onClick={() => { setDieselDis(!dieselDis) }}>
                            <EditIcon />
                        </IconButton>
                    </Box>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', my: 3 }}>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleChange}
                    >
                        Salvar
                    </Button>
                </Box>
            </Box>
        </>

    )
}