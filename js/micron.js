function vierjander(i) {
  

  (n = "mjs-"),
    (e = i.dataset.micron),
    (a = i.dataset.micronDuration),
    (r = i.dataset.micronTiming),
    (o = i.dataset.micronBind),
    (s = i.dataset.micronId);
  if (typeof i.dataset.block == "undefined") {
    i = i.parentElement;
    vierjander(i);
    return;
  }
  
  if (i.dataset.block != "1") {
    i = i.parentElement;
    vierjander(i);
    return;
  }
  if(i.dataset.block=="1"){
  i.classList.remove("push");
  i.onmouseleave = function(event){
    
    event.target.classList.add("push");
  };
};

  clases=i.classList.value;
  if(!i.hasAttribute("data-micron")){
    return;
  }
  
  if(clases.indexOf("kito-")>-1){
    array1=clases.split("kito-");
    array2=array1[1].split(" ");
    laClase="kito-"+array2[0];

    i.classList.remove(laClase,"kocka");
  }

  if (void 0 === e) return !1;
  if ("true" === o) { 
    if (void 0 === s) return !1;
    if (void 0 === (u = document.getElementById(s)) || null === u) return !1;
    var d = u;
    u.parentNode.replaceChild(d, u), d.classList.add(n + e);
  } else {
    var u;
    d = u = i;
    u.parentNode.replaceChild(d, u), d.classList.add(n + e);
  }
  void 0 !== a
    ? isNaN(a)
      ? (d.style.animationDuration = ".45s")
      : (d.style.animationDuration = a + "s")
    : (d.style.animationDuration = ".45s"),
    void 0 !== r &&
    ("linear" === r ||
      "ease-in" === r ||
      "ease-out" === r ||
      "ease-in-out" === r)
      ? d.classList.add(n + r)
      : d.classList.add(n + "ease-in-out");
    
    setTimeout(function(){
        i.classList.remove("mjs-bounce");
       
    },450);
    setTimeout(function(){
        i.classList.add("kocka",laClase);
       
    },1450);
  
    
}

var watchEvents = function () {
  window.addEventListener("click", function (t) {
    
    var i = t.target;
    vierjander(i);
  });
};
"loading" != document.readyState
  ? watchEvents()
  : document.addEventListener("DOMContentLoaded", function () {
      watchEvents();
    });
var Micron = function () {
    var t, i;
    return {
      getEle: function (n) {
        return void 0 != (t = document.querySelector(n)) && null != t
          ? ((i = t), t.parentNode.replaceChild(i, t), this)
          : this;
      },
      interaction: function (t) {
        if (void 0 !== i && null !== i) {
          if (void 0 != t && null != t && -1 == t.indexOf(" ")) {
            var n = "mjs-" + t;
            return i.classList.add(n), this;
          }
          return this;
        }
        return this;
      },
      duration: function (t) {
        return void 0 != i && null != i && 0 == isNaN(t)
          ? ((i.style.animationDuration = t + "s"), this)
          : this;
      },
      timing: function (t) {
        if (void 0 != i && null != i) {
          if (
            "linear" == t ||
            "ease-in" == t ||
            "ease-out" == t ||
            "ease-in-out" == t
          ) {
            var n = "mjs-" + t;
            return i.classList.add(n), this;
          }
          return this;
        }
        return this;
      },
    };
  },
  micron = Micron();
"object" == typeof module && module.exports && (module.exports = micron);
