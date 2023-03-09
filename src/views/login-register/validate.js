/*
 * @Description:
 * @Author:
 * @Date: 2022-12-30 16:02:02
 * @LastEditTime: 2023-01-03 10:33:15
 * @LastEditors:  
 */
export const validateUsername = (val) => {
  console.log(val)
  if (!val) return '用户名为必填'
  if (val.length < 3 || val.length >= 13) return '用户名应该在3-12位之间'
  return true
}

/**
 * 密码的表单校验
 */
export const validatePassword = (value) => {
  if (!value) {
    return '密码为必填的'
  }

  if (value.length < 6 || value.length > 12) {
    return '密码应该在 6-12 位之间'
  }
  return true
}

/**
 * 确认密码的表单校验
 */
export const validateConfirmPassword = (value, password) => {
  if (value !== password[0]) {
    return '两次密码输入必须一致'
  }
  return true
}
