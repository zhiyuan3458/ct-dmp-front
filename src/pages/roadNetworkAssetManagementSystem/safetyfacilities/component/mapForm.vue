<template>
  <div class="form-container" @mousewheel.stop>
    <el-tabs tab-position="bottom" v-model="activeIndex" type="card">
      <el-tab-pane label="交安设施信息" name="administration">
          <table class="form-table" width="100%">
            <colgroup>
              <col width="20%"/>
              <col width="30%"/>
              <col width="20%"/>
              <col width="30%"/>
            </colgroup>
            <tr>
              <td colspan="4" style="text-align:center;">
                交安设施正面照
                <img :src="picture" style="width:150px;height:100px;">
              </td>
            </tr>
            <tr>
              <th>路线编号</th>
              <td>
                {{formData.routeCode}}
              </td>
              <th>设施名称</th>
              <td>
                {{formData.name}}
              </td>
            </tr>
            <tr>
              <th>方向</th>
              <td>
                {{formData.direction}}
              </td>
              <th>设施桩号</th>
              <td>
                {{formData.mileageStake}}
              </td>
            </tr>
            <tr>
              <th>设施位置</th>
              <td>
                {{formData.facilitiesLocation}}
              </td>
              <th>设施规格</th>
              <td>
                {{formData.facilitiesSpecification}}
              </td>
            </tr>
            <tr>
              <th>设施用途</th>
              <td>
                {{formData.facilitiesUse}}
              </td>
              <th>建立时间</th>
              <td>
                {{formData.buildDate}}
              </td>
            </tr>
            <tr>
              <th>使用年限</th>
              <td>
                {{formData.lifePeriod}}
              </td>
              <th>管理单位</th>
              <td>
                {{managementUnit}}
              </td>
            </tr>
            <tr>
              <th>是否移交</th>
              <td>
                <form-component
                  readOnly
                  class="form-component-container"
                  v-model="formData.isHandOver"
                  type="select"
                  dictionaryCode="yesNo"
                ></form-component>
              </td>
              <th>经纬度</th>
              <td>
                {{formData.coordinate}}
              </td>
            </tr>
            <tr>
              <th>备注</th>
              <td>
                {{formData.memo}}
              </td>
              <th></th>
              <td>
              </td>
            </tr>
          </table>
        </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script type="text/ecmascript-6">
import ztreeSelect from '@/components/ztreeSelect';
import uploader from '@/components/uploader';
import formComponent from '@/components/formComponent';
import { getDepts, getBridgeView } from '@/api/common/common';
export default {
  components: {
    ztreeSelect,
    uploader,
    formComponent
  },
  data ()
  {
    return {
      activeIndex: 'administration', // tab标签默认初始页
      picture: '', // 照
      readOnly: true,
      formData: {},
      managementUnit: '' // 管理单位
    };
  },
  props: {
    bridgeInfo: {
      type: String,
      required: false,
      default ()
      {
        return '';
      }
    }
  },
  watch: {
    bridgeInfo:
    {
      handler (newValue, oldValue)
      {
        if (newValue)
        {
          this.formData = JSON.parse(newValue);
          this.getManagementUnit();
          this.getBridgeViewImage();
        }
      }
    }
  },
  methods: {
    /**
     * 获取管理单位
     * @author   chenguang
     * @date     2018/12/27
     */
    getManagementUnit ()
    {
      getDepts(this.formData.belongDeptId).then(({ data }) =>
      {
        let listDept = data.data;
        this.managementUnit = listDept.map(dept => dept.name).join(',');
      });
    },
    /**
     * 获取图片
     * @author   chenguang
     * @date     2019/1/23
     */
    getBridgeViewImage ()
    {
      getBridgeView(this.formData.picture).then(({ data }) =>
      {
        this.picture = `data:image/jpg;base64,${data.data}`;
      });
    }
  }
};
</script>

<style lang="less" scoped>
.form-container {
  width: 100%;
  height: 400px;
  /deep/ .el-tabs__content {
    height: 350px;
    overflow: auto;
  }
  .form-table {
    th {
      font-weight: 100;
    }
  }
  /deep/ .el-select {
    width: 100%!important;
  }
}
</style>
