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
                        'class': ['el-input', this.isFocus ? 'is-focus' : '']
                    },
                    [
                        h('input', {
                            'class': 'el-input__inner',
                            'attrs': {
                                'placeholder': this.placeholderChange
                            },
                            domProps: {
                                value: self.value
                            },
                            on: {
                                input: function (event) {
                                    var arr = [];
                                    self.options.map(function (item) {
                                        if (item.label.indexOf(event.target.value) > -1) {
                                            arr.push({value: item.value, label: item.label})
                                        }
                                    });
                                    self.storeList = arr;
                                    self.$emit('input', event.target.value);
                                },
                                focus: function () {
                                    this.placeholderChange = this.storeSelect;
                                    if (self.isFocus) {
                                        self.$emit('input', '');
                                    }
                                    self.isFocus = true;
                                },
                                blur: function () {
                                    //self.isFocus = false;
                                }
                            }
                        })
                    ]
                ),
                h('div', {
                    'class': ['el-select-dropdown', this.isFocus ? 'is-focus' : ''],
                    'ref': 'ulRef'
                }, [
                    h('ul', {'class': 'el-select-dropdown__list'}, this.storeList.map(function (item) {
                        return h('li', {
                            'class': 'el-select-dropdown__item',
                            'attrs': {
                                'data-type': item.value
                            },
                            on: {
                                click: function (event) {
                                    this.storeSelect = event.target.innerText;
                                    self.$emit('input', event.target.innerText, event.target.dataset.type);
                                }
                            }
                        }, [item.label])
                    }))
                ])
            ]
        )
    },
    data: function () {
        return {
            isFocus: false,
            storeList: [],
            storeSelect: '',// 储存选中的option
            placeholderChange: ''
        }
    },
    props: {
        value: {
            type: String,
            default: ''
        },
        placeholder: {
            type: String,
            default: '请选择'
        },
        options: {
            type: Array,
            default: []
        }
    },
    created: function () {
        this.storeList = this.options;
        this.placeholderChange = this.placeholder
    },
    methods: {}
});