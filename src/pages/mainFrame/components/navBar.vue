<template>
  <div class="tags-view-container">
    <scroll-pane class='tags-view-wrapper' ref='scrollPane'>
      <router-link
        ref="tag"
        :to="tag.url"
        class='tags-view-item'
        :class="isActive(tag)? 'active': ''"
        v-for="tag in projectList"
        :key="tag.url"
        @contextmenu.prevent.native="openMenu(tag, $event)"
        @click.native="addNavBarItem(tag.id)"
      >
        {{tag.name}}
      </router-link>
    </scroll-pane>
    <!-- 横竖三点 -->
    <div class="select-project">
      <span class="ct-icon-more-blue three-points"></span>
      <div class="project-model">
        <div class="project-model-title">
          <h2>
            <span class="ct-icon-short-cut-blue"></span>
            <span class="content">快捷方式</span>
          </h2>
          <el-switch
            class="switch"
            v-model="isOpen"
          >
          </el-switch>
        </div>
        <div class="project-model-content" v-if="shortcuts">
          <draggable v-model="shortcuts" element="ul" class="shortcut-group" @end="handleMoveEnd">
            <li v-for="shortcut in shortcuts" class="shortcut" :key="shortcut.id" :title="shortcut.name">
              <span v-if="isOpen" class="remove ct-icon-remove-light-black" @click.self="handleDeleteShortcut(shortcut.id)"></span>
              <span class="router-link" @click.prevent="handleClick(shortcut.path)">
                <span :class="shortcut.iconUrl" class="shortcut-icon"></span>
                <span class="shortcut-name" v-if="shortcut.name">{{shortcut.name.length > 4 ? shortcut.name.slice(0,4) + '...' : shortcut.name}}</span>
              </span>
            </li>
          </draggable>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import { mapGetters } from 'vuex';
import { getSubSystemInfo, getShortcutsList, deleteShortcuts, dragDrop } from '@/api/mainFrame/navBar';
import draggable from 'vuedraggable';
import scrollPane from '@/components/scrollPane/scrollPane';
export default {
  components: {
    scrollPane,
    draggable
  },
  data ()
  {
    return {
      /* 当前子系统的id */
      currentSubsystemId: '',
      /* 各子系统组成的列表 */
      projectList: [],
      /* 存储快捷方式的信息 */
      shortcuts: [],
      // 默认switch按钮不打开
      isOpen: false
    };
  },

  computed: {
    ...mapGetters([
      'sideBar',
      'shortcut'
    ]),
    opened ()
    {
      return this.sideBar.opened;
    }
  },

  watch: {
    // 就是$route: function()简写
    // 监听路由，当子系统变了的话，马上修改sessionStorage和vuex中的子系统id
    $route (to, from)
    {
      let toSubsystemName = to.path.split('/')[1];
      let fromSubsystemName = from.path.split('/')[1];
      if (fromSubsystemName !== toSubsystemName && to.meta.subSystemId)
      {
        let subSystemId = to.meta.subSystemId;
        sessionStorage.setItem('currentSubsystemId', subSystemId);
        this.$store.dispatch('setCurrentSubsystemId', subSystemId);
        this.getShortcuts();
      }
    },
    shortcut (newVal, oldVal)
    {
      if (JSON.stringify(newVal) !== JSON.stringify(oldVal))
      {
        this.shortcuts.push(this.shortcut);
      }
    }
  },

  methods: {
    handleClick (path)
    {
      this.$router.push(path);
    },
    /* 点击底导航栏的子系统标签跳转到不同的子系统中 */
    addNavBarItem (subSystemId)
    {
      this.$store.dispatch('setCurrentSubsystemId', subSystemId);
      sessionStorage.setItem('currentSubsystemId', subSystemId);
    },
    // 判断传值进来的路由的子系统id是否与当前路由对象的meta的subSystemId相同
    isActive (route)
    {
      return this.$route.meta.subSystemId === route.id;
    },
    /**
     * 获取所有快捷方式的信息
     * @author   lvzhiyuan
     * @date     2018/9/12
     */
    getShortcuts ()
    {
      getShortcutsList(sessionStorage.getItem('currentSubsystemId')).then(res =>
      {
        let shortcuts = res.data.data;
        shortcuts = shortcuts.map(shortcut => Object.assign({}, {
          id: shortcut.id,
          name: shortcut.name,
          iconUrl: shortcut.imgName,
          path: shortcut.url
        }));
        this.shortcuts = shortcuts;
      });
    },
    /**
     * 处理拖拽快捷方式
     * @author   lvzhiyuan
     * @date     2018/9/12
     */
    handleMoveEnd (e)
    {
      if (e.newIndex === e.oldIndex)
      {
        return false;
      }
      else
      {
        let ids = [];
        this.shortcuts.forEach(shortcut => ids.push(shortcut.id));
        ids = ids.join(',');
        dragDrop(ids).then(res =>
        {
        }, err =>
        {
          console.log(JSON.stringify(err));
        });
      }
    },
    /**
     * 处理删除快捷方式
     * @author   lvzhiyuan
     * @date     2018/9/12
     * @param    id
     * @return   删除快捷方式
     */
    handleDeleteShortcut (id)
    {
      deleteShortcuts(id).then(res =>
      {
        this.shortcuts.remove(this.shortcuts.find(item => item.id === id));
        this.$message({
          message: '删除成功！',
          type: 'success'
        });
      });
    }
  },
  created ()
  {
    // this.$store.dispatch('getSubsystemInfo');
    /* 获取子系统的信息并渲染到页面中 */
    /* 之所以要用sessionStorage和vuex一起把当前子系统id记住是因为f5刷新页面后就会清除所有vuex数据 */
    getSubSystemInfo().then(res =>
    {
      let code = res.data.code;
      if (code === this.$constant.ERR_OK)
      {
        this.projectList = res.data.data;
        /* 把当前的子系统id提交到vuex和sessionStorage中 */
        if (sessionStorage.getItem('currentSubsystemId') !== null)
        {
          let currentSubsystemId = sessionStorage.getItem('currentSubsystemId');
          this.$store.dispatch('setCurrentSubsystemId', currentSubsystemId);
        }
        else
        {
          sessionStorage.setItem('currentSubsystemId', this.projectList[0].id);
          this.$store.dispatch('setCurrentSubsystemId', this.projectList[0].id);
        }
      }
    });
    this.getShortcuts();
  }
};
</script>

<style lang="less" scoped>
@import "../less/mainFrame.less";
.tags-view-container {
  min-width: 1050px;
  max-width: 100%;
  position: relative;
  .tags-view-wrapper {
    background: #fff;
    box-shadow: 0 -1px 3px 0 rgba(0, 0, 0, .12);
    .tags-view-item {
      text-decoration: none!important;
      display: inline-block;
      position: relative;
      height: 24px;
      line-height: 24px;
      /*border: 1px solid #d8dce5;*/
      color: white;
      background: #34495E;
      padding: 0 8px;
      margin-left: 5px;
      /*margin-top: 1px;*/
      border-radius: 3px;
      .nav-bar-item;
      &:last-of-type {
        margin-right: 28px;
      }
      &.active {
        background-color: #2196f3;
        color: #fff;
        border-color: #2196f3;
        &::before {
          content: '';
          background: #fff;
          display: inline-block;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          position: relative;
          margin-right: 2px;
        }
      }
    }
  }
  /*  横竖三点 */
  .select-project {
    height: 100%;
    position: absolute;
    bottom: 0;
    right: 2px;
    padding: 0 5px;
    box-sizing: border-box;
    cursor: pointer;

    &:before {
      content: '';
      height: 80%;
      position: absolute;
      top: 1px;
      left: -2px;
      border-left: 1px solid #ddd;
    }

    &:hover {
      background: #282828;
      border: 1px solid orange;
      border-top: 0;

      .three-points:before {
        color: white;
      }
    }

    .ct-icon-setting4 {
      display: inline-block;
      font-size: 20px;
    }

    .project-model {
      width: 610px;
      height: 300px;
      visibility: hidden;
      z-index: -1;
      position: absolute;
      top: -299px;
      right: -1px;
      box-sizing: border-box;
      background: white;
      border: 1px solid orange;
      cursor: default;

      .project-model-title {
        height: 27px;
        line-height: 13px;
        padding: 4px 12px 12px 12px;
        box-sizing: border-box;
        border-bottom: 1px solid #ddd;
        overflow: hidden;

        h2 {
          float: left;
        }

        .switch {
          float: right;
          margin-top: -1px;
        }
      }

      .project-model-content {
        height: 245px;
        .shortcut-group {
          height: 100%;
          overflow-y: auto;
          .shortcut {
            width: 76px;
            height: 66px;
            box-sizing: border-box;
            float: left;
            position: relative;
            text-align: center;
            padding: 5px;
            cursor: pointer;
            .content;

            .remove {
              position: absolute;
              top: 0;
              right: 0;
            }

            .router-link {
              cursor: pointer;

              .shortcut-icon {
                font-size: 22px;
                display: block;
                background-repeat: no-repeat;
                margin: 0 auto;
              }

              .shortcut-name {
                display: block;
                margin-top: -8px;
                .content;
                color: #333;
              }
            }
          }
        }
      }
    }

    &:hover .project-model {
      visibility: visible;
    }

    &:hover .three-point {
      background: url('../img/whitePoint.png') no-repeat;
    }
  }
}
</style>
