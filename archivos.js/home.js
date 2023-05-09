function template(arrayDatos) {
  let cards = ` 
  <div class="card m-5" style="width: 26rem; height: 650px ">
  <img src="${arrayDatos.image}" class="card-img-top imgCard" alt="${arrayDatos.id}">
  <div class="card-body m-1 fs-5">
    <h5 class="card-title">${arrayDatos.name}</h5>
    <p class="card-text mb-1">${arrayDatos.description}</p>
    <p class="card-text ">Precio : $ ${arrayDatos.price}</p>
    <a href="./detail.html" class="btn btn-dark "> Details </a>
      </div>
    </div>
      </div>
</div>  `

  return cards

}





function printCards(arrayDatos, etiqueta_seleccionada) {
  let allCards = []
  for (let elemento of arrayDatos) {
    allCards.push(template(elemento))
  }
  // console.log(allCards)
  allCards = allCards.join('')
  // console.log(allCards)
  let selector = document.getElementById(etiqueta_seleccionada)
  // console.log(selector)
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
           
            <div class="d-flex class_checked  justify-content-start" id="divChecks">
              <div class="col-md-12">
            <div class="form-check form-check-inline">
                    <input class="form-check-input fs-3" type="checkbox" id="inlineCheckbox" value="${category}">
                    <label class="form-check-label fs-3" for="${category}">${category}</label>
                  </div>
                  </div>
                  </div>
                  
                   `
      }
    }

    let todoslosCheckbox = document.querySelectorAll(".form-check-input")
todoslosCheckbox.forEach( each =>{
  each.addEventListener("change", function(e){
cardsFiltradas()
  })
})

    // ____________________________
    printCards(response.response, "cards")
    
  
    // checksTrue(response)

    const inputTexto = document.querySelector('#buscador')
        inputTexto.addEventListener('keyup', e => {
    cardsFiltradas()   
    })
  
  } 
  catch (error) {
    console.log(error)
  }

}
apiFetch(apiUrl)

________________________________________
async function cardsFiltradas() {
  try {
    console.log()

    let inputTexto = document.getElementById("buscador").value.toLowerCase()
    let checks = Array.from(document.querySelectorAll('.form-check-input:checked')).map(e => e.value)
     console.log(checks)
    let url = `https://pro-talento.up.railway.app/api/amazing/?name=${inputTexto}&category=${checks.join(',')}`
    let response = await fetch(url)
    response = await response.json()
     console.log(response.response)
    if (response.response.length == 0) {
      busquedaFallida('cards')

    }
    else {
      printCards(response.response, "cards")
    }
  }



  catch (error) {
    console.log(error)
  }
}


// ___________________________
// window.click_here = function(buttonId) {
//   window.location.href = "../detail.html"; // se trae la dirección local y se cambia a la dirección de details
//   window.idClickStr = buttonId  // Se almacena el valor del parámetro (buttonId)
//   sessionStorage.setItem("idClickStr",idClickStr) // Se almacena la información en el Storage
//  }
// ___________________________


function busquedaFallida(etiqueta_seleccionada) {
  const divCards = document.getElementById(etiqueta_seleccionada)
  divCards.innerHTML = `
  <div class="alert alert-warning d-flex align-items-center" role="alert">
  <svg class="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Warning:"><use xlink:href="#exclamation-triangle-fill"/></svg>
  <div>
    <h3 class=" fs-3"> SEARCH FAILED!</h3>
  </div>
</div>
  `
  console.log(divCards)
}