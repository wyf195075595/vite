/*
 * @Description: 
 * @Author:  
 * @Date: 2022-12-29 15:49:17
 * @LastEditTime: 2022-12-29 16:02:25
 * @LastEditors:  
 */
export default [{
        // 在哪个元素中高亮
        element: '.guide-home',
        popover: {
            title: 'logo',
            description: '点击可以返回首页'
        }
    },
    {
        // 在哪个元素中高亮
        element: '.guide-search',
        popover: {
            title: '搜索',
            description: '搜索您期望的图片'
        }
    },
    {
        element: '.guide-theme',
        popover: {
            title: '风格',
            description: '选择一个您喜欢的风格',
            // 弹出的位置
            position: 'left'
        }
    },
    {
        element: '.guide-start',
        popover: {
            title: '引导',
            description: '这里可再次查看引导信息',
            position: 'left'
        }
    },
    {
        element: '.guide-feedback',
        popover: {
            title: '反馈',
            description: '您的任何不满都可以在这里告诉我们',
            position: 'left'
        }
    }
]