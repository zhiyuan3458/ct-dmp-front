<template>
  <div class="lzy-form-wrapper">
    <right-nav-layout
      :btnList="operateBtns"
      :breadcrumbs="navigateMenus"
    ></right-nav-layout>
    <div class="form-container">
      <el-form :model="formData" ref="ctForm" v-loading="metaData.loading">
        <table class="form-table" width="100%">
          <tr>
            <th class="form-header" colspan="6">
              <h2 style="text-align: center">评分表</h2>
            </th>
          </tr>
        </table>
        <el-collapse v-model="activeNames">
          <el-collapse-item title="评分表基本信息" name="1">
            <table class="form-table" width="100%">
              <colgroup>
                <col width="12%"/>
                <col width="38%"/>
                <col width="12%"/>
                <col width="38%"/>
              </colgroup>
              <!-- A数据 -->
              <tr>
                <th><span style="color: red;">*</span>国检模板</th>
                <td>
                  <el-form-item label="" prop="moduleId" :rules="[$validate.Required]">
                    <form-component
                      v-model="formData.moduleId"
                      :optionData="moduleList"
                      type="select"
                      dictionaryCode="deptType"
                      :readOnly="readOnly"
                    ></form-component>
                  </el-form-item>
                </td>
                <th>年份</th>
                <td>
                  <el-form-item label="" prop="year">
                    <form-component
                      v-model="formData.year"
                      type="select"
                      dictionaryCode="checkYear"
                      :readOnly="readOnly"
                    ></form-component>
                  </el-form-item>
                </td>
              </tr>
              <tr>
                <th><span style="color: red;">*</span>管理单位</th>
                <td>
                  <el-form-item label="" prop="deptId" :rules="[$validate.Required]">
                    <ztree-select
                      v-model="formData.deptId"
                      :ztreeList="ztreeSelect"
                      :readOnly="readOnly"
                      :flag="false"
                    ></ztree-select>
                  </el-form-item>
                </td>
              </tr>
              <tr>
                <th><span style="color: red;">*</span>模板</th>
                <td>
                  <el-form-item label="" prop="moduleTreeIds" :rules="[$validate.Required]">
                    <ztree-select
                      v-model="formData.moduleTreeIds"
                      :ztreeList="moduleTree"
                      :readOnly="readOnly"
                    ></ztree-select>
                  </el-form-item>
                </td>
              </tr>
            </table>
          </el-collapse-item>
        </el-collapse>
      </el-form>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import rightNavLayout from '@/components/topToolBar';
import ztreeSelect from '@/components/ztreeSelect';
import inlineEditTable from '@/components/inline-edit-table';
import uploader from '@/components/uploader';
import formComponent from '@/components/formComponent';
import { mapGetters } from 'vuex';
import { postHttp } from '@/api/util';
import prifix from '@/common/js/urlPrifix';
export default {
  components: {
    rightNavLayout,
    ztreeSelect,
    inlineEditTable,
    uploader,
    formComponent
  },
  data ()
  {
    return {
      style: {},
      activeNames: ['1'],
      moduleTree: [],
      getModuleTreeUrl: prifix.maintenance + '/mt/dt/moduletree/getModuleTree',
      metaData: {
        // bridgeComponent: []
      }
    };
  },
  methods: {
    /**
     * 表单提交
     * @author   chenguang
     * @date     2018/9/29
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
            // let bridgeComponent = JSON.stringify(this.metaData.bridgeComponent);
            obj = Object.assign(obj, this.formData);
            this.loading = true;
            this.$store.dispatch('intelligentMaintenanceManagementSystem/_SCORETABLE/save', obj);
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
     * @author   chenguang
     * @date     2018/11/18
     */
    returnFn ()
    {
      this.$store.dispatch('intelligentMaintenanceManagementSystem/_SCORETABLE/showList', this.deptId);
    }
  },
  computed: {
    ...mapGetters('intelligentMaintenanceManagementSystem/_SCORETABLE', [
      'readOnly',
      'formData',
      'deptId',
      'ztreeSelect',
      'navigateMenus',
      'operateBtns',
      'moduleList'
      // 'bridgeComponent'
    ])
  },
  watch: {
    'formData.moduleId': {
      handler (newValue, oldValue)
      {
        if (newValue)
        {
          postHttp(`${this.getModuleTreeUrl}`, {moduleId: newValue, moduleTreeIds: this.formData.moduleTreeIds}).then(res =>
          {
            this.moduleTree = res.data.data;
          });
        }
      },
      immediate: true
    }
  }
};
</script>

<style lang="less" scoped>
@import '../../../../common/less/common';
</style>
