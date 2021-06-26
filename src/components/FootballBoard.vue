<template>
  <div
    class="flex justify-center items-center min-h-screen w-screen bg-gray-800"
    ref="board"
  >
    <div class="board relative" ref="board" :style="board_style">
      <div
        class="
          absolute
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
          w-5
          h-5
        "
        @click="fullscreen"
      >
        <img src="@/assets/fullscreen.svg" alt="" />
      </div>
      <img
        v-if="is_wide_screen"
        src="@/assets/football.svg"
        class="z-0 w-full h-full absolute"
      />
      <img
        v-else
        src="@/assets/football-v.svg"
        class="z-0 w-full h-full absolute"
      />
    </div>
    <slot></slot>
  </div>
</template>

<script>
import screenfull from "screenfull";

export default {
  name: "FootballBoard",
  data() {
    return {
      WIDTH: 700,
      LENGTH: 1060,
    };
  },
  props: {},

  mounted: function () {
  },

  methods: {

    length2width: function (length) {
      return (length / this.LENGTH) * this.WIDTH;
    },

    width2length: function (width) {
      return (width / this.WIDTH) * this.LENGTH;
    },

    fullscreen: function () {
      console.log("fullscreen");
      if (screenfull.isEnabled) {
        screenfull.toggle(this.$refs.board);
      }
    },
  },

  computed: {
    board_style: function () {
      return {
        height: this.height + "px",
        width: this.width + "px",
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
