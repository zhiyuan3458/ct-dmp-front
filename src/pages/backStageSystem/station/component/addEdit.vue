<template>
    <div class="lzy-form-wrapper" v-if="isAddEditShow">
      <right-nav-layout
        :btnList="operateBtns"
        :breadcrumbs="navigateMenus"
      ></right-nav-layout>
      <div class="form-container">
        <el-form :model="formData" ref="ctForm" v-loading="isLoading">
          <table class="form-table" width="100%">
            <colgroup>
              <col width="12%"/>
              <col width="38%"/>
              <col width="12%"/>
              <col width="38%"/>
            </colgroup>
            <tr>
              <th>
                <span style="color: red;">*</span> 站点导航图标：
              </th>
              <td height="150" class="upload-td">
                <uploader v-model="formData.iconSessionId" uploadUrl="/api/upload/sys/at/attachment/uploadSystemIcon" :multiple="false" accept="image/*">
                </uploader>
              </td>
              <th>
                <span style="color: red;">*</span> 谷歌浏览器：
              </th>
              <td height="150" class="upload-td">
                <uploader v-model="formData.chromeSessionId" uploadUrl="/api/upload/sys/at/attachment/uploadSystemIcon" :multiple="false" accept="application/octet-stream">
                </uploader>
              </td>
            </tr>
            <tr>
              <th>
                <span style="color: red;">*</span> 站点名称：
              </th>
              <td>
                <el-form-item label="" prop="stationName" :rules="[$validate.Required]">
                  <el-input class="form-input system-title-input" v-model="formData.stationName" placeholder="请填写站点名称"></el-input>
                </el-form-item>
              </td>
              <th>
                <span style="color: red;">*</span> 维护公司：
              </th>
              <td>
                <el-form-item label="" prop="maintenanceCompany" :rules="[$validate.Required]">
                  <el-input class="form-input system-title-input" v-model="formData.maintenanceCompany" placeholder="请填写维护公司"></el-input>
                </el-form-item>
              </td>
            </tr>
            <tr>
              <th>
                <span style="color: red;">*</span> 维护人员名称：
              </th>
              <td>
                <el-form-item label="" prop="maintenanceUser" :rules="[$validate.Required]">
                  <el-input class="form-input system-title-input" v-model="formData.maintenanceUser" placeholder="请填写维护人员名称"></el-input>
                </el-form-item>
              </td>
              <th>
                <span style="color: red;">*</span> 联系电话：
              </th>
              <td>
                <el-form-item label="" prop="phone" :rules="[$validate.Mobile]">
                  <el-input class="form-input system-title-input" v-model="formData.phone" placeholder="请填写联系电话"></el-input>
                </el-form-item>
              </td>
            </tr>
            <tr>
              <th>
                样式设置：
              </th>
              <td colspan="3">
                <el-form-item label="" prop="styleSettings">
                  <el-input class="form-input system-title-input" v-model="formData.styleSettings" placeholder="请填写样式设置"></el-input>
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
import uploader from '@/components/uploader';
export default {
  components: {
    rightNavLayout,
    uploader
  },
  data ()
  {
    return {
      icon: false,
      chrome: false
    };
  },
  methods: {
    /**
     * 表单提交
     * @author   yekuncai
     * @date     2018/10/30
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
            this.$store.dispatch('backStageSystem/_STATION/save', this.formData);
            localStorage.setItem('stationName', this.formData.stationName);
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
    ...mapGetters('backStageSystem/_STATION', [
      'formData',
      'isAddEditShow',
      'navigateMenus',
      'operateBtns',
      'isLoading'
    ])
  },
  created ()
  {
    this.$store.dispatch('backStageSystem/_STATION/edit', '');
  }
};
</script>

<style lang="less" scoped>
@import '../../../../common/less/common';
.system-title-input {
  width: 100%!important;
}
</style>
