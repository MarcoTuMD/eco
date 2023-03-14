import axios from "axios";

export const getLatLong = async (numero: number, logradouro: string, bairro: string, cidade: string, estado: string) => {
    const resp: any = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${numero}+${logradouro}+${bairro},+${cidade}+${estado},&key=AIzaSyC8Q2Zqo3rxlfSSvGzM7AHxyMatRDW8D3c`);
    return resp.data.results[0].geometry.location;
};
