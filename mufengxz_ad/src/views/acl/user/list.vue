<script setup>
import { ref, reactive, nextTick } from 'vue'
import { ElMessage, ElMessageBox } from "element-plus";
import { Plus, DeleteFilled, Search, Refresh } from '@element-plus/icons-vue'
import userApi from '@/api/acl/user'


const state = reactive({
  tableData: [],
  searchObj: {username:'', nickname:'', begin:'', end:''},
  // 数据是否正在加载
  listLoading: true,
  saveOrUpdateForm: {username:'', nickName:'', password:'', id:'', salt:'', token:''},
})

//分页插件变量
let page = ref(1)
let limit = ref(10)
let total = ref(0)

//saveOrUpdate变量
let saveBtnDisabled = ref(false)
let dialogFormVisible = ref(false)
const rules = reactive({
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
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
  userApi.save(state.saveOrUpdateForm).then(() => {
    ElMessage.success('新增成功')
    dialogFormVisible.value = false
    fetchData()  // 刷新表格数据
  })
}
//修改
const update = () => {
  userApi.updateById(state.saveOrUpdateForm).then(() => {
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
  ElMessageBox.confirm("此操作将永久删除该用户, 是否继续?", "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  })
  .then(() => {
    userApi.removeById(id).then(res => {
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
  ElMessageBox.confirm("此操作将永久删除这些用户, 是否继续?", "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  })
  .then(() => {
    let idList = [];
    multipleSelection.value.forEach(item => {
      idList.push(item.id)
    })
    userApi.removeRows(idList).then(res => {
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
  userApi.getPageList(page.value, limit.value, state.searchObj).then(res => {
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
  state.searchObj = {username:'', nickname:'', begin:'', end:''}
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
          <el-form-item label="用户名">
            <el-input v-model="state.searchObj.username" placeholder="用户名"></el-input>
          </el-form-item>
          <el-form-item label="昵称">
            <el-input v-model="state.searchObj.nickname" placeholder="昵称"></el-input>
          </el-form-item>
          <el-form-item label="添加时间">
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
          </el-form-item>
          <el-form-item>
            <el-button type="primary" :icon="Search" @click="fetchData()">查询</el-button>
            <el-button type="default" :icon="Refresh" @click="resetData()">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="group">
        <el-button type="warning" :icon="Plus" @click="addUser()"><span>添加用户</span></el-button>
        <el-button type="danger" :icon="DeleteFilled" @click="delBatch"><span>批量删除</span></el-button>
      </div>
    </div>
    <!-- 用户列表 -->
    <div class="content">
      <el-table
          v-loading="state.listLoading"  @selection-change="handleSelectionChange"
          :data="state.tableData" style="width：100%;" border flexible  header-cell-class-name="active-header"
          cell-class-name="table-center">

        <el-table-column type="selection" width="55">
        </el-table-column>

        <el-table-column prop="username" label="用户名" width="150">
        </el-table-column>
        <el-table-column prop="nickName" label="昵称" width="150">
        </el-table-column>
        <el-table-column prop="salt" label="用户头像" width="120">
        </el-table-column>
        <el-table-column prop="token" label="用户签名" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="gmtCreate" width="220" label="创建时间">

        </el-table-column>
        <el-table-column prop="gmtModified" width="220" label="更新时间">

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
    <el-dialog v-model="dialogFormVisible" title="用户信息" width="40%">
      <el-form ref="ruleFormRef" :rules="rules" :model="state.saveOrUpdateForm" label-width="80px" style="padding: 0 20px" status-icon>
        <el-form-item prop="salt" label="头像">
          <el-input v-model="state.saveOrUpdateForm.salt" autocomplete="off" />
        </el-form-item>
        <el-form-item prop="username" label="用户名" >
          <el-input v-model="state.saveOrUpdateForm.username" autocomplete="off" />
        </el-form-item>
        <el-form-item prop="nickName" label="用户昵称">
          <el-input v-model="state.saveOrUpdateForm.nickName" autocomplete="off" />
        </el-form-item>
        <el-form-item v-if="!state.saveOrUpdateForm.id" label="用户密码" prop="password">
          <el-input v-model="state.saveOrUpdateForm.password"/>
        </el-form-item>
        <el-form-item prop="salt" label="个性签名">
          <el-input type="textarea" v-model="state.saveOrUpdateForm.token" autocomplete="off" />
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