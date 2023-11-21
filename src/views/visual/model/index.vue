<template>
  <div class="app-container">

    <!-- 搜索工作栏 -->
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="大屏标题" prop="title">
        <el-input v-model="queryParams.title" placeholder="请输入大屏标题" clearable @keyup.enter.native="handleQuery"/>
      </el-form-item>
      <el-form-item label="简介" prop="simpleDesc">
        <el-input v-model="queryParams.simpleDesc" placeholder="请输入简介" clearable @keyup.enter.native="handleQuery"/>
      </el-form-item>
      <el-form-item label="背景图片" prop="bgImg">
        <el-input v-model="queryParams.bgImg" placeholder="请输入背景图片" clearable @keyup.enter.native="handleQuery"/>
      </el-form-item>
      <el-form-item label="背景颜色" prop="bgColor">
        <el-input v-model="queryParams.bgColor" placeholder="请输入背景颜色" clearable @keyup.enter.native="handleQuery"/>
      </el-form-item>
      <el-form-item label="屏幕比例X" prop="scaleX">
        <el-input v-model="queryParams.scaleX" placeholder="请输入屏幕比例X" clearable @keyup.enter.native="handleQuery"/>
      </el-form-item>
      <el-form-item label="屏幕比例Y" prop="scaleY">
        <el-input v-model="queryParams.scaleY" placeholder="请输入屏幕比例Y" clearable @keyup.enter.native="handleQuery"/>
      </el-form-item>
      <el-form-item label="设计预览图" prop="designImgPath">
        <el-input v-model="queryParams.designImgPath" placeholder="请输入设计预览图" clearable @keyup.enter.native="handleQuery"/>
      </el-form-item>
      <el-form-item label="禁用状态：1启用,-1禁用" prop="state">
        <el-input v-model="queryParams.state" placeholder="请输入禁用状态：1启用,-1禁用" clearable @keyup.enter.native="handleQuery"/>
      </el-form-item>
      <el-form-item label="访问码" prop="viewCode">
        <el-input v-model="queryParams.viewCode" placeholder="请输入访问码" clearable @keyup.enter.native="handleQuery"/>
      </el-form-item>
      <el-form-item label="访问量" prop="countView">
        <el-input v-model="queryParams.countView" placeholder="请输入访问量" clearable @keyup.enter.native="handleQuery"/>
      </el-form-item>
      <el-form-item label="是否保存为模板" prop="designType">
        <el-select v-model="queryParams.designType" placeholder="请选择是否保存为模板" clearable size="small">
          <el-option label="请选择字典生成" value="" />
        </el-select>
      </el-form-item>
      <el-form-item label="分组ID" prop="groupId">
        <el-input v-model="queryParams.groupId" placeholder="请输入分组ID" clearable @keyup.enter.native="handleQuery"/>
      </el-form-item>
      <el-form-item label="水印配置" prop="waterMark">
        <el-input v-model="queryParams.waterMark" placeholder="请输入水印配置" clearable @keyup.enter.native="handleQuery"/>
      </el-form-item>
      <el-form-item label="缩放模式：1铺满缩放，2比例缩放，3响应布局" prop="scaleType">
        <el-select v-model="queryParams.scaleType" placeholder="请选择缩放模式：1铺满缩放，2比例缩放，3响应布局" clearable size="small">
          <el-option label="请选择字典生成" value="" />
        </el-select>
      </el-form-item>
      <el-form-item label="创建时间" prop="createTime">
        <el-date-picker v-model="queryParams.createTime" style="width: 240px" value-format="yyyy-MM-dd HH:mm:ss" type="daterange"
                        range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期" :default-time="['00:00:00', '23:59:59']" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>

    <!-- 操作工具栏 -->
    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button type="primary" plain icon="el-icon-plus" size="mini" @click="handleAdd"
                   v-hasPermi="['visual:design-data:create']">新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button type="warning" plain icon="el-icon-download" size="mini" @click="handleExport" :loading="exportLoading"
                   v-hasPermi="['visual:design-data:export']">导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <!-- 列表 -->
    <el-table v-loading="loading" :data="list">
      <el-table-column label="大屏id" align="center" prop="id" />
      <el-table-column label="大屏标题" align="center" prop="title" />
      <el-table-column label="简介" align="center" prop="simpleDesc" />
      <el-table-column label="背景图片" align="center" prop="bgImg" />
      <el-table-column label="背景颜色" align="center" prop="bgColor" />
      <el-table-column label="屏幕比例X" align="center" prop="scaleX" />
      <el-table-column label="屏幕比例Y" align="center" prop="scaleY" />
      <el-table-column label="设计预览图" align="center" prop="designImgPath" />
      <el-table-column label="禁用状态：1启用,-1禁用" align="center" prop="state" />
      <el-table-column label="访问码" align="center" prop="viewCode" />
      <el-table-column label="访问量" align="center" prop="countView" />
      <el-table-column label="是否保存为模板" align="center" prop="designType" />
      <el-table-column label="分组ID" align="center" prop="groupId" />
      <el-table-column label="水印配置" align="center" prop="waterMark" />
      <el-table-column label="缩放模式：1铺满缩放，2比例缩放，3响应布局" align="center" prop="scaleType" />
      <el-table-column label="创建时间" align="center" prop="createTime" width="180">
        <template v-slot="scope">
          <span>{{ parseTime(scope.row.createTime) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template v-slot="scope">
          <el-button size="mini" type="text" icon="el-icon-edit" @click="handleUpdate(scope.row)"
                     v-hasPermi="['visual:design-data:update']">修改</el-button>
          <el-button size="mini" type="text" icon="el-icon-delete" @click="handleDelete(scope.row)"
                     v-hasPermi="['visual:design-data:delete']">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页组件 -->
    <pagination v-show="total > 0" :total="total" :page.sync="queryParams.pageNo" :limit.sync="queryParams.pageSize"
                @pagination="getList"/>

    <!-- 对话框(添加 / 修改) -->
    <el-dialog :title="title" :visible.sync="open" width="500px" v-dialogDrag append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="大屏标题" prop="title">
          <el-input v-model="form.title" placeholder="请输入大屏标题" />
        </el-form-item>
        <el-form-item label="简介" prop="simpleDesc">
          <el-input v-model="form.simpleDesc" placeholder="请输入简介" />
        </el-form-item>
        <el-form-item label="背景图片" prop="bgImg">
          <el-input v-model="form.bgImg" placeholder="请输入背景图片" />
        </el-form-item>
        <el-form-item label="背景颜色" prop="bgColor">
          <el-input v-model="form.bgColor" placeholder="请输入背景颜色" />
        </el-form-item>
        <el-form-item label="屏幕比例X" prop="scaleX">
          <el-input v-model="form.scaleX" placeholder="请输入屏幕比例X" />
        </el-form-item>
        <el-form-item label="屏幕比例Y" prop="scaleY">
          <el-input v-model="form.scaleY" placeholder="请输入屏幕比例Y" />
        </el-form-item>
        <el-form-item label="设计预览图" prop="designImgPath">
          <el-input v-model="form.designImgPath" placeholder="请输入设计预览图" />
        </el-form-item>
        <el-form-item label="禁用状态：1启用,-1禁用" prop="state">
          <el-input v-model="form.state" placeholder="请输入禁用状态：1启用,-1禁用" />
        </el-form-item>
        <el-form-item label="访问码" prop="viewCode">
          <el-input v-model="form.viewCode" placeholder="请输入访问码" />
        </el-form-item>
        <el-form-item label="访问量" prop="countView">
          <el-input v-model="form.countView" placeholder="请输入访问量" />
        </el-form-item>
        <el-form-item label="是否保存为模板" prop="designType">
          <el-select v-model="form.designType" placeholder="请选择是否保存为模板">
            <el-option label="请选择字典生成" value="" />
          </el-select>
        </el-form-item>
        <el-form-item label="分组ID" prop="groupId">
          <el-input v-model="form.groupId" placeholder="请输入分组ID" />
        </el-form-item>
        <el-form-item label="水印配置" prop="waterMark">
          <el-input v-model="form.waterMark" placeholder="请输入水印配置" />
        </el-form-item>
        <el-form-item label="缩放模式：1铺满缩放，2比例缩放，3响应布局" prop="scaleType">
          <el-radio-group v-model="form.scaleType">
            <el-radio label="1">请选择字典生成</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { createDesignData, updateDesignData, deleteDesignData, getDesignData, getDesignDataPage, exportDesignDataExcel } from "@/api/visual/designData";

export default {
  name: "DesignData",
  components: {
  },
  data() {
    return {
      // 遮罩层
      loading: true,
      // 导出遮罩层
      exportLoading: false,
      // 显示搜索条件
      showSearch: true,
      // 总条数
      total: 0,
      // 大屏数据列表
      list: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNo: 1,
        pageSize: 10,
        title: null,
        simpleDesc: null,
        bgImg: null,
        bgColor: null,
        scaleX: null,
        scaleY: null,
        designImgPath: null,
        state: null,
        viewCode: null,
        countView: null,
        designType: null,
        groupId: null,
        waterMark: null,
        scaleType: null,
        createTime: [],
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        designType: [{ required: true, message: "是否保存为模板不能为空", trigger: "change" }],
        scaleType: [{ required: true, message: "缩放模式：1铺满缩放，2比例缩放，3响应布局不能为空", trigger: "blur" }],
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询列表 */
    getList() {
      this.loading = true;
      // 执行查询
      getDesignDataPage(this.queryParams).then(response => {
        this.list = response.data.list;
        this.total = response.data.total;
        this.loading = false;
      });
    },
    /** 取消按钮 */
    cancel() {
      this.open = false;
      this.reset();
    },
    /** 表单重置 */
    reset() {
      this.form = {
        id: undefined,
        title: undefined,
        simpleDesc: undefined,
        bgImg: undefined,
        bgColor: undefined,
        scaleX: undefined,
        scaleY: undefined,
        designImgPath: undefined,
        state: undefined,
        viewCode: undefined,
        countView: undefined,
        designType: undefined,
        groupId: undefined,
        waterMark: undefined,
        scaleType: undefined,
      };
      this.resetForm("form");
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNo = 1;
      this.getList();
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.resetForm("queryForm");
      this.handleQuery();
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加大屏数据";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id;
      getDesignData(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改大屏数据";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (!valid) {
          return;
        }
        // 修改的提交
        if (this.form.id != null) {
          updateDesignData(this.form).then(response => {
            this.$modal.msgSuccess("修改成功");
            this.open = false;
            this.getList();
          });
          return;
        }
        // 添加的提交
        createDesignData(this.form).then(response => {
          this.$modal.msgSuccess("新增成功");
          this.open = false;
          this.getList();
        });
      });
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const id = row.id;
      this.$modal.confirm('是否确认删除大屏数据编号为"' + id + '"的数据项?').then(function() {
          return deleteDesignData(id);
        }).then(() => {
          this.getList();
          this.$modal.msgSuccess("删除成功");
        }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      // 处理查询参数
      let params = {...this.queryParams};
      params.pageNo = undefined;
      params.pageSize = undefined;
      this.$modal.confirm('是否确认导出所有大屏数据数据项?').then(() => {
          this.exportLoading = true;
          return exportDesignDataExcel(params);
        }).then(response => {
          this.$download.excel(response, '大屏数据.xls');
          this.exportLoading = false;
        }).catch(() => {});
    }
  }
};
</script>
