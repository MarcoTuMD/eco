export const getRestaurantes = () => {
    return JSON.parse(localStorage.getItem('restaurantes') || "[]");
}

export const getRestaurante = (id: string) => {
    const restaurantes = JSON.parse(localStorage.getItem('restaurantes') || "[]");

    for (let i = 0; i < restaurantes.length; i++) {
        if (restaurantes[i].id == id) {
            return restaurantes[i];
        }
    }
}

export const postRestaurante = (restaurante: any) => {
    const restaurantes = JSON.parse(localStorage.getItem('restaurantes') || "[]");
    restaurante.id = Math.floor(Date.now() * Math.random()).toString(36);
    restaurantes?.push(restaurante);
    const restaurantesJson = JSON.stringify(restaurantes);
    localStorage.setItem('restaurantes', restaurantesJson);
}

export const deleteRestaurante = (id: string) => {
    const restaurantes = JSON.parse(localStorage.getItem('restaurantes') || "[]");

    for (let i = 0; i < restaurantes.length; i++) {
        if (restaurantes[i].id == id) {
            restaurantes.splice(i, 1);
        }
    }
    const restaurantesJson = JSON.stringify(restaurantes);
    localStorage.setItem('restaurantes', restaurantesJson);
}

export const editRestaurante = (id: string, restaurante: any) => {
    const restaurantes = JSON.parse(localStorage.getItem('restaurantes') || "[]");

    for (let i = 0; i < restaurantes.length; i++) {
        if (restaurantes[i].id == id) {
            restaurantes[i].nome = restaurante.nome;
            restaurantes[i].taxa = restaurante.taxa;
            restaurantes[i].logradouro = restaurante.logradouro;
            restaurantes[i].bairro = restaurante.bairro;
            restaurantes[i].numero = restaurante.numero;
            restaurantes[i].cidade = restaurante.cidade;
            restaurantes[i].estado = restaurante.estado;
        }
    }
    const restaurantesJson = JSON.stringify(restaurantes);
    localStorage.setItem('restaurantes', restaurantesJson);
}