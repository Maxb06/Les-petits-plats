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

function displayDropdown(type, items) {
    const dropdown = document.getElementById(`${type}Dropdown`);
    dropdown.innerHTML = '';

    items.forEach(item => {
        const listItem = document.createElement('div');
        listItem.textContent = item;
        listItem.classList.add('dropdown-item');
        dropdown.appendChild(listItem);
    });
}

