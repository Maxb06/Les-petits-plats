import { displayDropdown } from '../templates/dropdownTemplate.js';

export function generateDropdown(recipes, type) {
    let items = [];

    recipes.forEach(recipe => {
        if (type === 'ingredients') {
            recipe.ingredients.forEach(ingredient => {
                if (!items.includes(ingredient.ingredient)) {
                    items.push(ingredient.ingredient);
                }
            });
        } else if (type === 'appliances') {
            if (!items.includes(recipe.appliance)) {
                items.push(recipe.appliance);
            }
        } else if (type === 'ustensils') {
            recipe.ustensils.forEach(ustensil => {
                if (!items.includes(ustensil)) {
                    items.push(ustensil);
                }
            });
        }
    });

    displayDropdown(type, items);
}


