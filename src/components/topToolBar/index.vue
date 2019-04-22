<template>
  <div class="tool-wrapper" ref="toolWrapper">
    <!-- 按钮组 -->
    <div class="btn-group" ref="btnGroup">
      <el-button
        size="mini"
        class="btn-item"
        v-for="(item, index) in metaData.testBtnList"
        :key="index"
        v-if="item.displayValue !== 'qrCode'"
        :icon="item.icon"
        @click="handleClick(item.displayValue)">
        {{item.displayName}}
      </el-button>
      <el-popover
        :placement="placement"
        title=""
        v-else
        width="100"
        trigger="hover"
        @show="showQrCode"
      >
        <div id="qrcode"></div>
        <span class="ct-icon-print-blue" @click="printPrCode" title="打印二维码"></span>
        <el-button
          size="mini"
          :icon="item.icon"
          class="btn-item qrcode-btn"
          slot="reference">
          {{item.displayName}}
        </el-button>
      </el-popover>
    </div>
    <!-- 导航位置 -->
    <div class="nav-bar" ref="navBar">
      <el-breadcrumb separator-class="el-icon-minus">
        <el-breadcrumb-item><span class="el-icon-star-on"></span>当前位置：</el-breadcrumb-item>
        <el-breadcrumb-item
          v-for="(item, index) in metaData.testBreadcrumbs"
          :key="index"
        >
          {{item.name}}
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import QRCode from 'qrcodejs2';
import { deepClone } from '@/common/js/util';
export default {
  name: 'btnGroup',
  data: function ()
  {
    return {
      style: {},
      metaData: {
        tableBtns: [],
        testBtnList: [],
        testBreadcrumbs: []
      },
      /* 二维码实例 */
      qrcode: null
    };
  },
  props: {
    btnList: {
      type: Array,
      required: true,
      default: function ()
      {
        return [];
      }
    },
    breadcrumbs: {
      type: Array,
      required: true,
      default: function ()
      {
        return [];
      }
    },
    placement: {
      type: String,
      default: 'bottom'
    },
    qrCodeData: {
      type: String,
      default: ''
    }
  },
  watch: {
    btnList: {
      handler (newValue, oldValue)
      {
        if (newValue && newValue !== '')
        {
          this.metaData.testBtnList = deepClone(newValue);
        }
      },
      immediate: true
    },
    breadcrumbs: {
      handler (newValue, oldValue)
      {
        if (newValue && newValue !== '')
        {
          this.metaData.testBreadcrumbs = deepClone(newValue);
        }
      },
      immediate: true
    }
  },
  methods: {
    handleClick (name)
    {
      if (this.$parent)
      {
        Reflect.get(this.$parent, `${name}Fn`).call();
      }
    },
    /* 动态生成二维码 */
    showQrCode ()
    {
      if (!this.qrCodeData) return false;
      let QrCodeJson = JSON.parse(this.qrCodeData);
      QrCodeJson.url = QrCodeJson.url.substr(QrCodeJson.url.substr(1).indexOf('/') + 1);
      QrCodeJson.url = `${QrCodeJson.url}&qrCode=true`;
      document.getElementById('qrcode').innerHTML = '';
      this.qrcode = new QRCode('qrcode', {
        width: 132,
        height: 132,
        text: JSON.stringify(QrCodeJson),
        colorDark: '#000',
        colorLight: '#fff'
      });
    },
    /* 打印二维码 */
    printPrCode ()
    {
      let container = document.getElementById('qrcode');
      let canvas = container.getElementsByTagName('canvas');
      if (!canvas) return false;
      const win = window.open();
      win.document.write("<div><img style='width: 100%;height: auto;' src='" + canvas[0].toDataURL('image/png') + "'/></div>");
      win.print();
      win.location.reload();
    }
  }
};
</script>

<style lang="less" scoped>
.tool-wrapper {
  width: 100%;
  height: 62px;
  position: relative;
  background: white;
  .btn-group {
    padding: 4px 0;
    border-bottom: 1px solid #ddd;

    .btn-item {
      margin-right: 8px!important;
      /deep/ span {
        margin-left: -1px;
      }
    }
    .qrcode-btn {
      float: right;
    }

    /deep/ .el-icon-plus {
      color: #D85C0D;
      font-weight: 700;
    }

    /deep/ .el-icon-delete {
      color: #DC3F2C;
      font-weight: 700;
    }

    /deep/ .el-icon-upload2 {
      color: #217FBC;
      font-weight: 700;
    }

    /deep/ .el-icon-download {
      color: #2FA2E0;
      font-weight: 700;
    }
  }
  /deep/ .nav-bar {
    display: inline-block;
    margin: 5px 0;
    .content;

    /deep/ .el-icon-star-on {
      display: inline-block;
      margin-right: 5px;
      color: #F59C00;
    }

    /deep/ .el-breadcrumb__inner {
      font-family: "宋体";
      color: #333;
      font-size: 12px;
      font-weight: 100 !important;
    }
  }
}
.ct-icon-print-blue {
  position: absolute;
  top: 6px;
  right: 11px;
  cursor: pointer;
}
</style>
