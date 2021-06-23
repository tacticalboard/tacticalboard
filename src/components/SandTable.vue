<template>
  <div class="sandtable relative" ref="sandtable" :style="sandtable_style">
    <img
      v-if="is_wide_screen"
      src="@/assets/court.jpg"
      class="z-0 w-full h-full absolute"
    />
    <img
      v-else
      src="@/assets/court-v.jpg"
      class="z-0 w-full h-full absolute"
    />
    <div class="z-10 absolute h-full w-full left-0 top-0">
      <div
        class="
          draggable
          w-10
          h-10
          bg-blue-500
          rounded-full
          border-white border-4
        "
      ></div>
      <div
        class="
          draggable
          w-10
          h-10
          bg-blue-500
          rounded-full
          border-white border-4
        "
      ></div>
      <div
        class="
          draggable
          w-10
          h-10
          bg-red-500
          rounded-full
          border-white border-4
        "
      ></div>
      <div
        class="
          draggable
          w-10
          h-10
          bg-red-500
          rounded-full
          border-white border-4
        "
      ></div>
    </div>
  </div>
</template>

<script>
import interact from "interactjs";

export default {
  name: "SandTable",
  data() {
    return {};
  },
  props: {},

  mounted: function () {
    console.log(this.is_wide_screen)
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
    },
  },

  computed: {
    sandtable_style: function () {
      return {
        height: this.height + "px",
        width: this.width + "px",
      };
    },
    is_wide_screen: function () {
      return window.innerWidth > window.innerHeight;
    },
    width: function () {
      return window.innerWidth;
    },
    height: function () {
      if (!this.is_wide_screen) {
        return (window.innerWidth / 591) * 1200;
      } else {
        return (window.innerWidth / 1200) * 591;
      }
    },
  },
};
</script>

<style>
</style>