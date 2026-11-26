(function(){
  var site=document.getElementById('site'),hdr=document.getElementById('hdr'),mb=document.getElementById('menuBtn');
  var io=('IntersectionObserver' in window)?new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);}});},{threshold:0.12,rootMargin:'0px 0px -6% 0px'}):null;
  var seen=new Map();
  document.querySelectorAll('.rv').forEach(function(el){
    var p=el.parentElement,n=seen.get(p)||0;seen.set(p,n+1);
    el.style.transitionDelay=Math.min(n*0.13,0.65)+'s';
    if(el.classList.contains('script')){var w=document.createElement('span');w.className='wipe';while(el.firstChild)w.appendChild(el.firstChild);el.appendChild(w);}
    if(io)io.observe(el);else el.classList.add('in');
  });
  /* skok na dio stranice: naslov tog dijela uvijek ostaje vidljiv ispod zaglavlja */
  var ssTok=0;
  function ssGo(t){
    var tok=++ssTok,stop=function(){ssTok++;};
    ['wheel','touchstart','keydown','mousedown'].forEach(function(ev){window.addEventListener(ev,stop,{once:true,passive:true});});
    function go(){
      if(tok!==ssTok||!t.getClientRects().length)return;
      var hd=document.getElementById('hdr'),hh=0;
      if(hd){var cs=getComputedStyle(hd);if(cs.display!=='none'&&(cs.position==='sticky'||cs.position==='fixed'))hh=hd.getBoundingClientRect().height;}
      var top=t.getBoundingClientRect().top+window.scrollY,y=top-hh;
      var h=/^H[1-6]$/.test(t.tagName)?t:t.querySelector('h1,h2,h3');
      if(h&&h.getClientRects().length){var ht=h.getBoundingClientRect().top+window.scrollY,hb=ht+h.getBoundingClientRect().height;
        if(ht<y+hh+8||hb>y+window.innerHeight*.6)y=ht-hh-28;}
      var root=document.documentElement,ob=root.style.scrollBehavior;root.style.scrollBehavior='auto';
      window.scrollTo(0,Math.max(0,Math.round(y)));root.style.scrollBehavior=ob;
    }
    go();[120,400,900,1600].forEach(function(ms){setTimeout(go,ms);});
  }
  function menu(o){site.classList.toggle('menu-open',o);mb.setAttribute('aria-expanded',o?'true':'false');document.getElementById('mmenu').setAttribute('aria-hidden',o?'false':'true');}
  mb.addEventListener('click',function(){menu(!site.classList.contains('menu-open'));});
  document.getElementById('menuX').addEventListener('click',function(){menu(false);});
  document.addEventListener('keydown',function(e){if(e.key==='Escape')menu(false);});
  document.addEventListener('click',function(e){
    var a=e.target.closest('a[href^="#"]');if(!a)return;
    var id=a.getAttribute('href').slice(1),t=id&&document.getElementById(id);
    if(!t)return;
    e.preventDefault();ssGo(t);
    try{history.replaceState(null,'','#'+id);}catch(err){}
  });
  function fromHash(){var id=decodeURIComponent(location.hash.slice(1)),t=id&&document.getElementById(id);if(t)ssGo(t);}
  window.addEventListener('hashchange',fromHash);
  function hh(){var h=document.getElementById('hdr');if(h)site.style.setProperty('--hh',h.offsetHeight+'px');}
  hh();window.addEventListener('resize',hh);window.addEventListener('load',function(){hh();fromHash();});
  fromHash();
})();
(function(){var g=document.querySelector('#p-poklon-bon .bon .seg');if(!g)return;var pr=document.querySelector('#p-poklon-bon .bon .segpr');
g.addEventListener('click',function(e){var b=e.target.closest('button');if(!b)return;
[].forEach.call(g.querySelectorAll('button'),function(x){var on=x===b;x.classList.toggle('on',on);x.setAttribute('aria-checked',on?'true':'false');});
if(pr){var t=b.getAttribute('data-p')||'';pr.textContent=t.replace(/\s*€/,'');var e=document.createElement('span');e.className='eu';e.textContent=' €';pr.appendChild(e)}var bz=document.querySelector('#p-poklon-bon .bon .segbzv');if(bz){var bb=b.getAttribute('data-b');if(bb)bz.textContent=bb;bz.parentNode.style.visibility=bb?'':'hidden';}});})();
(function(){var sec=document.querySelector('#p-cesta-pitanja .faqpage');if(!sec)return;
[].forEach.call(sec.querySelectorAll('.prow'),function(row,i){var pt=row.querySelector('.pt'),h=pt&&pt.querySelector('h3');if(!h)return;
var a=document.createElement('div'),inn=document.createElement('div');a.className='ans';inn.className='ans-in';a.id='faq-a'+i;
while(h.nextSibling)inn.appendChild(h.nextSibling);a.appendChild(inn);pt.appendChild(a);
h.setAttribute('role','button');h.setAttribute('tabindex','0');h.setAttribute('aria-expanded','false');h.setAttribute('aria-controls',a.id);
function t(){var o=row.classList.toggle('open');h.setAttribute('aria-expanded',o?'true':'false');}
h.addEventListener('click',t);h.addEventListener('keydown',function(e){if(e.key==='Enter'||e.key===' '){e.preventDefault();t();}});});
sec.classList.add('acc');})();
(function(){var qa=document.querySelector('#p-naslovna .panel.faq .qa');if(!qa)return;var it=[].slice.call(qa.children),i=0;
var car=document.createElement('div');car.className='qa-car';qa.parentNode.insertBefore(car,qa);
function nav(d,l){var b=document.createElement('button');b.type='button';b.className='qa-nav';b.setAttribute('aria-label',l);
b.innerHTML='<svg viewBox="0 0 13 26" aria-hidden="true"><path d="'+(d<0?'M10 3L3 13L10 23':'M3 3L10 13L3 23')+'"/></svg>';
b.addEventListener('click',function(){go(i+d);});return b;}
function go(n){i=(n+it.length)%it.length;it.forEach(function(e,k){e.classList.toggle('cur',k===i);});}
car.appendChild(nav(-1,(document.documentElement.lang==='en'?'Previous question':'Prethodno pitanje')));car.appendChild(qa);car.appendChild(nav(1,(document.documentElement.lang==='en'?'Next question':'Sljedeće pitanje')));
var x0=null;qa.addEventListener('touchstart',function(e){x0=e.touches[0].clientX;},{passive:true});
qa.addEventListener('touchend',function(e){if(x0===null)return;var dx=e.changedTouches[0].clientX-x0;x0=null;if(Math.abs(dx)>40)go(i+(dx<0?1:-1));},{passive:true});
go(0);})();
(function(){var b=document.querySelector('section.gift .gift-bg');if(!b)return;if(!('IntersectionObserver' in window)){b.classList.add('draw');return}var o=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){b.classList.add('draw');o.disconnect()}})},{rootMargin:'0px 0px -28% 0px',threshold:.6});o.observe(b)})();
(function(){var pr=document.querySelector('#p-rituali .princ');if(!pr)return;var D="M 60.0 560 L 60.9 554.0 L 61.8 548.0 L 62.7 542.0 L 63.5 536.0 L 64.2 530.0 L 64.9 524.0 L 65.5 518.0 L 66.0 512.0 L 66.5 506.0 L 66.8 500.0 L 66.9 494.0 L 67.0 488.0 L 66.9 482.0 L 66.8 476.0 L 66.5 470.0 L 66.1 464.0 L 65.6 458.0 L 65.0 452.0 L 64.3 446.0 L 63.6 440.0 L 62.7 434.0 L 61.9 428.0 L 61.0 422.0 L 60.1 416.0 L 59.2 410.0 L 58.3 404.0 L 57.4 398.0 L 56.6 392.0 L 55.8 386.0 L 55.1 380.0 L 54.5 374.0 L 54.0 368.0 L 53.6 362.0 L 53.3 356.0 L 53.1 350.0 L 53.0 344.0 L 53.0 338.0 L 53.2 332.0 L 53.5 326.0 L 53.9 320.0 L 54.4 314.0 L 55.0 308.0 L 55.6 302.0 L 56.4 296.0 L 57.2 290.0 L 58.0 284.0 L 58.9 278.0 L 59.8 272.0 L 60.8 266.0 L 61.7 260.0 L 62.5 254.0 L 63.4 248.0 L 64.1 242.0 L 64.8 236.0 L 65.4 230.0 L 66.0 224.0 L 66.4 218.0 L 66.7 212.0 L 66.9 206.0 L 67.0 200.0 L 67.0 194.0 L 66.8 188.0 L 66.5 182.0 L 66.2 176.0 L 65.7 170.0 L 65.1 164.0 L 64.4 158.0 L 63.7 152.0 L 62.9 146.0 L 62.0 140.0 L 61.1 134.0 L 60.2 128.0 L 59.3 122.0 M 66.8 500.0 C 70.0 487.6 81.6 480.8 93.3 482.1 C 89.8 494.2 78.9 502.0 66.8 500.0 M 66.8 500.0 C 74.1 493.8 83.1 490.0 89.6 484.6 M 63.0 436.0 C 50.3 437.7 39.6 429.5 36.5 418.1 C 49.0 416.8 60.3 423.9 63.0 436.0 M 63.0 436.0 C 54.5 431.5 47.6 424.6 40.2 420.6 M 54.3 372.0 C 57.5 359.6 69.1 352.8 80.9 354.1 C 77.4 366.2 66.5 374.0 54.3 372.0 M 54.3 372.0 C 61.7 365.8 70.7 362.0 77.1 356.6 M 55.0 308.0 C 42.2 309.7 31.6 301.5 28.4 290.1 C 40.9 288.8 52.3 295.9 55.0 308.0 M 55.0 308.0 C 46.4 303.5 39.5 296.6 32.1 292.6 M 63.9 244.0 C 67.1 231.6 78.7 224.8 90.4 226.1 C 87.0 238.2 76.1 246.0 63.9 244.0 M 63.9 244.0 C 71.3 237.8 80.3 234.0 86.7 228.6 M 66.5 182.0 C 53.8 183.7 43.2 175.5 40.0 164.1 C 52.5 162.8 63.9 169.9 66.5 182.0 M 66.5 182.0 C 58.0 177.5 51.1 170.6 43.7 166.6 M 58.3 404 C 60.3 396.3 67.5 392.1 74.7 392.9 C 72.6 400.4 65.8 405.2 58.3 404.0 M 58.3 404 C 62.8 400.2 68.4 397.8 72.4 394.5 M 59.3 276 C 51.4 277.1 44.8 272.0 42.9 264.9 C 50.6 264.1 57.6 268.5 59.3 276.0 M 59.3 276 C 54.0 273.2 49.8 268.9 45.2 266.5 M 63.7 152 C 65.5 145.2 71.8 141.4 78.3 142.2 C 76.4 148.8 70.4 153.1 63.7 152.0 M 63.7 152 C 67.7 148.6 72.7 146.5 76.2 143.5 M 59.0 120 L 59.0 120.2 L 54.9 119.3 L 51.4 117.2 L 48.7 114.3 L 47.0 110.7 L 46.5 107.0 L 47.1 103.3 L 48.7 100.1 L 51.1 97.5 L 54.1 95.9 L 57.3 95.2 L 60.5 95.5 L 63.4 96.7 L 65.7 98.6 L 67.3 101.1 L 68.1 103.8 L 68.0 106.6 L 67.1 109.1 L 65.6 111.1 L 63.6 112.6 L 61.4 113.3 L 59.1 113.4 L 57.1 112.8 L 55.3 111.6 L 54.1 110.1 L 53.4 108.3 L 53.3 106.5 L 53.7 104.9 L 54.6 103.5 L 55.7 102.6 L 57.0 102.0 L 58.3 101.9 L 59.5 102.2 L 60.5 102.8 L 61.1 103.6 L 61.4 104.5 L 61.4 105.4 L 61.2 106.1 L 60.8 106.6 L 60.2 106.9 L 59.7 107.0 ";var NS='http://www.w3.org/2000/svg';var vs=[];for(var i=0;i<4;i++){var s=document.createElementNS(NS,'svg');s.setAttribute('viewBox','0 0 120 560');s.setAttribute('class','flo');s.setAttribute('aria-hidden','true');s.innerHTML='<path d="'+D+'" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" filter="url(#wob3)"/>';pr.appendChild(s);vs.push(s)}
function place(){var k=[].filter.call(pr.children,function(e){return e.tagName==='DIV'});if(k.length<3)return;var R=pr.getBoundingClientRect();if(!R.width)return;var b=k.map(function(e){return e.getBoundingClientRect()});var h=b[0].height,w=h*120/560,g=b[1].left-b[0].right;var cx=[b[0].left-g/2,(b[0].right+b[1].left)/2,(b[1].right+b[2].left)/2,b[2].right+g/2];vs.forEach(function(s,i){var x=cx[i]-R.left-w/2;var out=g<60||(i===0&&cx[i]-w/2<4)||(i===3&&cx[i]+w/2>window.innerWidth-4);s.style.cssText='left:'+x+'px;top:'+(b[0].top-R.top)+'px;width:'+w+'px;height:'+h+'px;'+(i%2?'transform:scaleX(-1);':'')+(out?'display:none;':'')})}
place();window.addEventListener('resize',place);if('ResizeObserver' in window){new ResizeObserver(place).observe(pr)}window.addEventListener('hashchange',function(){setTimeout(place,60)})})();
(function(){var ul=document.querySelector('#p-poklon-bon .bonwho ul');if(!ul)return;var NS='http://www.w3.org/2000/svg';var sv=document.createElementNS(NS,'svg');sv.setAttribute('class','wv');sv.setAttribute('aria-hidden','true');ul.appendChild(sv);var XO=120;
function f(n){return n.toFixed(1)}
function leaf(x,y,ang,l,w){var a=ang*Math.PI/180,c=Math.cos(a),s=Math.sin(a);function P(u,v){return f(x+u*c-v*s)+' '+f(y+u*s+v*c)}return 'M '+P(0,0)+' C '+P(l*.3,-w)+' '+P(l*.72,-w*.9)+' '+P(l,0)+' C '+P(l*.7,w*.95)+' '+P(l*.28,w)+' '+P(0,0)+' M '+P(0,0)+' C '+P(l*.3,-w*.12)+' '+P(l*.6,w*.1)+' '+P(l*.86,0)+' '}
function thorn(x,y,tx,ty,sd){var m=Math.sqrt(tx*tx+ty*ty)||1;tx/=m;ty/=m;var nx=ty*sd,ny=-tx*sd;function P(u,v){return f(x+u*tx+v*nx)+' '+f(y+u*ty+v*ny)}return 'M '+P(4.5,0)+' Q '+P(1.5,4)+' '+P(-3.5,10)+' Q '+P(-3.5,3.5)+' '+P(-4.5,0)+' '}
function rose(cx,cy,R){var d='',n=44,T=2.6*2*Math.PI;for(var k=0;k<=n;k++){var t=k/n,th=t*T-1.2,r=R*(.1+.62*t)*(1+.13*Math.sin(3*th+.6));d+=(k?'L ':'M ')+f(cx+r*Math.cos(th))+' '+f(cy+r*Math.sin(th)*.92)+' '}
function arc(a0,a1,r0,r1){var m=(a0+a1)/2;return 'M '+f(cx+r0*Math.cos(a0))+' '+f(cy+r0*Math.sin(a0))+' Q '+f(cx+r1*1.25*Math.cos(m))+' '+f(cy+r1*1.25*Math.sin(m))+' '+f(cx+r0*Math.cos(a1))+' '+f(cy+r0*Math.sin(a1))+' '}
d+=arc(.25,2.2,R*.74,R)+arc(1.9,3.9,R*.76,R*1.02)+arc(3.6,5.5,R*.74,R)+arc(5.2,6.75,R*.76,R*.98);
d+=arc(.9,2.9,R*.98,R*1.2)+arc(-.6,1.1,R*.98,R*1.16)+arc(2.7,4.3,R*.98,R*1.1);return d}
function draw(){var lis=ul.querySelectorAll('li');if(!lis.length||!ul.offsetHeight)return;var U=ul.getBoundingClientRect(),OFF=80,pts=[];[].forEach.call(lis,function(li){var r=document.createRange();r.selectNodeContents(li);var c=r.getClientRects();if(!c.length)return;var q=c[0];for(var k=0;k<c.length;k++){if(c[k].width>4){q=c[k];break}}pts.push([q.left-U.left-34+XO,q.top-U.top+q.height/2+OFF+7])});if(pts.length<2)return;
var mn=Math.min.apply(null,pts.map(function(p){return p[0]}));pts=pts.map(function(p,i){return [Math.max(mn-6,XO+40-U.left)+(p[0]-mn)*.42+(i%2?5:-5),p[1]]});
var top=[pts[0][0]+9,pts[0][1]-30];var P=[top].concat(pts).concat([[pts[pts.length-1][0]-4,pts[pts.length-1][1]+46]]);
function g(i){return P[Math.max(0,Math.min(P.length-1,i))]}
var d='M '+f(P[0][0])+' '+f(P[0][1])+' ';for(var i=0;i<P.length-1;i++){var p0=g(i-1),p1=g(i),p2=g(i+1),p3=g(i+2);d+='C '+f(p1[0]+(p2[0]-p0[0])/6)+' '+f(p1[1]+(p2[1]-p0[1])/6)+' '+f(p2[0]-(p3[0]-p1[0])/6)+' '+f(p2[1]-(p3[1]-p1[1])/6)+' '+f(p2[0])+' '+f(p2[1])+' '}
pts.forEach(function(p,i){var a=g(i),b=g(i+2);d+=thorn(p[0],p[1],b[0]-a[0],b[1]-a[1],1)});
for(var k=1;k<P.length-2;k++){var a=g(k-1),b=g(k),c2=g(k+1),e=g(k+2);var mx=(-a[0]+9*b[0]+9*c2[0]-e[0])/16,my=(-a[1]+9*b[1]+9*c2[1]-e[1])/16;d+=thorn(mx,my,(c2[0]-b[0])*11+(a[0]-e[0]),(c2[1]-b[1])*11+(a[1]-e[1]),-1)}
var R=16,rx=top[0]+2,ry=top[1]-R*1.05;d+=rose(rx,ry,R);d+=leaf(top[0],top[1]+1,-18,15,4)+leaf(top[0],top[1]+1,-160,14,4);
var H=P[P.length-1][1]+6;sv.setAttribute('width',U.width+XO);sv.style.left=-XO+'px';sv.setAttribute('height',H);var p3=Math.round((H-55)/H*100);var gr='linear-gradient(to bottom,#000 '+p3+'%,transparent 100%)';sv.style.webkitMaskImage=gr;sv.style.maskImage=gr;
 sv.innerHTML='<path d="'+d+'" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" filter="url(#wob3)"/>'}
draw();window.addEventListener('resize',draw);if('ResizeObserver' in window){new ResizeObserver(draw).observe(ul)}if(document.fonts&&document.fonts.ready){document.fonts.ready.then(draw)}})();
/* Rituali, „od rezervacije do stola”: naslov počinje u ravnini s tekstom koraka (računalo) */
(function(){var s=document.querySelector('#p-rituali .proc.gap-b');if(!s||!window.ResizeObserver)return;var h=s.querySelector('h2'),p=s.querySelector('.prow .pt');if(!h||!p)return;
function fit(){var a=h.getBoundingClientRect(),b=p.getBoundingClientRect();if(!a.width)return;h.style.setProperty('--h2in',Math.max(0,Math.round(b.left-a.left))+'px');}
new ResizeObserver(fit).observe(s);})();
/* Poklon bon, uvod: naslov i tekst slažu se kao slagalica (računalo) */
(function(){var s=document.querySelector('#p-poklon-bon .bonintro');if(!s||!window.ResizeObserver)return;var h=s.querySelector('h2'),t=s.querySelector('.txt');if(!h||!t)return;var last='';
function fit(){var key=window.innerWidth+'x'+s.offsetWidth;if(key===last)return;
 h.style.removeProperty('left');h.style.removeProperty('position');h.style.removeProperty('width');t.style.removeProperty('margin-top');
 if(!(window.innerWidth>900&&h.getClientRects().length))return;last=key;
 var R=[],w=document.createTreeWalker(h,NodeFilter.SHOW_TEXT),n;while(n=w.nextNode()){var r=document.createRange();r.selectNodeContents(n);[].push.apply(R,r.getClientRects());}var L={};R.forEach(function(x){if(x.width<2)return;var k=Math.round((x.top+x.bottom)/2/12);L[k]=L[k]||{top:x.top,bottom:x.bottom,right:x.right};L[k].right=Math.max(L[k].right,x.right);L[k].bottom=Math.max(L[k].bottom,x.bottom);});
 var a=Object.keys(L).map(Number).sort(function(x,y){return x-y}).map(function(k){return L[k]});window.__bi=a.length;
 if(a.length<2)return;var rest=Math.max.apply(null,a.slice(1).map(function(x){return x.right})),tb=t.getBoundingClientRect();
 var dx=Math.max(0,Math.round(tb.left-120-rest));h.style.setProperty('position','relative','important');h.style.setProperty('left',dx+'px','important');h.style.setProperty('width','calc(100% - '+dx+'px)','important');
 var mt=parseFloat(getComputedStyle(t).marginTop)||0,d=Math.round(a[0].bottom+52-tb.top);t.style.setProperty('margin-top',(mt+d)+'px','important');}
new ResizeObserver(fit).observe(s);if(document.fonts&&document.fonts.ready)document.fonts.ready.then(function(){last='';fit()});})();
/* dok nema sustava rezervacija: gumbi „rezerviraj” i „kupi” otvaraju WhatsApp (mobitel) ili email (računalo) */
(function(){
  var EN=document.documentElement.lang==='en',PHONE='385955363341',EMAIL='soul.space.split@gmail.com';
  var MSG=EN?"Hello! I would like to book a massage at Soul Space.":"Pozdrav! Željela bih rezervirati termin za masažu u Soul Space.";
  var SUB=EN?['Booking — Soul Space','Gift voucher — Soul Space']:['Rezervacija termina — Soul Space','Poklon bon — Soul Space'];
  function isMobile(){return /Android|iPhone|iPad|iPod|Windows Phone|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent||'');}
  document.addEventListener('click',function(e){
    var a=e.target.closest&&e.target.closest('a[data-wa]');if(!a)return;
    var bon=a.dataset.wa==='bon',msg=MSG,sub=SUB[bon?1:0];
    if(bon){var b=document.querySelector('#p-poklon-bon .bon .seg button.on'),m=b?parseInt(b.textContent,10):0;
      msg=EN?('Hello! I would like to buy a '+(m?m+'-minute ':'')+'gift voucher.'):('Pozdrav! Željela bih kupiti poklon bon'+(m?' od '+m+' minuta':'')+'.');}
    if(isMobile()){a.href='https://wa.me/'+PHONE+'?text='+encodeURIComponent(msg);return;}
    e.preventDefault();window.location.href='mailto:'+EMAIL+'?subject='+encodeURIComponent(sub)+'&body='+encodeURIComponent(msg);
  });
})();
