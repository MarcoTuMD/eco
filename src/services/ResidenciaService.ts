export const getResidencias = () => {
    return JSON.parse(localStorage.getItem('residencias') || "[]");
}

export const getResidencia = (id: string) => {
    const residencias = JSON.parse(localStorage.getItem('residencias') || "[]");

    for (let i = 0; i < residencias.length; i++) {
        if (residencias[i].id == id) {
            return residencias[i];
        }
    }
}

export const postResidencia = (residencia: any) => {
    const residencias = JSON.parse(localStorage.getItem('residencias') || "[]");
    residencia.id = Math.floor(Date.now() * Math.random()).toString(36);
    residencias?.push(residencia);
    const residenciasJson = JSON.stringify(residencias);
    localStorage.setItem('residencias', residenciasJson);
}

export const deleteResidencia = (id: string) => {
    const residencias = JSON.parse(localStorage.getItem('residencias') || "[]");

    for (let i = 0; i < residencias.length; i++) {
        if (residencias[i].id == id) {
            residencias.splice(i, 1);
        }
    }
    const residenciasJson = JSON.stringify(residencias);
    localStorage.setItem('residencias', residenciasJson);
}

export const editResidencia = (id: string, residencia: any) => {
    const residencias = JSON.parse(localStorage.getItem('residencias') || "[]");

    for (let i = 0; i < residencias.length; i++) {
        if (residencias[i].id == id) {
            residencias[i].nome = residencia.nome;
            residencias[i].logradouro = residencia.logradouro;
            residencias[i].bairro = residencia.bairro;
            residencias[i].numero = residencia.numero;
            residencias[i].cidade = residencia.cidade;
            residencias[i].estado = residencia.estado;
        }
    }
    const residenciasJson = JSON.stringify(residencias);
    localStorage.setItem('residencias', residenciasJson);
}