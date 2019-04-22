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
              <col width="17%"/>
              <col width="33%"/>
              <col width="17%"/>
              <col width="33%"/>
            </colgroup>
            <tr>
              <th>
                <span style="color: red;">*</span> 编码：
              </th>
              <td>
                <el-form-item label="" prop="code" :rules="[$validate.Required]">
                  <el-input class="form-input" v-model="formData.code"></el-input>
                </el-form-item>
              </td>
              <th>
                <span style="color: red;">*</span> 名称：
              </th>
              <td>
                <el-form-item label="" prop="name" :rules="[$validate.Required]">
                  <el-input class="form-input" v-model="formData.name"></el-input>
                </el-form-item>
              </td>
            </tr>
            <tr>
              <th>
                <span style="color: red;">*</span>有效：
              </th>
              <td>
                <el-form-item label="" prop="effectiveFlag">
                  <el-radio-group v-model="formData.effectiveFlag">
                    <el-radio label="1">是</el-radio>
                    <el-radio label="0">否</el-radio>
                  </el-radio-group>
                </el-form-item>
              </td>
              <th>图标：</th>
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
              <th>
                <span style="color: red;">*</span>是否为子系统：
              </th>
              <td>
                <el-form-item label="" prop="systemFlag">
                  <el-radio-group v-model="formData.systemFlag" @change="systemRadioCheck">
                    <el-radio label="1">是</el-radio>
                    <el-radio label="0">否</el-radio>
                  </el-radio-group>
                </el-form-item>
              </td>
              <th>
                <span style="color: red;">*</span>是否为模块：
              </th>
              <td>
                <el-form-item label="" prop="moduleFlag">
                  <el-radio-group v-model="formData.moduleFlag" @change="moduleRadioCheck">
                    <el-radio label="1">是</el-radio>
                    <el-radio label="0">否</el-radio>
                  </el-radio-group>
                </el-form-item>
              </td>
            </tr>
            <tr>
              <th colspan="1">(模块)生成页面菜单：</th>
              <td colspan="3">
                <form-component
                  v-model="formData.createPagesMenu"
                  type="checkbox"
                  :readOnly="false"
                  dictionaryCode="menuPage"
                ></form-component>
              </td>
            </tr>
            <tr>
              <th>url：</th>
              <td colspan="3">
                <el-form-item label="" prop="url">
                  <el-input class="form-input menu-input" v-model="formData.url"></el-input>
                </el-form-item>
              </td>
            </tr>
            <tr>
              <th>(页面)权限操作按钮：</th>
              <td colspan="3">
                <el-form-item label="" prop="operateBtns">
                  <form-component
                    v-model="formData.operateBtns"
                    type="checkbox"
                    :readOnly="false"
                    dictionaryCode="operateBtn"
                  ></form-component>
                </el-form-item>
              </td>
            </tr>
            <tr>
              <th>(表格)权限操作按钮：</th>
              <td colspan="3">
                <el-form-item label="" prop="tableBtns">
                  <form-component
                    v-model="formData.tableBtns"
                    type="checkbox"
                    :readOnly="false"
                    dictionaryCode="tableBtn"
                  ></form-component>
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
        iconProps: {
          icon: 'iconKey',
          name: 'iconName'
        },
        treeTool: null,
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
            let obj;
            this.formData.tableBtns = this.formData.tableBtns;
            this.formData.operateBtns = this.formData.operateBtns;
            this.formData.createPagesMenu = this.formData.createPagesMenu;
            obj = this.formData;
            this.$store.dispatch('backStageSystem/_MENU/save', obj);
          }
          else
          {
            return false;
          }
        });
      });
    },
    systemRadioCheck (val)
    {
      if (val === '1')
      {
        this.formData.moduleFlag = '0';
      }
    },
    moduleRadioCheck (val)
    {
      if (val === '1')
      {
        this.formData.systemFlag = '0';
      }
    }
  },
  computed: {
    ...mapGetters('backStageSystem/_MENU', [
      'formData',
      'isAddEditShow',
      'navigateMenus',
      'operateBtns'
    ])
  }
};
</script>

<style lang="less" scoped>
@import '../../../../common/less/common';
.menu-input {
  width: 100%!important;
}
</style>
