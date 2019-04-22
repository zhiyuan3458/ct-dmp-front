<template>
  <div class="lzy-form-wrapper" v-loading.lock="isLoading">
    <right-nav-layout
      :btnList="operateBtns"
      :breadcrumbs="navigateMenus"
    ></right-nav-layout>
    <div class="form-container">
      <el-form :model="formData" ref="ctForm">
        <table class="form-table" width="100%">
          <colgroup>
            <col width="12%"/>
            <col width="21%"/>
            <col width="12%"/>
            <col width="21%"/>
            <col width="12%"/>
            <col width="22%"/>
          </colgroup>
          <!-- 沥青路面损坏调查表数据 -->
          <tr>
            <th class="form-header" colspan="6">
              <h2 style="text-align: center">桥隧构造物损坏调查表</h2>
            </th>
          </tr>
          <tr>
            <th><span style="color: red;">*</span>路线编号</th>
            <td colspan="1">
              <el-form-item label="" prop="routeCode">
                <el-input class="form-input" v-model="formData.routeCode" :readonly="true"></el-input>
              </el-form-item>
            </td>
            <th><span style="color: red;">*</span>调查方向</th>
            <td colspan="3">
              <el-form-item label="" prop="investigateDirection">
                <el-input class="form-input" v-model="formData.investigateDirection" :readonly="true"></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <th>调查时间</th>
            <td>
              <el-form-item label="" prop="investigateDate">
                <el-input class="form-input" v-model="formData.investigateDate" :readonly="true"></el-input>
              </el-form-item>
            </td>
            <th><span style="color: red;">*</span>调查人员</th>
            <td>
              <el-form-item label="" prop="investigator">
                <el-input class="form-input" v-model="formData.investigator" :readonly="true"></el-input>
              </el-form-item>
            </td>
            <th><span style="color: red;">*</span>路面宽度</th>
            <td>
              <el-form-item label="" prop="width">
                <el-input class="form-input" v-model="formData.width" :readonly="true"></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <th><span style="color: red;">*</span>起点桩号</th>
            <td>
              <el-form-item label="" prop="startStake">
                <el-input class="form-input" v-model="formData.startStake" :readonly="true"></el-input>
              </el-form-item>
            </td>
            <th><span style="color: red;">*</span>终点桩号</th>
            <td>
              <el-form-item label="" prop="endStake">
                <el-input class="form-input" v-model="formData.endStake" :readonly="true"></el-input>
              </el-form-item>
            </td>
            <th><span style="color: red;">*</span>路段长度</th>
            <td>
              <el-form-item label="" prop="length">
                <el-input class="form-input" v-model="formData.length" :readonly="true"></el-input>
              </el-form-item>
            </td>
          </tr>
        </table>
      </el-form>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import rightNavLayout from '@/components/topToolBar';
import { mapGetters } from 'vuex';
export default {
  components: {
    rightNavLayout
  },
  data ()
  {
    return {
      style: {},
      metaData: {
        bridgetunneldamageSub: []
      }
    };
  },
  methods: {
    bridgeComponentChange (data)
    {
      this.metaData.bridgetunneldamageSub = data;
    },
    /**
     * 表单提交.
     * @author   yekuncai
     * @date     2019/3/1
     */
    saveFn ()
    {
      this.$confirm('确认保存数据?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() =>
      {
        this.$refs['ctForm'].validate((valid) =>
        {
          if (valid)
          {
            let obj = {};
            let bridgetunneldamageSub = JSON.stringify(this.metaData.bridgetunneldamageSub);
            Object.assign(obj, this.formData, {bridgetunneldamageSub: bridgetunneldamageSub});
            this.loading = true;
            this.$store.dispatch('intelligentMaintenanceManagementSystem/_ROADEVALUATIONDETAIL/save', obj);
          }
          else
          {
            return false;
          }
        });
      });
    },
    /**
     * 返回
     * @author   yekuncai
     * @date     2019/3/1
     */
    returnFn ()
    {
      this.$store.dispatch('intelligentMaintenanceManagementSystem/_ROADEVALUATIONDETAIL/showList', this.deptId);
    }
  },
  computed: {
    ...mapGetters('intelligentMaintenanceManagementSystem/_ROADEVALUATIONDETAIL', [
      'formData',
      'navigateMenus',
      'operateBtns'
    ])
  }
};
</script>

<style lang="less" scoped>
@import '../../../../common/less/common';
</style>
