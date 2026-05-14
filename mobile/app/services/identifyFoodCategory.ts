import foodsCategories from './foodsCategories.json'

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