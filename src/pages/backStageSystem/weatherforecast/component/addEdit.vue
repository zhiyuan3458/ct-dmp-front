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
              <col width="13%"/>
              <col width="37%"/>
              <col width="13%"/>
              <col width="37%"/>
            </colgroup>
            <tr>
              <th>
                城市id：
              </th>
              <td>
                <el-form-item label="" prop="cityId">
                  <el-input class="form-input" v-model="formData.cityId" :readonly="readOnly">
                  </el-input>
                </el-form-item>
              </td>
              <th>
                养护单位：
              </th>
              <td>
                <el-form-item label="" prop="unit">
                  <el-input class="form-input" v-model="formData.unit" :readonly="readOnly">
                  </el-input>
                </el-form-item>
              </td>
            </tr>
            <tr>
              <th>
                更新时间：
              </th>
              <td>
                <el-form-item label="" prop="updateTime">
                  <el-input class="form-input" v-model="formData.updateTime" :readonly="readOnly">
                  </el-input>
                </el-form-item>
              </td>
              <th>
                日期：
              </th>
              <td>
                <el-form-item label="" prop="date">
                  <el-input class="form-input" v-model="formData.date" :readonly="readOnly">
                  </el-input>
                </el-form-item>
              </td>
            </tr>
            <tr>
              <th>
                天气状况：
              </th>
              <td>
                <el-form-item label="" prop="weatherConditions">
                  <el-input class="form-input" v-model="formData.weatherConditions" :readonly="readOnly">
                  </el-input>
                </el-form-item>
              </td>
              <th>
                最高温度：
              </th>
              <td>
                <el-form-item label="" prop="highestTemperature">
                  <el-input class="form-input" v-model="formData.highestTemperature" :readonly="readOnly">
                  </el-input>
                </el-form-item>
              </td>
            </tr>
            <tr>
              <th>
                最低温度：
              </th>
              <td>
                <el-form-item label="" prop="lowestTemperature">
                  <el-input class="form-input" v-model="formData.lowestTemperature" :readonly="readOnly">
                  </el-input>
                </el-form-item>
              </td>
              <th>
                当前温度：
              </th>
              <td>
                <el-form-item label="" prop="currentTemperature">
                  <el-input class="form-input" v-model="formData.currentTemperature" :readonly="readOnly">
                  </el-input>
                </el-form-item>
              </td>
            </tr>
            <tr>
              <th>
                小时天气预测：
              </th>
              <td colspan="3">
                <el-form-item label="" prop="hour">
                  <el-input class="form-input" type="textarea" autosize v-model="formData.hour" :readonly="readOnly">
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
export default {
  components: {
    rightNavLayout
  },
  data ()
  {
    return {
      style: {
        isShow: false,
        collapsedWrapper: {
          width: 270, // 设置初始宽度
          draggable: false, // 是否可拖拽
          collapsable: false // 是否可伸缩
        }
      },
      metaData: {
        treeTool: null,
        treeLevel: []
      }
    };
  },
  methods: {
    /**
     * 返回
     * @author   chenguang
     * @date     2018/10/16
     */
    returnFn ()
    {
      this.$store.dispatch('backStageSystem/_WEATHERFORECAST/showList', { cityId: this.cityId });
    }
  },
  computed: {
    ...mapGetters('backStageSystem/_WEATHERFORECAST', [
      'formData',
      'cityId',
      'readOnly',
      'navigateMenus',
      'operateBtns',
      'isAddEditShow',
      'isLoading'
    ])
  }
};
</script>

<style lang="less">
@import '../../../../common/less/common';
.cascade-tree-container {
  height: calc(100% - 62px);
}
</style>
