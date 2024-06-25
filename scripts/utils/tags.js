import { displayDropdown } from '../templates/dropdownTemplate.js';

export function generateDropdown(recipes, type) {
    let items = [];

    if (type === 'ingredients') {
        items = recipes.flatMap(recipe => recipe.ingredients.map(ingredient => ingredient.ingredient));
    } else if (type === 'appliances') {
        items = recipes.map(recipe => recipe.appliance);
    } else if (type === 'ustensils') {
        items = recipes.flatMap(recipe => recipe.ustensils);
    }

    // Filtre les doublons
    items = [...new Set(items)];

    displayDropdown(type, items);
}


