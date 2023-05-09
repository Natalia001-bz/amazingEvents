
async function apiFetch() {
  let slectId= new URLSearchParams (
    window.location.search)
  const id = slectId.get("id")
  //  console.log(id)
  
  try {

    let response = await fetch( `https://pro-talento.up.railway.app/api/amazing/${id}`)

    response = await response.json()
 // console.log(response)
 var dateEvento = new Date(response.response.date).toISOString().slice(0, 10);
//  console.log(dateEvento)
 
  
  let contenedorDetail= document.getElementById("cardDetails")
  let cardDetail = document.createElement("div")

  cardDetail.innerHTML = `
  <div class="card mb-3" style="  ">
  <div class="row">
    <div class="col-md-6 ">
  <img src="${response.response.image}" class="img-fluid rounded-start  imgdetail">
  </div>
  <div class="col-md-6">
  <div class="card-body" >
    <h5 class="card-title">${response.response.name}</h5>
    <p class="card-text ">${response.response.description}</p> 
       <hr class="lineatop w-50">
    <p>Date: ${dateEvento}</p>   
  <p>Category: ${response.response.category}</p>
  <p>Place: ${response.response.place}</p>
  <hr class="lineatop w-50">
  <p>price: $ ${response.response.price}</p> 
  <p>${response.response.assistance?"Assistance: " + response.response.assistance:"Estimate: " + response.response.estimate}</p>
   
  </div>
</div>
</div>
</div>
  `
  contenedorDetail.appendChild(cardDetail)
 
   //  printCardDetails()

  
  
  } 
  catch (error) {
    console.log(error)
  }

}
apiFetch()
