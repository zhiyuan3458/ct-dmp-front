<template>
  <!-- 模态框 -->
  <transition name="fade">
    <div class="lzy-form-wrapper" v-if="isAddEditShow">
      <right-nav-layout
        :btnList="operateBtns"
        :breadcrumbs="navigateMenus"
      ></right-nav-layout>
      <div class="form-container">
            <el-form :model="formData" ref="ctForm" v-loading="metaData.loading">
              <table class="form-table" width="100%">
                <colgroup>
                  <col width="12%"/>
                  <col width="38%"/>
                  <col width="12%"/>
                  <col width="38%"/>
                </colgroup>
                <tr>
                  <th>
                    <span style="color: red;">*</span>编码：
                  </th>
                  <td>
                    <el-form-item label="" prop="code"
                    :rules="[$validate.Str26,$validate.Required]">
                      <el-input class="form-input" v-model="formData.code"></el-input>
                    </el-form-item>
                  </td>
                  <th>
                    <span style="color: red;">*</span>简称：
                  </th>
                  <td>
                    <el-form-item label="" prop="name"
                    :rules="[$validate.Required]">
                      <el-input class="form-input" v-model="formData.name"></el-input>
                    </el-form-item>
                  </td>
                </tr>
                <tr>
                  <th>
                    <span style="color: red;">*</span>url路径：
                  </th>
                  <td>
                    <el-form-item label="" prop="url"
                                  :rules="[$validate.Required]">
                      <el-input class="form-input" v-model="formData.url"></el-input>
                    </el-form-item>
                  </td>
                  <th>
                    图标：
                  </th>
                  <td>
                    <icon-select
                      v-if="isAddEditShow"
                      v-model="formData.imgName"
                      :row="4"
                      :column="5"
                    >
                    </icon-select>
                  </td>
                </tr>
                <tr>
                  <th>创建日期：</th>
                  <td>
                    <el-form-item label="" prop="createDate">
                      <el-date-picker
                        v-model="formData.createDate"
                        type="date"
                        value-format="yyyy-MM-dd"
                        :rules="[$validate.Required]"
                       >
                      </el-date-picker>
                    </el-form-item>
                  </td>
                  <th><span style="color: red;">*</span>部门类型：</th>
                  <td>
                    <el-form-item label="" prop="type"
                                  :rules="[$validate.Required]">
                      <el-input class="form-input" v-model="formData.type"></el-input>
                    </el-form-item>
                  </td>
                </tr>
              </table>
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
            this.$store.dispatch('backStageSystem/_FACILITYMANAGE/save', obj).then(() =>
            {
              this.$message({
                message: '保存成功!',
                type: 'success',
                duration: 3000
              });
            });
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
    ...mapGetters('backStageSystem/_FACILITYMANAGE', [
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
