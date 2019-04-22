<template>
  <div class="form-container" @mousewheel.stop>
    <el-tabs tab-position="bottom" v-model="activeIndex" type="card">
      <el-tab-pane label="部门管理信息" name="administration">
        <el-carousel height="200px">
          <el-carousel-item v-for="item in sideView" :key="item">
            <img :src="item" alt="" style="height: 207px; width:280px">
          </el-carousel-item>
        </el-carousel>
          <table class="form-table" width="100%">
            <colgroup>
              <col width="20%"/>
              <col width="30%"/>
              <col width="20%"/>
              <col width="30%"/>
            </colgroup>
            <tr>
              <th>编码</th>
              <td>
                {{formData.code}}
              </td>
              <th>简称</th>
              <td>
                {{formData.name}}
              </td>
            </tr>
            <tr>
              <th>全称</th>
              <td>
                {{formData.fullName}}
              </td>
              <th>负责人</th>
              <td>
                {{formData.chargeinPersion}}
              </td>
            </tr>
            <tr>
              <th>联系人</th>
              <td>
                {{formData.linkMan}}
              </td>
              <th>联系人移动电话</th>
              <td>
                {{formData.mobile}}
              </td>
            </tr>
            <tr>
              <th>电话</th>
              <td>
                {{formData.telephone}}
              </td>
              <th>传真</th>
              <td>
                {{formData.geologyCase}}
              </td>
            </tr>
            <tr>
              <th>办公地址</th>
              <td>
                {{formData.address}}
              </td>
              <th>邮政编码</th>
              <td>
                {{formData.postalCode}}
              </td>
            </tr>
            <tr>
              <th>经纬度</th>
              <td>
                {{formData.coordinate}}
              </td>
              <th>网络地址</th>
              <td>
                {{formData.netAddress}}
              </td>
            </tr>
            <tr>
              <th>邮箱</th>
              <td>
                {{formData.email}}
              </td>
              <th>成立日期</th>
              <td>
                {{formData.foundDate}}
              </td>
            </tr>
            <tr>
              <th>部门类型</th>
              <td>
                {{formData.foundDate}}
              </td>
              <th>检查记录</th>
              <td>
                {{formData.type}}
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
import { getView } from '@/api/common/common';
import { swiper, swiperSlide } from 'vue-awesome-swiper';
export default {
  components: {
    ztreeSelect,
    uploader,
    formComponent,
    swiper,
    swiperSlide
  },
  data ()
  {
    return {
      activeIndex: 'administration', // tab标签默认初始页
      sideView: [], // 边坡正面照
      readOnly: true,
      formData: {},
      swiperViews: [],
      swiperOption: {
        pagination: '.swiper-pagination'
      }
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
          this.getBridgeViewImage();
        }
      },
      immediate: true
    }
  },
  methods: {
    /**
     * 获取图片
     * @author   chenguang
     * @date     2019/1/23
     */
    getBridgeViewImage ()
    {
      this.sideView = [];
      console.log('this.formData.sessionId' + this.formData.sessionId);
      getView(this.formData.sessionId).then(({ data }) =>
      {
        console.log('data.data.length' + data.data.length);
        for (let i = 0; i < data.data.length; i++)
        {
          let view = `data:image/jpg;base64,${data.data[i]}`;
          this.sideView.push(view);
          console.log('data.data.length' + data.data.length);
        }
      });
    }
  },
  computed: {
    swiper ()
    {
      return this.$refs.mySwiper.swiper;
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
.swiper-group {
  position: relative;
  .showSwiper {
   width: 20px;
   height: 20px;
   position: absolute;
   background: blue;
   }
/* 关键是下面三行代码，用于替换display: none */
  .swiper-container {
    visibility: hidden;
    z-index: -1;
    position: absolute;
    }
/* 鼠标移入class为showSwiper的div，显示swiper */
&:hover .swiper-container {
  visibility: visible;
  }
}
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 150px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n+1) {
  background-color: #d3dce6;
}
</style>
