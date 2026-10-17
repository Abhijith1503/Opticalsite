var SH=[["Cat-eye","cateye"],["Square","square"],["Rectangle","rectangle"],["Pilot","pilot"],["Round","round"],["Half-frame","halfframe"],["Full-frame","fullframe"],["Geometric","geometric"]];
var GID=0;
function shd(c,p){var n=parseInt(c.slice(1),16),R=n>>16,G=(n>>8)&255,B=n&255,t=p<0?0:255,a=Math.abs(p)/100;R=Math.round(R+(t-R)*a);G=Math.round(G+(t-G)*a);B=Math.round(B+(t-B)*a);return "#"+((1<<24)+(R<<16)+(G<<8)+B).toString(16).slice(1);}
var S={round:'<ellipse cx="61" cy="41" rx="31" ry="23" %/>',square:'<rect x="30" y="19" width="62" height="46" rx="8" %/>',rectangle:'<rect x="30" y="23" width="62" height="36" rx="6" %/>',cateye:'<path d="M30 32Q30 20 44 22L90 27Q94 30 92 42Q88 62 60 62Q30 60 30 40Z" %/>',pilot:'<path d="M32 24H90Q94 24 92 38Q88 62 60 62Q30 60 32 24Z" %/>',geometric:'<polygon points="30,40 44,20 78,20 92,40 78,62 44,62" %/>',fullframe:'<rect x="30" y="21" width="62" height="42" rx="16" %/>'};
var T={rimless:['<rect x="30" y="22" width="62" height="40" rx="14" %/>',1.4],thin:['<rect x="30" y="21" width="62" height="42" rx="12" %/>',2.4],chunky:['<rect x="29" y="18" width="64" height="47" rx="12" %/>',9],flip:[S.fullframe,5.5],halfframe:['<rect x="30" y="23" width="62" height="38" rx="8" %/>',0]};
function g(col,sun,s){
 var id="k"+(++GID),u="url(#"+id;
 var shadow='<ellipse cx="100" cy="77" rx="74" ry="4.2" fill="#000" opacity=".28" filter="'+u+'b)"/>';
 var bl='<filter id="'+id+'b" x="-20%" y="-150%" width="140%" height="400%"><feGaussianBlur stdDeviation="2.6"/></filter>';
 if(s==="lens"){
  return '<svg viewBox="0 0 200 84" role="img" aria-label="Contact lens"><defs><radialGradient id="'+id+'r" cx=".4" cy=".35" r=".75"><stop offset="0" stop-color="#fff" stop-opacity=".95"/><stop offset=".65" stop-color="#D3E8F3" stop-opacity=".75"/><stop offset="1" stop-color="#86B3CC" stop-opacity=".95"/></radialGradient>'+bl+'</defs><ellipse cx="100" cy="77" rx="34" ry="4" fill="#000" opacity=".28" filter="'+u+'b)"/><circle cx="100" cy="40" r="32" fill="'+u+'r)" stroke="#7FA9C2" stroke-width="1.5"/><circle cx="100" cy="40" r="18" fill="none" stroke="#7FA9C2" stroke-opacity=".5"/><ellipse cx="88" cy="27" rx="10" ry="5" transform="rotate(-35 88 27)" fill="#fff" opacity=".85"/></svg>';
 }
 var geo,w=5.5; if(T[s]){geo=T[s][0];w=T[s][1];}else{geo=S[s]||S.round;}
 var lt=sun?shd(col,22):"#DCEBF4",lb=sun?shd(col,-38):"#B2D0E2",lo=sun?.94:.5;
 var defs='<defs>'
  +'<linearGradient id="'+id+'f" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="'+shd(col,40)+'"/><stop offset=".5" stop-color="'+col+'"/><stop offset="1" stop-color="'+shd(col,-34)+'"/></linearGradient>'
  +'<linearGradient id="'+id+'l" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="'+lt+'"/><stop offset="1" stop-color="'+lb+'"/></linearGradient>'
  +'<linearGradient id="'+id+'h" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fff" stop-opacity=".8"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient>'
  +'<linearGradient id="'+id+'t" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="'+shd(col,-35)+'"/><stop offset="1" stop-color="'+shd(col,8)+'"/></linearGradient>'
  +'<clipPath id="'+id+'c">'+geo.replace("%","")+'</clipPath>'+bl+'</defs>';
 var lens=geo.replace("%",'fill="'+u+'l)" fill-opacity="'+lo+'" stroke="none"');
 var rim=w>0?geo.replace("%",'fill="none" stroke="'+u+'f)" stroke-width="'+w+'" stroke-linejoin="round"'):'<path d="M32 23.5H90" fill="none" stroke="'+col+'" stroke-width="5.5" stroke-linecap="round"/><path d="M32 22H90" fill="none" stroke="#fff" stroke-opacity=".3" stroke-width="1" stroke-linecap="round"/><path d="M32 61H90" fill="none" stroke="'+shd(col,-10)+'" stroke-width=".7" stroke-opacity=".7"/>';
 var spec=w>=5?geo.replace("%",'fill="none" stroke="#fff" stroke-opacity=".32" stroke-width="1" stroke-linejoin="round" transform="translate(0 -1.6)"'):"";
 var flip=s==="flip"?'<rect x="28" y="4" width="66" height="26" rx="9" fill="#14171A" fill-opacity=".74" stroke="'+u+'f)" stroke-width="2.2"/><path d="M36 9L52 9L46 25L36 25Z" fill="#fff" opacity=".15"/>':"";
 var tp=w>=5?"M30 25L7 21L5 26L30 33Z":"M30 27L7 23L6 25.5L30 30Z";
 var temple='<path d="'+tp+'" fill="'+u+'t)"/><rect x="26" y="24.5" width="6" height="9" rx="2" fill="'+shd(col,-45)+'"/><circle cx="29" cy="29" r="1" fill="'+shd(col,50)+'"/>';
 function LG(m){
  var gl='<path d="M26 22L56 16L40 68L26 68Z" fill="'+u+'h)" opacity="'+(sun?.5:.38)+'"/><path d="M60 16L66 16L50 68L44 68Z" fill="#fff" opacity=".16"/>';
  if(m)gl='<g transform="translate(122 0) scale(-1 1)">'+gl+'</g>';
  return temple+lens+'<g clip-path="'+u+'c)">'+gl+(sun?"":'<path d="M30 64L92 64L92 50Z" fill="#7FD0FF" opacity=".24"/>')+'</g>'+rim+spec+flip;
 }
 var bw=Math.min(Math.max(w,2.2),4.8);
 var bridge='<path d="M91 37Q100 28 109 37" fill="none" stroke="'+shd(col,-8)+'" stroke-width="'+bw+'" stroke-linecap="round"/>';
 var pads='<ellipse cx="95.5" cy="49" rx="1.8" ry="4" fill="#fff" fill-opacity=".6" stroke="'+shd(col,-20)+'" stroke-width=".6" transform="rotate(14 95.5 49)"/><ellipse cx="104.5" cy="49" rx="1.8" ry="4" fill="#fff" fill-opacity=".6" stroke="'+shd(col,-20)+'" stroke-width=".6" transform="rotate(-14 104.5 49)"/>';
 return '<svg viewBox="0 0 200 84" role="img" aria-label="Frame illustration">'+defs+shadow+'<g>'+LG(false)+'</g><g transform="translate(200 0) scale(-1 1)">'+LG(true)+'</g>'+bridge+pads+'</svg>';
}
function sw(c){return '<span class="sw" title="Available colours"><i style="background:'+c+'"></i><i style="background:#14171A"></i><i style="background:#9AA5B0"></i></span>';}
var MENU=[["Eyeglasses",[["For",["Men","Women","Kids & teens"]],["Lens type",["Single vision","Progressive","Bi-focal","Reading","Computer"]],["Shape",["Rectangle","Geometric","Square","Cat-eye","Round","Pilot","Oval"]],["Frame type",["Rimless","Half rim","Full rim","Flip-up","Clip-on","Titanium"]]],"#frametypes"],
["Sunglasses",[["For",["Men","Women","Kids & teens"]],["Lens type",["Non-prescription","Prescription","Tinted","Polarised"]],["Shape",["Round","Square","Rectangle","Cat-eye","Pilot","Geometric"]]],"#sun"],
["Contact Lenses",[["Usage",["Daily","Bi-weekly","Monthly","Yearly"]],["Lens type",["Clear spherical","Clear toric","Clear multifocal","Colour spherical","Colour zero power"]],["Solutions",["Lens solution","Lens cleaner"]]],"#lenses"],
["Accessories",[["Care and extras",["Lens solution","Lens cleaner","Night drive glasses","Sleep glasses","Swimming goggles","Cases and bags"]]],"#sun"]];
document.getElementById("links").innerHTML=MENU.map(function(m){return '<div class="has"><a href="'+m[2]+'">'+m[0]+'</a><div class="mega">'+m[1].map(function(c){return '<div><h3>'+c[0]+'</h3>'+c[1].map(function(i){return '<a href="'+m[2]+'">'+i+'</a>';}).join("")+'</div>';}).join("")+'</div></div>';}).join("")+'<a href="#about">About</a><a href="#faq">FAQ</a><a href="#inquiry">Our store</a><a href="#inquiry" class="btn small">Send inquiry</a>';
var FT=[["Full-rim","fullframe","#1D2126","The frame wraps the whole lens. Strong, classic and suits every prescription.","Everyday wear and high powers",1690],
["Half-rim","halfframe","#14171A","The frame covers only the top of the lens. Light, with a smart professional look.","Office and a lighter feel",1990],
["Rimless","rimless","#7A8590","Lenses are held by the arms and bridge with no frame edge. Almost invisible.","A minimal look and lighter powers",2490],
["Titanium","thin","#9AA5B0","Ultra-light, strong and kind to sensitive skin. Slim and long-lasting.","All-day comfort and sensitive skin",2990],
["Acetate","chunky","#2F5E8C","Rich colours and a bold glossy finish. Warm, sturdy and made to stand out.","Statement style",2190],
["TR90 flexible","fullframe","#2F7FBF","Featherweight nylon that bends and springs back. Hard to break.","Kids, sport and active days",1590],
["Flip-up and clip-on","flip","#2A3037","Add a sunglass lens over your glasses in seconds, then flip it away.","Driving and travel",2290],
["Computer glasses","rectangle","#2F9BE0","Blue-cut lenses with anti-glare coating to reduce screen strain.","Long hours on screens",1490]];
var SUN=[["Full Frame Square Shell","square","#1D2126",2990],["Full Frame Geometric Metal","geometric","#2F5E8C",3990],["Full Frame Pilot Metal","pilot","#3A424B",3990],["Full Frame Square Metal","square","#14171A",3990],["Full Frame Round Metal","round","#1F4E79",3290],["Full Frame Cat-eye Acetate","cateye","#4A525A",3190]];
var sh=4,sl=0;
function card(x,sun,tag){return '<article class="card"><div class="thumb">'+g(x[2],sun,x[1])+'</div><span class="brandtag">'+tag+'</span><h3>'+x[0]+'</h3><div class="row between">'+sw(x[2])+'<button class="link" data-i="'+x[0]+'">Inquire</button></div>'+(sun?'<span class="offerline">UV400 protection</span>':'<span class="offerline">Includes anti-glare lenses · 2 pairs 50% off</span>')+'</article>';}
function render(){
  document.getElementById("grid").innerHTML=FT.map(function(x){return '<article class="card"><div class="thumb">'+g(x[2],false,x[1])+'</div><h3>'+x[0]+'</h3><p class="muted">'+x[3]+'</p><span class="offerline">Best for: '+x[4]+'</span><div class="row between">'+sw(x[2])+'<button class="link" data-i="'+x[0]+' frames">Inquire</button></div></article>';}).join("");
 document.getElementById("shapes").innerHTML=SH.map(function(s,i){return '<button class="shape'+(i===sh?' on':'')+'" data-s="'+i+'">'+g("#14171A",false,s[1])+s[0]+'</button>';}).join("");
 document.getElementById("bigShape").innerHTML=g("#1D2126",false,SH[sh][1]);
 document.getElementById("bigName").textContent="Currently wearing: "+SH[sh][0];
 document.getElementById("exploreBtn").textContent="Explore "+SH[sh][0]+" frames";
}
document.getElementById("rail").innerHTML=SUN.map(function(x){return card(x,true,"Sunglasses");}).join("");
document.getElementById("plist").innerHTML=["Eye test appointment","Contact lenses","Home try-on"].concat(FT.map(function(x){return x[0]+" frames";}),SUN.map(function(x){return x[0]+" sunglasses";})).map(function(v){return '<option value="'+v+'">';}).join("");
document.getElementById("a1").innerHTML=g("#1D2126",false,"round");document.getElementById("a2").innerHTML=g("#2A3037",true,"pilot");document.getElementById("a3").innerHTML=g("#7A8590",false,"lens");
document.getElementById("aboutArt").innerHTML=g("#2F9BE0",true,"square");
var w="Urban eyewear collections  |  Bespoke lens services  |  Perfect vision  |  ";document.getElementById("tick").textContent=w+w+w+w;
function go(n){sl=(n+4)%4;document.getElementById("slides").style.transform="translateX(-"+sl*100+"%)";var d=document.querySelectorAll("#dots button");for(var i=0;i<d.length;i++)d[i].className=i===sl?"on":"";}
document.getElementById("dots").innerHTML=[0,1,2,3].map(function(i){return '<button aria-label="Slide '+(i+1)+'" data-d="'+i+'"></button>';}).join("");go(0);
document.addEventListener("click",function(e){var t=e.target.closest("[data-t],[data-i],[data-s],[data-d]");if(!t)return;
  if(t.dataset.s){sh=+t.dataset.s;render();}
 if(t.dataset.d){go(+t.dataset.d);}
 if(t.dataset.i){document.getElementById("product").value=t.dataset.i;document.getElementById("inquiry").scrollIntoView({behavior:"smooth"});}});
var links=document.getElementById("links");document.getElementById("burger").onclick=function(){links.classList.toggle("open");};links.onclick=function(e){if(e.target.tagName==="A")links.classList.remove("open");};
document.getElementById("form").onsubmit=function(e){e.preventDefault();this.reset();document.getElementById("ok").hidden=false;};
document.getElementById("sub").onsubmit=function(e){e.preventDefault();this.reset();};
render();
