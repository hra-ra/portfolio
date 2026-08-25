// live clock
function tick(){
  const d = new Date();
  const opts = {hour:'2-digit', minute:'2-digit', second:'2-digit', hour12:false};
  document.getElementById('clock').textContent = 'IST · ' + d.toLocaleTimeString('en-IN', opts);
}
tick();
setInterval(tick, 1000);

// hero kicker typing sequence
const lines = [
  "$ whoami",
  "> shubhra — b.tech it, mait '29",
  "$ status --check",
  "> online · building"
];
const kicker = document.getElementById('kicker');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function typeSequence(el, seq, cb){
  if(reduceMotion){ el.textContent = seq[seq.length-1]; if(cb) cb(); return; }
  let li = 0;
  function typeLine(){
    if(li >= seq.length){ el.innerHTML += '<span class="cursor"></span>'; if(cb) cb(); return; }
    const text = seq[li];
    let ci = 0;
    el.textContent = '';
    const iv = setInterval(()=>{
      el.textContent = text.slice(0, ci+1);
      ci++;
      if(ci >= text.length){
        clearInterval(iv);
        li++;
        setTimeout(typeLine, li >= seq.length ? 0 : 450);
      }
    }, 22);
  }
  typeLine();
}

typeSequence(kicker, lines, ()=>{
  document.querySelectorAll('#dashboard .tile').forEach((t,i)=>{
    setTimeout(()=> t.classList.add('show'), i*130);
  });
});

// scroll reveal
const io = new IntersectionObserver((entries)=>{
  entries.forEach(e=>{
    if(e.isIntersecting){ e.target.classList.add('show'); io.unobserve(e.target); }
  });
}, {threshold:0.15});
document.querySelectorAll('.reveal').forEach(el=> io.observe(el));