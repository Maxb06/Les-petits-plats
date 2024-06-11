// Fonction de recherche avec les méthodes de l'objet Array
export function searchRecipes(search, recipes) {
    search = search.toLowerCase();

    if (search.length < 3) {
        return [];
    }

    return recipes.filter(recipe => 
        recipe.name.toLowerCase().includes(search) ||
        recipe.ingredients.some(ingredient => ingredient.ingredient.toLowerCase().includes(search)) ||
        recipe.description.toLowerCase().includes(search)
    );
}