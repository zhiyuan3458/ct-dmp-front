<template>
  <div class="lzy-form-wrapper">
    <right-nav-layout
      :btnList="operateBtns"
      :breadcrumbs="navigateMenus"
    ></right-nav-layout>
    <div class="form-container">
      <el-form :model="formData" ref="ctForm" v-loading="metaData.loading">
        <table class="form-table" width="100%">
          <colgroup>
            <col width="10%"/>
            <col width="15%"/>
            <col width="10%"/>
            <col width="15%"/>
            <col width="10%"/>
            <col width="15%"/>
            <col width="10%"/>
            <col width="15%"/>
          </colgroup>
          <!-- A数据 -->
          <tr>
            <th class="form-header" colspan="8">
              <h2 style="text-align: center">砂石路面损坏调查表</h2>
            </th>
          </tr>
          <tr>
            <th>路线编号</th>
            <td >
              <el-form-item label="" prop="routeCode">
                <el-input class="form-input" v-model="formData.routeCode" :readonly="readOnly" style="width: auto"></el-input>
              </el-form-item>
            </td>
            <th>调查方向</th>
            <td >
              <el-form-item label="" prop="direction">
                <el-input class="form-input" v-model="formData.direction" :readonly="readOnly" style="width: auto"></el-input>
              </el-form-item>
            </td>
            <th>调查时间</th>
            <td >
              <el-form-item label="" prop="checkDate">
                <el-input class="form-input" v-model="formData.checkDate" :readonly="readOnly" style="width: auto"></el-input>
              </el-form-item>
            </td>
            <th>调查人员</th>
            <td >
              <el-form-item label="" prop="checkPerson">
                <el-input class="form-input" v-model="formData.checkPerson" :readonly="readOnly" style="width: auto"></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <th>起点桩号</th>
            <td>
              <el-form-item label="" prop="startStake" :rules="[$validate.Pile]">
                <el-input class="form-input" v-model="formData.startStake" :readonly="readOnly" style="width: auto"></el-input>
              </el-form-item>
            </td>
            <th>终点桩号</th>
            <td >
              <el-form-item label="" prop="endStake" :rules="[$validate.Pile]">
                <el-input class="form-input" v-model="formData.endStake" :readonly="readOnly" style="width: auto"></el-input>
              </el-form-item>
            </td>
            <th>路段长度</th>
            <td>
              <el-form-item label="" prop="length" :rules="[$validate.Number]">
                <el-input class="form-input" v-model="formData.length" :readonly="readOnly" style="width: auto"></el-input>
              </el-form-item>
            </td>
            <th>路面宽度</th>
            <td >
              <el-form-item label="" prop="width" :rules="[$validate.Number]">
                <el-input class="form-input" v-model="formData.width" :readonly="readOnly" style="width: auto"></el-input>
              </el-form-item>
            </td>
          </tr>
        </table>
        <inline-edit-table
          relatedTableCode="SandstoneDamageRecord"
          :initDataInfo="listRecord"
          @change="listRecordChange"
          :deleteUrl="$prifix.maintenance + '/mt/ta/sandstonedamage/removeSandstoneDamageRecord'"
          :isMinus = "true"
          :isAdd = "true"
        ></inline-edit-table>
        <table class="form-table" width="100%">
          <colgroup>
            <col width="10%"/>
            <col width="15%"/>
            <col width="10%"/>
            <col width="15%"/>
            <col width="10%"/>
            <col width="15%"/>
            <col width="10%"/>
            <col width="15%"/>
          </colgroup>
          <tr>
            <th>DR</th>
            <td colspan="3">
              <el-form-item label="" prop="drValue">
                <el-input class="form-input" v-model="formData.drValue" :readonly="true"></el-input>
              </el-form-item>
            </td>
            <th>PCI</th>
            <td colspan="3">
              <el-form-item label="" prop="pciValue">
                <el-input class="form-input" v-model="formData.pciValue" :readonly="true"></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <th>多媒体编号</th>
            <td colspan="7" height="190" class="upload-td">
              <uploader v-model="formData.sessionId">
              </uploader>
            </td>
          </tr>
        </table>
      </el-form>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import rightNavLayout from '@/components/topToolBar';
import ztreeSelect from '@/components/ztreeSelect';
import inlineEditTable from '@/components/inline-edit-table';
import uploader from '@/components/uploader';
import formComponent from '@/components/formComponent';
import { mapGetters } from 'vuex';
export default {
  components: {
    rightNavLayout,
    ztreeSelect,
    inlineEditTable,
    uploader,
    formComponent
  },
  data ()
  {
    return {
      style: {},
      metaData: {
        listRecord: []
      }
    };
  },
  methods: {
    listRecordChange (data)
    {
      this.metaData.listRecord = data;
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
        this.$refs['ctForm'].validate((valid) =>
        {
          if (valid)
          {
            let obj = {};
            let listRecord = JSON.stringify(this.metaData.listRecord);
            Object.assign(obj, this.formData, {listRecord: listRecord});
            this.loading = true;
            this.$store.dispatch('intelligentMaintenanceManagementSystem/_SANDSTONEDAMAGE/save', obj);
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
     * @date     2018/11/18
     */
    returnFn ()
    {
      this.$store.dispatch('intelligentMaintenanceManagementSystem/_SANDSTONEDAMAGE/showList', this.deptId);
    }
  },
  computed: {
    ...mapGetters('intelligentMaintenanceManagementSystem/_SANDSTONEDAMAGE', [
      'readOnly',
      'formData',
      'deptId',
      'ztreeSelect',
      'navigateMenus',
      'operateBtns',
      'listRecord'
    ])
  }
};
</script>

<style lang="less" scoped>
@import '../../../../common/less/common';
</style>
