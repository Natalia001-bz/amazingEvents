

function template(arrayDatos) {
  let cards = ` 
  <div class="card m-3" style="width: 26rem; height: 600px">
  <img src="${arrayDatos.image}" class="card-img-top imgCard" alt="${arrayDatos.id}">
  <div class="card-body m-1 fs-5">
    <h5 class="card-title">${arrayDatos.name}</h5>
    <p class="card-text mb-1">${arrayDatos.description}</p>
    <p class="card-text ">Precio : $ ${arrayDatos.price}</p>
    <a href="./detail.html" class="btn btn-dark "> Detalles </a>
      </div>
    </div>
      </div>
</div>  `

  return cards

}


// let arrayDatos = [
// { image: "img.png", id: 1, name: "evento1", description: "evento detalles 1", category: "Cinema" },
// { image: "img.png", id: 2, name: "evento2", description: "evento detalles 2", category: "Concert" },
// { image: "img.png", id: 3, name: "evento3", description: "evento detalles 3", category: "Food" },
// { image: "img.png", id: 4, name: "evento4", description: "evento detalles 4", category: "Race" }, 
// { image: "img.png", id: 5, name: "evento4", description: "evento detalles 5", category: "Books" }, 
// { image: "img.png", id: 6, name: "evento4", description: "evento detalles 6", category: "Museum" }, 
// { image: "img.png", id: 7, name: "evento4", description: "evento detalles 7", category: "Party" }, 

// ]


function printCards(arrayDatos, etiqueta_seleccionada) {
  let allCards = []
  for (let elemento of arrayDatos) {
    allCards.push(template(elemento))
  }
  // console.log(allCards)
  allCards = allCards.join('')
  // console.log(allCards)
  let selector = document.getElementById(etiqueta_seleccionada)
  selector.innerHTML = allCards
}
// printCards(arrayDatos,'cards')



let apiUrl = "https://pro-talento.up.railway.app/api/amazing/"

async function apiFetch(apiUrl) {
  try {

    let response = await fetch(apiUrl)

    response = await response.json()
    // console.log(response)
    // console.log(response.response)
    let arrayCategory = [...new Set(response.response.map(each => each.category))]
    console.log(arrayCategory)
    // ____________________________

    const allCategory = document.getElementById('divChecks')
    const generarChecks = []
    for (let i = 0; i < response.response.length; i++) {
      const category = response.response[i].category
      if (!generarChecks.includes(category)) {
        generarChecks.push(category)
        allCategory.innerHTML += `
           
            <div class="d-flex class_checked" id="divChecks">
              <div class="col-md-8">
            <div class="form-check form-check-inline">
                    <input class="form-check-input" type="checkbox" id="inlineCheckbox" value="${category}">
                    <label class="form-check-label" for="${category}">${category}</label>
                  </div>
                  </div>
                  </div>
                  
                   `
      }
    }
    // ____________________________
    printCards(response.response, "cards")
    // ________________________________
    checksTrue(response)
    const inputTexto = document.querySelector('#buscador')
        inputTexto.addEventListener('keyup', e => {
      console.log(inputTexto.value)
        return inputTexto      
    })

// let cardsFiltradas = []
// cardsFiltradas = response.response.filter(each => each.category.includes(inputTexto.value))
// console.log(cardsFiltradas)
   
    // _____________________________
    //   document.getElementById('botonBuscar').addEventListener('click', cardsFiltradas)
    //   document.querySelectorAll('.class_checks').forEach((each) => each.addEventListener('click', cardsFiltradas))
    //   checksTrue (response)
    //   //  console.log()
  }
  catch (error) {
    console.log(error)
  }

}
apiFetch(apiUrl)

// let boton =document.getElementById('botonBuscar')
// texto = document.getElementById('buscador')

// boton.addEventListener('click', function () {
//   texto.value = ''
//   }
// ____________________________________________
// async function cardsFiltradas() {
//   try {
//     console.log()

//     let inputTexto = document.getElementById("buscador").value.toLowerCase()
//     let checks = Array.from(document.querySelectorAll('.class_checks:checked')).map(e => e.value)
//      console.log(checks)
//     let url = `https://pro-talento.up.railway.app/api/amazing/?name=${inputTexto}&category=${checkSelect.join(',')}`
//     let response = await fetch(url)
//     response = await response.json()
//     //  console.log(response.response)
//     if (response.response.length == 0) {
//       busquedaFallida()

//     }
//     else {
//       printCards(response.response)
//     }
//   }



//   catch (error) {
//     console.log(error)
//   }
// }

// __________________________________----


// llamar los eventos de cambio en los checkboxes
function checksTrue() {
  document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
    checkbox.addEventListener('change', () => {
      // Obtener los valores de los checkboxes seleccionados
      let filtrosSeleccionados = Array.from(document.querySelectorAll('input[type="checkbox"]:checked')).map(checkbox => checkbox.value);
      filtrosSeleccionados = filtrosSeleccionados.join(',')
      console.log(filtrosSeleccionados)
      return filtrosSeleccionados

    })
  })
}

// ___________________________
window.click_here = function(buttonId) {
  window.location.href = "../detail.html"; // se trae la dirección local y se cambia a la dirección de details
  window.idClickStr = buttonId  // Se almacena el valor del parámetro (buttonId)
  sessionStorage.setItem("idClickStr",idClickStr) // Se almacena la información en el Storage
 }
// ___________________________





function busquedaFallida() {
  const divCards = document.getElementById('mensaje')
  divCards.innerHTML = ''
  divCards.innerHTML = `
  <div class="alert alert-warning d-flex align-items-center" role="alert">
  <svg class="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Warning:"><use xlink:href="#exclamation-triangle-fill"/></svg>
  <div>
    <h3>No existen eventos que coincidan con su búsqueda! </h3>
  </div>
</div>
  `
  console.log(divCards)
}


