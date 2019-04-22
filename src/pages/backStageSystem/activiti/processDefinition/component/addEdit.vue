<template>
    <div class="lzy-form-wrapper" v-if="isAddEditShow" v-loading.lock="isLoading">
      <right-nav-layout
        :btnList="operateBtns"
        :breadcrumbs="navigateMenus"
        ref="rightNavLayout"
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
                <span style="color: red;">*</span> 名称：
              </th>
              <td>
                <el-form-item label="" prop="name" :rules="[$validate.Required]">
                  <el-input class="form-input" v-model="formData.name" :readonly="readOnly"></el-input>
                </el-form-item>
              </td>
              <th>
                <span style="color: red;">*</span> 类别：
              </th>
              <td>
                <el-form-item label="" prop="category" :rules="[$validate.Required]">
                  <el-input class="form-input" v-model="formData.category" :readonly="true"></el-input>
                </el-form-item>
              </td>
            </tr>
            <tr>
              <th>
                <span style="color: red;">*</span> 编码：
              </th>
              <td>
                <el-form-item label="" prop="modelKey" :rules="[$validate.Required]">
                  <el-input class="form-input" v-model="formData.modelKey" :readonly="readOnly"></el-input>
                </el-form-item>
              </td>
              <th>
                <span style="color: red;">*</span> 说明：
              </th>
              <td>
                <el-form-item label="" prop="description" :rules="[$validate.Required]">
                  <el-input class="form-input" v-model="formData.description" :readonly="readOnly"></el-input>
                </el-form-item>
              </td>
            </tr>
            <tr v-if="isImgShow">
              <th>
                流程图：
              </th>
              <td colspan="3">
                <iframe :src="flowChartUrl" width="800" height="300" scrolling="no"></iframe>
              </td>
            </tr>
          </table>
          <el-input ref="flowInput" id="flowInput" type="hidden"></el-input>
          <a id="flowClick" type="hidden"></a>
        </el-form>
        <v-dialog title="流程图编辑器" :visible.sync="isDesignerUrlShow" width="80%" @close="handleClose">
          <iframe :src="designerUrl" width="1480" height="850"></iframe>
        </v-dialog>
      </div>
    </div>
</template>

<script type="text/ecmascript-6">
import rightNavLayout from '@/components/topToolBar';
import { mapGetters } from 'vuex';
import dialog from '@/components/dialog';
export default {
  components: {
    rightNavLayout,
    'v-dialog': dialog
  },
  data ()
  {
    return {
      flowChartUrl: '',
      isDesignerUrlShow: false,
      designerUrl: ''
    };
  },
  methods: {
    /**
     * 返回
     * @author   yekuncai
     * @date     2018/10/18
     */
    returnFn ()
    {
      this.$store.dispatch('backStageSystem/_PROCESSDEFINITION/returnFn', '');
    },

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
        this.$store.dispatch('backStageSystem/_PROCESSDEFINITION/save', this.formData);
      });
    },
    /**
     * 关闭弹框时触发
     * @author   yekuncai
     * @date     2019/1/2
     */
    handleClose ()
    {
      this.$store.dispatch('backStageSystem/_PROCESSDEFINITION/returnFn', '');
    },
    /**
     * 提交
     * @author   yekuncai
     * @date     2019/1/17
     */
    submitFn ()
    {
      this.$refs['ctForm'].validate((valid) =>
      {
        if (valid)
        {
          this.isDesignerUrlShow = true;
          let category = this.formData.category;
          let description = this.formData.description;
          let modelKey = this.formData.modelKey;
          let name = this.formData.name;
          let parentId = this.formData.parentId;
          let url = `/bpm/designer.html?category=${category}&description=${description}&modelKey=${modelKey}&name=${name}&parentId=${parentId}`;
          this.designerUrl = encodeURI(url);
        }
      });
    }
  },
  computed: {
    ...mapGetters('backStageSystem/_PROCESSDEFINITION', [
      'marginLeft',
      'formData',
      'navigateMenus',
      'operateBtns',
      'readOnly',
      'isImgShow',
      'isAddEditShow',
      'isLoading'
    ])
  },
  watch: {
    isImgShow (newValue)
    {
      if (newValue)
      {
        let params = 'processDefinitionKey=' + this.formData.modelKey;
        this.flowChartUrl = `/bpm/flowChart.html?${params}`;
      }
    }
  }
};
</script>

<style lang="less" scoped>
@import '../../../../../common/less/common';
</style>
