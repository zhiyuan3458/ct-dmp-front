<template>
  <div class="lzy-form-wrapper" v-if="isAddEditShow" v-loading.lock="isLoading">
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
            <th>
              <span style="color: red;">*</span>名称：
            </th>
            <td>
              <el-form-item label="" prop="name" :rules="[$validate.Required]">
                <el-input class="form-input" v-model="formData.name"></el-input>
              </el-form-item>
            </td>
            <th>图标：</th>
            <td>
              <icon-select v-if="isAddEditShow" v-model="formData.imgName" :row="4" :column="5">
              </icon-select>
            </td>
          </tr>
          <tr>
            <th>
              <span style="color: red;">*</span>url：
            </th>
            <td>
              <el-form-item label="" prop="url" :rules="[$validate.Required]">
                <el-input class="form-input" v-model="formData.url"></el-input>
              </el-form-item>
            </td>
            <th>
              <span style="color: red;">*</span>是否显示：
            </th>
            <td>
              <el-form-item label="" prop="effectiveFlag" :rules="[$validate.Required]">
                <el-radio-group v-model="formData.effectiveFlag">
                  <el-radio label="1">是</el-radio>
                  <el-radio label="0">否</el-radio>
                </el-radio-group>
              </el-form-item>
            </td>
          </tr>
        </table>
      </el-form>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import { mapGetters } from 'vuex';
import rightNavLayout from '@/components/topToolBar';
import iconSelect from '@/components/iconSelect';
export default {
  components: {
    rightNavLayout,
    iconSelect
  },
  data ()
  {
    return {
      metaData: {
        loading: false
      }
    };
  },
  methods: {
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
            this.$store.dispatch('backStageSystem/_PROJECTLINKMANAGEMENT/save', obj);
          }
        });
      });
    }
  },
  computed: {
    ...mapGetters('backStageSystem/_PROJECTLINKMANAGEMENT', [
      'formData',
      'readOnly',
      'isAddEditShow',
      'navigateMenus',
      'operateBtns',
      'isLoading'
    ])
  }
};
</script>

<style lang="less" scoped>
@import '../../../../common/less/common';
</style>
