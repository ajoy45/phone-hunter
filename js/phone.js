const phoneLoad=async()=>{
    const url=`https://openapi.programming-hero.com/api/phones?search=iphone`;
    const res=await(fetch(url));
    const data=await res.json();
    showPhone(data.data)
}
const showPhone=(phones)=>{
    const cardContainer=document.getElementById('card-container');
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
         `
         cardContainer.appendChild(div)
     })
}
phoneLoad()