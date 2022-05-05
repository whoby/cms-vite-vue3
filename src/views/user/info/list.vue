<template>
    <div class="page">
        <div class="row toolbar">
            <label>推荐码：</label>
            <el-input type="text" v-model="search.recommendCode" placeholder="请输入推荐码"></el-input>
            <label>是否校验：</label>
            <el-select v-model="search.isValidate" placeholder="请选择" clearable>
                <el-option v-for="(item, i) in stack.validTypes" :key="i" :label="item.name" :value="item.code"></el-option>
            </el-select>
            <el-button type="warning" @click="onSearch" class="ml15">查询</el-button>
        </div>
        <div class="row toolbar">
            <el-button type="info" @click="onAdd()">新建</el-button>
        </div>
        <el-table :data="gridData" :fit="true" stripe>
            <el-table-column prop="id" label="ID" width="80px"></el-table-column>
            <el-table-column prop="province" label="省份">
                <template v-slot="{ row }">{{ row.provinceCity.split('/')[0] }}</template>
            </el-table-column>
            <el-table-column prop="city" label="城市">
                <template v-slot="{ row }">{{ row.provinceCity.split('/')[1] }}</template>
            </el-table-column>
            <el-table-column prop="isValidate" label="是否校验">
                <template v-slot="{ row }">{{ { y: '是', n: '否' }[row.isValidate] }}</template>
            </el-table-column>
            <el-table-column prop="recommendCode" label="推荐码"></el-table-column>
            <el-table-column prop="amName" label="客户经理姓名"></el-table-column>
            <el-table-column prop="amTelephone" label="客户经理手机号"></el-table-column>
            <el-table-column label="操作" width="250">
                <template v-slot="{ row }">
                    <el-button type="primary" size="small" @click="onAdd(row.id)">编辑</el-button>
                    <el-button size="small" @click="doDel(row.id)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="pagerout" v-if="search.total">
            <el-pagination small layout="total, prev, pager, next, jumper" :page-size="search.size" :total="search.total" @current-change="onPageChange"></el-pagination>
        </div>
        <!-- add/edit dialog -->
        <el-dialog title="新增/编辑" v-model="addDialogShow" :close-on-click-modal="false" width="45%">
            <el-form :model="formData">
                <el-form-item label="省市：" required>
                    <dist-picker :distValue="formData.distValue" @onDistPick="onAddDistPick"></dist-picker>
                </el-form-item>
                <el-form-item label="是否校验：" required>
                    <el-select v-model="formData.isValidate" placeholder="请选择" clearable>
                        <el-option v-for="(item, i) in stack.validTypes" :key="i" :label="item.name" :value="item.code"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="推荐码：" required>
                    <el-input type="text" v-model="formData.recommendCode" placeholder="请输入推荐码"></el-input>
                </el-form-item>
                <el-form-item label="客户经理姓名：">
                    <el-input type="text" v-model="formData.amName" placeholder="请输入姓名"></el-input>
                </el-form-item>
                <el-form-item label="客户经理手机号：">
                    <el-input type="text" v-model="formData.amTelephone" placeholder="请输入手机号"></el-input>
                </el-form-item>
            </el-form>
            <slot name="footer">
                <div class="dialog-footer">
                    <el-button type="primary" @click="onSave">确 定</el-button>
                    <el-button @click="addDialogShow = false">取 消</el-button>
                </div>
            </slot>
        </el-dialog>
    </div>
</template>
<script>
import distPicker from 'components/distPicker'
export default {
    name: 'userInfo',
    components: {
        distPicker
    },
    mounted() {
        this.renderGrid()
    },
    data() {
        return {
            url: {
                list: '/custom/info/list',
                save: '/custom/info/save',
                del: '/custom/info/delete',
                detail: '/custom/info/detail'
            },
            stack: {
                validTypes: [
                    {
                        code: 'y',
                        name: '是'
                    },
                    {
                        code: 'n',
                        name: '否'
                    }
                ]
            },
            search: {
                provinceCode: '',
                cityCode: '',
                isValidate: '',
                recommendCode: '',
                total: 0,
                start: 0,
                size: 20
            },
            gridData: [],
            formData: {
                provinceCode: '',
                cityCode: '',
                provinceCity: '',
                distValue: [],
                isValidate: '',
                recommendCode: '',
                amName: '',
                amTelephone: ''
            },
            addDialogShow: false
        }
    },
    methods: {
        onSearch() {
            this.search.start = 0
            this.renderGrid()
        },
        onSearchDistPick(data) {
            this.search.provinceCode = data.province.code
            this.search.cityCode = data.city.code
        },
        renderGrid() {
            const params = this.$util.batchTrim(this.search, true)
            this.$ajax.post(this.url.list, params, (res) => {
                this.gridData = res.list || []
                this.search.total = ~~res.total
            })
        },
        // 新建/编辑
        onAdd(id) {
            if (!id) {
                this.addDialogShow = true
                // 恢复默认值
                for (let key in this.formData) {
                    if (key === 'distValue') {
                        this.formData[key] = []
                    } else {
                        this.formData[key] = ''
                    }
                }
                return
            }

            this.$ajax.post(this.url.detail, { id }, (res) => {
                this.addDialogShow = true
                this.formData = {
                    id,
                    distValue: [res.provinceCode, res.cityCode],
                    ...res
                }
            })
        },
        onAddDistPick(data) {
            this.formData.provinceCode = data.province.code
            this.formData.cityCode = data.city.code
            this.formData.provinceCity = data.province.name + '/' + data.city.name
        },
        onValidate() {
            // 批量处理空格
            this.formData = this.$util.batchTrim(this.formData)

            for (let key in this.formData) {
                if (!this.formData[key]) {
                    this.$message({
                        type: 'error',
                        message: '表单填写不完整，请检查！'
                    })
                    return false
                }
                if (key === 'amTelephone' && !this.$util.isTel(this.formData[key])) {
                    this.$message({
                        type: 'error',
                        message: '手机号格式错误！'
                    })
                    return false
                }
            }
            return true
        },
        onSave() {
            if (!this.onValidate()) {
                return
            }

            let params = {
                ...this.formData
            }

            if (!this.formData.id) {
                Reflect.deleteProperty(params, 'id')
            }

            this.$ajax.post(this.url.save, params, () => {
                this.addDialogShow = false
                this.$message({
                    type: 'success',
                    message: '保存成功！'
                })
                this.renderGrid()
            })
        },
        // 删除
        doDel(id) {
            this.$confirm(`确定要删除当前记录吗?`, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            })
                .then(() => {
                    this.$ajax.post(this.url.del, { id }, (res) => {
                        this.$message({
                            type: 'success',
                            message: res || '操作成功！'
                        })
                        this.renderGrid()
                    })
                })
                .catch(() => {})
        },
        onPageChange(curPage) {
            this.search.start = (curPage - 1) * this.search.size
            this.onSearch()
        }
    }
}
</script>
