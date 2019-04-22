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
            <th class="form-header" colspan="6">
              <h2 style="text-align: center">公告通知表</h2>
            </th>
          </tr>
          <tr>
            <th><span style="color: red;">*</span>主题</th>
            <td>
              <el-form-item label="" prop="subject" :rules="[$validate.Required]">
                <el-input class="form-input" v-model="formData.subject" :readonly="readOnly"></el-input>
              </el-form-item>
            </td>
            <th>优先级</th>
            <td>
              <el-form-item label="" prop="urgency">
                <el-input class="form-input" v-model="formData.urgency" :readonly="readOnly"></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <th>所属模块</th>
            <td>
              <el-form-item label="" prop="category">
                <el-input class="form-input" v-model="formData.category" readonly="false"></el-input>
              </el-form-item>
            </td>
            <th><span style="color: red;">*</span>读者</th>
            <td>
              <el-form-item label="" prop="reader">
                <ztree-select
                  v-model="formData.reader"
                  :ztreeList="userTree"
                  :readOnly="readOnly"
                ></ztree-select>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <th><span style="color: red;">*</span>内容</th>
            <td colspan="3">
              <el-form-item label="" prop="content" :rules="[$validate.Required]">
                <el-input type="textarea" cols="50" rows="2" maxlength="100" placeholder="请输入内容"
                          v-model="formData.content" :readonly="readOnly">
                </el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <th>附件</th>
            <td colspan="3" height="150" class="upload-td">
              <el-form-item label="" prop="sessionId">
              <uploader v-model="formData.sessionId" :multiple="false">
              </uploader>
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
import ztreeSelect from '@/components/ztreeSelect';
import uploader from '@/components/uploader/index';
export default {
  components: {
    rightNavLayout,
    ztreeSelect,
    uploader
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
            this.$store.dispatch('backStageSystem/_NOTICE/save', obj);
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
      let obj = { extraCondition: this.extraCondition, category: this.category };
      this.$store.dispatch('backStageSystem/_NOTICE/showList', obj);
    }
  },
  computed: {
    ...mapGetters('backStageSystem/_NOTICE/', [
      'readOnly',
      'formData',
      'navigateMenus',
      'operateBtns',
      'userTree',
      'category',
      'extraCondition',
      'isAddEditShow',
      'isLoading'
    ])
  }
};
</script>

<style lang="less" scoped>
@import '../../../../common/less/common';
</style>
