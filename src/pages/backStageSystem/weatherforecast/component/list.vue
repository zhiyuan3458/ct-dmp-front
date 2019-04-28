<template>
  <div class="lzy-form-wrapper" v-if="isListShow" v-loading.lock="isLoading">
    <right-nav-layout
      :btnList="operateBtns"
      :breadcrumbs="navigateMenus"
    ></right-nav-layout>
    <div class="form-container form-container-without-btn">
      <el-collapse v-model="activeNames">
        <el-collapse-item title="当天天气预报信息" name="1">
          <currentlist></currentlist>
        </el-collapse-item>
        <el-collapse-item title="未来6天天气预报信息" name="2">
          <futurelist></futurelist>
        </el-collapse-item>
        <el-collapse-item title="历史天气预报信息" name="3">
          <table class="form-table" width="100%">
            <colgroup>
              <col width="12%"/>
              <col width="21%"/>
              <col width="12%"/>
              <col width="21%"/>
              <col width="12%"/>
              <col width="21%"/>
            </colgroup>
            <tr>
              <th>开始日期</th>
              <td>
                <el-date-picker
                  v-model="startDate"
                  type="date"
                  format="yyyy年MM月dd日"
                  value-format="yyyy-MM-dd"
                  placeholder="选择开始日期">
                </el-date-picker>
              </td>
              <th>结束日期</th>
              <td>
                <el-date-picker
                  v-model="endDate"
                  type="date"
                  format="yyyy年MM月dd日"
                  value-format="yyyy-MM-dd"
                  placeholder="选择结束日期">
                </el-date-picker>
              </td>
              <td colspan="2">
                <el-button icon="el-icon-search" type="primary" @click="submitForm">查询</el-button>
              </td>
            </tr>
          </table>
          <historylist ref="historylist" :startDate="this.startDate" :endDate="this.endDate"></historylist>
        </el-collapse-item>
      </el-collapse>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
import { mapGetters } from 'vuex';
import rightNavLayout from '@/components/topToolBar';
import currentlist from './currentlist.vue';
import historylist from './historylist.vue';
import futurelist from './futurelist.vue';
export default {
  components: {
    rightNavLayout,
    currentlist,
    futurelist,
    historylist
  },
  data ()
  {
    return {
      activeNames: ['1', '2', '3'],
      style: {
        tableMaxHeight: 0
      },
      metaData: {
        currentPage: 1,
        pageSize: 20
      },
      isSearchShow: false, // 是否显示搜索弹窗
      startDate: '', // 开始日期
      endDate: '' // 结束日期
    };
  },
  methods: {
    getTableData ()
    {
      this.$store.dispatch('backStageSystem/_WEATHERFORECAST/listJson', {
        cityId: this.cityId,
        pageNum: this.metaData.currentPage,
        pageSize: this.metaData.pageSize
      });
    },
    submitForm ()
    {
      if (this.startDate === '')
      {
        this.$message('请选择开始日期');
        return false;
      }
      if (this.endDate === '')
      {
        this.$message('请选择结束日期');
        return false;
      }
      this.$refs.historylist.getTableData();
    }
  },
  computed: {
    ...mapGetters('backStageSystem/_WEATHERFORECAST', [
      'cityId',
      'tableBtns',
      'navigateMenus',
      'operateBtns',
      'isListShow',
      'isRefresh',
      'isLoading'
    ])
  },
  watch: {
    isRefresh ()
    {
      this.getTableData();
    }
  }
};
</script>
<style lang="less">
@import '../../../../common/less/common';
</style>
