<template>
    <el-cascader
        :options="distData"
        :props="props"
        :value="distValue"
        :change-on-select="alone"
        @active-item-change="onProvinceChange"
        @change="onSelectChange"
        clearable
        class="distPicker"
    ></el-cascader>
</template>
<script>
export default {
    name: 'distPicker',
    mounted() {
        this.initProvince()
    },
    props: {
        distValue: {
            type: Array,
            default: function () {
                return []
            }
        },
        alone: {
            type: Boolean,
            default: false
        }
    },
    watch: {
        distValue() {
            this.initProvince()
        }
    },
    data() {
        return {
            stack: {
                cities: []
            },
            distData: [],
            props: {
                label: 'name',
                value: 'code',
                children: 'cities'
            },
            // 最终返回选择的数据
            selected: {
                province: {
                    code: '',
                    name: ''
                },
                city: {
                    code: '',
                    name: ''
                }
            }
        }
    },
    methods: {
        initProvince() {
            this.distData = this.$store.state.provinces || []
            if (this.distData.length) {
                // 需要回显城市
                if (this.distValue.length > 1) {
                    this.onProvinceChange([this.distValue[0]])
                }
                return
            }

            // 第一次才去加载
            this.$ajax.get('/common/provinces', {}, (res) => {
                this.distData = res.map((item) => {
                    return {
                        name: item.province,
                        code: item.code,
                        cities: []
                    }
                })

                this.$store.commit('setProvinces', this.distData)

                // 需要回显城市
                if (this.distValue.length > 1) {
                    this.onProvinceChange([this.distValue[0]])
                }
            })
        },
        onProvinceChange(values) {
            let provinceCode = values[0]
            this.$ajax.get('/common/citys', { provinceCode }, (res) => {
                this.distData.some((item1) => {
                    if (item1.code === provinceCode) {
                        // 保存当前省份数据
                        this.selected.province = {
                            code: item1.code,
                            name: item1.name
                        }

                        // 清空之前城市的选择数据
                        this.selected.city = {
                            code: '',
                            name: ''
                        }

                        // 可以只选择省份
                        if (this.alone) {
                            // 发送数据给事件回调
                            this.$emit('onDistPick', this.selected)
                        }

                        // 找出当前省份下的城市
                        item1.cities = res.map((item2) => {
                            return {
                                code: item2.code,
                                name: item2.city
                            }
                        })

                        // 保存当前省份的所有城市，方便后面查找
                        this.stack.cities = item1.cities.slice()
                        return true
                    }
                })
            })
        },
        onSelectChange(values) {
            if (values.length === 1) {
                this.onProvinceChange(values)
                return
            }

            if (values.length === 2) {
                let cityCode = values[1]

                // 根据code从当前所有省份城市中找出选择的城市完整信息
                this.stack.cities.some((item) => {
                    if (item.code === cityCode) {
                        this.selected.city = {
                            code: item.code,
                            name: item.name
                        }
                        return true
                    }
                })
            } else {
                this.selected = {
                    province: {
                        code: '',
                        name: ''
                    },
                    city: {
                        code: '',
                        name: ''
                    }
                }
            }

            // 发送数据给事件回调
            this.$emit('onDistPick', this.selected)
        }
    }
}
</script>
<style lang="scss" scoped>
.distPicker {
    display: inline-block;
    .el-input {
        width: 280px;
    }
}
</style>
