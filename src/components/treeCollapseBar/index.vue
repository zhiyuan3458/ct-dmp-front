<template>
  <collapse-bar class="collapse-bar" :collapsedWrapper="collapsedWrapper" @getLzyTableWrapperMarginLeft="getLzyTableWrapperMarginLeft">
    <!-- 按钮工具栏 -->
    <div slot="header" class="top">
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
    <div slot="content" class="main">
      <slot name="tree"></slot>
    </div>
  </collapse-bar>
</template>

<script type="text/ecmascript-6">
/**
 * 左边树形伸缩菜单，右边列表的页面
 * @author lvzhiyuan
 * @date   2018/6/1
 */
import collapseBar from '@/components/collapseBar';
export default {
  components: {
    collapseBar
  },
  props: {
    /* 传过来的是new出来的TreeTool或者dragDropTree */
    treeObj: {
      type: Object,
      default ()
      {
        return null;
      }
    },
    treeId: {
      type: String,
      required: true,
      default ()
      {
        return 'subLeftTree';
      }
    },
    collapsedWrapper: {
      type: Object,
      default ()
      {
        return {
          width: 220, // 设置初始宽度
          draggable: true, // 是否可拖拽
          collapsable: true // 是否可伸缩
        };
      }
    }
  },
  methods: {
    // 通过CollapseBar子组件的getLzyTableWrapperMarginLeft事件传递子组件一个参数给父组件，从而求出tableWrapper的marginLeft
    // 这是vue的子组件传递给父组件一种方法
    getLzyTableWrapperMarginLeft (...data)
    {
      const marginLeft = data[0].left + 10;
      this.$emit('marginLeft', marginLeft);
    },
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
  },
  computed: {
    /**
     * 返回的是树的层级
     * @author   lvzhiyuan
     * @date     2018/10/22
     */
    treeLevel ()
    {
      if (this.treeObj)
      {
        return this.treeObj.getTreeLevel(this.treeId);
      }
    }
  }
};
</script>

<style lang="less" scoped>
  /* 表头顶部背景 */
  @table-title-bg-color: #56A2E8;
  /* 表头背景 */
  @table-head-bg-color: #F9E7CD;
  /* 分页组件背景色 */
  @pagenation-bg-color: #e1edf9;

  /* 伸缩导航的样式 */
  .collapse-bar{
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

    .main {
      height: calc(100% - 30px);
      overflow: auto;
    }
  }
</style>
