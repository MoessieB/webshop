async function fetchBaseProducts() {
    try {
        const response = await fetch('./products.JSON');
        const data = await response.json();
        return data.products || data.Autoshop || [];
    } catch (error) {
        console.error('Error fetching base products:', error);
        return [];
    }
}

let productsData = JSON.parse(localStorage.getItem('productsData')) || [];

async function initializeProducts() {
    if (!localStorage.getItem('productsData')) {
        const baseProducts = await fetchBaseProducts();
        productsData = [...baseProducts];
        localStorage.setItem('productsData', JSON.stringify(productsData));
    } else {
        productsData = JSON.parse(localStorage.getItem('productsData'));
    }
    renderTable(productsData);
}

function renderTable(products) {
    const tableBody = document.getElementById('productTableBody');
    tableBody.innerHTML = '';

    products.forEach((product, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td class="px-4 py-2">${index + 1}</td>
            <td class="px-4 py-2"><img src="${product.image}" alt="${product.name}" class="h-16"></td>
            <td class="px-4 py-2">${product.name}</td>
            <td class="px-4 py-2">€${product.price}</td>
            <td class="px-4 py-2">
                <button data-index="${index}" class="px-2 py-1 text-white bg-blue-500 rounded hover:bg-blue-700" onclick="editProduct(${index})">Bewerk</button>
                <button class="px-2 py-1 text-white bg-red-500 rounded hover:bg-red-700" onclick="deleteProduct(${index})">Verwijder</button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

function editProduct(index) {
    const product = productsData[index];
    document.getElementById('productId').value = index;
    document.getElementById('productName').value = product.name;
    document.getElementById('productPrice').value = product.price;
    document.getElementById('productDescription').value = product.description;
    // Afbeelding niet vooraf invullen omdat dat niet ondersteund wordt in HTML voor security
}

function deleteProduct(index) {
    productsData.splice(index, 1);
    localStorage.setItem('productsData', JSON.stringify(productsData));
    renderTable(productsData);
}

function addProduct(event) {
    event.preventDefault();

    const name = document.getElementById('productName').value.trim();
    const price = document.getElementById('productPrice').value.trim();
    const description = document.getElementById('productDescription').value.trim();
    const imageInput = document.getElementById('productPicture');
    const imageFile = imageInput.files[0];

    if (!name || !price || !description || !imageFile) {
        alert('Alle velden zijn verplicht.');
        return;
    }

    if (isNaN(price)) {
        alert('Prijs moet een getal zijn.');
        return;
    }

    const reader = new FileReader();
    reader.onloadend = function () {
        const newProduct = {
            name,
            price,
            description,
            image: reader.result
        };
        const editId = document.getElementById('productId').value;
        if (editId !== '') {
            productsData[editId] = newProduct;
        } else {
            productsData.push(newProduct);
        }
        localStorage.setItem('productsData', JSON.stringify(productsData));
        renderTable(productsData);
        document.getElementById('productForm').reset();
        document.getElementById('productId').value = '';
    };
    reader.readAsDataURL(imageFile);
}

function resetProducts() {
    fetchBaseProducts().then(baseProducts => {
        productsData = [...baseProducts];
        localStorage.setItem('productsData', JSON.stringify(productsData));
        renderTable(productsData);
    });
}

function displayOrders() {
    const orders = JSON.parse(localStorage.getItem('orders')) || [];
    const besteloverzicht = document.getElementById('besteloverzicht');
    besteloverzicht.innerHTML = '';

    if (orders.length === 0) {
        besteloverzicht.innerHTML = '<p class="leeg">Geen bestellingen gevonden.</p>';
        return;
    }

    const table = document.createElement('table');
    table.className = 'min-w-full bg-white';
    table.innerHTML = `
        <thead>
            <tr class="bg-gray-200">
                <th class="px-4 py-2 text-left">Datum en Tijd</th>
                <th class="px-4 py-2 text-left">Producten</th>
                <th class="px-4 py-2 text-left">Totaal Prijs</th>
            </tr>
        </thead>
        <tbody></tbody>
    `;

    orders.forEach(order => {
        const row = document.createElement('tr');
        const productNames = order.products ? order.products.map(p => `${p.name} (${p.quantity}x)`).join(', ') : 'Geen producten';
        row.innerHTML = `
            <td class="px-4 py-2 border text-left">${order.date}</td>
            <td class="px-4 py-2 border text-left">${productNames}</td>
            <td class="px-4 py-2 border text-left">€${order.totalPrice}</td>
        `;
        table.querySelector('tbody').appendChild(row);
    });

    besteloverzicht.appendChild(table);
}

document.addEventListener('DOMContentLoaded', () => {
    initializeProducts();
    displayOrders();
});
document.getElementById('productForm').addEventListener('submit', addProduct);
document.getElementById('resetProducts').addEventListener('click', resetProducts);
