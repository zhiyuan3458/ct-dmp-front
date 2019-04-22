<template>
  <!-- 模态框 -->
  <transition name="fade">
    <div class="lzy-form-wrapper" v-if="isAddEditShow">
      <right-nav-layout
        :btnList="operateBtns"
        :breadcrumbs="navigateMenus"
      ></right-nav-layout>
      <div class="form-container">
        <el-tabs type="border-card">
          <el-tab-pane label="基本信息">
            <el-form :model="formData" ref="ctForm" v-loading="metaData.loading">
              <el-input class="form-input" v-model="formData.level" v-show="false"></el-input>
              <table class="form-table" width="100%">
                <colgroup>
                  <col width="12%"/>
                  <col width="38%"/>
                  <col width="12%"/>
                  <col width="38%"/>
                </colgroup>
                <tr>
                  <th>
                    <span style="color: red;">*</span>序号：
                  </th>
                  <td>
                    <el-form-item label="" prop="code"
                    :rules="[$validate.Required]">
                      <el-input class="form-input" v-model="formData.code"></el-input>
                    </el-form-item>
                  </td>
                  <th>
                    <span style="color: red;">*</span>名称：
                  </th>
                  <td>
                    <el-form-item label="" prop="name"
                    :rules="[$validate.Required]">
                      <el-input class="form-input" v-model="formData.name"></el-input>
                    </el-form-item>
                  </td>
                </tr>
                <tr v-if="formData.level==='1'">
                  <th>年份：</th>
                  <td>
                    <el-form-item label="" prop="year">
                      <el-input class="form-input" v-model="formData.year"></el-input>
                    </el-form-item>
                  </td>
                  <th>图标：</th>
                  <td>
                    <icon-select
                      v-if="isAddEditShow"
                      v-model="formData.iconSkin"
                      :row="3"
                      :column="6"
                    ></icon-select>
                  </td>
                </tr>
                <tr v-if="formData.level==='1'">
                  <th>附件</th>
                  <td colspan="3" height="190" class="upload-td">
                    <uploader v-model="formData.sessionId" :readOnly="readOnly">
                    </uploader>
                  </td>
                </tr>
                <tr v-if ="formData.level !== '1'">
                  <th>类名：</th>
                  <td>
                    <el-form-item label="" prop="className">
                      <el-input class="form-input" v-model="formData.className"></el-input>
                    </el-form-item>
                  </td>
                  <th>图标：</th>
                  <td>
                    <icon-select
                      v-if="isAddEditShow"
                      v-model="formData.iconSkin"
                      :row="3"
                      :column="6"
                    ></icon-select>
                  </td>
                </tr>
                <tr v-if ="formData.level !== '1'">
                  <th>url：</th>
                  <td colspan="3">
                    <el-form-item label="" prop="url">
                      <el-input
                        type="textarea"
                        class="form-input"
                        rows="5"
                        placeholder="请输入内容"
                        v-model="formData.url">
                      </el-input>
                    </el-form-item>
                  </td>
                </tr>
                <tr>
                  <th>备注：</th>
                  <td colspan="3">
                    <el-form-item label="" prop="memo">
                      <el-input
                        type="textarea"
                        class="form-input"
                        rows="8"
                        placeholder="请输入内容"
                        v-model="formData.memo">
                      </el-input>
                    </el-form-item>
                  </td>
                </tr>
              </table>
            </el-form>
          </el-tab-pane>
        </el-tabs>
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
            this.$store.dispatch('intelligentMaintenanceManagementSystem/_MODULEMANAGE/save', obj);
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
      'isAddEditShow',
      'navigateMenus',
      'operateBtns'
    ])
  }
};
</script>

<style lang="less" scoped>
@import '../../../../common/less/common';
</style>
