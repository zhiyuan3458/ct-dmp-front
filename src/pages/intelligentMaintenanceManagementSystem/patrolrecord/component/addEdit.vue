<template>
  <div class="lzy-form-wrapper" v-loading.lock="isLoading">
    <right-nav-layout
      :btnList="operateBtns"
      :breadcrumbs="navigateMenus"
    ></right-nav-layout>
    <div class="form-container">
      <el-form :model="formData" ref="culvertForm">
        <div align="center" style="font-size: 20px; padding: 15px">公路管理段公路日常养护巡查记录表</div>
        <table class="form-table" width="100%">
          <colgroup>
            <col width="5%"/>
            <col width="35%"/>
            <col width="15%"/>
            <col width="35%"/>
          </colgroup>
          <!-- 父表数据 -->
          <tr>
            <th><span style="color: red;">*</span>填报单位</th>
            <td>
              <el-form-item label="" prop="belongDeptId" :rules="[$validate.Required]">
                <ztree-select
                  v-model="formData.belongDeptId"
                  :ztreeList="ztreeSelect"
                  :readonly="readOnly">
                </ztree-select>
              </el-form-item>
            </td>
            <th><span style="color: red;">*</span>日期</th>
            <td>
              <el-form-item label="" prop="patrolDate" :rules="[$validate.Required]">
                <el-date-picker
                  v-model="formData.patrolDate"
                  type="date"
                  placeholder="选择日期"
                  :readonly="readOnly">
                </el-date-picker>
              </el-form-item>
            </td>
          </tr>
        </table>
        <child-table
          title=""
          :isIndex="isIndex"
          relatedTableCode="PatrolRecordSub"
          :initDataInfo="listPatrolRecordSub"
          @change="listPatrolRecordSubChange"
          :readonly="readOnly"
          :deleteUrl="$prifix.maintenance + '/mt/cm/patrolrecord/removepatrolrecordSub'"
        ></child-table>
        <table class="form-table" width="100%">
          <colgroup>
            <col width="5%"/>
            <col width="35%"/>
          </colgroup>
          <!-- 父表数据 -->
          <tr>
            <th>备注</th>
            <td>
              <el-form-item label="" prop="demo">
                <el-input
                  type="textarea"
                  :rows="3"
                  :readonly="readOnly"
                  v-model="formData.demo">
                </el-input>
              </el-form-item>
            </td>
          </tr>
        </table>
        <br>
        <div class="footer" style="text-align: left; font-size: 14px">填表说明：<br>
          1.本表必须逐日不间断如实填写（含双休日和节假日）。本表必须装订成册使用。<br>
          2.巡查时必须认真全面检查，除路基、路面外，还必须对桥梁、涵洞、挡土墙、护栏、防撞墙、标志牌等公路设施进行检查，不留死<br>
          角。<br>
          3.“巡查日期、时间”填写必须具体到年、月、日、时、分，时间用 24 时制，如“下午 4 时 25 分”应记录为“16 时 25 分”；“巡<br>
          查路线”填写时必须注明线别、起讫桩号。<br>
          4.“天气”一栏须填写清楚巡查时的天气情况。<br>
          5.填写时必须用钢笔或黑色签字笔填写，不得使用圆珠笔和铅笔；字迹工整、干净。对存在安全隐患的路段要写明具体的桩号、内容<br>
          和影响行车安全的程度；对影响行车安全及其它隐患当天采取的处理措施和对策要说明清楚。<br>
          6、本表采用Ａ4 纸横向填写。<br>
          7、填报内容要注意数据、时间的对应。</div>
      </el-form>
    </div>
  </div>
</template>

<script>
import rightNavLayout from '@/components/topToolBar';
import uploader from '@/components/uploader';
import ztreeSelect from '@/components/ztreeSelect';
import childTable from '@/components/inline-edit-table';
import formComponent from '@/components/formComponent';
import customTable from '@/components/table';
import {mapGetters} from 'vuex';

export default {
  components: {
    rightNavLayout,
    formComponent,
    childTable,
    uploader,
    ztreeSelect,
    customTable
  },
  data ()
  {
    return {
      metaData: {
        loading: '',
        listPatrolRecordSub: ''
      }
    };
  },

  methods: {
    listPatrolRecordSubChange (data)
    {
      this.metaData.listPatrolRecordSub = data;
    },
    /** 表单提交
       * @Description:
       * @author durenniu
       * @date 2019/1/7
       */
    saveFn ()
    {
      this.$confirm('确认保存数据', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() =>
      {
        this.$refs['culvertForm'].validate((valid) =>
        {
          if (valid)
          {
            let obj = this.formData;
            if (this.metaData.listPatrolRecordSub !== '')
            {
              let listPatrolRecordSub = JSON.stringify(this.metaData.listPatrolRecordSub);
              Object.assign(obj, { listPatrolRecordSub: listPatrolRecordSub });
            }
            this.$store.dispatch('intelligentMaintenanceManagementSystem/_PATROLRECORD/save', obj);
          }
          else
          {
            this.$message({
              showClose: true,
              type: 'info',
              message: '填写数据完整或正确!'
            });
            return false;
          }
        });
      });
    },
    /** 返回按钮事件
       * @Description:
       */
    returnFn ()
    {
      this.$store.dispatch('intelligentMaintenanceManagementSystem/_PATROLRECORD/showList', null);
    }
  },
  computed: {
    ...mapGetters('intelligentMaintenanceManagementSystem/_PATROLRECORD', [
      'showWidth',
      'readOnly',
      'formData',
      'isLoading',
      'deptIds',
      'ztreeSelect',
      'listPatrolRecordSub',
      'navigateMenus',
      'operateBtns',
      'isIndex',
      'readOnlyTrue',
      'listPatrolRecordSub'
    ])
  },
  created ()
  {
  },
  watch: {}

};
</script>

<style lang="less" scoped>
  @import '../../../../common/less/common';
  .footer{
    width: 100%;
  }
</style>
