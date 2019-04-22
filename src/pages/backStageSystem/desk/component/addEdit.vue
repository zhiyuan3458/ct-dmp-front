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
              <th><span style="color: red;">*</span>名称：</th>
              <td>
                <el-form-item label="" prop="title" :rules="[$validate.Required]">
                  <el-input class="form-input" v-model="formData.title"></el-input>
                </el-form-item>
              </td>
              <th><span style="color: red;">*</span>类型：</th>
              <td>
                <el-form-item label="" prop="type" :rules="[$validate.Required]">
                  <el-form-item label="" prop="type">
                    <form-component
                      v-model="formData.type"
                      type="select"
                      dictionaryCode="echartsType"
                    ></form-component>
                  </el-form-item>
                </el-form-item>
              </td>
            </tr>
            <tr>
              <th>默认x：</th>
              <td>
                <el-form-item label="" prop="defaultX" :rules="[$validate.Number]">
                  <el-input class="form-input" v-model="formData.defaultX"></el-input>
                </el-form-item>
              </td>
              <th>默认y：</th>
              <td>
                <el-form-item label="" prop="defaultY" :rules="[$validate.Number]">
                  <el-input class="form-input" v-model="formData.defaultY"></el-input>
                </el-form-item>
              </td>
            </tr>
            <tr>
              <th>默认w：</th>
              <td>
                <el-form-item label="" prop="defaultW" :rules="[$validate.Number]">
                  <el-input class="form-input" v-model="formData.defaultW"></el-input>
                </el-form-item>
              </td>
              <th>默认h：</th>
              <td>
                <el-form-item label="" prop="defaultH" :rules="[$validate.Number]">
                  <el-input class="form-input" v-model="formData.defaultH"></el-input>
                </el-form-item>
              </td>
            </tr>
            <tr>
              <th><span style="color: red;">*</span>url：</th>
              <td>
                <el-form-item label="" prop="url" :rules="[$validate.Required]">
                  <el-input class="form-input" v-model="formData.url"></el-input>
                </el-form-item>
              </td>
            </tr>
            <tr>
              <th>
                备注：
              </th>
              <td colspan="3">
                <el-form-item label="" prop="memo">
                  <el-input
                    type="textarea"
                    :rows="5"
                    placeholder="请输入备注"
                    v-model="formData.memo">
                  </el-input>
                </el-form-item>
              </td>
            </tr>
            <tr>
              <th>附件</th>
              <td colspan="3" height="190" class="upload-td">
                <uploader v-model="formData.sessionId">
                </uploader>
              </td>
            </tr>
            <el-input class="form-input" v-model="formData.sortOrder" v-show="false"></el-input>
          </table>
        </el-form>
      </div>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
import { mapGetters } from 'vuex';
import rightNavLayout from '@/components/topToolBar';
import uploader from '@/components/uploader';
import formComponent from '@/components/formComponent';
export default {
  components: {
    rightNavLayout,
    uploader,
    formComponent
  },
  data ()
  {
    return {
      metaData: {
        treeTool: null,
        loading: false
      },
      toolShow: true
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
            let obj = Object.assign({}, this.formData, {
              systemId: this.systemId
            });
            this.$store.dispatch('backStageSystem/_DESK/save', obj).then();
          }
          else
          {
            this.$message('数据填写格式有误!');
            return false;
          }
        });
      });
    },
    /**
     * 返回
     * @author   liangyi
     * @date     2018/11/1
     */
    returnFn ()
    {
      this.$store.dispatch('backStageSystem/_DESK/showList', this.systemId);
    }
  },
  computed: {
    ...mapGetters('backStageSystem/_DESK', [
      'systemId',
      'formData',
      'isAddEditShow',
      'menuPages',
      'navigateMenus',
      'operateBtns'
    ])
  }
};
</script>

<style lang="less" scoped>
@import '../../../../common/less/common';
</style>
