<template>
  <el-dialog
    :visible.sync="visible"
    :show-close="false"
    :close-on-click-modal="false"
    :fullscreen="fullScreen"
    :before-close="before"
    :top="top"
    append-to-body
    ref="dialog"
    @close="handleClose"
  >
    <div slot="title" ref="title" v-if="title || toolShow" class="title-container" @mousedown.self="drag">
      <span class="icon" :class="icon"></span>
      <div ref="titleContent" class="title-content" @mousedown.self="drag">{{title}}</div>
      <h5 class="tool" v-if="toolShow">
        <span :class="isMin ? 'ct-icon-window1-gray' : 'ct-icon-minus1-white'" class="modal-btn" @click="minimize"></span>
        <span :class="fullScreen ? 'ct-icon-collapse1-blue' : 'ct-icon-expand1-blue'" class="modal-btn" @click="handleExpand"></span>
        <span class="ct-icon-remove1-red modal-btn" @click="handleClose"></span>
      </h5>
    </div>
    <div v-show="!isMin" class="dialog-body" :class="isHidden ? 'hidden' : ''" :style="{ height: bodyHeight }">
      <slot></slot>
    </div>
    <div class="footer-container" slot="footer" v-show="!isMin">
      <slot name="footer"></slot>
      <span class="resize" v-if="resizable" @mousedown.self="handleResize"></span>
    </div>
  </el-dialog>
</template>

<script type="text/ecmascript-6">
import { inRange, parseNumber } from './util';
export default {
  data ()
  {
    return {
      /* modal的长宽 */
      trueModalWidth: 0,
      trueModalHeight: 0,
      /* 窗口的长宽 */
      window: {
        width: window.innerWidth,
        height: window.innerHeight
      },
      /* 设置dialog的top和left值 */
      shift: {
        left: 0,
        top: 0
      },
      bodyShow: true,
      footerShow: true,
      fullScreen: false,
      isMin: false,
      bodyHeight: ''
    };
  },
  props: {
    /* 设置弹窗宽度 */
    width: {
      type: String,
      default: '50%'
    },
    /* 设置弹窗高度 */
    height: {
      type: String,
      default: '80%'
    },
    pivotX: {
      type: Number,
      default: 0.5,
      validator (value)
      {
        return value >= 0 && value <= 1;
      }
    },
    pivotY: {
      type: Number,
      default: 0.5,
      validator (value)
      {
        return value >= 0 && value <= 1;
      }
    },
    /* 设置弹窗是否可见 */
    visible: {
      type: Boolean,
      default: false
    },
    /* 是否可拖动 */
    draggable: {
      type: Boolean,
      default: true
    },
    /* 是否可伸缩 */
    resizable: {
      type: Boolean,
      default: true
    },
    /* 图标 */
    icon: {
      type: String,
      default: 'ct-icon-layers-blue'
    },
    /* 设置弹窗的title */
    title: {
      type: String,
      default: ''
    },
    /* 设置弹窗工具栏（包括关闭，最大化，最小化按钮）是否可显示 */
    toolShow: {
      type: Boolean,
      default: true
    },
    /* 设置弹窗的margin-top */
    top: {
      type: String,
      default: '0'
    },
    /* 模态框最小的宽度 */
    minWidth: {
      type: [Number, String],
      default: 300
    },
    /* 模态框最小的高度 */
    minHeight: {
      type: [Number, String],
      default: 300
    },
    /* 是否最小化 */
    isHidden: {
      type: Boolean,
      default: false
    },
    /* 关闭模态框前执行 */
    before: Function
  },
  computed: {
    /* dialog的DOM元素 */
    dialog ()
    {
      return this.$refs.dialog.$refs.dialog;
    },
    /* 真实top与left */
    position ()
    {
      const { trueModalWidth, trueModalHeight, window, pivotX, pivotY } = this;
      const maxLeft = window.width - trueModalWidth;
      const maxTop = window.height - trueModalHeight;
      const left = pivotX * maxLeft;
      const top = pivotY * maxTop;
      return {
        left: parseInt(inRange(0, maxLeft, left)),
        top: parseInt(inRange(0, maxTop, top))
      };
    }
  },
  beforeMount ()
  {
    this.handleWindowResize();
  },
  mounted ()
  {
    this.setInitialDialog();
  },
  methods: {
    /* 设置初始高宽 */
    setInitialDialog ()
    {
      let width = parseNumber(this.width);
      let height = parseNumber(this.height);
      this.trueModalWidth = width.type === '%' ? this.window.width / 100 * width.value : width.value;
      this.trueModalHeight = height.type === '%' ? this.window.height / 100 * width.value : width.value;
      this.dialog.style.width = inRange(this.minWidth, this.window.width, this.trueModalWidth) + 'px';
      this.dialog.style.height = inRange(this.minHeight, this.window.height, this.trueModalHeight) + 'px';
      this.setInitialPosition();
    },
    /**
     * 设置dialog的初始left和top
     */
    setInitialPosition ()
    {
      this.setPosition();
    },
    /**
     * 设置dialog的left和top
     */
    setPosition ()
    {
      this.dialog.style.top = this.position.top + 'px';
      this.dialog.style.left = this.position.left + 'px';
    },
    /* 设置window的高宽 */
    handleWindowResize ()
    {
      this.window.width = window.innerWidth;
      this.window.height = window.innerHeight;
    },
    /**
     * 最小化
     */
    minimize ()
    {
      this.isMin = !this.isMin;
      this.dialog.style.width = this.isMin ? '180px' : this.trueModalWidth + 'px';
      this.dialog.style.height = this.isMin ? '16px' : this.trueModalHeight + 'px';
      this.dialog.style.border = this.isMin ? '0' : '5px solid #81BDF3';
      this.fullScreen = false;
      this.$refs.titleContent.style.width = this.isMin ? '85px' : '';
    },
    /**
     * 全屏和小屏切换
     */
    handleExpand ()
    {
      this.fullScreen = !this.fullScreen;
      this.isMin = false;
      if (this.fullScreen)
      {
        this.dialog.style.width = '100%';
        this.dialog.style.height = '100%';
        this.dialog.style.left = '';
        this.dialog.style.top = '';
      }
      else
      {
        this.setInitialDialog();
      }
    },
    /**
     * 拖拽模态框触发
     */
    drag (e)
    {
      if (this.draggable)
      {
        e.preventDefault();
        const disX = e.clientX - this.dialog.offsetLeft;
        const disY = e.clientY - this.dialog.offsetTop;
        const boundaryX = (document.body.clientWidth || document.documentElement.clientWidth) - this.dialog.offsetWidth;
        const boundaryY = (document.body.clientHeight || document.documentElement.clientHeight) - this.dialog.offsetHeight;
        document.onmousemove = (e) =>
        {
          e.preventDefault();
          let _this = this;
          /* 判断模态框是否超过边界，超过了就只能停在边界 */
          function handleExceed ()
          {
            if (left <= 0)
            {
              _this.dialog.style.left = 0;
            }
            else if (left >= boundaryX)
            {
              _this.dialog.style.left = `${boundaryX}px`;
            }
            if (top <= 0)
            {
              _this.dialog.style.top = 0;
            }
            else if (top >= boundaryY)
            {
              _this.dialog.style.top = `${boundaryY}px`;
            }
          }
          const clientX = e.clientX;
          const clientY = e.clientY;
          const left = clientX - disX;
          const top = clientY - disY;
          this.dialog.style.left = `${left}px`;
          this.dialog.style.top = `${top}px`;
          handleExceed();
        };
        document.onmouseup = () =>
        {
          document.onmousemove = document.onmouseup = null;
        };
      }
    },
    /**
     * 点击关闭模态框
     */
    handleClose ()
    {
      this.isMin = false;
      this.fullScreen = false;
      this.reset();
      this.$emit('update:visible', false);
      this.$emit('close');
    },
    /**
     * 通过拖动改变模态框的大小
     */
    handleResize (e)
    {
      if (this.resizable)
      {
        e.preventDefault();
        document.onmousemove = (e) =>
        {
          e.preventDefault();
          const left = this.dialog.offsetLeft;
          const top = this.dialog.offsetTop;
          const width = e.clientX - left;
          const height = e.clientY - top;
          this.trueModalWidth = inRange(this.minWidth, this.window.width, width);
          this.trueModalHeight = inRange(this.minHeight, this.window.height, height);
          this.dialog.style.width = this.trueModalWidth + 'px';
          this.dialog.style.height = this.trueModalHeight + 'px';
          this.setPosition();
        };
        document.onmouseup = () =>
        {
          document.onmousemove = document.onmouseup = null;
        };
      }
    },
    /* 恢复成原来的宽高 */
    reset ()
    {
      this.dialog.style.width = this.width;
      this.dialog.style.height = this.height;
      this.dialog.style.left = window.innerWidth / 2 - parseInt(this.width.split('px')[0] / 2) + 'px';
      this.dialog.style.top = window.innerHeight / 2 - parseInt(this.height.split('px')[0] / 2) + 'px';
    }
  }
};
</script>

<style lang="less" scoped>
@title-bg-color: #81BDF3;
/deep/ .el-dialog__wrapper {
  height: 100%;
}
/deep/ .el-dialog {
  height: 88%;
  margin: 0;
  position: absolute;
  border: 5px solid rgb(129, 189, 243);
}
/deep/ .el-dialog__header {
  height: 16px;
  line-height: 16px;
  padding: 0 0 12px 0;
  .title-container {
    background: @title-bg-color;
    overflow: hidden;
    cursor: move;
    .icon {
      float: left;
      margin: 6px 0 0 6px;
      &:before {
        font-size: 15px;
        color: white;
      }
    }
    .title-content {
      float: left;
      color: #fff;
      font-size: 13px;
      box-sizing: border-box;
      font-weight: 700;
      letter-spacing: 1px;
      padding: 6px 0 6px 6px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    .tool {
      float: right;
      padding: 4px 10px 0 0;
      cursor: pointer;
      .modal-btn {
        display: inline-block;
        font-size: 12px;
        margin-right: 2px;
        &:before {
          color: white;
        }
      }
    }
  }
}
.dialog-body {
  width: 100%;
  height: 100%;
}
/deep/ .el-dialog__body {
  height: calc(100% - 28px);
  padding: 0 5px;
  overflow: auto;
}
/deep/ .el-dialog__footer {
  padding: 0 20px;
}
.footer-container {
  .resize {
    display: inline-block;
    width: 10px;
    height: 10px;
    opacity: 0;
    position: absolute;
    bottom: 0px;
    right: 0px;
    cursor: se-resize;
  }
}
</style>
