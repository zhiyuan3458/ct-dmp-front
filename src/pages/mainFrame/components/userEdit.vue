<template>
  <custom-dialog title="个人信息" :visible.sync="showDialog" @close="$emit('update:showDialog', false)">
    <div class="btn-group" ref="btnGroup">
      <el-button
        size="mini"
        class="btn-item"
        icon="ct-icon-save-blue"
        @click="saveFn()">
        保存
      </el-button>
      <el-button
        size="mini"
        class="btn-item"
        icon="ct-icon-analyse-dark-orange"
        @click="editPwdFn()">
        修改密码
      </el-button>
    </div>
    <div class="form-container">
      <el-form :model="formData" ref="ctForm" v-loading="metaData.loading">
          <el-collapse v-model="activeNames">
            <el-collapse-item title="A.账号信息" name="1">
              <table class="form-table" width="100%">
                <colgroup>
                  <col width="12%"/>
                  <col width="38%"/>
                  <col width="12%"/>
                  <col width="38%"/>
                </colgroup>
                <tr>
                  <th>账号：</th>
                  <td>
                    <el-form-item label="" prop="userAccount" :rules="[$validate.Required]">
                      <el-input class="form-input" v-model="formData.userAccount" :readonly="true"></el-input>
                    </el-form-item>
                  </td>
                  <th rowspan="4">头像：</th>
                  <td rowspan="4">
                    <div class="pic">
                      <div :style="{'width': '150px', 'height':'155px',  'overflow': 'hidden', 'margin': '5px'}">
                        <div style="width:150px;height:160px;">
                          <img :src="formData.avator" style="width:150px;height:160px;">
                        </div>
                      </div>
                      <el-button size="mini" icon="ct-icon-add" @click="openAvator">上传头像</el-button>
                    </div>
                  </td>
                </tr>
                <tr>
                  <th>最近登录时间：</th>
                  <td>
                    <el-form-item label="" prop="recentLandingTime">
                      <el-input class="form-input" v-model="formData.recentLandingTime" :readonly="true"></el-input>
                    </el-form-item>
                  </td>
                </tr>
                <tr>
                  <th>在线状态：</th>
                  <td>
                    <el-form-item label="" prop="onlineFlag">
                      <el-input class="form-input" v-model="formData.onlineFlag" ></el-input>
                    </el-form-item>
                  </td>
                </tr>
                <tr>
                  <th>账号状态：</th>
                  <td>
                    <el-form-item label="" prop="accountStatus">
                      <el-input class="form-input" v-model="formData.accountStatus" ></el-input>
                    </el-form-item>
                  </td>
                </tr>
                <tr>
                  <th> 角色：</th>
                  <td>
                    {{role}}
                  </td>
                  <th> 部门：</th>
                  <td>
                    {{dept}}
                  </td>
                </tr>
                <tr>
                  <th>消息推送方式</th>
                  <td colspan="3">
                    <el-form-item label="" prop="noticeType">
                      <form-component
                        v-model="formData.noticeType"
                        type="checkbox"
                        :readOnly="readOnly"
                        dictionaryCode="noticeType"
                      ></form-component>
                    </el-form-item>
                  </td>
                </tr>
              </table>
            </el-collapse-item>
            <el-collapse-item title="B.个人基本信息" name="2">
              <table class="form-table" width="100%">
                <colgroup>
                  <col width="12%"/>
                  <col width="38%"/>
                  <col width="12%"/>
                  <col width="38%"/>
                </colgroup>
                <tr>
                  <th><span style="color: red;">*</span> 用户姓名：</th>
                  <td>
                    <el-form-item label="" prop="userName">
                      <el-input class="form-input" v-model="formData.userName" :readonly="true"></el-input>
                    </el-form-item>
                  </td>
                  <th>账号等级：</th>
                  <td>
                    <el-form-item label="" prop="grade">
                      <el-input class="form-input" v-model="formData.grade" ></el-input>
                    </el-form-item>
                  </td>
                </tr>
                <tr>
                  <th>员工编号：</th>
                  <td>
                    <el-form-item label="" prop="employeeId" :rules="[$validate.Required]">
                      <el-input class="form-input" v-model="formData.employeeId" :readonly="true"></el-input>
                    </el-form-item>
                  </td>
                  <th>岗位：</th>
                  <td>
                    <el-form-item label="" prop="job">
                      <el-input class="form-input" v-model="formData.job" :readonly="true"></el-input>
                    </el-form-item>
                  </td>
                </tr>
                <tr>
                  <th>性别：</th>
                  <td>
                    <el-form-item label="" prop="sex">
                      <form-component
                        v-model="formData.sex"
                        type="radio"
                        :readonly="true"
                        dictionaryCode="sex"
                      ></form-component>
                    </el-form-item>
                  </td>
                  <th>出生日期：</th>
                  <td>
                    <el-form-item label="" prop="birthday">
                      <el-date-picker
                        v-model="formData.birthday"
                        type="date"
                        >
                      </el-date-picker>
                    </el-form-item>
                  </td>
                </tr>
                <tr>
                  <th>员工状态：</th>
                  <td>
                    <el-form-item label="" prop="jobPosition">
                      <form-component
                        v-model="formData.jobPosition"
                        type="select"
                        :readonly="true"
                        dictionaryCode="jobPosition"
                      ></form-component>
                    </el-form-item>
                  </td>
                  <th></th>
                  <td></td>
                </tr>
              </table>
            </el-collapse-item>
            <el-collapse-item title="C.联系方式" name="3">
              <table class="form-table" width="100%">
                <colgroup>
                  <col width="12%"/>
                  <col width="38%"/>
                  <col width="12%"/>
                  <col width="38%"/>
                </colgroup>
                <tr>
                  <th>工作电话：</th>
                  <td>
                    <el-form-item label="" prop="officeTel">
                      <el-input class="form-input" v-model="formData.officeTel" ></el-input>
                    </el-form-item>
                  </td>
                  <th>工作地址：</th>
                  <td>
                    <el-form-item label="" prop="officeAddres">
                      <el-input class="form-input" v-model="formData.officeAddres" ></el-input>
                    </el-form-item>
                  </td>
                </tr>
                <tr>
                  <th>工作传真：</th>
                  <td>
                    <el-form-item label="" prop="officeFax">
                      <el-input class="form-input" v-model="formData.officeFax" ></el-input>
                    </el-form-item>
                  </td>
                  <th>移动电话：</th>
                  <td>
                    <el-form-item label="" prop="mobile" :rules="[$validate.Mobile]">
                      <el-input class="form-input" v-model="formData.mobile" ></el-input>
                    </el-form-item>
                  </td>
                </tr>
                <tr>
                  <th>联系人：</th>
                  <td>
                    <el-form-item label="" prop="contactMan">
                      <el-input class="form-input" v-model="formData.contactMan" ></el-input>
                    </el-form-item>
                  </td>
                  <th>联系电话：</th>
                  <td>
                    <el-form-item label="" prop="contactPhone">
                      <el-input class="form-input" v-model="formData.contactPhone" ></el-input>
                    </el-form-item>
                  </td>
                </tr>
                <tr>
                  <th>住宅电话：</th>
                  <td>
                    <el-form-item label="" prop="homeTel" :rules="[$validate.Phone]">
                      <el-input class="form-input" v-model="formData.homeTel" ></el-input>
                    </el-form-item>
                  </td>
                  <th>住宅地址：</th>
                  <td>
                    <el-form-item label="" prop="homeAddress">
                      <el-input class="form-input" v-model="formData.homeAddress" ></el-input>
                    </el-form-item>
                  </td>
                </tr>
                <tr>
                  <th>邮编：</th>
                  <td>
                    <el-form-item label="" prop="postalCode" :rules="[$validate.PostCode]">
                      <el-input class="form-input" v-model="formData.postalCode" ></el-input>
                    </el-form-item>
                  </td>
                  <th>个人博客：</th>
                  <td>
                    <el-form-item label="" prop="blog">
                      <el-input class="form-input" v-model="formData.blog" ></el-input>
                    </el-form-item>
                  </td>
                </tr>
                <tr>
                  <th>QQ：</th>
                  <td>
                    <el-form-item label="" prop="qqNumber" :rules="[$validate.QQ]">
                      <el-input class="form-input" v-model="formData.qqNumber" ></el-input>
                    </el-form-item>
                  </td>
                  <th>微信：</th>
                  <td>
                    <el-form-item label="" prop="wechatNumber">
                      <el-input class="form-input" v-model="formData.wechatNumber" ></el-input>
                    </el-form-item>
                  </td>
                </tr>
                <tr>
                  <th>邮箱：</th>
                  <td>
                    <el-form-item label="" prop="email" :rules="[$validate.Email]">
                      <el-input class="form-input" v-model="formData.email" ></el-input>
                    </el-form-item>
                  </td>
                  <th></th>
                  <td>
                  </td>
                </tr>
              </table>
            </el-collapse-item>
            <el-collapse-item title="D.学历职称" name="4">
              <table class="form-table" width="100%">
                <colgroup>
                  <col width="12%"/>
                  <col width="38%"/>
                  <col width="12%"/>
                  <col width="38%"/>
                </colgroup>
                <tr>
                  <th>证件名称：</th>
                  <td>
                    <el-form-item label="" prop="identityNam">
                      <el-input class="form-input" v-model="formData.identityNam" ></el-input>
                    </el-form-item>
                  </td>
                  <th>证件号码：</th>
                  <td>
                    <el-form-item label="" prop="identityCode">
                      <el-input class="form-input" v-model="formData.identityCode" ></el-input>
                    </el-form-item>
                  </td>
                </tr>
                <tr>
                  <th>学历：</th>
                  <td>
                    <el-form-item label="" prop="education">
                      <form-component
                        v-model="formData.education"
                        type="select"
                        :readOnly="false"
                        dictionaryCode="education"
                      ></form-component>
                    </el-form-item>
                  </td>
                  <th>学位：</th>
                  <td>
                    <el-form-item label="" prop="degree">
                      <el-input class="form-input" v-model="formData.degree" ></el-input>
                    </el-form-item>
                  </td>
                </tr>
                <tr>
                  <th>毕业学校：</th>
                  <td>
                    <el-form-item label="" prop="university">
                      <el-input class="form-input" v-model="formData.university" ></el-input>
                    </el-form-item>
                  </td>
                  <th></th>
                  <td></td>
                </tr>
              </table>
            </el-collapse-item>
          </el-collapse>
      </el-form>
      <el-dialog title="上传头像" width="700px" :visible.sync="metaData.dialogVisible">
        <div class="cropper-content">
          <div class="cropper">
            <vue-cropper
              ref="cropper"
              :img="metaData.cropperOption.img"
              :outputSize="metaData.cropperOption.size"
              :outputType="metaData.cropperOption.outputType"
              :info="false"
              :full="metaData.cropperOption.full"
              :canMove="metaData.cropperOption.canMove"
              :canMoveBox="metaData.cropperOption.canMoveBox"
              :original="metaData.cropperOption.original"
              :autoCrop="metaData.cropperOption.autoCrop"
              :fixedBox="metaData.cropperOption.fixedBox"
              :fixed="metaData.cropperOption.fixed"
              @realTime="realTime"
              @imgLoad="imgLoad"
            ></vue-cropper>
          </div>
        </div>
        <div :style="{'width': '150px', 'height':'155px',  'overflow': 'hidden', 'margin': '5px'}">
          <div style="width:150px;height:160px;">
            <img :src="metaData.previews.url" :style="metaData.previews.img">
          </div>
        </div>
        <label class="btn btn-orange" for="uploads" style="display:inline-block;width: 70px;padding: 0;text-align: center;line-height: 28px;">选择图片</label>
        <input type="file" id="uploads" :value="metaData.imgFile" style="position:absolute; clip:rect(0 0 0 0);" accept="image/png, image/jpeg, image/gif, image/jpg" @change="uploadImg($event, 1)">
        <el-button size="mini" title="放大" @click="changeScale(1)">+</el-button>
        <el-button size="mini" title="缩小" @click="changeScale(-1)">-</el-button>
        <el-button size="mini" title="左旋转" @click="rotateLeft">↺</el-button>
        <el-button size="mini" title="右旋转" @click="rotateRight">↻</el-button>
        <el-button size="mini" @click="uploadAvator()">上传</el-button>
        <div slot="footer" class="dialog-footer">
          <el-button @click="metaData.dialogVisible = false">取消</el-button>
        </div>
      </el-dialog>
      <custom-dialog title="修改密码" width="400px" height="400" :visible.sync="metaData.editPwdDialogVisible">
        <div class="cropper-content dialog-form">
          原始密码:<el-input class="form-input" v-model="metaData.originalPassword" ></el-input>
          新密码:<el-input class="form-input" v-model="metaData.newPassword" ></el-input>
          确认密码:<el-input class="form-input" v-model="metaData.confirmPassword" ></el-input>
          <div slot="footer" class="dialog-footer">
            <el-button @click="savePwdFn()">保存</el-button>
            <el-button @click="metaData.editPwdDialogVisible = false">取消</el-button>
          </div>
        </div>
      </custom-dialog>
    </div>
    </custom-dialog>
</template>
<script type="text/ecmascript-6">
import formComponent from '@/components/formComponent';
import customDialog from '@/components/dialog';
import { VueCropper } from 'vue-cropper';
import userApi from '@/api/backStageSystem/user';
export default {
  components: {
    formComponent,
    VueCropper,
    customDialog
  },
  data ()
  {
    return {
      readOnly: false,
      formData: {},
      role: '', // 角色
      dept: '', // 部门
      activeNames: ['1', '2', '3', '4'],
      metaData: {
        originalPassword: '', // 原始密码
        newPassword: '', // 新密码
        confirmPassword: '', // 确认密码
        loading: false,
        previews: {},
        cropperOption: {
          img: '',
          outputSize: 1, // 剪切后的图片质量（0.1-1）
          full: true, // 输出原图比例截图 props名full
          outputType: 'png',
          canMove: true,
          original: false,
          canMoveBox: true,
          autoCrop: true,
          autoCropWidth: 150,
          autoCropHeight: 150,
          fixedBox: true,
          fixed: false
        },
        fileName: '', // 本机文件地址
        imgFile: '',
        dialogVisible: false, // 是否弹出头像预览
        editPwdDialogVisible: false // 是否弹出修改密码弹窗
      }
    };
  },
  props: {
    showDialog: {
      required: true,
      default: false
    }
  },
  methods: {
    /**
     * 表单提交
     * @author   chenguang
     * @date     2018/9/29
     */
    saveFn ()
    {
      this.$confirm('确认保存数据?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() =>
      {
        this.$refs['ctForm'].validate((valid) =>
        {
          if (valid)
          {
            this.loading = true;
            this.formData = Object.assign({}, this.formData, {isUserOperate: '1'});
            userApi.save(this.formData).then(({ data }) =>
            {
              this.loading = false;
            });
          }
          else
          {
            return false;
          }
        });
      });
    },
    /**
     * 修改密码弹窗打开
     * @author   chenguang
     * @date     2019/1/7
     */
    editPwdFn ()
    {
      this.metaData.editPwdDialogVisible = true;
    },
    /**
     * 修改密码保存
     * @author   chenguang
     * @date     2019/1/7
     */
    savePwdFn ()
    {
      if (this.metaData.originalPassword === '' || this.metaData.originalPassword === null)
      {
        this.$message('原始密码不能为空');
        return false;
      }
      else if (this.metaData.newPassword === '' || this.metaData.newPassword === null)
      {
        this.$message('新密码不能为空');
        return false;
      }
      else if (this.metaData.newPassword.length < 6)
      {
        this.$message('新密码长度不能小于6');
        return false;
      }
      else if (this.metaData.confirmPassword === '' || this.metaData.confirmPassword === null)
      {
        this.$message('确认密码不能为空');
        return false;
      }
      else if (this.metaData.newPassword !== this.metaData.confirmPassword)
      {
        this.$message('新密码与确认密码不一致');
        return false;
      }
      else
      {
        userApi.editPwd({originalPassword: this.metaData.originalPassword, newPassword: this.metaData.newPassword, confirmPassword: this.metaData.confirmPassword}).then(({ data }) =>
        {
          this.$message({
            message: '修改成功！',
            type: 'success'
          });
          this.metaData.editPwdDialogVisible = false;
        });
      }
    },
    /**
     * 开启头像上传modal框
     * @author   chenguang
     * @date     2018/12/20
     */
    openAvator ()
    {
      this.metaData.dialogVisible = true;
    },
    /**
     * 放大/缩小
     * @author   chenguang
     * @date     2018/12/21
     */
    changeScale (num)
    {
      console.log('changeScale');
      num = num || 1;
      this.$refs.cropper.changeScale(num);
    },
    /**
     * 左旋转
     * @author   chenguang
     * @date     2018/12/21
     */
    rotateLeft ()
    {
      console.log('rotateLeft');
      this.$refs.cropper.rotateLeft();
    },
    /**
     * 右旋转
     * @author   chenguang
     * @date     2018/12/21
     */
    rotateRight ()
    {
      console.log('rotateRight');
      this.$refs.cropper.rotateRight();
    },
    /**
     * 图片上传
     * @author   chenguang
     * @date     2018/12/21
     */
    uploadAvator ()
    {
      this.$refs.cropper.getCropData((data) =>
      {
        let image = data.split(',');
        let avatorOfBase64 = image[1];
        this.$store.dispatch('backStageSystem/_USER/uploadAvator', {userId: this.formData.id, avatorOfBase64: avatorOfBase64}).then((responseData) =>
        {
          this.formData.avator = data;
        });
      });
    },
    /**
     * 实时预览
     * @author   chenguang
     * @date     2018/12/21
     */
    realTime (data)
    {
      this.metaData.previews = data;
    },
    // 选择本地图片
    uploadImg (e, num)
    {
      console.log('uploadImg');
      var _this = this;
      // 上传图片
      var file = e.target.files[0];
      _this.fileName = file.name;
      if (!/\.(gif|jpg|jpeg|png|bmp|GIF|JPG|PNG)$/.test(e.target.value))
      {
        alert('图片类型必须是.gif,jpeg,jpg,png,bmp中的一种');
        return false;
      }
      var reader = new FileReader();
      reader.onload = (e) =>
      {
        let data;
        if (typeof e.target.result === 'object')
        {
          // 把Array Buffer转化为blob 如果是base64不需要
          data = window.URL.createObjectURL(new Blob([e.target.result]));
        }
        else
        {
          data = e.target.result;
        }
        if (num === 1)
        {
          _this.metaData.cropperOption.img = data;
        }
        else if (num === 2)
        {
          _this.example2.img = data;
        }
      };
      reader.readAsArrayBuffer(file);
    },
    imgLoad (msg)
    {
      console.log('imgLoad');
      console.log(msg);
    }
  },
  watch: {
    showDialog (newValue, oldValue)
    {
      if (this.showDialog)
      {
        userApi.edit({}).then(({ data }) =>
        {
          this.formData = data.data.entity;
          userApi.getAvator({userId: data.data.entity.id}).then(({ data }) =>
          {
            this.formData = Object.assign({}, this.formData, {avator: data.data !== '' ? `data:image/jpg;base64,${data.data}` : ''});
          });
          let listDept = data.data.listDept;
          let listRole = data.data.listRole;
          this.dept = listDept.map(dept => dept.name).join(',');
          this.role = listRole.map(role => role.roleName).join(',');
        });
      }
    }
  }
};
</script>

<style lang="less" scoped>
.form-container {
    overflow-x: hidden;
    /deep/ .el-dialog__body {
      overflow: hidden;
      height: 600px;
    }
    /deep/ .el-collapse-item__header {
    height: 24px;
    line-height: 24px;
    padding-left: 5px;
    box-sizing: border-box;
    color: #F56202;
    font-size: 13px;
    font-weight: 700;
    background: #eeeeee;

    &:hover {
      background: #FFE6B0;
    }

    .el-collapse-item__arrow {
      line-height: 24px;
    }
  }
    .info {
      width: 720px;
      margin: 0 auto;
      .oper-dv {
        height:20px;
        text-align:right;
        margin-right:100px;
        a {
          font-weight: 500;
          &:last-child {
            margin-left: 30px;
          }
        }
      }
      .info-item {
        margin-top: 15px;
        label {
          display: inline-block;
          width: 100px;
          text-align: right;
        }
        .sel-img-dv {
          position: relative;
          .sel-file {
            position: absolute;
            width: 90px;
            height: 30px;
            opacity: 0;
            cursor: pointer;
            z-index: 2;
          }
          .sel-btn {
            position: absolute;
            cursor: pointer;
            z-index: 1;
          }
        }
      }
    }

    .cropper-content{
      display: flex;
      display: -webkit-flex;
      justify-content: flex-end;
      -webkit-justify-content: flex-end;
      .cropper{
        width: 260px;
        height: 260px;
      }
      .show-preview{
        flex: 1;
        -webkit-flex: 1;
        display: flex;
        display: -webkit-flex;
        justify-content: center;
        -webkit-justify-content: center;
        .preview{
          overflow: hidden;
          border-radius: 50%;
          border:1px solid #cccccc;
          background: #cccccc;
          margin-left: 40px;
        }
      }
    }
    .cropper-content .show-preview .preview {margin-left: 0;}
  }

  .dialog-form{
    line-height: 30px;
    /deep/ .el-input__inner{
      height: 30px;
      line-height: 30px;
    }
    .dialog-footer{
      margin-top: 25px;
      text-align: center;
    }
  }
</style>
