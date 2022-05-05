/**
 * global plugin js
 * @use in main.js
 */

import ajax from './ajax'
import util from './util'
import { ElMessage, ElMessageBox } from 'element-plus'

export default function (app) {
    const globalMount = app.config.globalProperties
    // 全局ajax
    globalMount.$ajax = ajax

    // 全局util
    globalMount.$util = util

    // element api
    globalMount.$message = ElMessage
    globalMount.$confirm = ElMessageBox.confirm
}
