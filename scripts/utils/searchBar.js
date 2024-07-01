/**
 * Function to search for recipes using native loops.
 *
 * @param {string} search - The search term to filter recipes by.
 * @param {Array} recipes - The array of recipe objects to search within.
 * @returns {Array} - The array of recipes that match the search term.
 */
export function searchRecipes(search, recipes) {
    let results = [];
    search = search.toLowerCase();

    for (let i = 0; i < recipes.length; i++) {
        let recipe = recipes[i];

        if (recipe.name.toLowerCase().indexOf(search) !== -1) {
            results.push(recipe);
            continue;
        }

        for (let j = 0; j < recipe.ingredients.length; j++) {
            if (recipe.ingredients[j].ingredient.toLowerCase().indexOf(search) !== -1) {
                results.push(recipe);
                break; // quitte la boucle ingredients
            }
        }

        if (results[results.length - 1] === recipe) {
            continue; // passe àla prochaine recette si l'ingredient a été trouvé
        }

        if (recipe.description.toLowerCase().indexOf(search) !== -1) {
            results.push(recipe);
        }
    }
    
    return results;
}

