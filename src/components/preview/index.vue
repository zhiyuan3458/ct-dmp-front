<template>
  <iframe class="previewIframe" id="show-iframe"  frameborder=0 name="showHere" scrolling=auto :src="url"></iframe>
</template>
<script type="text/ecmascript-6">
// import axios from 'axios';
// import { getToken } from '@/utils/auth';
import { getHttp } from '@/api/util';
export default {
  // 使用时请使用 :url.sync=""传值
  props: {
    sessionId: {
      type: String
    },
    attachmentId: {
      type: String
    },
    /* 预览地址 */
    previewUrl: {
      type: String,
      default: '/api/upload/sys/at/attachment/preview'
    }
  },
  data ()
  {
    return {
      url: '',
      baseUrl: '/static/pdfjs-2.0.943-dist/web/viewer.html',
      file: ''
    };
  },
  methods: {
    previewChange (id, sessionId)
    {
      if (!id && !sessionId)
      {
        this.file = '';
        this.$message({
          type: 'info',
          message: '预览失败，请重试!',
          duration: 1000
        });
      }
      else
      {
        getHttp(`${this.previewUrl}`, {id: id, sessionId: sessionId}).then(res =>
        {
          let item = res.data.data;
          let nodeNum = item.previewNode.replace('group', '');
          this.file = `${this.$prifix.file}/${nodeNum}/${item.previewPath}`;
          this.url = this.baseUrl + '?file=' + this.file;
          this.url = encodeURI(this.url);
        }).catch(err =>
        {
          this.file = '';
          this.$message({
            type: 'info',
            message: '预览失败，请重试!',
            duration: 1000
          });
          this.$emit('uploadError', err);
        });
      }
    }
  },
  watch: {
    attachmentId: {
      handler (value)
      {
        this.url = '';
        if (value)
        {
          this.previewChange(value, null);
        }
      },
      immediate: true
    },
    sessionId: {
      handler (value)
      {
        this.url = '';
        if (value)
        {
          this.previewChange(null, value);
        }
      },
      immediate: true
    }
  }
};
</script>

<style lang="less" scoped>
.previewIframe {
  width: 100%;
  height: 100%;
}
</style>
