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
    // printCards(response.response, "cards")
    // ________________________________
    checksTrue(response)
    const inputTexto = document.querySelector('#buscador')
        inputTexto.addEventListener('keyup', e => {
      console.log(inputTexto.value)
        return inputTexto      
    })
}
catch (error) {
  console.log(error)
}

}
apiFetch(apiUrl)

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