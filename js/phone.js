const phoneLoad=async(searchText)=>{
    const url=`https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    const res=await(fetch(url));
    const data=await res.json();
    showPhone(data.data)
}
const showPhone=(phones)=>{
    const cardContainer=document.getElementById('card-container');
    cardContainer.innerText=''
    // show limited phones
    phones=phones.slice(0,20);
    // no phone found
    const noPhone=document.getElementById('no-phone-found');
    if(phones.length===0){
        noPhone.classList.remove('d-none')
        //  stop loading
        toggleLoading(false)
    }
    else{
        noPhone.classList.add('d-none')
    }
     phones.forEach(phone=>{
           const{phone_name,image}=phone
         const div=document.createElement('div');
         div.classList.add('card');
        
         div.innerHTML=`
         <img src="${image}" class="card-img-top p-4" alt="...">
         <div class="card-body ">
           <h5 class="card-title">${phone_name}</h5>
           <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
           <a href="#" class="btn btn-primary">Go somewhere</a>
         </div>
         `;
         cardContainer.appendChild(div);
        //  stop loading
        toggleLoading(false)
     })
}

const searchPhone=()=>{
    const inputField=document.getElementById('input-field');
    const inputValue=inputField.value;
    phoneLoad(inputValue)
    // start loading
    toggleLoading(true)
}
// toggle the spine
const toggleLoading=(isLoading)=>{
      const elementSpiner=document.getElementById('spiner');
      if(isLoading===true){
        elementSpiner.classList.remove('d-none');
      }
      else{
        elementSpiner.classList.add('d-none');
      }

}

// phoneLoad()