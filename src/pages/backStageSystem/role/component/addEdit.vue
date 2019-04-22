<template>
  <!-- 模态框 -->
  <transition name="fade">
    <div class="lzy-form-wrapper" v-if="isAddEditShow" v-loading="isLoading">
      <right-nav-layout
        :btnList="operateBtns"
        :breadcrumbs="navigateMenus"
      ></right-nav-layout>
      <div class="form-container">
        <el-form :model="formData" ref="form" v-loading="metaData.loading">
          <table class="form-table" width="100%">
            <colgroup>
              <col width="12%"/>
              <col width="38%"/>
              <col width="12%"/>
              <col width="38%"/>
            </colgroup>
            <tr>
              <th>
                <span style="color: red;">*</span> 角色编码：
              </th>
              <td>
                <el-form-item label="" prop="roleCode" :rules="[$validate.Required]">
                  <el-input class="form-input" v-model="formData.roleCode" placeholder="请填写角色编码"></el-input>
                </el-form-item>
              </td>
              <th>
                <span style="color: red;">*</span> 角色名称：
              </th>
              <td>
                <el-form-item label="" prop="roleName" :rules="[$validate.Required]">
                  <el-input class="form-input" v-model="formData.roleName" placeholder="请填写角色名称"></el-input>
                </el-form-item>
              </td>
            </tr>
            <tr>
              <th>
                 备注：
              </th>
              <td colspan="3">
                <el-form-item label="" prop="memo">
                  <el-input
                    type="textarea"
                    :rows="5"
                    placeholder="请输入备注"
                    v-model="formData.memo">
                  </el-input>
                </el-form-item>
              </td>
            </tr>
            <tr>
              <th>
                人员：
              </th>
              <td colspan="3">
                <div class="role-ztree-container">
                  <ul id="userTree" class="ztree"></ul>
                </div>
              </td>
            </tr>
          </table>
        </el-form>
      </div>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
import TreeTool from '@/class/ztreeTool/treeTool';
import { mapGetters } from 'vuex';
import rightNavLayout from '@/components/topToolBar';
export default {
  components: {
    rightNavLayout
  },
  data ()
  {
    return {
      metaData: {
        treeTool: null,
        loading: false
      }
    };
  },

  methods: {
    saveFn ()
    { // 保存
      this.$confirm('确认保存数据?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() =>
      {
        let userIds = this.metaData.treeTool.getCheckedNodesIdsExceptTypes('Dept');
        let commitData = Object.assign({}, this.formData, {
          userIds: userIds
        });
        this.$store.dispatch('backStageSystem/_ROLE/save', commitData);
      });
    }
  },
  computed: {
    ...mapGetters('backStageSystem/_ROLE', [
      'formData',
      'isAddEditShow',
      'userTree',
      'navigateMenus',
      'operateBtns',
      'isLoading'
    ])
  },
  watch: {
    userTree (newValue, oldValue)
    {
      setTimeout(() =>
      {
        if (newValue.length !== 0)
        {
          this.metaData.treeTool = new TreeTool('userTree', this.userTree, true);
          this.metaData.treeTool.setCheck();
          this.metaData.treeTool.expandLevel('userTree', 4);
        }
      }, 20);
    }
  }
};
</script>

<style lang="less" scoped>
@import '../../../../common/less/common';
.role-ztree-container {
  height: 420px;
  overflow: auto;
}
</style>
