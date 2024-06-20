// Fonction de recherche boucles natives
export function searchRecipes(search, recipes) {
    let results = [];
    search = search.toLowerCase();

    for (let i = 0; i < recipes.length; i++) {
        let recipe = recipes[i];
        let found = false;

        if (recipe.name.toLowerCase().indexOf(search) !== -1) {
            found = true;
        }

        if (!found) {
            for (let j = 0; j < recipe.ingredients.length; j++) {
                if (recipe.ingredients[j].ingredient.toLowerCase().indexOf(search) !== -1) {
                    found = true;
                    break;
                }
            }
        }

        if (!found) {
            if (recipe.description.toLowerCase().indexOf(search) !== -1) {
                found = true;
            }
        }

        if (found) {
            results.push(recipe);
        }
    }
    
    return results;
}
