Vue.component('el-select', {
    render: function (h) {
        var self = this;
        return h('div',
            {
                'class': 'el-select'
            },
            [
                h('div',
                    {
                        class: ['el-input']
                    },
                    [
                        h('input', {
                            class: 'el-input-inner',
                            attrs: {
                                placeholder: this.storePlaceholder
                            },
                            domProps: {
                                placeholder: this.value
                            },
                            on: {
                                input: function (event) {
                                    const value = event.target.value;
                                    self.storeList = self.options.filter(function (item) {
                                        if (item.label.indexOf(value) > -1) {
                                            return item;
                                        }
                                    });
                                    self.isShowEmpty = !self.storeList.length;
                                    // 选中li的时候判断是否非选中的li，是的话再$emit('change', value)
                                    // self.$emit('input', value);
                                },
                                focus: function () {
                                    self.storePlaceholder = self.storeSelect || self.placeholder;
                                    self.storeList = self.options;
                                    self.isFocus = true;
                                    self.isShowList = true;
                                    if (self.isFocus) {
                                        self.$emit('input', '');
                                    }
                                },
                                blur: function () {
                                    //self.isFocus = false;
                                }
                            }
                        })
                    ]
                ),
                h('div', {
                    'class': ['el-select-dropdown', {'visible': this.isShowList}]
                }, [
                    h('ul', {
                        'class': 'el-select-dropdown__list',
                        'style': {'display': !self.isShowEmpty ? 'block' : 'none'}
                    }, this.storeList.map(function (item) {
                        return h('li', {
                            'class': ['el-select-dropdown__item', {'selected': self.storeSelect === item.label}],
                            'attrs': {
                                'data-type': item.value
                            },
                            on: {
                                click: function (event) {
                                    self.isShowList = false;
                                    self.storeSelect = event.target.innerText;
                                    self.$emit('change', event.target.innerText, event.target.dataset.type);
                                }
                            }
                        }, [item.label])
                    })),
                    h('p', {
                        'class': 'el-select-dropdown__empty',
                        'style': {'display': self.isShowEmpty ? 'block' : 'none'}
                    }, ['暂无匹配数据'])
                ])
            ]
        )
    },
    model: {
        prop: 'value',
        event: 'change'
    },
    props: {
        // input value
        value: {
            type: String,
            default: ''
        },
        // input placeholder
        placeholder: {
            type: String,
            default: '请选择'
        },
        // select options数据
        options: {
            type: Array,
            default: []
        }
    },
    data: function () {
        return {
            isFocus: false,
            storeList: [],
            storeSelect: '',// 储存选中的option
            storePlaceholder: '',
            isShowList: false,// 是否显示select列表
            isShowEmpty: false,// 是否显示无匹配数据
        }
    },
    created: function () {
        this.storeList = this.options;
        this.storePlaceholder = this.placeholder
    }
});