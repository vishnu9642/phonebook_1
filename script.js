document.addEventListener("DOMContentLoaded", loadContacts);

function addContact() {
    let name = document.getElementById("name").value;
    let number = document.getElementById("number").value;
    let imageInput = document.getElementById("image");
    
    if (!name || !number || !imageInput.files.length) {
        alert("Please fill all fields");
        return;
    }
    
    let reader = new FileReader();
    reader.onload = function (e) {
        let contacts = JSON.parse(localStorage.getItem("contacts")) || [];
        contacts.push({ name, number, image: e.target.result });
        localStorage.setItem("contacts", JSON.stringify(contacts));
        loadContacts();
    };
    reader.readAsDataURL(imageInput.files[0]);
}

function loadContacts() {
    let contacts = JSON.parse(localStorage.getItem("contacts")) || [];
    let contactList = document.getElementById("contactList");
    contactList.innerHTML = "";
    contacts.forEach((contact, index) => {
        let div = document.createElement("div");
        div.classList.add("contact");
        div.innerHTML = `
            <img src="${contact.image}" onclick="makeCall('${contact.number}')" alt="${contact.name}"><br>
            <strong>${contact.name}</strong><br>
            <button onclick="deleteContact(${index})">Delete</button>
        `;
        contactList.appendChild(div);
    });
}

function makeCall(number) {
    window.location.href = `tel:${number}`;
}

function deleteContact(index) {
    let contacts = JSON.parse(localStorage.getItem("contacts")) || [];
    contacts.splice(index, 1);
    localStorage.setItem("contacts", JSON.stringify(contacts));
    loadContacts();
}
