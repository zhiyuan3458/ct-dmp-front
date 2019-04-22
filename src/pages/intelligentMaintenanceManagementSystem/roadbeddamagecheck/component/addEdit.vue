<template>
  <div class="lzy-form-wrapper">
    <right-nav-layout
      :btnList="operateBtns"
      :breadcrumbs="navigateMenus"
    ></right-nav-layout>
    <div class="form-container">
      <el-form :model="formData" ref="roadbedForm">
        <table class="form-table" width="100%">
          <colgroup>
            <col width="8%"/>
            <col width="17%"/>
            <col width="8%"/>
            <col width="17%"/>
            <col width="8%"/>
            <col width="17%"/>
            <col width="8%"/>
            <col width="17%"/>
          </colgroup>
          <!-- 父表数据 -->
          <tr>
            <th class="form-header" colspan="8" height="30px">
              <h2 align="center">路基损坏调查表</h2>
            </th>
          </tr>
          <tr>
            <th>路线编号</th>
            <td>
              <el-form-item label="" prop="routeCode">
                <el-input class="form-input" v-model="formData.routeCode" :readonly= 'readOnly'></el-input>
              </el-form-item>
            </td>
            <th>调查方向</th>
            <td>
              <el-form-item label="" prop="investigateDirection">
                <el-input class="form-input" v-model="formData.investigateDirection" :readonly = 'readOnly'></el-input>
              </el-form-item>
            </td>
            <th>调查时间</th>
            <td>
              <el-form-item label="" prop="investigateTime" :rules="[$validate.Date]">
                <el-date-picker
                  style="width: 100%;"
                  v-model="formData.investigateTime"
                  type="date"
                  :readonly="readOnly">
                </el-date-picker>
              </el-form-item>
            </td>
            <th>调查人员</th>
            <td>
              <el-form-item label="" prop="investigator">
                <el-input style="width: 100%;" class="form-input" v-model="formData.investigator" :readonly="readOnly"></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <th>起止桩号</th>
            <td>
              <el-form-item label="" prop="startStake">
                <el-input class="form-input" v-model="formData.startStake" :readonly="readOnly"></el-input>
              </el-form-item>
            </td>
            <th>终点桩号</th>
            <td>
              <el-form-item label="" prop="endStake">
                <el-input class="form-input" v-model="formData.endStake" :readonly="readOnly"></el-input>
              </el-form-item>
            </td>
            <th>路面长度</th>
            <td>
              <el-form-item label="" prop="length">
                <el-input class="form-input" v-model="formData.length" :readonly="readOnly"></el-input>
              </el-form-item>
            </td>
            <th>路面宽度</th>
            <td>
              <el-form-item label="" prop="width">
                <el-input class="form-input" v-model="formData.width" :readonly="readOnly"></el-input>
              </el-form-item>
            </td>
          </tr>
        </table>
        <!-- 组件子表 -->
        <child-table
          :isIndex = "isIndex"
          :isMinus="false"
          :isAdd="false"
          relatedTableCode="RoadbedSubDamageCheck"
          :initDataInfo="listRoadbedSubDamageCheck"
          @change="culvertOftenRecordChange"
          :readonly="readOnly"
          :objectSpanMethod="expandCol"
        ></child-table>
        <table class="form-table" width="100%">
          <colgroup>
            <col width="8%"/>
            <col width="17%"/>
            <col width="8%"/>
            <col width="17%"/>
            <col width="8%"/>
            <col width="17%"/>
            <col width="8%"/>
            <col width="17%"/>
          </colgroup>
          <tr>
            <th>评定结果</th>
            <td colspan="3" height="100px">
              <el-form-item label="" prop="sciValue">
                SCI=<el-input class="form-input" v-model="formData.sciValue" :readonly= 'readOnly'></el-input>
              </el-form-item>
            </td>
            <th>计算方法</th>
            <td  colspan="5" height="100px">
              <el-form-item label="">
                <img class="img" src="../img/method.png" alt="">
              </el-form-item>
            </td>
          </tr>
        </table>
      </el-form>
    </div>
  </div>
</template>

<script>
import rightNavLayout from '@/components/topToolBar';
import childTable from '@/components/inline-edit-table';
import { mapGetters } from 'vuex';
import { expandRows } from '@/common/js/util';
export default {
  components: {
    rightNavLayout,
    childTable
  },
  data ()
  {
    return {
      style: {},
      metaData: {
        listRoadbedSubDamageCheck: [],
        loading: true
      }
    };
  },
  methods: {
    /**
     * @Description: 涵洞经常检查组件记录赋值
     * @author durenniu
     * @date 2019/1/7
     */
    culvertOftenRecordChange (data)
    {
      this.metaData.listRoadbedSubDamageCheck = data;
    },
    // 合并列
    expandCol ({ row, column, rowIndex, columnIndex })
    {
      if (columnIndex === 0 || columnIndex === 4)
      {
        const _row = this.range[rowIndex];
        const _col = _row > 0 ? 1 : 0;
        return [_row, _col];
      }
    }
  },
  computed: {
    ...mapGetters('intelligentMaintenanceManagementSystem/_ROADBEDDAMAGECHECK', [
      'readOnly',
      'formData',
      'navigateMenus',
      'operateBtns',
      'listRoadbedSubDamageCheck',
      'isIndex'
    ]),
    range ()
    {
      const list = JSON.parse(this.listRoadbedSubDamageCheck);
      return expandRows(list, 'investigateItem');
    }
  }
};
</script>

<style scoped lang="less">
  @import '../../../../common/less/common';
</style>
