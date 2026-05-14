import foodsCategories from './foodsCategories.json';

interface FoodCategory {
    nome: string;
    categoria: string;
}

const normalizeString = (str: string): string => {
    return str
        .normalize("NFD") 
        .replace(/[\u0300-\u036f]/g, "") 
        .toLowerCase(); 
};

/*
    identifyFoodCategory: Recebe o nome de um alimento e retorna a categoria correspondente.
    A função normaliza o nome do alimento e compara com os dados de alimentos para encontrar a categoria correta.
    Os alimentos que servem de comparação estão no arquivo foodsCategories.json, que contém uma lista de alimentos e suas respectivas categorias.
    Se não encontrar uma correspondência, retorna "Outros".
*/
export function identifyFoodCategory(foodName: string): string {
    const fds: FoodCategory[] = foodsCategories;
    const normalizedInput = normalizeString(foodName);

    const foundItem = fds.find((f) => {
        const normalizedDataName = normalizeString(f.nome);
        return normalizedInput.includes(normalizedDataName) || 
               normalizedDataName.includes(normalizedInput);
    });

    
    return foundItem?.categoria || "Outros"; 
}