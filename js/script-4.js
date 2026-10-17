function initEffects(){
 var rm=window.matchMedia("(prefers-reduced-motion: reduce)").matches,fine=window.matchMedia("(hover:hover) and (pointer:fine)").matches,root=document.documentElement,offs=[];
 function on(t,e,f,o){t.addEventListener(e,f,o);offs.push(function(){t.removeEventListener(e,f,o);});}
 /* scroll progress, nav shadow, photo parallax */
 var sp=document.createElement("div");sp.id="sp";document.body.appendChild(sp);offs.push(function(){sp.remove();});
 var nav=document.querySelector(".nav"),busy=false,pars=[].slice.call(document.querySelectorAll(".ph,.gallery a"));
 function tickScroll(){busy=false;var m=root.scrollHeight-window.innerHeight;sp.style.transform="scaleX("+(m>0?Math.min(window.scrollY/m,1):0)+")";if(nav)nav.classList.toggle("scrolled",window.scrollY>10);
  if(!rm){var vh=window.innerHeight;for(var i=0;i<pars.length;i++){var r=pars[i].getBoundingClientRect();if(r.bottom<-100||r.top>vh+100)continue;pars[i].style.setProperty("--py",(((r.top+r.height/2)-vh/2)/vh*-28).toFixed(1)+"px");}}}
 function onScroll(){if(!busy){busy=true;requestAnimationFrame(tickScroll);}}
 on(window,"scroll",onScroll,{passive:true});on(window,"resize",onScroll);onScroll();
 /* reveal on scroll and count-up numbers */
 if(!rm&&"IntersectionObserver" in window){
  root.classList.add("ready");
  var els=[].slice.call(document.querySelectorAll(".section>h2,.section>.muted,.card,.tile,.ph,.step,details,.stats>div,.visit>div,.gallery a,.finder>*,.v3d>*,.inquiry>*,.about>*")),timers=[];
  els.forEach(function(el){var i=el.parentElement?[].indexOf.call(el.parentElement.children,el):0;el.classList.add("rv");el.style.transitionDelay=Math.min(i,6)*70+"ms";});
  var io=new IntersectionObserver(function(es){es.forEach(function(e){if(!e.isIntersecting)return;var el=e.target;io.unobserve(el);el.classList.add("in");if(el.matches(".section>h2"))el.classList.add("uv");timers.push(setTimeout(function(){el.classList.remove("rv","in");el.style.transitionDelay="";},1400));});},{threshold:.12,rootMargin:"0px 0px -6% 0px"});
  els.forEach(function(el){io.observe(el);});
  function count(b,n,suf,dec){var t0=null;function step(ts){if(!t0)t0=ts;var p=Math.min((ts-t0)/1400,1),v=n*(1-Math.pow(1-p,3));b.textContent=(dec?v.toFixed(dec):Math.round(v).toLocaleString("en-IN"))+suf;if(p<1)requestAnimationFrame(step);}requestAnimationFrame(step);}
  var cio=new IntersectionObserver(function(es){es.forEach(function(e){if(!e.isIntersecting)return;cio.unobserve(e.target);var b=e.target;count(b,+b.dataset.n,b.dataset.s,+b.dataset.d);});},{threshold:.6}),nums=[].slice.call(document.querySelectorAll(".stats b"));
  nums.forEach(function(b){var t=(b.dataset.o||b.textContent).trim(),n=parseFloat(t.replace(/,/g,""));if(isNaN(n))return;b.dataset.o=t;b.dataset.n=n;b.dataset.s=t.replace(/[0-9.,]/g,"");b.dataset.d=((t.split(".")[1]||"").replace(/\D/g,"")).length;b.textContent="0"+b.dataset.s;cio.observe(b);});
  offs.push(function(){io.disconnect();cio.disconnect();timers.forEach(clearTimeout);els.forEach(function(el){el.classList.remove("rv","in","uv");el.style.transitionDelay="";});nums.forEach(function(b){if(b.dataset.o)b.textContent=b.dataset.o;});root.classList.remove("ready");});
 }
 /* mouse effects: card tilt, magnetic buttons, hero parallax, cursor glow */
 if(fine&&!rm){
  var curT=null,curB=null;
  on(document,"pointermove",function(e){
   var t=e.target.closest?e.target.closest(".card,.ph,.tile"):null;
   if(curT&&curT!==t){curT.style.transform="";curT=null;}
   if(t&&!t.classList.contains("rv")){curT=t;var r=t.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;t.style.transform="perspective(700px) rotateX("+(-y*6).toFixed(2)+"deg) rotateY("+(x*7).toFixed(2)+"deg) translateY(-4px)";}
   var b=e.target.closest?e.target.closest(".btn"):null;
   if(curB&&curB!==b){curB.style.translate="";curB=null;}
   if(b){curB=b;var q=b.getBoundingClientRect();b.style.translate=(((e.clientX-q.left)/q.width-.5)*8).toFixed(1)+"px "+(((e.clientY-q.top)/q.height-.5)*6).toFixed(1)+"px";}
  });
  on(document,"pointerout",function(e){if(!e.relatedTarget){if(curT){curT.style.transform="";curT=null;}if(curB){curB.style.translate="";curB=null;}}});
  offs.push(function(){if(curT)curT.style.transform="";if(curB)curB.style.translate="";});
  var hero=document.querySelector(".mhero");
  if(hero){on(hero,"pointermove",function(e){var r=hero.getBoundingClientRect();hero.style.setProperty("--mx",((e.clientX-r.left)/r.width-.5)*2);hero.style.setProperty("--my",((e.clientY-r.top)/r.height-.5)*2);});on(hero,"pointerleave",function(){hero.style.setProperty("--mx",0);hero.style.setProperty("--my",0);});}
  var orb=document.createElement("div");orb.id="orb";document.body.appendChild(orb);
  var tx=0,ty=0,cx=0,cy=0,raf=0;
  function loop(){cx+=(tx-cx)*.12;cy+=(ty-cy)*.12;orb.style.transform="translate("+cx.toFixed(1)+"px,"+cy.toFixed(1)+"px)";raf=requestAnimationFrame(loop);}
  on(document,"pointermove",function(e){tx=e.clientX;ty=e.clientY;if(!raf){cx=tx;cy=ty;orb.style.opacity=1;raf=requestAnimationFrame(loop);}});
  on(document.documentElement,"mouseleave",function(){orb.style.opacity=0;});
  offs.push(function(){cancelAnimationFrame(raf);raf=0;orb.remove();});
 }
 return function(){offs.forEach(function(f){f();});};
}

initEffects();
(function(){var rm=window.matchMedia("(prefers-reduced-motion: reduce)").matches,s=document.getElementById("banners");if(!s||rm||typeof go!=="function")return;var hold=false;setInterval(function(){if(!hold&&!document.hidden)go(sl+1);},6500);["pointerenter","focusin"].forEach(function(n){s.addEventListener(n,function(){hold=true;});});["pointerleave","focusout"].forEach(function(n){s.addEventListener(n,function(){hold=false;});});})();
