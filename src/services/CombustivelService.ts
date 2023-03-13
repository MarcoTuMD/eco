
export const postCombustiveis = (combustiveis: any) => {
    localStorage.setItem("combustiveis", JSON.stringify(combustiveis));
}

export const getCombustiveis = () => {
    return JSON.parse(localStorage.getItem("combustiveis") || "{}");
}