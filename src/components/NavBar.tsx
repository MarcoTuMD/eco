import { AppBar, Toolbar, Typography, Button, Divider, Box } from "@mui/material";
import { useRouter } from 'next/router'


const Navbar: React.FC = () => {
    const router = useRouter()
    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6">
                    ECO+
                </Typography>
                <Box sx={{ px: 6, m: "auto" }}>
                    <Button color="inherit" onClick={() => router.push("/restaurantes")}>Restaurantes</Button>
                    <Button color="inherit" onClick={() => router.push("/residencias")}>Residências</Button>
                    <Button color="inherit" onClick={() => router.push("/veiculos")}>Veículos</Button>
                    <Button color="inherit" onClick={() => router.push("/combustiveis")}>Combustíveis</Button>
                </Box>

            </Toolbar>
        </AppBar>
    );
};

export default Navbar;