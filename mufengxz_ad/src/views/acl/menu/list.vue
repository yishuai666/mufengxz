<script setup>
import { ref, reactive, nextTick } from 'vue'
import { ElMessage, ElMessageBox, ElScrollbar  } from "element-plus";
import { Plus, DeleteFilled, Search, Refresh } from '@element-plus/icons-vue'
import menuApi from '@/api/acl/menu'

//滚动条
let maxHeight = document.body.clientHeight - 300;

const state = reactive({
  tableData: [],
  searchObj: {name:'', type:'',status:'', permissionValue:'', path:'',
    component:'', pid:'', begin:'', end:''},
  // 数据是否正在加载
  listLoading: true,
  saveOrUpdateForm: {name:'', type:'', permissionValue:'', id:'', path:'',
    component:'', icon:'', status:'', pid:''},
})

//分页插件变量
let page = ref(1)
let limit = ref(10)
let total = ref(0)

//saveOrUpdate变量
let saveBtnDisabled = ref(false)
let dialogFormVisible = ref(false)
const rules = reactive({
  name: [
    { required: true, message: '请输入名称', trigger: 'blur' },
  ]
})
const ruleFormRef = ref()
let multipleSelection = ref([])

// 用户Dialog
const addUser = () => {
  dialogFormVisible.value = true
  nextTick(() => {
    ruleFormRef.value.resetFields()
    state.saveOrUpdateForm = { }
  })
}
// 保存Or修改
const saveOrUpdate = () => {
  ruleFormRef.value.validate(valid => {   // valid就是校验的结果
    if (valid) {
      saveBtnDisabled = true // 防止表单重复提交
      if(!state.saveOrUpdateForm.id){
        save()
      } else {
        update()
      }
    }
  })
}
//新增
const save = () => {
  menuApi.save(state.saveOrUpdateForm).then(() => {
    ElMessage.success('新增成功')
    dialogFormVisible.value = false
    fetchData()  // 刷新表格数据
  })
}
//修改
const update = () => {
  menuApi.update(state.saveOrUpdateForm).then(() => {
    ElMessage.success('保存成功')
    dialogFormVisible.value = false
    fetchData()  // 刷新表格数据
  })
}
// 编辑
const handleEdit = (row) => {
  dialogFormVisible.value = true
  nextTick(() => {
    ruleFormRef.value.resetFields()
    state.saveOrUpdateForm = JSON.parse(JSON.stringify(row))
  })
}
//删除
const handleDelete = (id) => {
  ElMessageBox.confirm("此操作将永久删除该菜单, 是否继续?", "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  })
      .then(() => {
        menuApi.removeById(id).then(res => {
          fetchData()
          ElMessage({
            type: "success",
            message: "删除成功",
          });
        })
      })
      .catch(() => {
        ElMessage({
          type: "info",
          message: "取消成功",
        });
      });
}
// 批量删除
const handleSelectionChange = (val) => {
  multipleSelection.value = val
}

const delBatch = () => {
  ElMessageBox.confirm("此操作将永久删除这些菜单, 是否继续?", "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  })
      .then(() => {
        let idList = [];
        multipleSelection.value.forEach(item => {
          idList.push(item.id)
        })
        menuApi.removeRows(idList).then(res => {
          fetchData()
          ElMessage({
            type: "success",
            message: "批量删除成功",
          });
        })
      })
      .catch(() => {
        ElMessage({
          type: "info",
          message: "取消成功",
        });
      });
}

// 加载用户列表数据
function fetchData() {
  menuApi.getPageList(page.value, limit.value, state.searchObj).then(res => {
        state.tableData = res.data.items
        total = res.data.total
        // console.log(state.tableData)
        // 数据加载并绑定成功
        state.listLoading = false
      }
  )
}
// 重置查询表单
const resetData = () => {
  state.searchObj = {name:'', type:'',status:'', permissionValue:'', path:'',
    component:'', pid:'', begin:'', end:''}
  fetchData()
}
fetchData(1)
</script>

<template>
  <div>
    <div class="header">
      <!--查询表单-->
      <div class="form">
        <el-form :inline="true" :model="state.searchObj" class="demo-form-inline">
          <el-form-item label="菜单名称">
            <el-input v-model="state.searchObj.name" placeholder="菜单名称"></el-input>
          </el-form-item>
          <el-form-item label="类型">
            <el-radio-group v-model="state.searchObj.type">
              <el-radio :label="1">目录</el-radio>
              <el-radio :label="2">按钮</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="菜单路径">
            <el-input v-model="state.searchObj.path" placeholder="菜单路径"></el-input>
          </el-form-item>
          <el-form-item label="组件路径">
            <el-input v-model="state.searchObj.component" placeholder="组件路径"></el-input>
          </el-form-item>
          <el-form-item label="权限值">
            <el-input v-model="state.searchObj.permissionValue" placeholder="权限值"></el-input>
          </el-form-item>
          <el-form-item label="所属上级">
            <el-input v-model="state.searchObj.pid" placeholder="所属上级"></el-input>
          </el-form-item>
          <el-form-item label="状态">
            <el-radio-group v-model="state.searchObj.status">
              <el-radio :label="1">正常</el-radio>
              <el-radio :label="0">禁用</el-radio>
            </el-radio-group>
          </el-form-item>


<!--          <el-form-item label="添加时间">
            <el-date-picker
                v-model="state.searchObj.begin"
                type="date"
                placeholder="选择开始时间"
            />
          </el-form-item>
          <el-form-item>
            <el-date-picker
                v-model="state.searchObj.end"
                type="date"
                placeholder="选择截止时间"
            />
          </el-form-item>-->
          <el-form-item>
            <el-button type="primary" :icon="Search" @click="fetchData()">查询</el-button>
            <el-button type="default" :icon="Refresh" @click="resetData()">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="group">
        <el-button type="warning" :icon="Plus" @click="addUser()"><span>添加菜单</span></el-button>
        <el-button type="danger" :icon="DeleteFilled" @click="delBatch"><span>批量删除</span></el-button>
      </div>
    </div>
      <!-- 用户列表 -->
      <div class="content">
        <el-table
            v-loading="state.listLoading"  @selection-change="handleSelectionChange" max-height="520px"
            :data="state.tableData" style="width：100%;" border flexible  header-cell-class-name="active-header"
            cell-class-name="table-center">

          <el-table-column type="selection" width="55">
          </el-table-column>

          <el-table-column prop="name" label="菜单名称" width="150">
          </el-table-column>
          <el-table-column prop="type" label="类型" width="100">
            <template #default="scope">
              <el-tag type="warning" v-if="scope.row.type === 1">目录</el-tag>
              <el-tag type="success" v-if="scope.row.type === 2">按钮</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="icon" label="图标" width="100">
          </el-table-column>
          <el-table-column prop="pid" label="所属上级" width="100">
          </el-table-column>
          <el-table-column prop="permissionValue" label="权限值" width="120">
          </el-table-column>
          <el-table-column prop="path" label="访问路径" width="120">
          </el-table-column>
          <el-table-column prop="component" label="组件路径" width="120">
          </el-table-column>
          <el-table-column prop="status" label="状态" show-overflow-tooltip>
            <template #default="scope">
              <el-tag type="success" v-if="scope.row.status === 1">正常</el-tag>
              <el-tag type="warning" v-if="scope.row.status === 0">禁用</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="gmtCreate" width="180" label="创建时间">

          </el-table-column>
          <el-table-column prop="gmtModified" width="180" label="更新时间">

          </el-table-column>

          <el-table-column label="操作" width="220">
            <template #default="scope">
              <el-button size="small" type="primary" @click="handleEdit(scope.row)">编辑</el-button>
              <el-button size="small" type="danger" @click="handleDelete(scope.row.id)">删除</el-button>
              <!--            <el-popconfirm title="您确定删除吗？" @confirm="handleDelete(scope.row.id)">-->
              <!--              <template #reference>-->
              <!--                <el-button size="small" type="danger">删除</el-button>-->
              <!--              </template>-->
              <!--            </el-popconfirm>-->
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- 分页 -->
      <div style="margin: 10px 0">
        <el-pagination
            @current-change="fetchData()"
            @size-change="fetchData()"
            v-model:current-page="page"
            v-model:page-size="limit"
            background
            :page-sizes="[2, 5, 10, 20]"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
        />

      </div>
      <!-- saveOrUpdate dialog -->
      <el-dialog v-model="dialogFormVisible" title="菜单信息" width="40%">
        <el-form ref="ruleFormRef" :rules="rules" :model="state.saveOrUpdateForm" label-width="80px" style="padding: 0 20px" status-icon>
          <el-form-item prop="name" label="菜单名称">
            <el-input v-model="state.saveOrUpdateForm.name" autocomplete="off" />
          </el-form-item>
          <el-form-item prop="type" label="菜单类型" >
            <el-radio-group v-model="state.saveOrUpdateForm.type">
              <el-radio :label="1">目录</el-radio>
              <el-radio :label="2">按钮</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item prop="icon" label="图标">
            <el-input v-model="state.saveOrUpdateForm.icon" autocomplete="off" />
          </el-form-item>
          <el-form-item prop="status" label="状态">
            <el-radio-group v-model="state.searchObj.status">
              <el-radio :label="1">正常</el-radio>
              <el-radio :label="2">禁用</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item prop="permissionValue" label="权限值">
            <el-input v-model="state.saveOrUpdateForm.permissionValue" autocomplete="off" />
          </el-form-item>
          <el-form-item prop="path" label="访问路径">
            <el-input v-model="state.saveOrUpdateForm.path" autocomplete="off" />
          </el-form-item>
          <el-form-item prop="component" label="组件路径">
            <el-input type="textarea" v-model="state.saveOrUpdateForm.component" autocomplete="off" />
          </el-form-item>
        </el-form>
        <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取消</el-button>
          <el-button type="primary" :disabled="saveBtnDisabled" @click="saveOrUpdate">
            保存
          </el-button>
        </span>
        </template>
      </el-dialog>
    </div>

</template>

<style scoped lang="scss">
.header {
  background: #fff;
  margin-bottom: 20px;
  padding: 10px;

  .el-form-item {
    margin-bottom: 16px;
  }

  .group {
    border: 1px solid #eee;
    padding: 8px;
  }
}
.content {
  background: #fff;
  :deep(.active-header) {
    color: #333;
    text-align: center;
  }
  :deep(.table-center) {
    text-align: center;
  }
  .pagination {
    padding: 10px;
  }
}
.el-pagination {
  justify-content: center;
}
</style>