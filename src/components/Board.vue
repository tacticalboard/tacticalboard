<template>
  <div
    class="flex justify-center items-center min-h-screen w-screen bg-gray-800"
    ref="board"
  >
    <div class="board relative" ref="board" :style="board_style">
      <img
        v-if="is_wide_screen"
        :src="require('@/assets/' + field)"
        class="z-0 w-full h-full absolute"
      />
      <img
        v-else
        :src="require('@/assets/' + v_field)"
        class="z-0 w-full h-full absolute"
      />
      <div class="z-10 w-full h-full absolute">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ShuttleBoard",
  data() {
    return {};
  },
  props: {
    field: {
      type: String,
      default: "shuttle.svg",
    },
    v_field: {
      type: String,
      default: "shuttle-v.svg",
    },
    field_length: {
      type: Number,
      default: 1462,
    },
    field_width: {
      type: Number,
      default: 732,
    },
  },

  mounted: function () {},

  methods: {
    length2width: function (length) {
      return (length / this.field_length) * this.field_width;
    },

    width2length: function (width) {
      return (width / this.field_width) * this.field_length;
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
      return (
        this.ratio *
        (this.is_wide_screen ? this.field_length : this.field_width)
      );
    },
    height: function () {
      return (
        this.ratio *
        (this.is_wide_screen ? this.field_width : this.field_length)
      );
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
      return length / this.field_length;
    },
  },
};
</script>

<style>
.draggable {
  touch-action: none;
}
</style>