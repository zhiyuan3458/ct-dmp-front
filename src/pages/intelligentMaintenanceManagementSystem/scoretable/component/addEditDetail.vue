<template>
  <div class="lzy-form-wrapper">
    <right-nav-layout
      :btnList="operateBtns"
      :breadcrumbs="navigateMenus"
    ></right-nav-layout>
    <div class="form-container">
      <el-form :model="formData" ref="ctForm" v-loading="metaData.loading">
        <el-input class="form-input" v-model="formData.moduleManageId" v-show="false"></el-input>
        <el-input class="form-input" v-model="formData.moduleTreeId" v-show="false"></el-input>
        <el-input class="form-input" v-model="formData.scoreTableId" v-show="false"></el-input>
        <table class="form-table" width="100%">
          <tr>
            <th class="form-header" colspan="6">
              <h2 style="text-align: center">全国干线公路养护管理检查管理规范化检查评分表（普通干线公路）</h2>
            </th>
          </tr>
        </table>
        <el-collapse v-model="activeNames">
          <el-collapse-item title="评分表信息" name="1">
            <table class="form-table" width="100%">
              <colgroup>
                <col width="11%"/>
                <col width="22%"/>
                <col width="11%"/>
                <col width="22%"/>
                <col width="12%"/>
                <col width="22%"/>
              </colgroup>
              <!-- A数据 -->
              <tr>
                <th>评分项目：</th>
                <td>
                  <el-form-item label="" prop="moduleManage.rateProject">
                    <el-input class="form-input" v-model="formData.moduleManage.rateProject" :readonly="true"></el-input>
                  </el-form-item>
                </td>
                <th>检查时间：</th>
                <td>
                  <el-form-item label="" prop="checkTime">
                    <el-date-picker v-model="formData.checkTime" value-format="yyyy-MM-dd" type="date" :readonly="readOnly"></el-date-picker>
                  </el-form-item>
                </td>
                <th>检查得分：</th>
                <td>
                  <el-form-item label="" prop="score">
                    <el-input class="form-input" v-model="formData.score" :readonly="readOnly"></el-input>
                  </el-form-item>
                </td>
              </tr>
              <tr>
                <th>检查内容：</th>
                <td colspan="5">
                  <el-form-item label="" prop="moduleManage.contents">
                    <el-input class="form-input" v-model="formData.moduleManage.contents" :readonly="true" ></el-input>
                  </el-form-item>
                </td>
              </tr>
              <tr>
                <th>
                  评分标准：
                </th>
                <td colspan="5">
                  <el-form-item label="" prop="moduleManage.standard">
                    <el-input type="textarea" class="form-input" rows="2" placeholder="请输入内容" v-model="formData.moduleManage.standard" :readonly="true">
                    </el-input>
                  </el-form-item>
                </td>
              </tr>
              <tr>
                <th>
                  评分细则：
                </th>
                <td colspan="5">
                  <el-form-item label="" prop="moduleManage.rules">
                    <el-input type="textarea" class="form-input" rows="4" placeholder="请输入内容" v-model="formData.moduleManage.rules" :readonly="true">
                    </el-input>
                  </el-form-item>
                </td>
              </tr>
              <tr>
                <th>
                  检查记录：
                </th>
                <td colspan="5">
                  <el-form-item label="" prop="record">
                    <el-input type="textarea" class="form-input" rows="4" placeholder="请输入内容" v-model="formData.record" :readonly="readOnly">
                    </el-input>
                  </el-form-item>
                </td>
              </tr>
              <tr>
                <th>
                  落实情况：
                </th>
                <td colspan="5">
                  <el-form-item label="" prop="situation">
                    <el-input type="textarea" class="form-input" rows="4" placeholder="请输入内容" v-model="formData.situation" :readonly="readOnly">
                    </el-input>
                  </el-form-item>
                </td>
              </tr>
              <tr>
                <th>检查组组长签字：</th>
                <td>
                  <el-form-item label="" prop="inspectionleader">
                    <el-input class="form-input" v-model="formData.inspectionleader" :readonly="readOnly"></el-input>
                  </el-form-item>
                </td>
                <th>主要检查人签字：</th>
                <td colspan="3">
                  <el-form-item label="" prop="signature">
                    <el-input class="form-input" v-model="formData.signature" :readonly="readOnly"></el-input>
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
            obj = Object.assign(obj, this.formData, {moduleManage: ''});
            this.loading = true;
            this.$store.dispatch('intelligentMaintenanceManagementSystem/_SCORETABLE/saveDetail', obj).then(() =>
            {
              this.$message({
                message: '保存成功',
                type: 'success'
              });
            });
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
