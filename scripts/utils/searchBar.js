/**
 * Function to search for recipes based on a search term.
 *
 * @param {string} search - The search term entered by the user.
 * @param {Array} recipes - The array of recipes objects to search within.
 * @returns {Array} - The array of recipes that match the search term.
 */
export function searchRecipes(search, recipes) {
    search = search.toLowerCase();

    return recipes.filter(recipe =>
        recipe.name.toLowerCase().includes(search) ||
        recipe.ingredients.some(ingredient => ingredient.ingredient.toLowerCase().includes(search)) ||
        recipe.description.toLowerCase().includes(search)
    );
}