<template>
  <div class="upload">
    <!-- 上传按钮 -->
    <div class="btns" v-if="btnShow && !readonly">
      <i class="ct-icon-add2-green"></i>
      <label class="upload-btn" :for="sessionId">{{btnName}}</label>
      <input
        :id="sessionId"
        :accept="accept"
        type="file"
        ref="input"
        :name="name"
        multiple
        style="position:absolute;clip:rect(0 0 0 0);"
        @change="handleUpload($event)">
    </div>
    <!-- 上传列表 -->
    <div class="vinSwfUpload_context_editContent">
      <div id="thelist" class="uploader-list" :style="{width: thelistWidth + 'px'}">
        <div v-for="item in fileList" class="file-item" :key="item.id">
          <div class="file_name" :title="item.originalFileName">
            <a v-if="/\bpng\b|\bjpg\b|\bjpeg\b|\bgif\b/.test(item.fileType)" class="imgPreview" :id="item.id" :title="item.originalFileName" @click="enlargeThumb(item.id,item.originalFileName)">
              <img class="thumb" :src="item.url" alt="">
            </a>
            <a v-else-if="/\bdoc\b|\bdocx\b/.test(item.fileType)" class="imgPreview" :id="item.id" :title="item.originalFileName" @click="previewChange(item.id,item.originalFileName)">
              <img class="thumb" src="./word_alt_1.png" alt="">
            </a>
            <a v-else-if="/\bxlsx\b|\bxls\b|\bxlsm\b|\bxlsb\b/.test(item.fileType)" class="imgPreview" :id="item.id" :title="item.originalFileName" @click="previewChange(item.id,item.originalFileName)">
              <img class="thumb" src="./excel_alt_1.png" alt="">
            </a>
            <a v-else-if="/\bppt\b|\bpptx\b|\bpptm\b/.test(item.fileType)" class="imgPreview" :id="item.id" :title="item.originalFileName" @click="previewChange(item.id,item.originalFileName)">
              <img class="thumb" src="./powerpoint_alt_1.png" alt="">
            </a>
            <a v-else-if="/\btxt\b/.test(item.fileType)" class="imgPreview" :id="item.id" :title="item.originalFileName">
              <img class="thumb" src="./txt_icon.png" alt="">
            </a>
            <a v-else-if="/\bpdf\b/.test(item.fileType)" class="imgPreview" :id="item.id" :title="item.originalFileName" @click="previewChange(item.id,item.originalFileName)">
              <img class="thumb" src="./txt_icon.png" alt="">
            </a>
            <a v-else class="imgPreview" :id="item.id" :title="item.originalFileName">
              <img class="thumb" src="./attachment-green.png" alt="">
            </a>
            <p class="fname" :title="item.originalFileName">{{item.originalFileName}}</p>
            <div class="file_operation">
              <i title="下载" class="el-icon-download" @click="downloadFile(item)"></i>
              <i title="删除" v-if="delBtnShow && !readonly" class="el-icon-close" @click="deleteFile(item.id)"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
    <v-dialog :title="title" height="500px" :resizable="false" :visible.sync="carouselShow">
      <el-carousel
        class="carousel-wrapper"
        ref="carousel"
        style="height: 100%;"
        indicator-position="none"
        :autoplay="false"
        :loop="false"
        @change="handleChange"
      >
        <div class="tool-container" @mousedown.self="moveCarousel">
        </div>
        <el-carousel-item class="carousel-item" v-for="item in imgList" :key="item.id">
          <img
            class="img-item"
            ref="imgItem"
            :src="item.url"
            alt=""
            @mousewheel.self="scaleImg"
            @mousedown.self="moveImg"
          >
        </el-carousel-item>
      </el-carousel>
    </v-dialog>
    <v-dialog
      :title="title"
      :visible.sync="previewShow">
      <preview v-if="attachmentId !== ''" :attachmentId="attachmentId"></preview>
    </v-dialog>
  </div>
</template>

<script>
import axios from 'axios';
import { getToken } from '@/utils/auth';
import { postAsFormData, getHttp, deleteHttp } from '@/api/util';
import preview from '@/components/preview';
import dialog from '@/components/dialog';
export default {
  components: {
    preview,
    'v-dialog': dialog
  },
  name: 'upload',
  data ()
  {
    return {
      sessionId: '',
      carouselShow: false,
      fileList: [],
      draggable: true,
      imgWidth: '',
      imgHeight: '',
      previewShow: false,
      attachmentId: '',
      title: ''
    };
  },
  props: {
    /* sessionId */
    value: {
      type: String,
      default: ''
    },
    /* 是否显示上传按钮 */
    btnShow: {
      type: Boolean,
      default: true
    },
    btnName: {
      type: String,
      default: '上传文件'
    },
    /* 是否显示删除图标 */
    delBtnShow: {
      type: Boolean,
      default: true
    },
    /* 上传地址 */
    uploadUrl: {
      type: String,
      default: '/api/upload/sys/at/attachment/upload'
    },
    /* 下载地址 */
    downloadUrl: {
      type: String,
      default: '/api/upload/sys/at/attachment/download'
    },
    /* 删除地址 */
    deleteUrl: {
      type: String,
      default: '/api/upload/sys/at/attachment/delete'
    },
    /* 下载地址 */
    filesUrl: {
      type: String,
      default: '/api/upload/sys/at/attachment/findBySessionId'
    },
    /* 预览地址 */
    previewUrl: {
      type: String,
      default: '/api/upload/sys/at/attachment/preview'
    },
    /* 上传文件的字段名 */
    name: {
      type: String,
      default: 'file'
    },
    /* 上传文件的附带其他参数 */
    params: {
      type: Object
    },
    /* 是否允许多文件上传 */
    multiple: {
      type: Boolean,
      default: true
    },
    /* 文件上传的类型 */
    accept: {
      type: String
    },
    /* 只读 */
    readonly: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    thelistWidth ()
    {
      if (this.fileList)
      {
        return 133 * this.fileList.length;
      }
    },
    imgList ()
    {
      let images = this.fileList.filter(item => /\bpng\b|\bjpg\b|\bjpeg\b|\bgif\b/.test(item.fileType));
      for (let i = 0; i < images.length; i++)
      {
        let nodeNum = images[i].groupNode.replace('group', '');
        images[i].url = `${this.$prifix.file}/${nodeNum}/${images[i].filePath}`;
      }
      return images;
    }
  },
  mounted ()
  {
    // 给每个input生成一个id
    this.sessionId = this.value || this.gengerateID();
    // 通过value获取附件
    if (this.fileList.length === 0 && this.sessionId)
    {
      getHttp(`${this.filesUrl}`, { sessionId: this.sessionId }).then(res =>
      {
        this.fileList = res.data.data;
        for (let i = 0; i < this.fileList.length; i++)
        {
          let nodeNum = this.fileList[i].groupNode.replace('group', '');
          this.fileList[i].url = `${this.$prifix.file}/${nodeNum}/${this.fileList[i].filePath}`;
        }
      });
    }
  },
  methods: {
    // 指定input type为file的id
    gengerateID ()
    {
      var d = new Date().getTime();
      var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c =>
      {
        var r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
      });
      return uuid;
    },
    // 上传事件
    handleUpload (e)
    {
      this.$emit('input', this.sessionId);
      let fileObj = e.target.files;
      if (e.target.files.length !== 0)
      {
        const loading = this.$loading({
          lock: true,
          text: '上传中',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
        /* eslint-disable-next-line no-unused-vars */
        let postFiles = Array.prototype.slice.call(fileObj);
        if (!this.multiple)
        {
          postFiles = postFiles.slice(0, 1);
        }
        let files = new FormData();
        for (let i = 0; i < postFiles.length; i++)
        {
          files.append('files', postFiles[i]);
        }
        if (this.sessionId)
        {
          files.append('sessionId', this.sessionId);
        }
        postAsFormData(this.uploadUrl, files).then(res =>
        {
          loading.close();
          this.$message({
            type: 'success',
            message: '文件上传成功!',
            duration: 1000
          });
          this.$emit('uploadSuccess', res.data.data);
          getHttp(`${this.filesUrl}`, { sessionId: this.sessionId }).then(res =>
          {
            this.fileList = res.data.data;
            for (let i = 0; i < this.fileList.length; i++)
            {
              let nodeNum = this.fileList[i].groupNode.replace('group', '');
              this.fileList[i].url = `${this.$prifix.file}/${nodeNum}/${this.fileList[i].filePath}`;
            }
          });
        }).catch(err =>
        {
          loading.close();
          this.$message({
            type: 'info',
            message: '上传失败，请重新删除!',
            duration: 1000
          });
          this.$emit('uploadError', err);
        });
      }
      // this.$refs.input.value = null;
    },
    // 下载事件
    downloadFile (file)
    {
      let instance = axios.create();
      instance({
        url: `${this.downloadUrl}?id=${file.id}`,
        method: 'get',
        responseType: 'blob',
        headers: { 'X-Requested-With': 'XMLHttpRequest', 'CTtoken': getToken() }
      }).then(res =>
      {
        let blob = new Blob([res.data]);
        let fileName = file.originalFileName;
        if (window.navigator && window.navigator.msSaveOrOpenBlob)
        {
          window.navigator.msSaveOrOpenBlob(blob, fileName);
        }
        else
        {
          let url = window.URL.createObjectURL(blob);
          let link = document.createElement('a');
          link.style.display = 'none';
          link.href = url;
          link.setAttribute('download', fileName);
          document.body.appendChild(link);
          link.click();
          window.URL.revokeObjectURL(url);
          document.body.removeChild(link);
        }
      });
    },
    // 删除事件
    deleteFile (id)
    {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() =>
      {
        deleteHttp(`${this.deleteUrl}`, { id }).then(res =>
        {
          this.$message({
            type: 'success',
            message: '删除成功!',
            duration: 1000
          });
          return getHttp(`${this.filesUrl}`, { sessionId: this.sessionId });
        }).then(res =>
        {
          this.fileList = res.data.data;
          for (let i = 0; i < this.fileList.length; i++)
          {
            let nodeNum = this.fileList[i].groupNode.replace('group', '');
            this.fileList[i].url = `${this.$prifix.file}/${nodeNum}/${this.fileList[i].filePath}`;
          }
        }).catch(err =>
        {
          console.log('err');
          console.log(err);
          this.$message({
            type: 'info',
            message: '删除失败，请重新删除操作！',
            duration: 1000
          });
          this.$emit('deleteError', err);
        });
      });
    },
    setActiveItem (index)
    {
      this.$nextTick(() =>
      {
        this.$refs.carousel.setActiveItem(index);
      });
    },
    /**
     * 点击图片缩略图后弹出模态框
     * id——图片的id值
     */
    enlargeThumb (id, originalFileName)
    {
      this.carouselShow = true;
      this.title = originalFileName;
      let imgActiveIndex = this.imgList.indexOf(this.imgList.find(item => item.id === id));
      this.setActiveItem(imgActiveIndex);
    },
    /**
     * 拖拽走马灯的div时时触发
     * @param e
     */
    moveCarousel (e)
    {
      let odiv = this.$refs.carousel.$el;
      const disX = e.clientX - odiv.offsetLeft;
      const disY = e.clientY - odiv.offsetTop;
      // 看传入的draggable值是否为true才给拉伸
      if (this.draggable)
      {
        document.onmousemove = (e) =>
        {
          e.preventDefault();
          const clientX = e.clientX;
          const clientY = e.clientY;
          const left = clientX - disX;
          const top = clientY - disY;
          odiv.style.left = `${left}px`;
          odiv.style.top = `${top}px`;
        };
        document.onmouseup = () =>
        {
          document.onmousemove = document.onmouseup = null;
        };
      }
      else
      {
        return false;
      }
    },
    /**
     * 切换到下一张或上一张时，把所有图片大小和位置还原成原来的样子
     */
    handleChange ()
    {
      this.renewImg();
    },
    /**
     * 拖拽图片时触发
     * @param e
     */
    moveImg (e)
    {
      e.preventDefault();
      let odiv = e.target;
      const disX = e.clientX - odiv.style.left.split('px')[0];
      const disY = e.clientY - odiv.style.top.split('px')[0];
      document.onmousemove = (e) =>
      {
        e.preventDefault();
        const clientX = e.clientX;
        const clientY = e.clientY;
        const left = clientX - disX;
        const top = clientY - disY;
        odiv.style.left = `${left}px`;
        odiv.style.top = `${top}px`;
      };
      document.onmouseup = () =>
      {
        document.onmousemove = document.onmouseup = null;
      };
    },
    /**
     * 放大和缩小缩略图
     * @param e
     */
    scaleImg (e, times = 1.2)
    {
      e.preventDefault();
      e.stopPropagation();
      const initWidth = e.target.width;
      const initHeight = e.target.height;
      if (e.wheelDelta > 0 || e.deltaY < 0)
      {
        e.target.style.width = initWidth * times + 'px';
        e.target.style.height = initHeight * times + 'px';
      }
      else
      {
        e.target.style.width = initWidth / times + 'px';
        e.target.style.height = initHeight / times + 'px';
      }
    },
    /**
     * 关闭图片缩略图后触发
     */
    handleClose ()
    {
      this.carouselShow = false;
      this.renewImg();
    },
    /**
     * 模态框中图片恢复成原来的大小
     * 在关闭模态框和切换下一张幻灯片的时候用到
     */
    renewImg ()
    {
      this.$refs.imgItem.forEach(item =>
      {
        item.style.width = 500 + 'px';
        item.style.height = 'auto';
        item.style.left = '0px';
        item.style.top = '0px';
      });
    },
    previewChange (id, title)
    {
      if (id)
      {
        this.attachmentId = id;
        this.previewShow = true;
        this.title = title;
      }
    }
  },
  watch: {
    value:
      {
        handler (newValue, oldValue)
        {
          this.sessionId = newValue || this.gengerateID();
          getHttp(`${this.filesUrl}`, { sessionId: newValue }).then(res =>
          {
            this.fileList = res.data.data;
            for (let i = 0; i < this.fileList.length; i++)
            {
              let nodeNum = this.fileList[i].groupNode.replace('group', '');
              this.fileList[i].url = `${this.$prifix.file}/${nodeNum}/${this.fileList[i].filePath}`;
            }
          });
        }
      }
  }
};
</script>

<style lang="less" scoped>
@import "../../common/less/theme";
.upload {
  .btns {
    position: relative;
    .ct-icon-add2 {
      position: absolute;
      top: 13px;
      left: 11px;
      font-size: 14px;
      color: forestgreen;
    }
    .upload-btn {
      width: 70px;
      height: 20px;
      text-align: right;
      display: inline-block;
      line-height: 20px;
      margin-left: -23px;
      cursor: pointer;
    }
  }

  .vinSwfUpload_context_editContent {
    width: 100%;
    overflow-x: auto;
    overflow-y: hidden;
    position: relative;
    #thelist {
      overflow: hidden;
      .file-item {
        width: 123px;
        height: 106px;
        display: inline-table;
        overflow: hidden;
        border: #cccccc 1px solid;
        margin: 3px;
        position: relative;
        float: left;

        .file_name {
          float: left;
          text-align: left;
          margin-left: 2px;
          margin-top: 2px;

          .imgPreview {
            width: 100px;
            height: 80px;
            overflow: hidden;
            display: inline-block;
            text-decoration: none;
            outline: none;
            color: #333;
            cursor: pointer;

            .thumb {
              width: 100%;
              height: 100%;
              vertical-align: middle;
              border: 0;
            }
          }
          .fname {
            position: absolute;
            left: 0;
            bottom: 0;
            width: 123px;
            white-space: nowrap;
            text-overflow: ellipsis;
            -o-text-overflow: ellipsis;
            overflow: hidden;
            z-index: 10;
            margin-bottom: 5px;
            .content;
          }
          .file_operation {
            width: 16px;
            position: absolute;
            right: 2px;
            float: left;
            top: 2px;

            i.el-icon-download {
              text-decoration: none;
              color: #56C387;
              cursor: pointer;
            }

            i.el-icon-close {
              text-decoration: none;
              color: #C23A26;
              cursor: pointer;
            }
          }
        }
      }
    }
  }
  /deep/ .carousel-wrapper {
    width: 800px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-55%, -55%);
    background: rgba(153, 153, 153, 0.4);
    z-index: 100;
    .tool-container {
      height: 30px;
      position: relative;
      background: #8A8A8A;
      z-index: 10;
      cursor:move;
      &:hover {
        background: cornflowerblue;
        transition: all .5s;
      }
      .el-icon-close {
        position: absolute;
        top: 5px;
        right: 5px;
        color: red;
        cursor: pointer;
        z-index: 101;
        font-size: 20px;
        font-weight: 700;
      }
    }
    .el-carousel__arrow {
      background: rgba(7, 17, 27, 0.7);
    }
  }
}
/deep/ .el-carousel__container {
  height: 100%;
}
/deep/ .el-carousel__item {
  text-align: center;
  img.img-item {
    width: 500px;
    position: relative;
    height: auto;
    cursor: pointer;
    margin-top: 45px;
  }
}
</style>
