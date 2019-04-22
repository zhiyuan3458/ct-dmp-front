<template>
  <div class="rightPanel-container">
    <div class="collapsed-wrapper" ref="collapseObj" :style="{ width: collapseObjWidth + 'px', marginLeft: collapseObjMarginLeft + 'px' }">
      <div class="collapsed-content">
        <div class="top" v-if="topShow">
          <div class="group">
            <a class="icon ct-icon-folder-expand-orange" @click="clickTopBtn"></a>
            <div class="level-select" v-if="treeLevel && treeLevel.length !== 0">
              <span id="openId" class="ct-icon-arrow-down-gray"></span>
              <ul class="down-menu">
                <li class="level-item" v-for="levelItem in treeLevel" :key="levelItem.value" @click="levelItem.click.call(treeObj, levelItem)">
                  <span :class="levelItem.iconClass"></span>
                  <span class="level-text">{{levelItem.text}}</span>
                </li>
              </ul>
            </div>
          </div>
          <div class="group">
            <a class="icon ct-icon-folder-collaspe-orange" @click="clickTopBtn"></a>
          </div>
        </div>
        <!-- 树形结构工具栏 -->
        <div class="tree-container" :style="{height: treeHeight}">
          <slot name="tree"></slot>
        </div>
      </div>
      <div class="arrow-wrapper" @mousedown="drag">
        <div class="arrowIcon" :class="arrowClass" @click.stop="handleCollapse"></div>
      </div>
    </div>
    <div class="right-content-container" :style="{marginLeft: rightCotentMarginLeft + 'px'}">
      <slot name="right-content"></slot>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import collapseBar from '@/components/collapseBar';
import mixin from '../mixin';

export default {
  components: {
    collapseBar
  },
  mixins: [mixin],

  props: {
    treeObj: {
      type: Object,
      default ()
      {
        return {};
      }
    },
    treeLevel: {
      type: Array,
      default ()
      {
        return [];
      }
    },
    /* 是否显示上边的展开伸缩树按钮 */
    topShow: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    treeHeight ()
    {
      return this.topShow ? 'calc(100% - 30px)' : 'calc(100%)';
    }
  },

  methods: {
    /**
     * 点击的上部图标触发，判断是把整棵树收缩还是展开
     * @author   lvzhiyuan
     * @date     2018/10/22
     */
    clickTopBtn (e)
    {
      let iconClass = e.target.className;
      /* global $ */
      if (iconClass.indexOf('ct-icon-folder-collaspe-orange') >= 0)
      {
        this.treeObj.getTree().expandAll(false);
      }
      else
      {
        this.treeObj.getTree().expandAll(true);
      }
    }
  }
};
</script>

<style lang="less" scoped>
  .rightPanel-container {
    height: 100%;
    overflow: hidden;
    .collapsed-wrapper {
      height: 100%;
      padding: 6px 4px 0 4px;
      border-right: 1px solid #ddd;
      box-sizing: border-box;
      position: relative;
      float: left;

      .collapsed-content {
        height: 100%;
        .top {
          border-bottom: 1px solid #ddd;
          height: 29px;

          .group {
            float: left;
            margin-left: 0;
            padding: 0 12px;
            position: relative;
            border-right: 1px solid #ddd;
            .icon {
              height: 23px;
              line-height: 23px;
              font-size: 16px;
              cursor: pointer;
              padding-left: 5px;
              text-decoration: none;
              float: left;
            }
            .level-select {
              display: inline-block;
              position: relative;

              .ct-icon-arrow-down-gray {
                position: relative;
                top: 2px;
                display: inline-block;
                margin-left: 3px;
                cursor: pointer;
              }

              .down-menu {
                width: 110px;
                display: none;
                position: absolute;
                z-index: 10;
                top: 14px;
                left: 0;
                border: 1px solid #ccc;
                box-shadow: 1px 1px 3px #ccc;
                background: white;
                transition: all .8s;
                cursor: pointer;

                li.level-item {
                  padding: 5px 10px;
                  .content;

                  &:hover {
                    background: #FFE6B0;
                  }
                  .level-text {
                    float: right;
                  }
                }
              }

              &:hover {
                .down-menu {
                  display: block;
                }
              }
            }
          }
        }

        .tree-container {
          overflow: auto;
        }
      }

      .arrow-wrapper {
        width: 10px;
        height: 100%;
        position: absolute;
        top: 0;
        right: -10px;
        cursor: col-resize;

        .arrowIcon {
          width: 10px;
          height: 83px;
          position: absolute;
          right: 0px;
          top: 280px;
          cursor: pointer;
        }

        .collapsed-arrow {
          background: url('../img/arrow.png') no-repeat 0 0;
        }

        .open-arrow {
          background: url('../img/arrow.png') no-repeat -11px 0;
        }
      }
    }
    .right-content-container {
      height: 100%;
    }
  }
</style>
