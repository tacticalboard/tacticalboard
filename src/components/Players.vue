<template>
  <div class="z-10 absolute h-full w-full left-0 top-0 flex justify-center">
    <div
      class="draggable bg-blue-500 rounded-full border-white"
      :style="widget_style_with_border"
      v-for="i in Array(n).keys()"
      :key="'blue' + i"
    ></div>
    <div :style="widget_style" class="draggable border-transparent">
      <img :src="require('@/assets/' + ball)" alt="" />
    </div>
    <div
      class="draggable bg-red-500 rounded-full border-white"
      :style="widget_style_with_border"
      v-for="i in Array(n).keys()"
      :key="'red' + i"
    ></div>
  </div>
</template>

<script>
import interact from "interactjs";

export default {

  data () {
    return {
      WIDGET_SIZE: 57.5,
      BORDER_SIZE: 6.5,
    }
  },

  props: {
    n: {
      default: 2,
      type: Number
    },
    ball: {
      default: 'shuttlecock.svg',
      type: String
    },
    scale: {
      default: 1.,
      type: Number
    }
  },
  
  mounted: function () {
    this.init_interact();
  },

  methods: {
    init_interact: function () {
      interact(".draggable").draggable({
        // enable inertial throwing
        inertia: true,
        // keep the element within the area of it's parent
        modifiers: [
          interact.modifiers.restrictRect({
            restriction: "parent",
            endOnly: true,
          }),
        ],
        // enable autoScroll
        autoScroll: true,

        listeners: {
          // call this function on every dragmove event
          move: this.dragMoveListener,

          // call this function on every dragend event
          end(event) {
            var textEl = event.target.querySelector("p");

            textEl &&
              (textEl.textContent =
                "moved a distance of " +
                Math.sqrt(
                  (Math.pow(event.pageX - event.x0, 2) +
                    Math.pow(event.pageY - event.y0, 2)) |
                    0
                ).toFixed(2) +
                "px");
          },
        },
      });
    },

    dragMoveListener: function (event) {
      var target = event.target;
      // keep the dragged position in the data-x/data-y attributes
      var x = (parseFloat(target.getAttribute("data-x")) || 0) + event.dx;
      var y = (parseFloat(target.getAttribute("data-y")) || 0) + event.dy;

      // translate the element
      target.style.transform = "translate(" + x + "px, " + y + "px)";

      // update the posiion attributes
      target.setAttribute("data-x", x);
      target.setAttribute("data-y", y);
    }
  },

  computed: {
    final_scale: function () {
      return this.$parent.ratio * this.scale;
    },
    widget_style: function () {
      return {
        height: this.final_scale * this.WIDGET_SIZE + "px",
        width: this.final_scale * this.WIDGET_SIZE + "px",
      };
    },
    widget_style_with_border: function () {
      return {
        ...this.widget_style,
        "border-width": this.final_scale * this.BORDER_SIZE + "px",
      };
    },
    widget_style_with_padding: function () {
      return {
        ...this.widget_style,
        padding: this.final_scale * this.BORDER_SIZE * 1.5 + "px",
      };
    },
  }
}
</script>

<style>
.draggable {
  touch-action: none;
}
</style>