let selectedForCompare = [];

async function loadMice(){

const response = await fetch('top10teclados.json');
const data = await response.json();

renderMice(data.mice);

}

function renderMice(mice){

const container=document.getElementById('mouse-list');

container.innerHTML=mice.map(mouse=>`

<div class="mouse-card bg-white p-8 rounded-3xl flex flex-col md:flex-row gap-8 items-center relative">

<div class="absolute top-6 left-6 badge-number">${mouse.id}</div>

<img src="${mouse.img}" class="w-48 h-48 object-contain" alt="${mouse.name}">

<div class="flex-1 w-full">

<h3 class="text-2xl font-bold mb-2">${mouse.name}</h3>

<p class="text-gray-500 text-sm mb-4">${mouse.desc}</p>

<div class="flex items-center gap-4 mb-6">

<span class="text-black font-bold text-xl">${mouse.price}</span>

<span class="text-gray-400 text-[10px] uppercase font-bold tracking-widest">
${mouse.specs.split(',')[0]}
</span>

</div>

<div class="flex flex-wrap gap-2">

<a href="${mouse.link}" target="_blank" class="bg-black text-white px-6 py-2.5 rounded-full text-xs font-medium hover:bg-gray-800 transition">
Ver en Amazon
</a>


</div>

</div>

</div>

`).join('');

}

function addToCompare(id){

fetch('top10teclados.json')
.then(res=>res.json())
.then(data=>{

const mouse=data.mice.find(m=>m.id===id);

if(selectedForCompare.length>=2)selectedForCompare.shift();

selectedForCompare.push(mouse);

alert(mouse.name+" agregado al comparador");

});

}

window.onload=loadMice;