<template>
  <!-- 模态框 -->
  <transition name="fade">
    <div class="lzy-form-wrapper" v-if="isAddEditDetailShow">
      <right-nav-layout
        :btnList="operateBtns"
        :breadcrumbs="navigateMenus"
      ></right-nav-layout>
      <div class="form-container">
        <el-form :model="formData" ref="ctForm" v-loading="metaData.loading">
          <el-input class="form-input" v-model="formData.moduleTreeId" v-show="false"></el-input>
          <table class="form-table" width="100%">
            <tr>
              <th class="form-header" colspan="6">
                <h2 style="text-align: center">全国干线公路养护管理检查管理规范化检查评分表（普通干线公路）</h2>
              </th>
            </tr>
          </table>
          <el-collapse v-model="activeNames">
            <el-collapse-item title="项目基本信息" name="1">
              <table class="form-table" width="100%">
                <colgroup>
                  <col width="12%"/>
                  <col width="60%"/>
                </colgroup>
                <tr>
                  <th>
                    评分项目：
                  </th>
                  <td>
                    <el-form-item label="" prop="rateProject">
                      <el-input class="form-input" v-model="formData.rateProject" :readonly="readOnly"></el-input>
                    </el-form-item>
                  </td>
                </tr>
                <tr>
                  <th>
                    检查内容：
                  </th>
                  <td>
                    <el-form-item label="" prop="contents">
                      <el-input type="textarea" class="form-input" rows="2" placeholder="请输入内容" v-model="formData.contents" :readonly="readOnly">
                      </el-input>
                    </el-form-item>
                  </td>
                </tr>
                <tr>
                  <th>
                    评分标准：
                  </th>
                  <td>
                    <el-form-item label="" prop="standard">
                      <el-input type="textarea" class="form-input" rows="2" placeholder="请输入内容" v-model="formData.standard" :readonly="readOnly">
                      </el-input>
                    </el-form-item>
                  </td>
                </tr>
                <tr>
                  <th>
                    评分细则：
                  </th>
                  <td>
                    <el-form-item label="" prop="rules">
                      <el-input type="textarea" class="form-input" rows="4" placeholder="请输入内容" v-model="formData.rules" :readonly="readOnly">
                      </el-input>
                    </el-form-item>
                  </td>
                </tr>
                <tr>
                  <th>
                    检查记录：
                  </th>
                  <td>
                    <el-form-item label="" prop="record">
                      <el-input type="textarea" class="form-input" rows="4" placeholder="请输入内容" v-model="formData.record" :readonly="readOnly">
                      </el-input>
                    </el-form-item>
                  </td>
                </tr>
              </table>
            </el-collapse-item>
          </el-collapse>
        </el-form>
      </div>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
import { mapGetters } from 'vuex';
import rightNavLayout from '@/components/topToolBar';
import formComponent from '@/components/formComponent';
import latLngPosition from '@/components/latLngPosition';
import uploader from '@/components/uploader';
import iconSelect from '@/components/iconSelect';
export default {
  components: {
    rightNavLayout,
    formComponent,
    uploader,
    latLngPosition,
    iconSelect
  },
  data ()
  {
    return {
      activeNames: ['1'],
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
            this.$store.dispatch('intelligentMaintenanceManagementSystem/_MODULEMANAGE/saveDetail', obj);
          }
          else
          {
            return false;
          }
        });
      });
    }
  },
  computed: {
    ...mapGetters('intelligentMaintenanceManagementSystem/_MODULEMANAGE', [
      'formData',
      'readOnly',
      'isAddEditDetailShow',
      'navigateMenus',
      'operateBtns'
    ])
  }
};
</script>

<style lang="less" scoped>
@import '../../../../common/less/common';
</style>
