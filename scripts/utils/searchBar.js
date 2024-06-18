// Fonction de recherche boucles natives
export function searchRecipes(search, recipes) {
    let results = [];
    search = search.toLowerCase();

    for (let i = 0; i < recipes.length; i++) {
        let recipe = recipes[i];
        if (recipe.name.toLowerCase().includes(search) ||
            recipe.ingredients.some(ingredient => ingredient.ingredient.toLowerCase().includes(search)) ||
            recipe.description.toLowerCase().includes(search)) {
            results.push(recipe);
        }
    }
    
    return results;
}