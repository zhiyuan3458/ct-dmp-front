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
                <span style="color: red;">*</span> 编码(类名称)：
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
            <tr v-show="!Number(formData.moduleFlag) && !Number(formData.systemFlag)">
              <th>子系统：</th>
              <td>
                <el-form-item label="" prop="systemId">
                  <el-select v-model="formData.systemId">
                    <el-option
                      v-for="item in systemList"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id">
                    </el-option>
                  </el-select>
                </el-form-item>
              </td>
              <th>表名称</th>
              <td>
                <el-form-item label="" prop="tableName">
                  <ztree-select
                    v-model="formData.tableName"
                    :ztreeList="ztreeList"
                    :flag = "false"
                    @input="changeTable"
                  ></ztree-select>
                </el-form-item>
              </td>
            </tr>
            <tr v-show="!Number(formData.moduleFlag) && !Number(formData.systemFlag)">
              <th>是否更新字段：</th>
              <td>
                <el-form-item label="" prop="isRefresh">
                  <el-radio-group v-model="formData.isRefresh">
                    <el-radio label="1">是</el-radio>
                    <el-radio label="0">否</el-radio>
                  </el-radio-group>
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
import TreeTool from '@/class/ztreeTool/treeTool';
import { mapGetters } from 'vuex';
import rightNavLayout from '@/components/topToolBar';
import iconSelect from '@/components/iconSelect';
import { postHttp } from '@/api/util';
import { getPreBySystemName } from '@/common/js/urlPrifix';
import ztreeSelect from '@/components/ztreeSelect';
export default {
  components: {
    rightNavLayout,
    iconSelect,
    ztreeSelect
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
      },
      ztreeList: [],
      propertys: ''
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
              propertys: this.propertys
            });
            this.$store.dispatch('backStageSystem/_RELATEDTABLE/save', obj);
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
    },
    changeSystem (value)
    {
      let item = this.systemList.find(item => item.id === value);
      let pre = getPreBySystemName(item.code);
      if (pre.length <= 0)
      {
        return;
      }
      postHttp(pre + `/sys/common/getTable`, { systemId: value, table: this.formData.tableName }).then(res =>
      {
        this.ztreeList = res.data.data;
      });
    },
    changeTable (value)
    {
      let item = this.ztreeList.find(item => item.id === value);
      this.propertys = item ? item.actionUrl : '';
    }
  },
  computed: {
    ...mapGetters('backStageSystem/_RELATEDTABLE', [
      'formData',
      'isAddEditShow',
      'navigateMenus',
      'operateBtns',
      'formMenuPages',
      'formOperateBtns',
      'formTableBtns',
      'systemList'
    ])
  },
  watch: {
    userTree (newValue, oldValue)
    {
      setTimeout(() =>
      {
        if (newValue.length !== 0)
        {
          this.metaData.treeTool = new TreeTool('userTree', this.userTree, true);
          this.metaData.treeTool.setCheck();
        }
      }, 20);
    },
    'formData.systemId':
    {
      handler (newVal)
      {
        if (newVal)
        {
          this.changeSystem(newVal);
        }
        else
        {
          this.ztreeList = [];
        }
      },
      deep: true
    }
  }
};
</script>

<style lang="less" scoped>
  @import '../../../../common/less/common';
</style>
