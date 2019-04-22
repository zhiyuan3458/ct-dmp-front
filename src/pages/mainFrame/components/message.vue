<template>
  <div class="notice-group icon" @mouseenter="mEnter" @mouseleave="mLeave">
    <el-badge :value="messageNo" :hidden="messageNo === 0">
      <span class="ct-icon-bell-blue iconStyle"></span>
    </el-badge>
    <transition name="el-zoom-in-top">
      <div class="drop-down-menu" v-show="contentShow">
        <el-tabs v-model="activeName" :tab-position="tabPosition">
          <el-tab-pane name="task">
            <div class="back-log" slot="label">
              <el-badge :value="taskLength" :hidden="taskLength === 0">
                <a class="link-icon ct-icon-form2-dark-orange" href="javascript: void(0);"></a>
              </el-badge>
              <span ref="task" class="link-text">待办事项</span>
            </div>
            <span class="noMessage" v-if="taskLength === 0">暂无待办事项！</span>
            <ul class="content-list" v-if="taskLength > 0">
              <li v-for="(item) in todoTask" :key="item.id">
                <span class="itemName" @click="audit(item)" :title="item.subject">{{item.subject}}</span>
                <span class="time" @click="audit(item)">{{item.releasestate}}</span>
              </li>
            </ul>
            <div class="more" @click="more(taskcategory)" >详细>></div>
          </el-tab-pane>
          <el-tab-pane class="tt" name="content">
            <div class="announcement" slot="label">
              <el-badge :value="noticeContentLength" :hidden="noticeContentLength === 0">
                <a class="link-icon ct-icon-form2-dark-orange" href="javascript: void(0);"></a>
              </el-badge>
              <span ref="content" class="link-text">公告通知</span>
            </div>
            <span class="noMessage" v-if="noticeContentLength === 0">暂无新的公告通知！</span>
            <ul class="content-list" v-if="noticeContentLength > 0">
              <li v-for="item in noticeContent" :key="item.id">
                <span class="itemName"  href="item.href" :title="item.subject">{{item.subject}}</span>
                <span class="time">{{item.releasestate}}</span>
              </li>
            </ul>
            <div class="more" @click="more(noticecategory)">详细>></div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </transition>
  </div>
</template>

<script>
import { getBulletin, getrouter } from '@/api/mainFrame/header';
import { mapGetters } from 'vuex';

export default {
  data ()
  {
    return {
      messageNo: 0,
      activeName: 'task',
      taskLength: 0,
      todoTask: [],
      contentShow: false,
      tabPosition: 'left',
      taskcategory: '待办事项',
      noticecategory: '公告',
      noticeContentLength: 0,
      noticeContent: []
    };
  },
  methods:
    {
      more (category)
      {
        this.$store.dispatch('setBulletin', { category: category, userClick: '未处理' });
        this.$router.push('/backStageSystem/todoTask');
        this.contentShow = false;
      },
      // 鼠标移入待办事项
      mEnter ()
      {
        this.taskLength = this.todoTask.length;
        this.noticeContentLength = this.noticeContent.length;
        this.$refs.content.click();
        if (this.taskLength !== 0)
        {
          this.$refs.task.click();
        }
        this.contentShow = true;
      },
      // 鼠标移出待办事项
      mLeave ()
      {
        this.contentShow = false;
      },
      getTodoTask ()
      {
        let obj = { pageNum: 1, pageSize: 50 };
        let taskCount = 0;
        let noticeCount = 0;
        getBulletin(obj).then(data =>
        {
          let tableList = data.data.data.tableList;
          // 待办事项
          let todoList = [];
          // 公告通知
          let noticList = [];
          for (let i = 0; i < tableList.length; i++)
          {
            if (tableList[i].category === '待办事项')
            {
              todoList[taskCount] = tableList[i];
              taskCount++;
            }
            else
            {
              noticList[noticeCount] = tableList[i];
              noticeCount++;
            }
          }
          this.todoTask = todoList;
          this.noticeContent = noticList;
          this.messageNo = tableList.length + noticList.length;
          this.$store.dispatch('setRefreshTodoTask', false);
        });
      },
      audit (item)
      {
        let obj = { processInstanceId: item.processInstanceId };
        getrouter(obj).then(data =>
        {
          let router = data.data.data.router;
          let businessId = data.data.data.businessKey;
          businessId = businessId.substring(businessId.indexOf(':') + 1, businessId.length);
          this.$store.dispatch('setBusinessId', businessId);
          this.$router.push(router);
          this.contentShow = false;
        });
      }
    },
  computed:
    {
      ...mapGetters([
        'refreshTodoTask'
      ])
    },
  created ()
  {
    this.getTodoTask();
  },
  watch: {
    refreshTodoTask (newValue, oldValue)
    {
      if (newValue === true)
      {
        this.getTodoTask();
      }
    }
  }
};
</script>

<style lang="less" scoped>
.iconStyle {
  width: 100%;
  height: 100%;
  display: inline-block;
  font-size: 20px;

  &:before {
    color: white;
  }
}
.drop-down-menu {
  width: 515px;
  height: 250px;
  position: absolute;
  top: 46px;
  right: 3px;
  border: 1px solid orange;
  border-top: 0;
  background-color: #fff;
  color: #404040;
  z-index: 550;
  cursor: default;
  /deep/.el-tabs__item{
    height: 110px !important;
    padding: 0 3px;
  }
  .announcement {
    width: 50px;
    display: block;
    transform: translateX(-50%);
    margin: 12px 0 0 42px;
    float: left;

    &:hover {
      .link-text {
        display: block;
        color: red;
      }
    }
  }
  .back-log {
    width: 50px;
    display: block;
    transform: translateX(-50%);
    margin: 12px 0 0 42px;
    float: left;

    &:hover {
      .link-text {
        display: block;
        color: red;
      }
    }
  }

  .link-icon {
    display: block;
    width: 53px;
    height: 53px;
    line-height: 55px;
    border: #e2e2e2 1px solid;
    background-color: #fafafa;
    -webkit-border-radius: 3px;
    -moz-border-radius: 3px;
    border-radius: 3px;
    box-shadow: 0 1px 1px rgba(0,0,0,.1);
    cursor: pointer;
    color: #333;
    font-size: 22px;
    text-align: center;
  }
  .link-text {
    display: block;
    line-height: 35px;
    text-align: center;
    color: #333;
    cursor: pointer;
    font-size: 12px;
  }
  .el-badge__content.is-fixed {
    top: 6px;
    padding: 0;
  }
  .noMessage{
    float: left;
    padding: 8px 15px 0 15px;
    font-size: 14px;
    text-align: center;
    height: 200px;
    width:360px;
  }
  .content-list {
    overflow: hidden;
    padding: 8px 15px 0 15px;
    font-size: 12px;
    text-align: left;
    height: 200px;
    width:360px;
    li {
      line-height: 32px;
      overflow: hidden;
      border-bottom: 1px solid #F5F5F5;
      transition: all .5s;

      &:last-of-type {
        border-bottom: 0;
      }

      &:hover {
        color: red;
        text-decoration: underline;
        span {
          color: red;
          text-decoration: underline;
        }
      }

      .itemName {
        width: 71%;
        float: left;
        text-align: left;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        text-decoration: none;
        color: #6B6B6B;
        cursor: pointer;
      }

      .time {
        float: right;
      }
    }
  }
  .more {
    text-align: right;
    padding-right: 18px;
    cursor: pointer;
    font-size: 12px;
    a {
      color: dodgerblue;
    }
  }
  .close {
    float: right;
    padding: 0 10px;
    cursor: pointer;
    transition: all .5s;
    height: 38px;
    line-height: 38px;
    .remove-icon {
      font-size: 18px;
      &:before {
        color: #333;
      }
    }
    &:hover {
      background: #bbb;
      .remove-icon {
        font-size: 18px;
        &:before {
          color: white;
        }
      }
    }
  }
}
</style>
