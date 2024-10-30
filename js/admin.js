var el = wp.element.createElement;

var withInspectorControls = wp.compose.createHigherOrderComponent(function (
  BlockEdit
) {
  return function (props) {
    var options = [
      { value: "", label: "None" },
      { value: "fade", label: "fade" },
      { value: "fade-up", label: "fade up" },
      { value: "fade-down", label: "fade down" },
      { value: "fade-right", label: "fade right" },
      { value: "fade-left", label: "fade left" },
      { value: "fade-up-right", label: "fade up-right" },
      { value: "fade-up-left", label: "fade up-left" },
      { value: "fade-down-right", label: "fade down-right" },
      { value: "fade-down-left", label: "fade down-left" },
      { value: "flip-left", label: "flip left"+objeto.suffix  },
      { value: "flip-right", label: "flip right"+objeto.suffix  },
      { value: "flip-up", label: "flip up"+objeto.suffix  },
      { value: "flip-down", label: "flip down"+objeto.suffix  },
      { value: "zoom-in", label: "zoom in"+objeto.suffix  },
      { value: "zoom-in-up", label: "zoom in-up"+objeto.suffix  },
      { value: "zoom-in-right", label: "zoom in-right"+objeto.suffix  },
      { value: "zoom-in-left", label: "zoom in-left" +objeto.suffix },
      { value: "zoom-in-down", label: "zoom in-down"+objeto.suffix  },
      { value: "zoom-out", label: "zoom out"+objeto.suffix  },
      { value: "zoom-out-up", label: "zoom out-up"+objeto.suffix  },
      { value: "zoom-out-right", label: "zoom out-right" +objeto.suffix },
      { value: "zoom-out-left", label: "zoom out-left" +objeto.suffix },
      { value: "zoom-out-down", label: "zoom out-down"+objeto.suffix  },
      { value: "rotate-left", label: "rotate-left" +objeto.suffix },
      { value: "rotate-right", label: "rotate-right" +objeto.suffix },
    ];

    var selectControl = el(wp.components.SelectControl, {
      label: objeto.label_effect,
      id: "effect-id",
      options: options,
      value: props.attributes.mySelectValue,
      onChange: function (value) {
        const { getSelectedBlockClientId, select } = wp.data;
        //  AOS.refreshHard();

        props.setAttributes({ select2Value: "none" });
        props.setAttributes({ mySelectValue: value });

        addClass(props.clientId, value, "effect");

        duracion = props.attributes.durationValue;
        
        if(typeof duracion!=="undefined") {arreo1 = duracion.split("duration-");
        duracion = arreo1[1];
      }
        if (duracion == "" || typeof duracion=="undefined" ) duracion = objeto.duration;
        valor = duracion;
        
        document
          .getElementById(target)
          .setAttribute("data-aos-duration", valor);

        document.getElementById(target).setAttribute("data-aos", value);

        setTimeout(vierjir, valor, target, valor);

      },
    });

    var options0 = [
      { value: "on-scroll", label: "On Scroll" },
      { value: "on-hover", label: "On Hover" },
      { value: "on-click", label: "On Click" },
    ];

    var tipoControl = el(wp.components.SelectControl, {
      label: objeto.label_animation,
      id: "tipo-id",
      options: options0,
      value: props.attributes.tipoValue,
      onChange: function (value) {
        props.setAttributes({ tipoValue: value });
        if (value == "on-hover") {
          unfoldHover();
        }
        if (value == "on-scroll") {
          unfoldScroll();
        }
        if (value == "on-click") {
          unfoldClick();
        }
      },
    });

    var options4 = [
      { value: "none", label: "None" },
      { value: "grow", label: "Grow" },
      { value: "shrink", label: "Shrink"},
      { value: "push", label: "Push"},
      { value: "pulse", label: "Pulse"+objeto.suffix },
      { value: "bounce-in", label: "Bounce In"+objeto.suffix  },
      { value: "grow-rotate", label: "Grow Rotate"+objeto.suffix  },
      { value: "float", label: "Float"+objeto.suffix  },
      { value: "sink", label: "Sink"+objeto.suffix  },
      { value: "skew", label: "Skew"+objeto.suffix  },
      { value: "skew-forward", label: "Skew Forward"+objeto.suffix  },
      { value: "skew-backward", label: "Skew Backward"+objeto.suffix  },
      { value: "buzz", label: "Buzz"+objeto.suffix  },
    ];

    var selectControl2 = el(wp.components.SelectControl, {
      label: objeto.label_effect,
      id: "effect2-id",
      class: "magic-motion-effect2",
      options: options4,
      value: props.attributes.select2Value,
      onChange: function (value) {
        props.setAttributes({ select2Value: value });
        //   props.setAttributes({ mySelectValue: '' });
        addClass(props.clientId, value, "hover");
        target = "block-" + props.clientId;
      
        setTimeout(() => {
          document
            .getElementById(target)
            .classList.add(value + "-editor", "kocka");
        }, 200);
        setTimeout(() => {
          document
            .getElementById(target)
            .classList.remove(value + "-editor", "kocka");
        }, 1800);
      },
    });

    var options5 = [
      { value: "none", label: "None" },
      { value: "shake", label: "Shake" },
      { value: "fade", label: "Fade" },
      { value: "jelly", label: "Jelly" },
      { value: "bounce", label: "Bounce"+objeto.suffix  },
      { value: "tada", label: "Tada"+objeto.suffix  },
      { value: "groove", label: "Groove"+objeto.suffix  },
      { value: "swing", label: "Swing"+objeto.suffix  },
      { value: "squeeze", label: "Squeeze"+objeto.suffix  },
      { value: "flicker", label: "Flicker"+objeto.suffix  },
      { value: "jerk", label: "Jerk"+objeto.suffix  },
      { value: "blink", label: "Blink"+objeto.suffix  },
      { value: "pop", label: "Pop"+objeto.suffix  },
    ];

    var selectControl3 = el(wp.components.SelectControl, {
      label: objeto.label_effect,
      id: "effect3-id",
      class: "magic-motion-effect3",
      options: options5,
      value: props.attributes.select3Value,
      onChange: function (value) {
        props.setAttributes({ select3Value: value });
        // props.setAttributes({ mySelectValue: '' });
        
          addClass(props.clientId, value, "click");
          target = "block-" + props.clientId;

          document.getElementById(target).setAttribute("data-aos", "hover");
          valor = 200;
          setTimeout((valor) => {
            micron
              .getEle("#" + target)
              .interaction(value)
              .duration(".45")
              .timing("ease-out");
          }, valor);
        
      },
    });

    var options2 = [
      { value: "duration-", label: "Default" },
      { value: "duration-250", label: "250 ms"},
      { value: "duration-500", label: "500 ms" },
      { value: "duration-750", label: "750 ms"},
      { value: "duration-1000", label: "1000 ms" },
      { value: "duration-1250", label: "1250 ms"+objeto.suffix  },
      { value: "duration-1500", label: "1500 ms"+objeto.suffix  },
      { value: "duration-1750", label: "1750 ms"+objeto.suffix  },
      { value: "duration-2000", label: "2000 ms"+objeto.suffix  },
      { value: "duration-2250", label: "2250 ms"+objeto.suffix  },
      { value: "duration-2500", label: "2500 ms"+objeto.suffix  },
      { value: "duration-2750", label: "2750 ms"+objeto.suffix  },
      { value: "duration-3000", label: "3000 ms"+objeto.suffix  },
    ];

    var durationControl = el(wp.components.SelectControl, {
      label: objeto.label_duration,
      id: "duration-id",
      options: options2,
      defaultValue: "duration-",
      value: props.attributes.durationValue,
      onChange: function (value) {
        props.setAttributes({ durationValue: value });
        addClass(props.clientId, value, "duration");
        target = "block-" + props.clientId;
        valor = value.replace("duration-", "");
        if (valor == "") valor = objeto.duration;
        document
          .getElementById(target)
          .setAttribute("data-aos-duration", valor);
        document
          .getElementById(target)
          .setAttribute("data-aos", props.attributes.mySelectValue);

          setTimeout(vierjir, valor, target, valor);
      },
    });
    function vierjir(target, valor = 1000,ease="casual") {
      
      //determine easing
      if(ease=="casual"){
        ease = props.attributes.easingValue;
        if (ease == "") ease = objeto.ease;
      }
      AOS.init({
        duration: valor,
        easing: ease,
      });
      AOS.refreshHard();
      valor = +valor + 400;
    
      setTimeout(removeAOS, valor,target);
    }

     function removeAOS(target){
      
      document.getElementById(target).removeAttribute("data-aos");
     }
    var options3 = [
      { value: "", label: "Default", disabled: true },
      { value: "linear", label: "linear" },
      { value: "ease", label: "ease" },
      { value: "ease-in", label: "ease-in"},
      { value: "ease-out", label: "ease-out"+objeto.suffix },
      { value: "ease-in-back", label: "in-back"+objeto.suffix },
      { value: "ease-out-back", label: "out-back"+objeto.suffix },
      { value: "ease-in-out-back", label: "in-out-back"+objeto.suffix },
      { value: "ease-in-sine", label: "in-sine"+objeto.suffix },
      { value: "ease-out-sine", label: "out-sine"+objeto.suffix },
      { value: "ease-in-out-sine", label: "in-out-sine"+objeto.suffix },
      { value: "ease-in-quad", label: "in-quad"+objeto.suffix },
      { value: "ease-out-quad", label: "out-quad"+objeto.suffix },
      { value: "ease-in-out-quad", label: "in-out-quad"+objeto.suffix },
      { value: "ease-in-cubic", label: "in-cubic"+objeto.suffix },
      { value: "ease-out-cubic", label: "out-cubic"+objeto.suffix },
      { value: "ease-in-out-cubic", label: "in-out-cubic"+objeto.suffix },
      { value: "ease-in-quart", label: "in-quart"+objeto.suffix },
      { value: "ease-out-quart", label: "out-quart"+objeto.suffix },
      { value: "ease-in-out-quart", label: "in-out-quart"+objeto.suffix },
    ];

    var easingControl = el(wp.components.SelectControl, {
      label: objeto.label_easing,
      id: "easing-id",
      options: options3,
      defaultValue: "",
      value: props.attributes.easingValue,
      onChange: function (value) {
        props.setAttributes({ easingValue: value });

        addClass(props.clientId, value, "easing");
        target = "block-" + props.clientId;
        document
          .getElementById(target)
          .setAttribute("data-aos", props.attributes.mySelectValue);
        document.getElementById(target).setAttribute("data-aos-easing", value);
        duracion = props.attributes.durationValue;
        arreo1 = duracion.split("duration-");
        duracion = arreo1[1];
        if (duracion == "") duracion = objeto.duration;
        valor = duracion;

        document
          .getElementById(target)
          .setAttribute("data-aos-duration", valor);

        //document.getElementById(target).style.display="none";

        setTimeout(vierjir, valor, target, valor,value);
      },
    });
    function unfoldHover() {
      document.getElementById(
        "duration-id"
      ).parentNode.parentNode.parentNode.parentNode.parentNode.style.display =
        "none";
      document.getElementById(
        "easing-id"
      ).parentNode.parentNode.parentNode.parentNode.parentNode.style.display =
        "none";
      document.getElementById(
        "effect-id"
      ).parentNode.parentNode.parentNode.parentNode.parentNode.style.display =
        "none";
      document.getElementById(
        "effect3-id"
      ).parentNode.parentNode.parentNode.parentNode.parentNode.style.display =
        "none";
      document.getElementById(
        "effect2-id"
      ).parentNode.parentNode.parentNode.parentNode.parentNode.style.display =
        "flex";
      document.getElementById(
        "tipo-id"
      ).parentNode.parentNode.parentNode.parentNode.parentNode.style.display =
        "flex";
    }
    function unfoldScroll() {
      document.getElementById(
        "duration-id"
      ).parentNode.parentNode.parentNode.parentNode.parentNode.style.display =
        "flex";
      document.getElementById(
        "easing-id"
      ).parentNode.parentNode.parentNode.parentNode.parentNode.style.display =
        "flex";
      document.getElementById(
        "effect-id"
      ).parentNode.parentNode.parentNode.parentNode.parentNode.style.display =
        "flex";
      document.getElementById(
        "effect2-id"
      ).parentNode.parentNode.parentNode.parentNode.parentNode.style.display =
        "none";
      document.getElementById(
        "effect3-id"
      ).parentNode.parentNode.parentNode.parentNode.parentNode.style.display =
        "none";
      document.getElementById(
        "tipo-id"
      ).parentNode.parentNode.parentNode.parentNode.parentNode.style.display =
        "flex";
    }
    function unfoldClick() {
      document.getElementById(
        "duration-id"
      ).parentNode.parentNode.parentNode.parentNode.parentNode.style.display =
        "none";
      document.getElementById(
        "easing-id"
      ).parentNode.parentNode.parentNode.parentNode.parentNode.style.display =
        "none";
      document.getElementById(
        "effect-id"
      ).parentNode.parentNode.parentNode.parentNode.parentNode.style.display =
        "none";
      document.getElementById(
        "effect2-id"
      ).parentNode.parentNode.parentNode.parentNode.parentNode.style.display =
        "none";
      document.getElementById(
        "effect3-id"
      ).parentNode.parentNode.parentNode.parentNode.parentNode.style.display =
        "flex";
      document.getElementById(
        "tipo-id"
      ).parentNode.parentNode.parentNode.parentNode.parentNode.style.display =
        "flex";
    }

    function getClass(clientId) {
      var block = wp.data.select("core/block-editor").getBlock(clientId);

      var attributes = block.attributes;
      var currentClasses = attributes.className || "";
      currentClasses = currentClasses + " ";
      array1 = currentClasses.split("magic-");

      if (array1.length == 1) {
        return "AAAAA";
      } else {
        array2 = array1[1].split(" ");
        vector = array2[0];

        return vector;
      }
    }

    function updateClass(clientId, vector) {
      var block = wp.data.select("core/block-editor").getBlock(clientId);
      var attributes = block.attributes;
      var currentClasses = attributes.className || "";
      currentClasses = currentClasses + " ";
      array1 = currentClasses.split("magic-");

      if (array1.length == 1) {
        return currentClasses + " " + "magic-" + vector;
      } else {
        array2 = array1[1].split(" ");
        array2[0] = vector;
        string = array2.join(" ");
        clase = "magic-" + string;
        if (clase == "magic-AAAAA") clase = "";
        return array1[0] + " " + clase;
      }
    }

    function rebuildVector(vector, subs, pos) {
      newVector = "";
      for (i = 0; i < vector.length; i++) {
        if (i == pos) newVector = newVector + subs;
        else newVector = newVector + vector[i];
      }
      return newVector;
    }
    function addClass(clientId, value, origin) {
      //main class
      vector = getClass(clientId);

      if (origin == "effect") {
        valores = options;
        pos = 0;
      }

      if (origin == "duration") {
        valores = options2;
        pos = 1;
      }

      if (origin == "easing") {
        valores = options3;
        pos = 2;
      }

      if (origin == "hover") {
        valores = options4;
        pos = 3;
      }

      if (origin == "click") {
        valores = options5;
        pos = 4;
      }

      for (i = 0; i < valores.length; i++)
        if (valores[i].value == value) {
          num = i + 65;
          letra = String.fromCharCode(num);
        }

      vector = rebuildVector(vector, letra, pos);

      newClasses = updateClass(clientId, vector);

      var block = wp.data.select("core/block-editor").getBlock(clientId);
      var attributes = block.attributes;
      attributes.className = newClasses.trim();
      wp.data
        .dispatch("core/block-editor")
        .updateBlockAttributes(clientId, attributes);

      target = "block-" + clientId;
    }

    return el(
      wp.element.Fragment,
      {},
      el(BlockEdit, props),
      el(
        wp.blockEditor.InspectorControls,
        {},
        el(
          wp.components.PanelBody,
          {
            title: objeto.titulo,
            initialOpen: false,
            className: "panel-body-motion",
            onToggle: function (opened) {
              if (opened) {
                anchor = " " + props.attributes.className + " ";
                unfold = "scroll";
                if (anchor.indexOf("magic-") > -1) {
                  //extract

                  anchor = " " + props.attributes.className + " ";
                 

                  //extract
                  array1 = props.attributes.className.split("magic-");
                  array2 = array1[1].split(" ");
                  vector = array2[0];

                  if (vector[0] != "A") unfold = "scroll";
                  carac = vector.charCodeAt(0);
                  //tipo sleector
                  
                  if (vector[4] != "A") {
                    props.setAttributes({ tipoValue: "on-click" });
                    unfold = "click";
                  }
                  if (vector[3] != "A") {
                    props.setAttributes({ tipoValue: "on-hover" });
                    unfold = "hover";
                  }
                  if (vector[0] != "A") {
                    props.setAttributes({ tipoValue: "on-scroll" });
                    unfold = "scroll";
                  }

                  //set values
         
                  props.setAttributes({
                    mySelectValue: options[vector.charCodeAt(0) - 65].value,
                  });
                  props.setAttributes({
                    durationValue: options2[vector.charCodeAt(1) - 65].value,
                  });
                  props.setAttributes({
                    easingValue: options3[vector.charCodeAt(2) - 65].value,
                  });
                  props.setAttributes({
                    select2Value: options4[vector.charCodeAt(3) - 65].value,
                  });
                  props.setAttributes({
                    select3Value: options5[vector.charCodeAt(4) - 65].value,
                  });
                }
                setTimeout(() => {
                  if (unfold == "scroll") unfoldScroll();
                  if (unfold == "hover") unfoldHover();
                  if (unfold == "click") unfoldClick();
                }, 200);
              }
            },
          },
          el(
            wp.components.PanelRow,
            { className: "tipoControlClass" },
            tipoControl
          ),
          el(
            wp.components.PanelRow,
            { className: "selectControlClass" },
            selectControl
          ),
          el(
            wp.components.PanelRow,
            { className: "selectControl2Class" },
            selectControl2
          ),
          el(
            wp.components.PanelRow,
            { className: "selectControl3Class" },
            selectControl3
          ),
          el(
            wp.components.PanelRow,
            { className: "durationControlClass" },
            durationControl
          ),
          el(
            wp.components.PanelRow,
            { className: "easingControlClass" },
            easingControl
          )
        )
      )
    );
  };
},
"withInspectorControls");
wp.hooks.addFilter(
  "editor.BlockEdit",
  "bravo-animate/with-inspector-controls",
  withInspectorControls
);
