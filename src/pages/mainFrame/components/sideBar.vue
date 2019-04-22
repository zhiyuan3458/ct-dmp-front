<template>
<div class="side-bar-wrapper" ref="sideBarWrapper">
  <ul class="aside-bar-ul" v-clickoutside="handleClose">
    <li class="aside-bar-li" v-for="(item, index) in secondMenus" :key="index" :title="item.name" @mouseenter="handleHover(index)" @click="handleImgHightlightShow(index)" :class="{active: activeIndex === index}">
      <span :class="item.iconClass" class="second-nav-icon"></span>
    </li>
    <div class="aside-content" :style="{height: treeHeight}" v-show="asideBarShow">
      <ul id="treeNavBar" class="ztree"></ul>
    </div>
  </ul>
  <hamburger class="hamburger-container" :toggleClick="toggleSideBar" :isActive="sideBar.opened"></hamburger>
</div>
</template>

<script type="text/ecmascript-6">
import { mapGetters } from 'vuex';
import { getMenus } from '@/api/mainFrame/sideBar';
import hamburger from '@/components/hamburger/hamburger';
import Clickoutside from 'element-ui/src/utils/clickoutside';

export default {
  components: {
    hamburger
  },
  directives: { Clickoutside },
  data ()
  {
    return {
      activeClass: 'active',
      // 二级菜单的信息
      secondMenus: [],
      activeIndex: -1,
      // 是否让树形结构显示
      asideBarShow: false,
      // 三级和以上的菜单（树形数据）
      asideTreeMenus: [],
      currentAsideTreeMenus: [],
      setting: {
        callback: {
          onClick: this.handleClickNode
        },
        view: {
          /* 不显示ztree默认的图标 */
          showIcon: false,
          /* 自定义图标 */
          addDiyDom: this.addDiyDom,
          addHoverDom: this.addHoverDom,
          removeHoverDom: this.removeHoverDom
        }
      }
    };
  },
  methods: {
    handleClose ()
    {
      this.asideBarShow = false;
    },
    addDiyDom (treeId, treeNode)
    {
      /* global $ */
      let aObj = $('#' + treeNode.tId + '_a');
      if ($('#diyBtn_' + treeNode.id).length > 0) return;
      let iconHtml = `<span class="${treeNode.imgName}" style="font-size: 14px;"></span>`;
      aObj.prepend(iconHtml);
    },
    addHoverDom (treeId, treeNode)
    {
      let that = this;
      if ($(`#short_icon_${treeNode.id}`).length > 0) return;
      if (!treeNode.isParent)
      {
        let leafDOM = $(`#${treeNode.tId}_a`);
        let shortCutIcon = `<span id="short_icon_${treeNode.id}" class="ct-icon-short-cut-blue" style="margin-left: 5px;" title="添加至快捷方式"></span>`;
        leafDOM.append(shortCutIcon);
        let shortCutSpan = $(`#short_icon_${treeNode.id}`);
        if (shortCutIcon)
        {
          shortCutSpan.bind('click', function (e)
          {
            e.stopPropagation();
            e.preventDefault();
            let obj = {
              menuId: treeNode.id,
              subsystemId: that.currentSubsystemId
            };
            that.$store.dispatch('addShortcut', obj).then(res =>
            {
              if (res.data.data === '该快捷方式已添加')
              {
                that.$message({
                  type: 'info',
                  message: '该快捷方式已添加！'
                });
              }
              else
              {
                that.$message({
                  type: 'success',
                  message: '添加快捷方式成功！'
                });
              }
            });
          });
        }
      }
    },
    removeHoverDom (treeId, treeNode)
    {
      $(`#short_icon_${treeNode.id}`).unbind().remove();
    },
    handleHover (index)
    {
      /*  this.activeIndex = index; */
    },
    // 把鼠标移进去导航栏
    handleImgHightlightShow (index)
    {
      this.activeIndex = index;
      this.asideBarShow = true;
      if (this.asideTreeMenus[index])
      {
        this.currentAsideTreeMenus = this.asideTreeMenus[index];
      }
      else
      {
        this.currentAsideTreeMenus = [];
      }
      let treeObj = $.fn.zTree.init($('#treeNavBar'), this.setting, this.currentAsideTreeMenus);
      treeObj.expandAll(true);
    },

    // 点击树形结构节点触发
    handleClickNode (event, treeId, treeNode)
    {
      event.preventDefault();
      if (treeNode.path !== '')
      {
        this.asideBarShow = false;
        this.$router.push(treeNode.url);
      }
      else
      {
        this.activeIndex = -1;
      }
    },
    // 点击横竖三条触发动画
    toggleSideBar ()
    {
      this.$store.dispatch('toggleSideBar');
    }
  },
  computed: {
    // sideBar的横竖三条属性和navBar展开与隐藏
    ...mapGetters([
      'sideBar',
      'currentSubsystemId',
      'treeHeight'
    ])
  },
  watch: {
    /* 监听vuex中的子系统id，如果变了就把二级菜单以及对应的子菜单也随之变化 */
    currentSubsystemId (oldVal, newVal)
    {
      let id = this.currentSubsystemId;
      // 异步获取子系统的菜单信息
      getMenus(id).then(res =>
      {
        if (res.data.code === this.$constant.ERR_OK)
        {
          this.activeIndex = -1;
          let data = res.data.data;
          /* 清空secondMenus和asideTreeMenus */
          this.secondMenus = [];
          this.asideTreeMenus = [];
          data.forEach(item =>
          {
            let obj = Object.assign({}, {
              iconClass: item.imgName,
              iconHoverClass: item.imgName,
              name: item.name
            });
            this.secondMenus.push(obj);
            if (item.children)
            {
              this.asideTreeMenus.push(item.children);
            }
            else
            {
              this.asideTreeMenus.push([]);
            }
          });
        }
      });
    }
  }
};
</script>

<style lang="less">
@import "../../../common/less/theme.less";
@import "../less/sidebar";

.side-bar-wrapper {
  width: 43px;
  background-color: #34495E;

  .aside-bar-ul {
    width: 100%;
    font-size: 26px;
    margin-top: 10px;
    position: relative;
    .aside-bar-li {
      height: 48px;
      text-align: center;
      line-height: 48px;
      color: #AEB6BE;
      box-sizing: border-box;
      cursor: pointer;
      position: relative;

      .second-nav-icon:before {
        color: #ccc;
      }

      &.active {
        border-left: 2px solid orange;
        background: #243342;

        .second-nav-icon:before {
          color: #F59C00;
        }
      }
    }
    .aside-content {
      min-width: 200px;
      height: 100%;
      overflow: auto;
      position: absolute;
      box-sizing: border-box;
      padding: 0 0 0 3px;
      z-index: 5;
      top: -10px;
      left: 43px;
      border: 1px solid orange;
      border-left: 0;
      background: #F1F1F1;
      box-shadow: 5px 10px 6px #ddd;

      #treeNavBar {
        background: #F1F1F1;
        .content;
      }
    }
  }

  /*  横竖三条 */
  .hamburger-container {
    line-height: 20px;
    height: 20px;
    position: absolute;
    bottom: 5px;
    padding: 0 10px;

    svg {
      fill: white;
    }
  }
}

.orange11:before {
  color: #F59C00;
}
</style>
