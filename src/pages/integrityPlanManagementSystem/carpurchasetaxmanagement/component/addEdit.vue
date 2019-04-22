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
            <col width="38%"/>
            <col width="12%"/>
            <col width="38%"/>
          </colgroup>
          <tr>
            <th class="form-header" colspan="6">
              <h2 style="text-align: center">车购税项目管理表</h2>
            </th>
          </tr>
          <tr>
            <th>开始年份</th>
            <td>
              <el-form-item label="" prop="startYear">
                <el-date-picker
                  v-model="formData.startYear"
                  type="year"
                  format="yyyy年"
                  value-format="yyyy"
                  placeholder="选择年">
                </el-date-picker>
              </el-form-item>
            </td>
            <th>结束年份</th>
            <td>
              <el-form-item label="" prop="endYear">
                <el-date-picker
                  v-model="formData.endYear"
                  type="year"
                  format="yyyy年"
                  value-format="yyyy"
                  placeholder="选择年">
                </el-date-picker>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <th><span style="color: red;">*</span>名称</th>
            <td>
              <el-form-item label="" prop="name" :rules="[$validate.Required]">
                <el-input class="form-input" v-model="formData.name"></el-input>
              </el-form-item>
            </td>
            <th><span style="color: red;">*</span>图标</th>
            <td colspan="3">
              <el-form-item label="" prop="icon" :rules="[$validate.Required]">
                <icon-select
                  v-model="formData.icon"
                  :row="4"
                  :column="5"
                >
                </icon-select>
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
import iconSelect from '@/components/iconSelect';
export default {
  components: {
    rightNavLayout,
    iconSelect
  },
  methods: {
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
            let obj = this.formData;
            this.$store.dispatch('integrityPlanManagementSystem/_CARPURCHASETAXMANAGEMENT/save', obj);
          }
        });
      });
    }
  },
  computed: {
    ...mapGetters('integrityPlanManagementSystem/_CARPURCHASETAXMANAGEMENT', [
      'formData',
      'isLoading',
      'navigateMenus',
      'operateBtns'
    ])
  }
};
</script>

<style lang="less" scoped>
@import '../../../../common/less/common';
.form-table1 {
  .up-constructor {
    vertical-align: middle;
    border: 1px solid #ddd;
  }
  .down-constructor {
    vertical-align: middle;
    border: 1px solid #ddd;
  }
}
</style>
