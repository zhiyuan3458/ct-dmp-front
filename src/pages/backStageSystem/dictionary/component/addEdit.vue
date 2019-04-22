<template>
    <div class="lzy-form-wrapper" v-if="isAddEditShow">
      <right-nav-layout
        :btnList="operateBtns"
        :breadcrumbs="navigateMenus"
        ref="rightNavLayout"
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
                <span style="color: red;">*</span> 编码值：
              </th>
              <td>
                <el-form-item label="" prop="value" :rules="[$validate.Required]">
                  <el-input :class="readOnly ? 'readonly-input' : ''" class="form-input" v-model="formData.value" :readonly="readOnly" placeholder="请填写编码"></el-input>
                </el-form-item>
              </td>
              <th>
                <span style="color: red;">*</span> 名称：
              </th>
              <td>
                <el-form-item label="" prop="name" :rules="[$validate.Required]">
                  <el-input class="form-input" v-model="formData.name" :readonly="readOnly"></el-input>
                </el-form-item>
              </td>
            </tr>
            <tr>
              <th>
                <span style="color: red;">*</span> 隐藏值：
              </th>
              <td>
                <el-form-item label="" prop="displayValue" :rules="[$validate.Required]">
                  <el-input class="form-input" v-model="formData.displayValue" :readonly="readOnly" placeholder="请填写"></el-input>
                </el-form-item>
              </td>
              <th>
                <span style="color: red;">*</span> 显示名称：
              </th>
              <td>
                <el-form-item label="" prop="displayName" :rules="[$validate.Required]">
                  <el-input class="form-input" v-model="formData.displayName" :readonly="readOnly" placeholder="请填写"></el-input>
                </el-form-item>
              </td>
            </tr>
            <tr>
              <th>
                类型：
              </th>
              <td>
                <el-form-item label="" prop="type">
                  <span>{{this.formData.type === '1' ? '目录结构节点' : '数据内容节点'}}</span>
                </el-form-item>
              </td>
              <th>
                <span style="color: red;">*</span>有效：
              </th>
              <td>
                <el-form-item label="" prop="effectiveFlag" :rules="[$validate.Required]">
                  <el-radio :disabled="readOnly" v-model="formData.effectiveFlag" label="1">是</el-radio>
                  <el-radio :disabled="readOnly" v-model="formData.effectiveFlag" label="0">否</el-radio>
                </el-form-item>
              </td>
            </tr>
            <tr>
              <th>
                 颜色：
              </th>
              <td>
                <el-form-item label="" prop="color">
                  <el-input :disabled="readOnly" class="form-input color-input" v-model="formData.color"  placeholder="请填写颜色编码"></el-input>
                  <el-color-picker v-model="formData.color" size="mini" :predefine="style.predefineColors"></el-color-picker>
                </el-form-item>
              </td>
              <th>
                 图标：
              </th>
              <td>
                <icon-select
                  v-if="isAddEditShow"
                  v-model="formData.icon"
                  :row="4"
                  :column="5"
                >
                </icon-select>
              </td>
            </tr>
            <tr>
              <th>
                 备注：
              </th>
              <td colspan="3">
                <el-form-item label="" prop="memo">
                  <el-input
                    :readonly="readOnly"
                    type="textarea"
                    :rows="5"
                    placeholder="请输入备注"
                    v-model="formData.memo">
                  </el-input>
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
import iconSelect from '@/components/iconSelect';
export default {
  components: {
    rightNavLayout,
    iconSelect
  },

  data ()
  {
    return {
      style: {
        predefineColors: [
          '#ff4500',
          '#ff8c00',
          '#ffd700',
          '#90ee90',
          '#00ced1',
          '#1e90ff',
          '#c71585',
          '#ffffff',
          '#666666',
          '#000000'
        ]
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
            // id为空说明是新增的
            if (this.formData.id === '')
            {
            }
            else
            {
              obj = this.formData;
            }
            this.$store.dispatch('backStageSystem/_DICTIONARY/save', obj);
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
     * @date     2018/10/16
     */
    returnFn ()
    {
      this.$store.dispatch('backStageSystem/_DICTIONARY/showList', this.formData.value);
    }
  },
  computed: {
    ...mapGetters('backStageSystem/_DICTIONARY', [
      'formData',
      'readOnly',
      'navigateMenus',
      'operateBtns',
      'saveOrUpdateId',
      'isAddEditShow',
      'isLoading'
    ])
  },
  watch: {
    saveOrUpdateId (newValue, oldValue)
    {
      if (newValue !== null && newValue !== '')
      { // 刷新表单
        this.$store.dispatch('backStageSystem/_DICTIONARY/edit', {id: newValue});
      }
    }
  }
};
</script>

<style lang="less">
@import '../../../../common/less/common';
  .el-color-picker--mini{
    float: left;
    margin-top: -2px;
  }
  /deep/ .el-form-item {
    margin-bottom: 0!important;
  }
  .el-color-picker__trigger{
    border: none;
    width: 30px;
    height: 30px;
  }
  .form-input{
    float: left;
  }
  .color-input {
    width: 92%!important;
  }
</style>
