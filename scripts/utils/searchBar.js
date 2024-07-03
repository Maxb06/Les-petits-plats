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
        let found = false;

        if (recipe.name.toLowerCase().indexOf(search) !== -1) {
            found = true;
        } else {
            for (let j = 0; j < recipe.ingredients.length; j++) {
                if (recipe.ingredients[j].ingredient.toLowerCase().indexOf(search) !== -1) {
                    found = true;
                    break;
                }
            }
        }

        if (!found && recipe.description.toLowerCase().indexOf(search) !== -1) {
            found = true;
        }

        if (found) {
            results.push(recipe);
        }
    }

    return results;
}
