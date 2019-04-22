<template>
  <!-- 模态框 -->
  <transition name="fade">
    <div class="lzy-form-wrapper" v-if="isAddEditDetailShow">
      <right-nav-layout
        :btnList="operateBtns"
        :breadcrumbs="navigateMenus"
      ></right-nav-layout>
      <div class="form-container">
        <el-form :model="formDataDetail" ref="ctForm" v-loading="metaData.loading">
          <table class="form-table" width="100%">
            <colgroup>
              <col width="17%"/>
              <col width="33%"/>
              <col width="17%"/>
              <col width="33%"/>
            </colgroup>
            <tr>
              <th>
                <span style="color: red;">*</span> 列名称编码：
              </th>
              <td>
                <el-form-item label="" prop="code" :rules="[$validate.Required]">
                  <el-input class="form-input" v-model="formDataDetail.code" :readonly="readOnly"></el-input>
                </el-form-item>
              </td>
              <th>
                <span style="color: red;">*</span> 列名称：
              </th>
              <td>
                <el-form-item label="" prop="name" :rules="[$validate.Required]">
                  <el-input class="form-input" v-model="formDataDetail.name" :readonly="readOnly"></el-input>
                </el-form-item>
              </td>
            </tr>
            <tr>
              <th>
                <span style="color: red;">*</span>类型：
              </th>
              <td>
                <el-form-item label="" prop="type"
                :rules="[{ required: true, message: '请选择类型', trigger: 'change' }]">
                  <form-component
                    v-model="formDataDetail.type"
                    type="select"
                    dictionaryCode="htmlTypeOfRelatedTable"
                  ></form-component>
                </el-form-item>
              </td>
              <th><span style="color: red;">*</span>验证类型：</th>
              <td>
                <el-form-item label="" prop="validateType"
                :rules="[{ required: true, message: '请选择验证类型', trigger: 'change' }]">
                  <form-component
                    v-model="formDataDetail.validateType"
                    type="radio"
                    dictionaryCode="validateType"
                  ></form-component>
                </el-form-item>
              </td>
            </tr>
            <tr>
              <th>
                数据字典编码：
              </th>
              <td>
                <el-form-item label="" prop="codeValue">
                    <el-input class="form-input" v-model="formDataDetail.codeValue" :readonly="readOnly"></el-input>
                </el-form-item>
              </td>
              <th>
                是否隐藏：
              </th>
              <td>
                <el-form-item label="" prop="isHide">
                  <form-component
                  v-model="formDataDetail.isHide"
                  type="radio"
                  dictionaryCode="yesNo">
                  </form-component>
                </el-form-item>
              </td>
            </tr>
            <tr>
              <th>
                格式化：
              </th>
              <td>
                <el-form-item label="" prop="format">
                  <el-input class="form-input" v-model="formDataDetail.format" :readonly="readOnly"></el-input>
                </el-form-item>
              </td>
              <th>
                是否主键：
              </th>
              <td>
                <el-form-item label="" prop="isPrimaryKey">
                  <form-component
                    v-model="formDataDetail.isPrimaryKey"
                    type="radio"
                    dictionaryCode="yesNo">
                  </form-component>
                </el-form-item>
              </td>
            </tr>
            <tr>
              <th>
                是否必填：
              </th>
              <td>
                <el-form-item label="" prop="isRequired">
                  <form-component
                    v-model="formDataDetail.isRequired"
                    type="radio"
                    dictionaryCode="yesNo">
                  </form-component>
                </el-form-item>
              </td>
              <th>
                显示"请输入..."：
              </th>
              <td>
                <el-form-item label="" prop="isShowSelectTips">
                  <form-component
                    v-model="formDataDetail.isShowSelectTips"
                    type="radio"
                    dictionaryCode="yesNo">
                  </form-component>
                </el-form-item>
              </td>
            </tr>
            <tr>
              <th>
                列宽：
              </th>
              <td>
                <el-form-item label="" prop="colWidth">
                  <el-input class="form-input" v-model="formDataDetail.colWidth" :readonly="readOnly"></el-input>
                </el-form-item>
              </td>
              <th>
                为"0"时显示空：
              </th>
              <td>
                <el-form-item label="" prop="isEmptyWhenZero">
                  <form-component
                    v-model="formDataDetail.isEmptyWhenZero"
                    type="radio"
                    dictionaryCode="yesNo">
                  </form-component>
                </el-form-item>
              </td>
            </tr>
            <tr>
              <th>
                累加到：
              </th>
              <td>
                <el-form-item label="" prop="sumToFormFieldName">
                  <el-input class="form-input" v-model="formDataDetail.sumToFormFieldName" :readonly="readOnly"></el-input>
                </el-form-item>
              </td>
              <th>
                onChange函数：
              </th>
              <td>
                <el-form-item label="" prop="onChangeFn">
                  <el-input class="form-input" v-model="formDataDetail.onChangeFn" :readonly="readOnly"></el-input>
                </el-form-item>
              </td>
            </tr>
            <tr>
              <th>
                是否添加到验证信息：
              </th>
              <td>
                <el-form-item label="" prop="isAddValidateInfo">
                  <form-component
                    v-model="formDataDetail.isAddValidateInfo"
                    type="radio"
                    dictionaryCode="yesNo">
                  </form-component>
                </el-form-item>
              </td>
              <th>
                是否只读：
              </th>
              <td>
                <el-form-item label="" prop="isReadOnly">
                  <form-component
                    v-model="formDataDetail.isReadOnly"
                    type="radio"
                    dictionaryCode="yesNo">
                  </form-component>
                </el-form-item>
              </td>
            </tr>
            <tr>
              <th>
                默认值(原值为空时显示)：
              </th>
              <td>
                <el-form-item label="" prop="defaultValue">
                  <el-input class="form-input" v-model="formDataDetail.defaultValue" :readonly="readOnly"></el-input>
                </el-form-item>
              </td>
              <th>
                默认值是否直接覆盖原值：
              </th>
              <td>
                <el-form-item label="" prop="isCoverOldValue">
                  <form-component
                    v-model="formDataDetail.isCoverOldValue"
                    type="radio"
                    dictionaryCode="yesNo">
                  </form-component>
                </el-form-item>
              </td>
            </tr>
            <tr>
              <th>
                父表头（存在多个以“，”隔开）：
              </th>
              <td>
                <el-form-item label="" prop="parent">
                  <el-input class="form-input" v-model="formDataDetail.parent" :readonly="readOnly"></el-input>
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
import iconSelect from '@/components/iconSelect';
import formComponent from '@/components/formComponent';
export default {
  components: {
    rightNavLayout,
    iconSelect,
    formComponent
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
            let obj = {};
            obj = this.formDataDetail;
            this.$store.dispatch('backStageSystem/_RELATEDTABLE/saveDetail', obj);
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
     * @date     2018/11/29
     */
    returnFn ()
    {
      this.$store.dispatch('backStageSystem/_RELATEDTABLE/showList', {id: this.formDataDetail.relatedTableId});
    }
  },
  computed: {
    ...mapGetters('backStageSystem/_RELATEDTABLE', [
      'formDataDetail',
      'isAddEditDetailShow',
      'navigateMenus',
      'operateBtns',
      'readOnly'
    ])
  }
};
</script>

<style lang="less" scoped>
@import '../../../../common/less/common';
</style>
