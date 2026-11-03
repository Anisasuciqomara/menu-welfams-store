const grid=document.getElementById("productGrid");
const search=document.getElementById("searchInput");
const rarity=document.getElementById("rarityFilter");
const sort=document.getElementById("sortFilter");
const count=document.getElementById("resultCount");
const empty=document.getElementById("emptyState");
const modal=document.getElementById("productModal");
const modalContent=document.getElementById("modalContent");
const waNumber="6281234567890"; // GANTI dengan nomor WhatsApp admin tanpa tanda +
const rupiah=n=>n==null||n===""?"Isi harga":new Intl.NumberFormat("id-ID",{style:"currency",currency:"IDR",maximumFractionDigits:0}).format(n);
function renderProducts(){
 let list=products.filter(p=>(p.name+" "+(p.group||"")).toLowerCase().includes(search.value.toLowerCase())&&(!rarity.value||p.rarity===rarity.value));
 if(sort.value==="low")list.sort((a,b)=>(a.price??Infinity)-(b.price??Infinity));
 if(sort.value==="high")list.sort((a,b)=>(b.price??-Infinity)-(a.price??-Infinity));
 count.textContent=list.length+" produk ditemukan";
 empty.hidden=list.length>0;
 let lastGroup=null;
 grid.innerHTML=list.map(p=>{
  const heading=p.group&&p.group!==lastGroup?`<h2 class="group-heading">${p.group}</h2>`:"";lastGroup=p.group||null;
  return `${heading}<article class="product-card">
   <button class="product-image" data-detail="${p.id}" aria-label="Lihat ${p.name}">
    ${p.image?`<img src="${p.image}" alt="${p.name}" loading="lazy">`:""}
    <span class="image-placeholder">WEAPON</span><span class="rarity-tag ${(p.rarity||'').toLowerCase()}">${p.rarity||'Weapon'}</span>
   </button><div class="product-info"><p class="product-meta">${p.attackType||p.group||'WEAPON'}${p.attack!=null?' · '+p.attack:''}</p><h3>${p.name}</h3>
   <div class="product-bottom"><strong>${rupiah(p.price)}</strong><button class="small-button" data-detail="${p.id}">Detail</button></div>
   <p class="stock available">${p.stock||'Tersedia'}</p></div></article>`;
 }).join("");
}
function showDetail(id){
 const p=products.find(item=>item.id===Number(id));if(!p)return;
 const price=rupiah(p.price);const msg=encodeURIComponent(`Halo WellFams Store, saya tertarik dengan ${p.name} (${p.rarity||'Weapon'}) dengan harga ${price}. Apakah masih tersedia?`);
 modalContent.innerHTML=`<div class="detail-image">${p.image?`<img src="${p.image}" alt="${p.name}">`:'<span class="image-placeholder">WEAPON</span>'}</div>
 <p class="eyebrow">${p.group||p.rarity||'WEAPON'}${p.attack!=null?' · '+(p.attackType||'ATTACK')+' '+p.attack:''}</p><h2>${p.name}</h2><p class="detail-description">${p.description||'Belum ada deskripsi.'}</p>
 <p class="detail-price">${price}</p><p class="stock available">${p.stock||'Tersedia'}</p>
 <a class="buy-button" href="https://wa.me/${waNumber}?text=${msg}" target="_blank" rel="noopener">Tanya via WhatsApp ↗</a>`;
 modal.classList.add("open");modal.setAttribute("aria-hidden","false");
}
[search,rarity,sort].forEach(el=>el.addEventListener("input",renderProducts));
grid.addEventListener("click",e=>{const b=e.target.closest("[data-detail]");if(b)showDetail(b.dataset.detail)});
modal.addEventListener("click",e=>{if(e.target.matches("[data-close]")){modal.classList.remove("open");modal.setAttribute("aria-hidden","true")}});
document.addEventListener("keydown",e=>{if(e.key==="Escape"){modal.classList.remove("open");modal.setAttribute("aria-hidden","true")}});
renderProducts();
