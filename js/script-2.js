(function(){
var stage=document.getElementById("stage3d");
if(!stage)return;
function fallback(){var c=document.getElementById("ctl3d");if(c)c.innerHTML='<p class="muted">The 3D view needs a browser with WebGL. You can still browse the frames below and send an inquiry.</p>';stage.innerHTML='<div style="padding:1.5rem;display:grid;place-items:center;height:100%;background:#E4E9ED">'+g("#14171A",false,"round")+'</div>';}
if(typeof THREE==="undefined"){fallback();return;}
try{
var V3=THREE.Vector3;
var renderer=new THREE.WebGLRenderer({antialias:true,alpha:true});
renderer.outputEncoding=THREE.sRGBEncoding;renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=1.05;
renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,2));
var cv=renderer.domElement;cv.setAttribute("role","img");cv.setAttribute("aria-label","Interactive 3D glasses. Drag to rotate.");
stage.insertBefore(cv,stage.firstChild);
var scene=new THREE.Scene(),camera=new THREE.PerspectiveCamera(28,16/10,.1,200);
camera.position.set(0,2.4,24);camera.lookAt(0,0,0);

/* studio reflections */
(function(){
 var es=new THREE.Scene(),sg=new THREE.SphereGeometry(60,32,16),pos=sg.attributes.position,cols=new Float32Array(pos.count*3),c1=new THREE.Color("#e9eef2"),c2=new THREE.Color("#1c2228"),c=new THREE.Color();
 for(var i=0;i<pos.count;i++){var t=(pos.getY(i)/60+1)/2;c.copy(c2).lerp(c1,t*t);cols[i*3]=c.r;cols[i*3+1]=c.g;cols[i*3+2]=c.b;}
 sg.setAttribute("color",new THREE.BufferAttribute(cols,3));
 es.add(new THREE.Mesh(sg,new THREE.MeshBasicMaterial({vertexColors:true,side:THREE.BackSide})));
 function box(x,y,z,w,h,k){var m=new THREE.Mesh(new THREE.PlaneGeometry(w,h),new THREE.MeshBasicMaterial({color:new THREE.Color(k,k,k),side:THREE.DoubleSide}));m.position.set(x,y,z);m.lookAt(0,0,0);es.add(m);}
 box(-22,14,22,20,12,5);box(24,6,14,10,16,3.5);box(0,26,-6,26,10,4);box(-10,-4,-26,24,6,2);
 scene.environment=new THREE.PMREMGenerator(renderer).fromScene(es,.03).texture;
})();
var dl=new THREE.DirectionalLight(0xffffff,.8);dl.position.set(6,10,12);scene.add(dl);

/* soft contact shadow */
(function(){
 var k=document.createElement("canvas");k.width=k.height=128;var x=k.getContext("2d"),gr=x.createRadialGradient(64,64,4,64,64,62);
 gr.addColorStop(0,"rgba(0,0,0,.55)");gr.addColorStop(1,"rgba(0,0,0,0)");x.fillStyle=gr;x.fillRect(0,0,128,128);
 var p=new THREE.Mesh(new THREE.PlaneGeometry(15,7),new THREE.MeshBasicMaterial({map:new THREE.CanvasTexture(k),transparent:true,depthWrite:false}));
 p.rotation.x=-Math.PI/2;p.position.y=-3.7;scene.add(p);
})();

var rig=new THREE.Group();scene.add(rig);var glasses=null;

/* outlines (right lens, outer edge at +x) */
function rr(w,h,r){var s=new THREE.Shape();s.moveTo(-w+r,-h);s.lineTo(w-r,-h);s.quadraticCurveTo(w,-h,w,-h+r);s.lineTo(w,h-r);s.quadraticCurveTo(w,h,w-r,h);s.lineTo(-w+r,h);s.quadraticCurveTo(-w,h,-w,h-r);s.lineTo(-w,-h+r);s.quadraticCurveTo(-w,-h,-w+r,-h);return s;}
var OUT={
 round:function(){var s=new THREE.Shape();s.absellipse(0,0,2.5,2.3,0,Math.PI*2,false,0);return s;},
 square:function(){return rr(2.6,2.1,.75);},
 cateye:function(){var s=new THREE.Shape();s.moveTo(-2.4,.4);s.bezierCurveTo(-2.4,1.7,-1.5,2,-.3,2);s.bezierCurveTo(1.2,2,2.2,2.5,2.9,2.7);s.bezierCurveTo(3,1,2.8,-.6,1.6,-1.6);s.bezierCurveTo(.6,-2.3,-.8,-2.4,-1.6,-2);s.bezierCurveTo(-2.3,-1.5,-2.4,-.5,-2.4,.4);return s;},
 pilot:function(){var s=new THREE.Shape();s.moveTo(-2.5,1.8);s.bezierCurveTo(-1,2.3,1.5,2.3,2.6,1.9);s.bezierCurveTo(2.9,0,2.2,-2,.4,-2.5);s.bezierCurveTo(-1.6,-2.3,-2.8,-.6,-2.5,1.8);return s;},
 geometric:function(){var s=new THREE.Shape();s.moveTo(-2.5,0);s.lineTo(-1.3,2.2);s.lineTo(1.3,2.2);s.lineTo(2.5,0);s.lineTo(1.3,-2.2);s.lineTo(-1.3,-2.2);s.lineTo(-2.5,0);return s;}
};
var COLORS={black:{c:"#111417"},tort:{c:"#ffffff",tex:true},navy:{c:"#1f3a5f"},gold:{c:"#d4af5a",metal:true},silver:{c:"#cfd5db",metal:true}};
var tt=null;
function tortTex(){
 if(tt)return tt;
 var k=document.createElement("canvas");k.width=k.height=512;var x=k.getContext("2d"),seed=7;
 function rnd(){seed=(seed*16807)%2147483647;return seed/2147483647;}
 x.fillStyle="#8a4416";x.fillRect(0,0,512,512);
 for(var i=0;i<170;i++){var px=rnd()*512,py=rnd()*512,r=18+rnd()*70,dark=rnd()<.55,g2=x.createRadialGradient(px,py,0,px,py,r);
  g2.addColorStop(0,dark?"rgba(28,10,3,.85)":"rgba(222,160,74,.75)");g2.addColorStop(1,"rgba(0,0,0,0)");x.fillStyle=g2;x.fillRect(px-r,py-r,r*2,r*2);}
 tt=new THREE.CanvasTexture(k);tt.wrapS=tt.wrapT=THREE.RepeatWrapping;tt.repeat.set(.3,.3);tt.encoding=THREE.sRGBEncoding;return tt;
}
function frameMat(o){return new THREE.MeshPhysicalMaterial({color:o.c,metalness:o.metal?1:.05,roughness:o.metal?.2:.3,clearcoat:o.metal?0:1,clearcoatRoughness:.1,envMapIntensity:1.15,map:o.tex?tortTex():null});}
function lensMat(sun){return new THREE.MeshPhysicalMaterial({color:sun?"#14191e":"#dff0fa",transparent:true,opacity:sun?.86:.14,roughness:.03,metalness:sun?.3:0,clearcoat:1,clearcoatRoughness:0,envMapIntensity:sun?1.6:1.2,depthWrite:false,side:THREE.DoubleSide});}

function build(){
 if(glasses){rig.remove(glasses);glasses.traverse(function(o){if(o.geometry)o.geometry.dispose();});(glasses.userData.mats||[]).forEach(function(m){m.dispose();});}
 var acet=st.type==="acetate",fm=frameMat(COLORS[st.color]),lm=lensMat(st.lens==="sun"),root=new THREE.Group();
 var pts=OUT[st.shape]().getPoints(64),minX=1e9,maxX=-1e9,minY=1e9,maxY=-1e9;
 pts.forEach(function(p){minX=Math.min(minX,p.x);maxX=Math.max(maxX,p.x);minY=Math.min(minY,p.y);maxY=Math.max(maxY,p.y);});
 var cx=(minX+maxX)/2,cy=(minY+maxY)/2,k=acet?1.15:1.045;
 var outer=pts.map(function(p){return new THREE.Vector2(cx+(p.x-cx)*k,cy+(p.y-cy)*k);});
 var oS=new THREE.Shape(outer);oS.holes.push(new THREE.Path(pts));
 var D=acet?.55:.15,bv=acet?.07:.03;
 var ringG=new THREE.ExtrudeGeometry(oS,{depth:D,bevelEnabled:true,bevelThickness:bv,bevelSize:bv,bevelSegments:4,curveSegments:8});ringG.translate(0,0,-D/2);
 var lensG=new THREE.ExtrudeGeometry(new THREE.Shape(pts),{depth:.05,bevelEnabled:false,curveSegments:8});lensG.translate(0,0,-.025);
 var gap=acet?.5:.6,mi=cx+(minX-cx)*k,mx=cx+(maxX-cx)*k,off=gap/2-mi;
 var side=new THREE.Group();side.position.set(off,-cy,0);
 side.add(new THREE.Mesh(ringG,fm));side.add(new THREE.Mesh(lensG,lm));
 var best=null;outer.forEach(function(p){if(p.x>mx-.35&&(!best||p.y>best.y))best=p;});
 var cur=new THREE.CatmullRomCurve3([new V3(0,0,0),new V3(.05,0,-.8),new V3(.12,0,-4.4),new V3(.16,-.05,-6.6),new V3(.18,-.9,-8.1)]);
 var tm=new THREE.Mesh(new THREE.TubeGeometry(cur,40,acet?.17:.07,10,false),fm);tm.position.set(best.x,best.y,-.1);if(acet)tm.scale.y=1.5;side.add(tm);
 var hg=new THREE.Mesh(new THREE.BoxGeometry(.32,acet?.5:.3,.5),fm);hg.position.set(best.x+.02,best.y,-.15);side.add(hg);
 var left=side.clone();left.scale.x=-1;left.position.x=-side.position.x;
 var inn=outer.filter(function(p){return p.x<mi+.35;}),ay=inn.reduce(function(a,p){return a+p.y;},0)/inn.length,yb=ay-cy+(acet?.55:.35);
 var br=new THREE.Mesh(new THREE.TubeGeometry(new THREE.QuadraticBezierCurve3(new V3(-gap/2-.12,yb,0),new V3(0,yb+.5,0),new V3(gap/2+.12,yb,0)),16,acet?.2:.065,10,false),fm);if(acet)br.scale.z=1.3;
 var pm=new THREE.MeshPhysicalMaterial({color:"#ffffff",transparent:true,opacity:.55,roughness:.2,clearcoat:1});
 root.add(side,left,br);
 [-1,1].forEach(function(sx){var pd=new THREE.Mesh(new THREE.SphereGeometry(.28,12,10),pm);pd.scale.set(.6,1.5,.5);pd.position.set(sx*(gap/2+.45),yb-1.25,-.6);root.add(pd);});
 root.userData.mats=[fm,lm,pm];glasses=root;rig.add(root);
}

/* controls */
var st={shape:"round",type:"acetate",lens:"clear",color:"black"};
var NAMES={shape:{round:"Round",square:"Square",cateye:"Cat-eye",pilot:"Pilot",geometric:"Geometric"},type:{acetate:"Acetate",metal:"Metal"},lens:{clear:"Clear lenses",sun:"Sun lenses"},color:{black:"Black",tort:"Tortoise",navy:"Navy",gold:"Gold",silver:"Silver"}};
function desc(){return NAMES.shape[st.shape]+", "+NAMES.type[st.type]+", "+NAMES.color[st.color]+", "+NAMES.lens[st.lens];}
function sync(){var bs=document.querySelectorAll("#ctl3d [data-k]");for(var i=0;i<bs.length;i++){var on=st[bs[i].dataset.k]===bs[i].dataset.v;bs[i].classList.toggle("on",on);bs[i].setAttribute("aria-pressed",on?"true":"false");}document.getElementById("desc3d").textContent=desc();}
document.getElementById("ctl3d").addEventListener("click",function(e){var b=e.target.closest("[data-k]");if(!b)return;st[b.dataset.k]=b.dataset.v;sync();build();});
document.getElementById("ask3d").onclick=function(){document.getElementById("product").value="3D design: "+desc();document.getElementById("inquiry").scrollIntoView({behavior:"smooth"});};

/* interaction and loop */
var rotY=-.55,rotX=.12,drag=false,lx=0,ly=0,idle=0,vis=true,last=performance.now(),reduce=window.matchMedia("(prefers-reduced-motion: reduce)").matches;
cv.addEventListener("pointerdown",function(e){drag=true;lx=e.clientX;ly=e.clientY;cv.setPointerCapture(e.pointerId);idle=0;cv.style.cursor="grabbing";});
cv.addEventListener("pointermove",function(e){if(!drag)return;rotY+=(e.clientX-lx)*.01;rotX=Math.max(-.7,Math.min(.7,rotX+(e.clientY-ly)*.006));lx=e.clientX;ly=e.clientY;idle=0;});
function up(){drag=false;cv.style.cursor="grab";}
cv.addEventListener("pointerup",up);cv.addEventListener("pointercancel",up);
function size(){var w=stage.clientWidth,h=stage.clientHeight;if(!w||!h)return;renderer.setSize(w,h,false);camera.aspect=w/h;camera.position.z=Math.max(24,24*1.6/camera.aspect);camera.lookAt(0,0,0);camera.updateProjectionMatrix();}
if(window.ResizeObserver)new ResizeObserver(size).observe(stage);window.addEventListener("resize",size);size();
if(window.IntersectionObserver)new IntersectionObserver(function(es){vis=es[0].isIntersecting;}).observe(stage);
function frame(now){requestAnimationFrame(frame);if(!vis||document.hidden){last=now;return;}var dt=Math.min((now-last)/1000,.05);last=now;idle+=dt;if(!drag&&!reduce&&idle>1.5)rotY+=dt*.45;rig.rotation.y=rotY;rig.rotation.x=rotX;renderer.render(scene,camera);}
sync();build();requestAnimationFrame(frame);
}catch(err){console.error(err);fallback();}
})();
