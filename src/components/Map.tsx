import React, { useEffect, useState } from "react";
import {
    GoogleMap,
    DistanceMatrixService,
    useJsApiLoader,
} from "@react-google-maps/api";
import { Box } from "@mui/system";
import { getLatLong } from "@/services/MapsService";
import Typography from '@mui/material/Typography'
import { Divider } from "@mui/material";
import { getCombustiveis } from "@/services/CombustivelService";
import Combustiveis from "@/pages/combustiveis";

export interface MapPageProps {
    restaurante: any,
    residencia: any,
    veiculo: any,
}

const Map: React.FC<MapPageProps> = ({ restaurante, residencia, veiculo }) => {
    const [distancia, setDistancia] = useState("");
    const [tempo, setTempo] = useState("");
    const [distanciaNum, setDistanciaNum] = useState(0);
    const [tempoNum, setTempoNum] = useState(0);
    const [valCombustivel, setValCombustivel] = useState(0);
    const [custo, setCusto] = useState(0);


    const position = {
        lat: 0,
        lng: 0,
    };

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: "AIzaSyC8Q2Zqo3rxlfSSvGzM7AHxyMatRDW8D3c"
    })



    const options: any = {
        destinations: [{ lat: restaurante?.lat, lng: restaurante?.lng }],
        origins: [{ lng: residencia?.lng, lat: residencia?.lat }],
        travelMode: "DRIVING",
    }

    const getValCombustivel = async () => {
        const combustiveis = await getCombustiveis();
        if (veiculo?.combustivel == "gasolina comum") {
            setValCombustivel(+combustiveis.gasolinaComum);
        } else if (veiculo?.combustivel == "gasolina aditivada") {
            setValCombustivel(+combustiveis.gasolinaAditivada);
        } else if (veiculo?.combustivel == "alcool") {
            setValCombustivel(+combustiveis.alcool);
        } else if (veiculo?.combustivel == "diesel") {
            setValCombustivel(+combustiveis.diesel);
        }
    }

    const renderResul = () => {
        if (custo < +restaurante?.taxa) {
            return (<Typography variant="h6" color="green">Compensa ir retirar o pedido!</Typography>)
        } else {
            return (<Typography variant="h6" color="red">Não Compensa ir retirar o pedido!</Typography>)
        }
    }

    useEffect(() => {
        getValCombustivel();
        console.log(veiculo);

    }, []);

    return isLoaded ? (
        <>
            <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
                {renderResul()}
            </Box>
            <Box>
                <Typography variant="subtitle1" color="initial">Serão gastos R${custo} para essa viagem</Typography>
            </Box>
            <Divider />
            <Box sx={{ display: "flex", flexDirection: "column" }}>
                <Typography variant="subtitle1" color="initicial">Restaurante: {restaurante?.nome}</Typography>
                <Typography variant="subtitle1" color="initicial">Taxa de entrega: R${restaurante?.taxa}</Typography>
                <Typography variant="subtitle1" color="initial">Residencia: {residencia?.nome}</Typography>
                <Typography variant="subtitle1" color="initial">Veículo: {veiculo?.nome}</Typography>
            </Box>
            <Divider />
            <Box sx={{ display: "flex", flexDirection: "column" }}>
                <Typography variant="subtitle1" color="initial">Distância: {distancia}</Typography>
                <Typography variant="subtitle1" color="initial">Tempo: {tempo}</Typography>
            </Box>
            <GoogleMap
                mapContainerStyle={{ width: "100%", height: "100%" }}
                center={position}
                zoom={10}
            >
                <DistanceMatrixService
                    options={options}
                    callback={async (response) => {
                        console.log(response);
                        setDistancia(response?.rows[0].elements[0].distance.text || "");
                        setTempo(response?.rows[0].elements[0].duration.text || "");
                        setDistanciaNum(response?.rows[0].elements[0].distance.value || 0);
                        setTempoNum(response?.rows[0].elements[0].duration.value || 0);
                        setCusto(+(2 * ((1 * distanciaNum / 1000) / +veiculo?.eficiencia) * valCombustivel).toFixed(2));
                    }}
                />
            </GoogleMap>
        </>
    ) : <></>
};

export default Map;
