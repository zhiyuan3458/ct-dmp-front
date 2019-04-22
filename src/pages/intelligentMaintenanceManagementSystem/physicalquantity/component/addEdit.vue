<template>
  <div class="lzy-form-wrapper">
    <right-nav-layout
      :btnList="operateBtns"
      :breadcrumbs="navigateMenus"
    ></right-nav-layout>
    <div class="form-container">
      <el-form :model="formData" ref="ctForm" v-loading="metaData.loading">
        <inline-edit-table
          title="实物工程量表"
          relatedTableCode="physicalQuantity"
          :initDataInfo="listTunnelOftenRecord"
          :readonly="readOnly"
          @change="tunnelOftenRecordChange"
          :deleteUrl="$prifix.maintenance + '/mt/tm/tunneloftencheck/removeTunnelOftenRecord'"
        ></inline-edit-table>
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
import { expandRows } from '@/common/js/util';
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
        bitumenRoadDamageSub: []
      }
    };
  },
  methods: {
    bridgeComponentChange (data)
    {
      this.metaData.bitumenRoadDamageSub = data;
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
            let bitumenRoadDamageSub = JSON.stringify(this.metaData.bitumenRoadDamageSub);
            Object.assign(obj, this.formData, {bitumenRoadDamageSub: bitumenRoadDamageSub});
            this.loading = true;
            this.$store.dispatch('intelligentMaintenanceManagementSystem/_PHYSICALQUANTITY/save', obj);
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
      this.$store.dispatch('intelligentMaintenanceManagementSystem/_PHYSICALQUANTITY/showList', this.deptId);
    },
    // 合并列
    expandCol ({ row, column, rowIndex, columnIndex })
    {
      if (columnIndex === 0 || columnIndex === 3)
      {
        const _row = this.range[rowIndex];
        const _col = _row > 0 ? 1 : 0;
        return [_row, _col];
      }
    }
  },
  computed: {
    ...mapGetters('intelligentMaintenanceManagementSystem/_PHYSICALQUANTITY', [
      'readOnly',
      'formData',
      'deptId',
      'ztreeSelect',
      'navigateMenus',
      'operateBtns',
      'bitumenRoadDamageSub'
    ]),
    range ()
    {
      const list = JSON.parse(this.bitumenRoadDamageSub);
      return expandRows(list, 'name');
    }
  }
};
</script>

<style lang="less" scoped>
@import '../../../../common/less/common';
</style>
