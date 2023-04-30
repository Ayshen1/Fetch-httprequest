let API_URL = "https://northwind.vercel.app/api/products"
let addBtn = document.getElementById("addBtn")
const nameInp = document.getElementById("name")
const items = document.getElementById("items")
const searchInp = document.getElementById("search")
// const editInp = document.getElementById("editInput")
const editInp = document.getElementById("editInput")
const editSaveBtn = document.getElementById("editSaveBtn")
addBtn.addEventListener("click", function (e) {
    // window.location.href = './add.html'
    e.preventDefault()
    let nameValue = nameInp.value
    let product = {
        name: nameValue,
    }
    axios.post(API_URL, product).then(res => console.log(res))
    nameInp.value = ""
    renderList()
})

async function deleteProduct(id) {
    await axios.delete(`${API_URL}/${id}`) // 2san
    renderList() // 1sn
}

function renderList() {
    axios.get(API_URL).then(res => {
        let html = ""
        for (let i = 0; i < res.data.length; i++) {
            const {
                id,
                name,
            } = res.data[i]
            html += `
            
            <div class="card p-2" style="width: 18rem;">
            <h5 class="card-title">${id}</h5>
            <p class="card-text">${name}</p>
            <div class="d-flex gap-4">
            <span>    <!-- Button trigger modal -->
            <button
              type="button"
              class="btn btn-warning"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
              onclick="editProduct(${id})"
            >
              edit
            </button></span>
            <span><button class="btn btn-danger" onclick="deleteProduct(${id})">Delete</button></span>
            </div>
          </div>
            `
        }
        items.innerHTML = html
    })
}
searchInp.addEventListener("keyup", function (e) {
    axios.get(API_URL).then(res => {
        let html = ""
        console.log(res.data) // API Products
        console.log(e.target.value) // inpVal
        for (let i = 0; i < res.data.length; i++) {
            if (res.data[i].name.includes(e.target.value)) {
                const {
                    id,
                    name,
                } = res.data[i]
                html += `
                <div class="card" style="width: 18rem;">
                <h5 class="card-title">${id}</h5>
                <p class="card-text">${name}</p>
                <span><button class="btn btn-warning">Edit</button></span>
                <span><button class="btn btn-danger" onclick="deleteProduct(${id})">Delete</button></span>
              </div>
                `
            }
        }
        items.innerHTML = html
    })
})

function editProduct(id) {
    editInp.setAttribute("data-id", id)
    axios.get(`${API_URL}/${id}`).then(res => {
        editInp.value = res.data.name
    })
    // window.location.href = './edit.html'
}
editSaveBtn.addEventListener("click", async function (e) {
    e.preventDefault()
    
    let targetId = editInp.getAttribute("data-id")
    let newName = editInp.value
    await axios.put(`${API_URL}/${targetId}`, {
        name: newName
    }).then(res => console.log(res))
    renderList()
})
renderList()