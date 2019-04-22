<template>
  <div ref="activitiForm">
    <right-nav-layout
      :btnList="btnList"
      :breadcrumbs="breadcrumbs"
      ref="rightNavLayout"
    ></right-nav-layout>
    <table class="form-table" width="100%">
      <colgroup>
        <col width="12%"/>
        <col width="38%"/>
        <col width="12%"/>
        <col width="38%"/>
      </colgroup>
      <tr v-if="isShowTitle">
        <th class="form-header" colspan="4">
          <h2 style="text-align: center">流程名称：{{defName}}</h2>
        </th>
      </tr>
      <tr v-if="isShowTitle">
        <th>
          <span style="color: red;">*</span> 下一步流程节点:
        </th>
        <td colspan="3">
          {{nextNodeName}}
        </td>
      </tr>
      <tr v-if="isShowTree">
        <th>
          <span style="color: red;">*</span> 下一级处理人：
        </th>
        <td colspan="3">
          <el-form-item label="" prop="userNames" style="width: 200px">
            <ztree-select
              v-model="userNames"
              :ztreeList="userTree"
              :readOnly="false"
            ></ztree-select>
          </el-form-item>
        </td>
        <!--<th>-->
          <!--下一级审批角色：-->
        <!--</th>-->
        <!--<td>-->
          <!--<el-form-item label="" prop="roleNames">-->
            <!--<ztree-select-->
              <!--v-model="roleNames"-->
              <!--:ztreeList="roleTree"-->
              <!--:readOnly="false"-->
            <!--&gt;</ztree-select>-->
          <!--</el-form-item>-->
        <!--</td>-->
      </tr>
      <tr v-if="isShowComment">
        <th>
          常用意见：
        </th>
        <td colspan="3">
          <el-select v-model="quickComment" @change="selectComment" style="width: 80px">
            <el-option
              v-for="item in commentList"
              :key="item.id"
              :label="item.text"
              :value="item.text">
            </el-option>
          </el-select>
        </td>
      </tr>
      <tr v-if="isShowComment">
        <th>
          <span style="color: red;">*</span> 意见：
        </th>
        <td colspan="3">
          <el-form-item label="" prop="comment">
            <el-input type="textarea" cols="50" rows="5" maxlength="100"
              placeholder="请输入意见" v-model="comment">
            </el-input>
          </el-form-item>
        </td>
      </tr>
    </table>
    <v-dialog title="流程意见信息" :visible.sync="isCommentListShow" width="900px">
      <comments :commentsInfo="commentsInfo">
      </comments>
    </v-dialog>
    <v-dialog title="流程图跟踪" :visible.sync="isflowChartShow" width="900px">
      <iframe :src="flowChartUrl" width="800" height="600" scrolling="no"></iframe>
    </v-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
import rightNavLayout from '@/components/topToolBar/index';
import ztreeSelect from '@/components/ztreeSelect';
import { close, getActivitiInfo, audit, saveStatus, getComments } from '@/api/backStageSystem/activiti/todoTask/index';
import { getUserTree } from '@/api/backStageSystem/user/index';
import { getRoleTree } from '@/api/backStageSystem/role/index';
import dialog from '@/components/dialog';
import comments from './comments.vue';
import { mapGetters } from 'vuex';
export default {
  components: {
    rightNavLayout,
    ztreeSelect,
    comments,
    'v-dialog': dialog
  },
  data ()
  {
    return {
      isShowTitle: false, // 是否显示标题
      btnList: [], // 页面按钮
      breadcrumbs: [], // 页面导航
      beforeBtnList: [], // 上一个按钮列表
      openInfo: [], // 打开流程表单信息
      comment: '', // 流程意见
      userTree: [], // 用户树
      roleTree: [], // 角色树
      nodeInfo: {}, // 流程节点信息
      userNames: '', // 下一级处理人
      roleNames: '', // 下一级处理角色
      commentsInfo: {}, // 流程意见历史列表
      isCommentListShow: false, // 是否显示意见列表
      isflowChartShow: false, // 是否显示流程图
      flowChartUrl: '', // 流程图url
      processInstanceId: '',
      nextNodeName: '', // 下一级节点名称
      isShowTree: false, // 是否显示树
      isShowComment: false, // 是否显示流程意见
      commentList: [], // 常用流程审批意见
      quickComment: '' // 快捷意见
    };
  },
  props: {
    // 流程名称
    defName: {
      type: String,
      default: ''
    },
    // 流程标识
    defKey: {
      type: String,
      default: ''
    },
    // 业务表单信息
    formData: {
      type: Object,
      default: function ()
      {
        return {};
      }
    },
    // 页面按钮
    operateBtns: {
      type: Array,
      default: function ()
      {
        return [];
      }
    },
    // 页面导航
    navigateMenus: {
      type: Array,
      default: function ()
      {
        return [];
      }
    }
  },
  methods: {
    returnFn ()
    {
      if (this.businessId !== '')
      {
        this.$store.dispatch('setBusinessId', '');
        this.$store.dispatch('setRefreshTodoTask', true);
        let url = '/backStageSystem/todoTask';
        this.$router.push(url);
      }
      else
      {
        this.$parent.$parent.returnFn();
      }
    },
    saveFn ()
    {
      this.$parent.$parent.saveFn();
    },
    /**
     * 定时器.
     * @author   yekuncai
     * @date     2019/2/21
     */
    sleep (d)
    {
      return new Promise((resolve) => setTimeout(resolve, d));
    },
    selectComment ()
    {
      this.comment = this.quickComment.concat();
    },
    /**
     * 打开流程表单
     */
    async openFn ()
    {
      while (true)
      {
        if (this.openInfo.btnList !== undefined)
        {
          if (this.openInfo.btnList.length !== 0)
          {
            break;
          }
        }
        await this.sleep(1000);
      }
      this.btnList = this.openInfo.btnList;
      this.isShowTree = this.openInfo.isShowTree;
      this.isShowComment = this.openInfo.isShowComment;
      this.isShowTitle = true;
    },
    /**
     * 关闭流程表单
     */
    closeFn ()
    {
      this.btnList = this.beforeBtnList;
      this.isShowTree = false;
      this.isShowComment = false;
      this.isShowTitle = false;
    },
    /**
     * 流程意见信息
     */
    getCommentsFn ()
    {
      this.isCommentListShow = true;
      let obj = { processInstanceId: this.formData.processInstanceId, pageNum: 1, pageSize: 100 };
      getComments(obj).then(data =>
      {
        this.commentsInfo = data.data;
      });
    },
    /**
     * 流程图
     */
    flowChartFn ()
    {
      let params = 'processInstanceId=' + this.formData.processInstanceId + '&processDefinitionKey=' + this.defKey;
      this.flowChartUrl = `/bpm/visualProcessLog.html?${params}`;
      this.isflowChartShow = true;
    },
    /**
    * 提交
    */
    submitFn ()
    {
      this.$confirm('是否提交?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() =>
      {
        let flag = this.check();
        if (flag)
        {
          this.$parent.$parent.submitFn();
        }
      }).catch(() =>
      {});
    },
    /**
     * 悬挂.
     */
    suspendFn ()
    {
      this.handle('suspend').then(data =>
      {
        if (data)
        {
          this.returnFn();
        }
      });
    },
    /**
     * 中止.
     */
    terminationFn ()
    {
      this.handle('termination').then(data =>
      {
        if (data)
        {
          this.returnFn();
        }
      });
    },
    /**
     * 驳回.
     */
    disallowFn ()
    {
      this.handle('disallow').then(data =>
      {
        if (data)
        {
          this.returnFn();
        }
      });
    },
    /**
     * 取回.
     * @author   yekuncai
     * @date     2019/2/20
     */
    async retrieveFn ()
    {
      this.handle('retrieve').then(data =>
      {
        if (data)
        {
          this.returnFn();
        }
      });
    },
    /**
     * 检查是否已选审批人或者审批角色.
     * @author   yekuncai
     * @date     2019/1/29
     */
    check ()
    {
      if (this.isShowComment)
      {
        if (this.comment === '')
        {
          this.$message('审批意见不能为空！');
          return false;
        }
      }
      if (this.isShowTree)
      {
        if (this.userNames === '' || this.userNames === undefined)
        {
          if (this.roleNames === '' || this.roleNames === undefined)
          {
            this.$message('下一级审批人不能为空！');
            return false;
          }
        }
        if (this.userNames === '' && this.roleNames === '')
        {
          this.$message('下一级审批角色不能为空！');
          return false;
        }
        if (this.nodeInfo.multiprocessor === '0' && this.userNames.includes(','))
        {
          this.$message('下一级审批人只能选一个！');
          return false;
        }
        if (this.nodeInfo.multiprocessor === '0' && this.roleNames.includes(','))
        {
          this.$message('下一级审批角色只能选一个！');
          return false;
        }
      }
      return true;
    },
    /**
     * 办理任务.
     * @author   yekuncai
     * @date     2018/12/27
     */
    async handle (type)
    {
      let check = this.check();
      if (!check)
      {
        return check;
      }
      let params = {
        comment: this.comment,
        type: type,
        userNames: this.userNames,
        roleNames: this.roleNames,
        processInstanceId: this.formData.processInstanceId
      };
      let {data} = await audit(params);
      this.$message({
        type: 'success',
        message: data.data.msg
      });
      if (data.data.processStatus !== undefined)
      {
        this.formData.processStatus = data.data.processStatus;
        let action = data.data.action;
        this.formData.action = action.substring(0, action.lastIndexOf('/') + 1) + 'save';
        action = await saveStatus(this.formData);
        this.$store.dispatch('setBusinessId', '');
        this.$store.dispatch('setRefreshTodoTask', true);
        return true;
      }
    },
    setActivitiInfo ()
    {
      let obj = { userNames: this.userNames, roleNames: this.roleNames, comment: this.comment };
      this.$parent.$parent.setActivitiInfo(obj);
    },
    initTree (obj)
    {
      if (this.userTree.length === 0)
      {
        getUserTree({ userIds: obj.userIds }).then(data =>
        {
          this.userTree = data.data.data.ztreeList;
        });
        getRoleTree({ roleIds: obj.roleIds }).then(data =>
        {
          this.roleTree = data.data.data.ztreeList;
        });
      }
    }
  },
  computed: {
    ...mapGetters([
      'businessId'
    ])
  },
  mounted ()
  {
    this.btnList = this.operateBtns;
    this.breadcrumbs = this.navigateMenus;
  },
  watch: {
    defName ()
    {
      let params = { processInstanceId: this.formData.processInstanceId, defName: this.defName };
      close(params).then(data =>
      {
        this.openInfo.isShowTree = data.data.data.isShowTree;
        this.openInfo.isShowComment = data.data.data.isShowComment;
        this.nextNodeName = data.data.data.nextNodeName;
      });
    },
    formData: {
      handler ()
      {
        let obj = {};
        this.processInstanceId = this.formData.processInstanceId;
        getActivitiInfo({ processInstanceId: this.formData.processInstanceId }).then(data =>
        {
          this.nodeInfo.auditBtns = data.data.data.auditBtns;
          this.nodeInfo.multiprocessor = data.data.data.multiprocessor;
          let userIds = data.data.data.userNames;
          let roleIds = data.data.data.roleIds;
          this.userNames = userIds;
          this.roleIds = roleIds;
          obj = { userIds: userIds, roleIds: roleIds };
          this.initTree(obj);
          let params = { processInstanceId: this.formData.processInstanceId, defName: this.defName };
          close(params).then(data =>
          {
            this.beforeBtnList = this.btnList.concat();
            this.openInfo.btnList = this.btnList.concat();
            for (let i = this.btnList.length; i > 0; i--)
            {
              if (this.btnList[i - 1].displayName === '打开流程表单')
              {
                this.openInfo.btnList.remove(this.btnList[i - 1]);
                break;
              }
            }
            if (this.formData.processInstanceId === undefined || this.formData.processStatus === '取回')
            {
              this.openInfo.btnList.push.apply(this.openInfo.btnList, data.data.data.operateBtns);
            }
            else
            {
              this.openInfo.btnList.push.apply(this.openInfo.btnList, this.nodeInfo.auditBtns);
            }
            this.openInfo.isShowTree = data.data.data.isShowTree;
            this.openInfo.isShowComment = data.data.data.isShowComment;
            this.nextNodeName = data.data.data.nextNodeName;
            this.commentList = data.data.data.commentList.ztreeList;
          });
        });
      },
      immediate: true
    },
    userNames ()
    {
      this.setActivitiInfo();
    },
    roleNames ()
    {
      this.setActivitiInfo();
    },
    comment ()
    {
      this.setActivitiInfo();
    },
    nextNodeName ()
    {
      if (this.isShowTitle)
      {
        this.isShowTree = this.openInfo.isShowTree;
        this.isShowComment = this.openInfo.isShowComment;
      }
    }
  }
};
</script>

<style lang="less" scoped>
@import '../../common/less/common';
</style>
