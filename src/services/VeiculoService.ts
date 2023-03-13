export const getVeiculos = () => {
    const veiculos = JSON.parse(localStorage.getItem('veiculos') || "[]");
    return veiculos
}

export const getVeiculo = (id: string) => {
    const veiculos = JSON.parse(localStorage.getItem('veiculos') || "[]");

    for (let i = 0; i < veiculos.length; i++) {
        if (veiculos[i].id == id) {
            return veiculos[i];
        }
    }
}

export const postVeiculo = (veiculo: any) => {
    const veiculos = JSON.parse(localStorage.getItem('veiculos') || "[]");
    veiculo.id = Math.floor(Date.now() * Math.random()).toString(36);
    veiculos?.push(veiculo);
    const veiculosJson = JSON.stringify(veiculos);
    localStorage.setItem('veiculos', veiculosJson);
}

export const deleteVeiculo = (id: string) => {
    const veiculos = JSON.parse(localStorage.getItem('veiculos') || "[]");

    for (let i = 0; i < veiculos.length; i++) {
        if (veiculos[i].id == id) {
            veiculos.splice(i, 1);
        }
    }
    const veiculosJson = JSON.stringify(veiculos);
    localStorage.setItem('veiculos', veiculosJson);
}

export const editVeiculo = (id: string, veiculo: any) => {
    const veiculos = JSON.parse(localStorage.getItem('veiculos') || "[]");

    for (let i = 0; i < veiculos.length; i++) {
        if (veiculos[i].id == id) {
            veiculos[i].nome = veiculo.nome;
            veiculos[i].eficiencia = veiculo.eficiencia;
            veiculos[i].combustivel = veiculo.combustivel;
        }
    }
    const veiculosJson = JSON.stringify(veiculos);
    localStorage.setItem('veiculos', veiculosJson);
}

