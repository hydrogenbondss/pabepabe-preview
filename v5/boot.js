(async function(){
  const n=10;
  const base=document.currentScript.src.replace(/[^/]+$/,'parts/');
  const chunks=await Promise.all([...Array(n)].map((_,i)=>fetch(base+'p'+i+'.txt').then(r=>{
    if(!r.ok) throw new Error('part '+i+' '+r.status);
    return r.text();
  })));
  document.open();
  document.write(chunks.join(''));
  document.close();
})().catch(function(e){
  document.body.innerHTML='<pre style="padding:24px;font:14px/1.4 sans-serif">Failed to load polished v5 preview.\n'+e+'</pre>';
});
