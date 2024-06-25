/**
 * function for displaying a tag's dropdown
 *
 * @param {string} type - The type of the dropdown (ingredients, appliances, ustensils).
 * @param {Array} items - The array of items to display in the dropdown.
 */
export function displayDropdown(type, items) {
    const dropdown = document.getElementById(`${type}Dropdown`);
    dropdown.innerHTML = '';

    const searchBarContainer = document.createElement('div');
    searchBarContainer.classList.add('search-text');

    const searchBar = document.createElement('input');
    searchBar.type = 'text';
    searchBar.id = `${type}Search`;
    searchBar.classList.add('form-control');

    const searchIcon = document.createElement('i');
    searchIcon.classList.add('fa-solid', 'fa-magnifying-glass');

    searchBarContainer.appendChild(searchBar);
    searchBarContainer.appendChild(searchIcon);
    dropdown.appendChild(searchBarContainer);

    items.forEach(item => {
        const listItem = document.createElement('div');
        listItem.textContent = item;
        listItem.classList.add('dropdown-item');
        dropdown.appendChild(listItem);
    });
}