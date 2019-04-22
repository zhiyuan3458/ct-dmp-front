<template>
  <div class="collapsed-wrapper" :class="collapseClass" ref="collapsedWrapper" :style="{width: width + 'px'}">
    <div class="collapsed-content">
      <slot name="header"></slot>
      <slot name="content"></slot>
    </div>
    <div class="arrow-wrapper" @mousedown="drag" v-if="collapsable">
      <div class="arrowIcon" :class="arrowClass" @click.stop="handleCollapse"></div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  data ()
  {
    return {
      arrowClass: 'collapsed-arrow'
    };
  },

  props: {
    width: {
      type: [String, Number],
      default: 260
    },
    collapseClass: {
      type: String,
      default: 'collapsed-wrapper'
    },
    /* 是否可伸缩 */
    collapsable: {
      type: Boolean,
      default: true
    },
    /* 是否可拖拽 */
    draggable: {
      type: Boolean,
      default: true
    }
  },
  mounted ()
  {
    const right = this.$refs.collapsedWrapper.style.right;
    if (right !== '0px' || right !== '' || right !== 0)
    {
      this.arrowClass = 'open-arrow';
    }
  },
  methods: {
    // 拖拽可伸缩侧导航栏函数
    drag (e)
    {
      // 如果是按了箭头收缩的话，就不给拉动
      if (e.target.className.indexOf('arrowIcon') >= 0)
      {
        return;
      }
      // 看传入的draggable值是否为true才给拉伸
      if (this.draggable)
      {
        let that = this;
        document.onmousemove = function (e)
        {
          e.preventDefault();
          e.stopPropagation();
          let currentMarginWidth = e.clientX - 51;
          let documentWidth = document.body.clientWidth;
          documentWidth = documentWidth - 500;
          if (currentMarginWidth <= 150)
          {
            that.collapsedWrapperWidth = 150;
            that.$emit('getLzyTableWrapperMarginLeft', {left: 150});
            return;
          }
          if (currentMarginWidth >= documentWidth)
          {
            that.collapsedWrapperWidth = documentWidth;
            that.$emit('getLzyTableWrapperMarginLeft', {left: documentWidth});
            return;
          }
          // 把collapsedWrapperWidth提交到父组件
          that.$emit('getLzyTableWrapperMarginLeft', {left: currentMarginWidth});
          that.collapsedWrapperWidth = currentMarginWidth;
        };

        document.onmouseup = function ()
        {
          document.onmousemove = null;
        };
      }
      else
      {
        return false;
      }
    },

    // 点击侧导航栏的伸缩符可以伸缩侧导航栏
    handleCollapse ()
    {
      if (this.collapsable)
      {
        const collapsedWrapper = this.$refs.collapsedWrapper;
        const right = collapsedWrapper.style.right;
        if (right === '0px')
        {
          collapsedWrapper.style.right = '-260px';
          this.arrowClass = 'open-arrow';
        }
        else
        {
          collapsedWrapper.style.right = '0px';
          this.arrowClass = 'collapsed-arrow';
        }
      }
      else
      {

      }
    }
  }
};
</script>

<style lang="less" scoped>
@import "./less/style.css";
.collapsed-wrapper {
  box-sizing: border-box;
  .collapsed-content {
    height: 100%;
  }

  .arrow-wrapper {
    width: 10px;
    height: 100%;
    position: absolute;
    top: 0;
    left: -10px;
    cursor: col-resize;

    .arrowIcon {
      width: 10px;
      height: 83px;
      position: absolute;
      right: 0px;
      top: 40%;
      cursor: pointer;
    }

    .collapsed-arrow {
      background: url('./img/arrow.png') no-repeat 0 0;
      transform: rotateY(180deg);
    }

    .open-arrow {
      background: url('./img/arrow.png') no-repeat -11px 0;
      transform: rotateY(180deg);
    }
  }
}
</style>
