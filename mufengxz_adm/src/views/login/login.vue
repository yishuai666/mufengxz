<template>
  <div style="height: 100vh; overflow: hidden; background-color: aliceblue">
    <div style="width: 400px; margin: 150px auto; background-color: white; border: 1px solid #ddd; padding: 30px; border-radius: 10px">
      <el-form
          ref="ruleFormRef"
          :model="loginData"
          :rules="loginRules"
          size="large"
          status-icon
      >
        <div style="text-align: center; color: dodgerblue; font-size: 30px; font-weight: bold; margin-bottom: 30px">登 录</div>
        <el-form-item prop="username">
          <el-input v-model="loginData.username" placeholder="请输入账号"  :prefix-icon="User" />
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="loginData.password" show-password placeholder="请输入密码"
                    @keydown="login(ruleFormRef)" :prefix-icon="Lock" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" style="width: 100%" @click="login(ruleFormRef)">登 录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script setup>
  import { reactive, ref } from "vue"
  import { User, Lock } from '@element-plus/icons-vue'
  import request from "@/utils/request";
  import { ElMessage } from "element-plus";
  import { useUserStore } from "@/store/user.js";
  // import { useSysStore } from "@/store/sys.js";
  import { useRoute, useRouter } from "vue-router";

  const route = useRoute()
  const router = useRouter()
  const userStore = useUserStore()


  const loginData = reactive({
    username: "",
    password: "",
  })
  const loginRules = reactive({
    username: [
      { required: true, message: '请输入账号', trigger: 'blur' },
    ],
    password: [
      { required: true, message: '请输入密码', trigger: 'blur' },
      { min: 3, max: 20, message: '密码长度在3-20位之间', trigger: 'blur' },
    ],
  })
  const ruleFormRef = ref()
  const login =  (form) => {
    form.validate(valid => {
      if (valid) {
        form.loading = true
        // 发送表单数据给后台
        userStore.login(loginData).then(res => {
          form.loading = false
          ElMessage.success('登录成功')
          console.log(res)
          /*userStore.setMenu(res.menu)
          userStore.addMenu(router)
          userStore.setToken(res.token)*/
          router.push(route.query.redirect || '/')
        }, error => {
          form.loading = false
          console.log("登录错误:", error)
        });
      }
    })
  }
</script>