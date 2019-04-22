<template>
  <div class="lzy-form-wrapper" v-loading.lock="isLoading">
    <right-nav-layout
      :btnList="operateBtns"
      :breadcrumbs="navigateMenus"
    ></right-nav-layout>
    <div class="form-container">
      <el-form :model="formData" ref="ctForm">
        <table class="form-table" width="100%">
          <tr>
            <th class="form-header">
              <h2 style="text-align: center">桥隧构造物损坏调查表</h2>
            </th>
          </tr>
        </table>
        <table class="form-table" width="100%">
          <!--<tr>-->
            <!--<th v-for="item1 in materialList">{{item1}}</th>-->
          <!--</tr>-->
          <!--<tr>-->
            <!--<th>1月</th>-->
            <!--<td v-for="item2 in materialList">-->
              <!--<el-form-item label="" prop="routeCode">-->
                <!--<el-input class="form-input" :readonly="true">{{item2}}</el-input>-->
              <!--</el-form-item>-->
            <!--</td>-->
          <!--</tr>-->
          <!--<tr>-->
            <!--<th>2月</th>-->
            <!--<td v-for="item3 in materialList">-->
              <!--<el-form-item label="" prop="routeCode">-->
                <!--<el-input class="form-input" :readonly="true">{{item3}}</el-input>-->
              <!--</el-form-item>-->
            <!--</td>-->
          <!--</tr>-->
          <!--<tr>-->
            <!--<th>3月</th>-->
            <!--<td v-for="item4 in materialList">-->
              <!--<el-form-item label="" prop="routeCode">-->
                <!--<el-input class="form-input" :readonly="true">{{item4}}</el-input>-->
              <!--</el-form-item>-->
            <!--</td>-->
          <!--</tr>-->
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
            this.$store.dispatch('intelligentMaintenanceManagementSystem/_MATERIALCONSUMPTIONSTATISTICS/save', obj);
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
      this.$store.dispatch('intelligentMaintenanceManagementSystem/_MATERIALCONSUMPTIONSTATISTICS/showList', this.deptId);
    }
  },
  computed: {
    ...mapGetters('intelligentMaintenanceManagementSystem/_MATERIALCONSUMPTIONSTATISTICS', [
      'formData',
      'navigateMenus',
      'operateBtns',
      'materialList'
    ])
  }
};
</script>

<style lang="less" scoped>
@import '../../../../common/less/common';
</style>
