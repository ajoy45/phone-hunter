const phoneLoad = async (searchText,dataLimit) => {
  const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
  const res = await (fetch(url));
  const data = await res.json();
  showPhone(data.data,dataLimit)
}
const showPhone = (phones,dataLimit) => {
  const cardContainer = document.getElementById('card-container');

  cardContainer.innerText = ''
  // show limited phones


  // show btn toggle
  const showAll = document.getElementById('show-btn');
  if (dataLimit && phones.length > 10) {
    phones = phones.slice(0, 10);
    showAll.classList.remove('d-none')
  }
  else {
    showAll.classList.add('d-none')
  }

  // no phone found
  const noPhone = document.getElementById('no-phone-found');
  if (phones.length === 0) {
    noPhone.classList.remove('d-none')
    //  stop loading
    toggleLoading(false)
  }
  else {
    noPhone.classList.add('d-none')
  }
  // loop on api data
  phones.forEach(phone => {
    const { phone_name, image,slug } = phone
    const div = document.createElement('div');
    div.classList.add('card');

    div.innerHTML = `
         <img src="${image}" class="card-img-top p-4" alt="...">
         <div class="card-body ">
           <h5 class="card-title">${phone_name}</h5>
           <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
           <button type="button" onclick="loadPhoneDetails('${slug}')" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#phoneDetails">Details</button>
          
         </div>
         `;
    cardContainer.appendChild(div);
    //  stop loading
    toggleLoading(false)
  })
}
// searchProcess
const searchProcess=(dataLimit)=>{
  const inputField = document.getElementById('input-field');
  const inputValue = inputField.value;
  phoneLoad(inputValue,dataLimit)
  // start loading
  toggleLoading(true)
}

// limit  search phone
const searchPhone = () => {
  searchProcess(10)
}
// toggle the spine
const toggleLoading = (isLoading) => {
  const elementSpiner = document.getElementById('spiner');
  if (isLoading === true) {
    elementSpiner.classList.remove('d-none');
  }
  else {
    elementSpiner.classList.add('d-none');
  }

}

// show all button
document.getElementById('show-btn').addEventListener('click', function () {
  searchProcess()

})

// load phone details
const loadPhoneDetails=async(id)=>{
  const url=`https://openapi.programming-hero.com/api/phone/${id}`;
  const res=await fetch(url);
  const data=await res.json();
  showPhoneDetails(data.data)
}

const showPhoneDetails=(phoneDetails)=>{
     console.log(phoneDetails);
    document.getElementById('exampleModalLabel').innerText=`${phoneDetails.name}`;
    const detailsBody=document.querySelector('.modal-body');
    detailsBody.innerHTML=`
    <p>Brand: ${phoneDetails.brand}</p>
    <img src="${phoneDetails.image}" alt="">
    <p>Name: ${phoneDetails.name}</p>
    <p>Storage: ${phoneDetails.mainFeatures.storage}</p>
    <p>Display: ${phoneDetails.mainFeatures.displaySize}</p>
    <p>Sensors: ${phoneDetails.mainFeatures.sensors?.map(sensor=>
      sensor
    )}</p>

    `
}

// input enter key handler added
document.getElementById('input-field').addEventListener('keypress',function(event){
  if(event.key==='Enter'){
    searchProcess(10)
  }
})
