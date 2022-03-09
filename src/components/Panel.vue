<template>
  <div class="h-full w-full relative">
    <div class="h-full w-full" id="panel"></div>
    <div
      class="
        draggable
        text-xl
        w-24
        h-8
        items-center
        text-gray-300
        absolute
        justify-center
        flex
        bg-gray-600
        bottom-0
        mx-auto
        left-0
        right-0
        rounded
        mb-1
        p-1
        opacity-50
        hover:opacity-100
      "
    >
      <font-awesome-icon
        class="
          p-1
          mx-1
          rounded
          cursor-pointer
          transition
          duration-150
          ease-in-out
        "
        :class="{
          'bg-gray-900': tool == TOOLS.PEN,
          'hover:bg-gray-700': tool != TOOLS.PEN,
        }"
        :icon="['fas', 'pen']"
        @click="tool = tool == TOOLS.PEN ? null : TOOLS.PEN"
      />
      <font-awesome-icon
        class="
          p-1
          mx-1
          rounded
          cursor-pointer
          transition
          duration-150
          ease-in-out
        "
        :class="{
          'bg-gray-900': tool == TOOLS.ERASER,
          'hover:bg-gray-700': tool != TOOLS.ERASER,
        }"
        :icon="['fas', 'eraser']"
        @click="tool = tool == TOOLS.ERASER ? null : TOOLS.ERASER"
      />
      <!-- <font-awesome-icon
        class="
          p-1
          mx-1
          rounded
          cursor-pointer
          transition
          duration-150
          ease-in-out
        "
        :class="{
          'bg-gray-900': tool == TOOLS.SAVE,
          'hover:bg-gray-700': tool != TOOLS.SAVE,
        }"
        :icon="['fas', 'save']"
        @click="tool = tool == TOOLS.SAVE ? null : TOOLS.SAVE"
      /> -->
    </div>
  </div>
</template>

<script>
import Two from "two.js";
import interact from "interactjs";
import screenfull from "screenfull";

export default {
  data() {
    return {
      BALL_SCALE: 0.037,
      PLAYER_SCALE: 0.023,
      OPACITY: 1,
      PLAYER_STROKE_RATIO: 1.45,
      MAX_PLAYER_STROKE: 30,
      PLAYER_GAP_SCALE: 1.35,
      BALL_GAP_SCALE: 1.8,
      TOP_GAP_SCALE: 0.55,
      LINE_SCALE: 0.003,

      TOOLS: {
        PEN: 0,
        ERASER: 1,
        SAVE: 2,
      },

      objs: {},
      players: {},
      ball: {},
      lines: {},

      is_dragging: false,
      plotable: false,

      mouse: null,
      start_point: null,
      line_color: "#fff",

      tool: null,

      two: {},
    };
  },

  props: {
    n_player: {
      default: 2,
      type: Number,
    },
    svg_ball: {
      default: "shuttlecock.svg",
      type: String,
    },
    svg_player: {
      default: "player.svg",
      type: String,
    },
    scale: {
      default: 1,
      type: Number,
    },
    ball_color: {
      default: "#fff",
      type: String,
    },
    team_a_color: {
      default: "rgb(14 165 233)",
      type: String,
    },
    team_b_color: {
      default: "rgb(244 63 94)",
      type: String,
    },
  },

  mounted: function () {
    this.init();
  },

  methods: {
    init: function () {
      this.two = new Two({
        type: Two.Types.svg,
        fitted: true,
        autostart: true,
      }).appendTo(document.getElementById("panel"));

      this.mouse = new Two.Vector();
      this.tmp = new Two.Vector();

      this.load_elements();
      this.bind_global_events();
    },

    bind_global_events: function () {
      var elem = this.two.renderer.domElement;
      // disable dragging the page
      elem.ontouchstart = (e) => {
        e.preventDefault();
      };
      elem.ontouchmove = (e) => {
        e.preventDefault();
      };
      elem.ontouchend = (e) => {
        e.preventDefault();
      };

      // drawing
      elem.addEventListener("pointerdown", (e) => {
        this.is_dragging = true;
        if (this.tool == this.TOOLS.PEN) {
          this.start_point = this.mouse = this.get_mouse_coord(
            e.clientX,
            e.clientY
          );
        }
      });
      elem.addEventListener("pointermove", (e) => {
        if (this.is_dragging) {
          if (this.tool == this.TOOLS.PEN) {
            this.mouse = this.get_mouse_coord(e.clientX, e.clientY);
          }
        }
      });
      elem.addEventListener("pointerup", (e) => {
        this.is_dragging = false;
        if (this.tool == this.TOOLS.PEN) {
          this.mouse = this.get_mouse_coord(e.clientX, e.clientY);
          var arrow = this.two.makeArrow(
            this.start_point.x,
            this.start_point.y,
            this.mouse.x,
            this.mouse.y
          );
          arrow.stroke = this.line_color;
          arrow.linewidth = this.line_width;
          this.two.update();
          this.lines[arrow.renderer.elem.id] = arrow;
          this.objs[arrow.renderer.elem.id] = arrow;
          this.bind_eraser(arrow.renderer.elem);
          this.bind_drag(arrow.renderer.elem);

          this.start_point = this.mouse = null;
        }
      });

      // moving tool bar
      interact(".draggable").draggable({
        listeners: {
          start(event) {
            console.log(event.type, event.target);
          },
          move(event) {
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
      });

      //
      interact(elem).on("doubletap", () => {
        if (this.tool == this.TOOLS.ERASER) {
          for (let line_id in this.lines) {
            this.lines[line_id].visible = false;
          }
          this.lines = {};
        }
      });
    },

    bind_eraser: function (elem) {
      interact(elem).on("tap", () => {
        if (this.tool == this.TOOLS.ERASER) {
          var line = this.lines[elem.id];

          // console.log("line:", line);
          // console.log("children before remove", this.two.scene.children);
          // // try to remove
          // var res = this.two.remove(line)
          // console.log("return from remove", res)
          // console.log("childrena after remove", this.two.scene.children);
          // console.log("ids", this.two.scene.children.ids)
          line.visible = false;
          delete this.lines[elem.id];
          console.log(this.lines);
        }
      });
    },

    bind_drag: function (elem) {
      interact(elem).draggable({
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
        },
      });
    },

    dragMoveListener: function (event) {
      var obj = this.objs[event.target.id];
      obj.translation = obj.position.add(new Two.Vector(event.dx, event.dy));
      event.preventDefault();
    },

    is_inside: function (obj, coord) {
      var shift = obj.position.clone().sub(coord);
      var rect = obj.getBoundingClientRect();
      return (
        Math.abs(shift.x) <= rect.width && Math.abs(shift.y) <= rect.height
      );
    },

    get_mouse_coord: function (x, y) {
      var pos = this.two.renderer.domElement.getBoundingClientRect();
      return new Two.Vector(x, y).sub(new Two.Vector(pos.x, pos.y));
    },

    get_rel_obj_coord: function (obj) {
      var coord = obj.position.clone();
      coord.divide(new Two.Vector(this.two.width, this.two.height));
      return coord;
    },

    get_img_url: function (name) {
      return require("../assets/" + name);
    },

    resize_shape: function (shape, width) {
      shape.scale = (shape.scale * width) / shape.getBoundingClientRect().width;
    },

    load_elements: function () {
      this.load_svg(this.svg_ball, (svg) => {
        svg.id = "ball";
        this.ball = this.two.interpret(svg);
        this.objs[svg.id] = this.ball;
        this.ball.center();
        this.resize_shape(this.ball, this.ball_width);
        this.ball.translation = this.ball_init_position;

        this.two.update();
        interact(this.ball._renderer.elem).on("doubletap", () => {
          this.fullscreen();
        });
        this.bind_drag(this.ball._renderer.elem);
      });

      this.load_svg(this.svg_player, (svg) => {
        for (let team of ["team_a", "team_b"]) {
          var color = this[team + "_color"];
          var pos_shift = team == "team_a" ? -1 : 1;
          for (let i of [...Array(this.n_player).keys()]) {
            var player_name = team + "_" + i;
            var player = this.two.interpret(svg);
            player.id = player_name;
            this.objs[player.id] = player;
            player.center();
            this.resize_shape(player, this.player_width);
            var ball_pos = Two.Vector.add(
              this.ball_init_position,
              new Two.Vector(
                pos_shift *
                  (i * this.PLAYER_GAP_SCALE + this.BALL_GAP_SCALE) *
                  this.player_width,
                0
              )
            );
            player.translation = ball_pos;
            player.opacity = this.OPACITY;
            player.fill = color;
            player.stroke = "#fff";
            player.linewidth = Math.min(
              this.PLAYER_STROKE_RATIO * this.player_width,
              this.MAX_PLAYER_STROKE
            );
            this.players[player_name] = player;

            this.two.update();
            this.bind_drag(player._renderer.elem);
          }
        }
      });
    },

    load_svg: function (path, callback) {
      var svg_path = this.get_img_url(path);
      fetch(svg_path)
        .then((response) => response.text())
        .then((svg) => {
          var parent = document.createElement("p");
          parent.innerHTML = svg;
          var child = parent.firstElementChild;
          callback(child);
        });
    },

    snap_state: function () {
      // TODO
    },

    load_state: function (state) {
      console.log(state);
    },
    fullscreen: function () {
      if (screenfull.isEnabled) {
        screenfull.toggle(this.$refs.board);
      }
    },
    clear: function () {
      console.log("clear");
      this.two.clear();
    },
  },

  computed: {
    final_scale: function () {
      return this.$parent.ratio * this.scale;
    },
    ball_width: function () {
      return (
        this.BALL_SCALE *
        this.scale *
        (this.is_wide_screen ? this.two.width : this.two.height)
      );
    },
    player_width: function () {
      return (
        this.PLAYER_SCALE *
        this.scale *
        (this.is_wide_screen ? this.two.width : this.two.height)
      );
    },
    line_width: function () {
      return (
        this.LINE_SCALE *
        this.scale *
        (this.is_wide_screen ? this.two.width : this.two.height)
      );
    },
    ball_init_position: function () {
      return new Two.Vector(
        this.two.width / 2,
        this.ball_width * this.TOP_GAP_SCALE
      );
    },
    is_wide_screen: function () {
      return this.$parent.is_wide_screen;
    },
  },
};
</script>

<style>
</style>