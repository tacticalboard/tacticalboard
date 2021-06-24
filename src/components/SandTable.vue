<template>
  <div
    class="flex justify-center items-center min-h-screen w-screen bg-gray-800"
    ref="sandtable"
  >
    <div class="sandtable relative" ref="sandtable" :style="sandtable_style">
      <div
        class="
          absolute
          p-1
          top-1
          right-1
          cursor-pointer
          z-20
          opacity-5
          hover:opacity-60
          transition
          duration-150
          ease-in-out
          border-transparent
        "
        :style="widget_style"
        @click="fullscreen"
      >
        <img src="@/assets/fullscreen.svg" alt="" />
      </div>
      <img
        v-if="is_wide_screen"
        src="@/assets/court.svg"
        class="z-0 w-full h-full absolute"
      />
      <img
        v-else
        src="@/assets/court-v.svg"
        class="z-0 w-full h-full absolute"
      />
      <div class="z-10 absolute h-full w-full left-0 top-0 flex justify-center">
        <div
          class="draggable bg-blue-500 rounded-full border-white"
          :style="widget_style"
        ></div>
        <div
          class="draggable bg-blue-500 rounded-full border-white"
          :style="widget_style"
        ></div>
        <div :style="widget_style" class="draggable border-transparent">
          <img src="@/assets/shuttlecock.svg" alt="" />
        </div>
        <div
          class="draggable bg-red-500 rounded-full border-white"
          :style="widget_style"
        ></div>
        <div
          class="draggable bg-red-500 rounded-full border-white"
          :style="widget_style"
        ></div>
      </div>
    </div>
  </div>
</template>

<script>
import interact from "interactjs";
import screenfull from "screenfull";

export default {
  name: "SandTable",
  data() {
    return {
      WIDTH: 732,
      LENGTH: 1462,
      WIDGET_SIZE: 60,
      BORDER_SIZE: 6.5,
    };
  },
  props: {},

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
    },

    length2width: function (length) {
      return (length / this.LENGTH) * this.WIDTH;
    },

    width2length: function (width) {
      return (width / this.WIDTH) * this.LENGTH;
    },

    fullscreen: function () {
      console.log("fullscreen");
      if (screenfull.isEnabled) {
        screenfull.toggle(this.$refs.sandtable);
      }
    },
  },

  computed: {
    sandtable_style: function () {
      return {
        height: this.height + "px",
        width: this.width + "px",
      };
    },
    widget_style: function () {
      return {
        height: this.ratio * this.WIDGET_SIZE + "px",
        width: this.ratio * this.WIDGET_SIZE + "px",
        "border-width": this.ratio * this.BORDER_SIZE + "px",
      };
    },
    is_wide_screen: function () {
      return window.innerWidth > window.innerHeight;
    },
    width: function () {
      return this.ratio * (this.is_wide_screen ? this.LENGTH : this.WIDTH);
    },
    height: function () {
      return this.ratio * (this.is_wide_screen ? this.WIDTH : this.LENGTH);
    },
    ratio: function () {
      let length = 0;
      let transform_length = 0;
      if (this.is_wide_screen) {
        length = window.innerWidth;
        transform_length = this.width2length(window.innerHeight);
      } else {
        length = window.innerHeight;
        transform_length = this.width2length(window.innerWidth);
      }
      length = length <= transform_length ? length : transform_length;
      return length / this.LENGTH;
    },
  },
};
</script>

<style>
.draggable {
  touch-action: none;
}
</style>