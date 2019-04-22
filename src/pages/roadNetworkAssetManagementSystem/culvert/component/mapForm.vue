<template>
  <div class="form-container" @mousewheel.stop>
    <el-tabs tab-position="bottom" v-model="activeIndex" type="card">
      <el-tab-pane label="涵洞信息" name="administration">
          <table class="form-table" width="100%">
            <colgroup>
              <col width="20%"/>
              <col width="30%"/>
              <col width="20%"/>
              <col width="30%"/>
            </colgroup>
            <!-- A数据 -->
            <tr>
              <th>路线编号</th>
              <td>
                {{formData.routeCode}}
              </td>
              <th>涵洞编号</th>
              <td>
                {{formData.code}}
              </td>
            </tr>
            <tr>
              <th>管理单位</th>
              <td>
                {{managementUnit}}
              </td>
              <th>涵洞名称</th>
              <td>
                {{formData.name}}
              </td>
            </tr>
            <tr>
              <th>技术状况</th>
              <td>
                {{formData.techGrade}}
              </td>
              <th>设计荷载</th>
              <td>
                {{formData.designLoad}}
              </td>
            </tr>
            <tr>
              <th>里程桩号</th>
              <td>
                {{formData.mileageStake}}
              </td>
              <th>材料类型</th>
              <td>
                {{formData.materialType}}
              </td>
            </tr>
            <tr>
              <th>涵底坡度</th>
              <td>
                {{formData.culvertBottomScope}}
              </td>
              <th>孔数(个)</th>
              <td>
                {{formData.holeNumber}}
              </td>
            </tr>
            <tr>
              <th>孔径(m)</th>
              <td>
                {{formData.aperture}}
              </td>
              <th>涵长(m)</th>
              <td>
                {{formData.length}}
              </td>
            </tr>
            <tr>
              <th>填土高(m)</th>
              <td>
                {{formData.fillHeight}}
              </td>
              <th>净高(m)</th>
              <td>
                {{formData.clearHeight}}
              </td>
            </tr>
            <tr>
              <th>用途分类</th>
              <td>
                {{formData.useClassification}}
              </td>
              <th>进口宽度(m)</th>
              <td>
                {{formData.entranceWidth}}
              </td>
            </tr>
            <tr>
              <th>进口高度(m)</th>
              <td>
                {{formData.entranceHeight}}
              </td>
              <th>进口形式</th>
              <td>
                {{formData.entranceForm}}
              </td>
            </tr>
            <tr>
              <th>出口宽度(m)</th>
              <td>
                {{formData.exitWidth}}
              </td>
              <th>出口高度(m)</th>
              <td>
                {{formData.exitHeight}}
              </td>
            </tr>
            <tr>
              <th>出口形式</th>
              <td>
                {{formData.exitForm}}
              </td>
              <th>使用情况</th>
              <td>
                {{formData.useCase}}
              </td>
            </tr>
            <tr>
              <th>墙/拱圈盖板或管厚(米)</th>
              <td>
                {{formData.plateThick}}
              </td>
              <th>护底材料与面积</th>
              <td>
                {{formData.bottomArea}}
              </td>
            </tr>
            <tr>
              <th>基础种类及厚度(米)</th>
              <td>
                {{formData.basicThick}}
              </td>
              <th>经纬度</th>
              <td>
                {{formData.coordinate}}
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
              <th>备注</th>
              <td>
                {{formData.memo}}
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
      verticalView: '', // 立面照
      frontalView: '', // 正面照
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
      getBridgeView(this.formData.verticalView).then(({ data }) =>
      {
        this.verticalView = `data:image/jpg;base64,${data.data}`;
      });
      getBridgeView(this.formData.frontalView).then(({ data }) =>
      {
        this.frontalView = `data:image/jpg;base64,${data.data}`;
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
