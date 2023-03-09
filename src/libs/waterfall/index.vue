<template>
  <div
    class="relative"
    ref="containerTarget"
    :style="{
      height: containerHeight + 'px'
    }"
    :title="containerHeight"
  >
    <!-- 数据渲染 -->
    <template v-if="columnWidth && data.length">
      <div
        v-for="(item, index) in data"
        :key="nodeKey ? item[nodeKey] : index"
        class="m-waterfall-item absolute duration-300"
        :style="{
          width: columnWidth + 'px',
          left: item._style?.left + 'px',
          top: item._style?.top + 'px'
        }"
      >
        <slot :item="item" :width="columnWidth" :index="index" />
      </div>
    </template>
    <template v-else>loading...</template>
  </div>
</template>

<script setup>
import { computed, nextTick, onMounted, onUnmounted, ref, watch } from 'vue'
import {
  getImgElements,
  getAllImg,
  onComplateImgs,
  getMinHeightColumn,
  getMinHeight,
  getMaxHeight
} from './utils'

const props = defineProps({
  // 数据源
  data: {
    type: Array,
    required: true
  },
  // 唯一标识 key
  nodeKey: {
    type: String
  },
  // 列数
  column: {
    type: Number,
    retuired: true,
    default: 2
  },
  // 列间距
  columnSpacing: {
    default: 20,
    type: Number
  },
  // 行间距
  rowSpacing: {
    default: 20,
    type: Number
  },
  // 是否需要进行图片预加载
  picturePreReading: {
    type: Boolean,
    default: true
  }
})

// 容器的总高度
const containerHeight = ref(0)
// 记录每一列高度的容器 key: 所在列 val: 列高
const columnHeightObj = ref({})
/**
 * 构建初始化各列高度, 默认都是0
 */
const useColumnHeightObj = () => {
  columnHeightObj.value = {}
  for (let i = 0; i < props.column; i++) {
    columnHeightObj.value[i] = 0
  }
}
// 容器实例
const containerTarget = ref(null)
// 容器总宽度 (不包含 padding，margin，border)
const containerWidth = ref(0)
// 容器左边距，计算 item left 时，需要使用定位
const containerLeft = ref(0)

/**
 * 计算容器宽度
 */
const useContainerWidth = () => {
  const { paddingLeft, paddingRight } = getComputedStyle(
    containerTarget.value,
    null
  )
  // 记录容器左边距
  containerLeft.value = parseFloat(paddingLeft)
  // 容器宽度 offsetWidth是 border-boxing 模型，所以减去 左右padding 就是 content 区域了
  containerWidth.value =
    containerTarget.value.offsetWidth -
    parseFloat(paddingLeft) -
    parseFloat(paddingRight)
}

// 列宽, 列宽 = (容器 content 宽度 - 列间距) / 列数
const columnWidth = ref(0)

// 列间距计算, 所有列间距和 = (列数 - 1)*列间距
const columnSpacingTotal = computed(() => {
  return props.columnSpacing * (props.column - 1)
})

/**
 * 计算列宽
 * = (容器content宽度 - 所有列间距和)/列数
 */
const useColumnWidth = () => {
  // 计算容器宽度
  useContainerWidth()
  // 计算列宽
  columnWidth.value =
    (containerWidth.value - columnSpacingTotal.value) / props.column
}

onMounted(() => {
  useColumnWidth()
})

// item 高度集合
let itemHeights = []

/**
 * 图片预加载时，监听图片加载完成， 计算item 高度
 */
const waitImgComplate = () => {
  itemHeights = []
  // 拿到所有 item 元素
  let itemElements = [...document.querySelectorAll('.m-waterfall-item')]

  // 获取所有元素的 img 标签
  const imgElements = getImgElements(itemElements)
  // 获取所有 img 标签的图片,返回地址
  const allImgs = getAllImg(imgElements)
  onComplateImgs(allImgs)
    .then(() => {
      // 图片加载完成，获取高度
      itemHeights = itemElements.map((el) => {
        return el.offsetHeight
      })
    })
    .finally(() => {
      console.log(itemHeights)
      // 渲染位置
      useItemLocation()
    })
}

/**
 * 图片不需要预加载时，计算 item 高度
 */
const useItemHeight = () => {
  itemHeights = []
  // 拿到所有 item 元素
  let itemElements = [...document.querySelectorAll('.m-waterfall-item')]
  // 计算 item 高度
  itemHeights = itemElements.map((el) => {
    return el.offsetHeight
  })
  // 渲染位置
  useItemLocation()
}

/**
 * 为每个 item 生成位置属性
 */

const useItemLocation = () => {
  //  遍历数据
  props.data.forEach((item, index) => {
    // 避免重复计算
    if (item._style) return
    // 生成 style 属性
    item._style = {}
    // left
    item._style.left = getItemLeft()
    // top
    item._style.top = getItemTop()
    // 指定容器自增
    increasingHeight(index)
  })
  // 指定容器高度
  containerHeight.value = getMaxHeight(columnHeightObj.value)
}

/**
 * 返回下一个 item 的 left
 */

const getItemLeft = () => {
  // 最小高度所在第几列 * (列宽 + 间距)
  const column = getMinHeightColumn(columnHeightObj.value)
  return (
    column * (columnWidth.value + props.columnSpacing) + containerLeft.value
  )
}

/**
 * 返回下一个 item 的 top
 */

const getItemTop = () => {
  // 列高对象中的最小的高度
  return getMinHeight(columnHeightObj.value)
}

/**
 * 指定列高度自增
 */
const increasingHeight = (index) => {
  // 最小高度所在的列
  const minHeightColumn = getMinHeightColumn(columnHeightObj.value)
  // 该列高度自增 = 本身高度 + 当前 item的offsetHeight + 行间距
  columnHeightObj.value[minHeightColumn] +=
    itemHeights[index] + props.rowSpacing
}

/**
 * 在组件销毁时，清除所有的 _style
 */
onUnmounted(() => {
  props.data.forEach((item) => {
    delete item._style
  })
})

// 监听数据，更新item高度
watch(
  () => props.data,
  (newVal) => {
    // 重置数据源， 如果数据源没有 _style 属性
    const resetColumnHeight = newVal.every((item) => !item._style)
    if (resetColumnHeight) {
      // 构建高度记录容器
      useColumnHeightObj()
    }
    // 根据参数执行 获取item高度方法
    nextTick(() => {
      props.picturePreReading ? waitImgComplate() : useItemHeight()
    })
  },
  {
    deep: true,
    immediate: true
  }
)

/**
 * 重新构建瀑布流
 */
const reset = () => {
  setTimeout(() => {
    // 重新计算列宽
    useColumnWidth()
    // 清空_style 属性
    props.data.forEach((item) => (item._style = null))
  }, 300)
}
/**
 * 监听列数变化，重新布局排列
 */
watch(
  () => props.column,
  (val) => {
    if (props.picturePreReading) {
      // 在 picturePreReading 为 true 的前提下，需要首先为列宽滞空，列宽滞空之后，会取消瀑布流渲染
      columnWidth.value = 0
      // 等待页面渲染之后，重新执行计算。否则在 item 没有指定过高度的前提下，计算出的 item 高度会不正确
      nextTick(reset)
    } else {
      //   不使用图片预加载，前提是知道图片宽度。然后在item组件中通过 item宽/图片原来宽度 * 图片原来高度 计算出缩放后的图片高度
      reset()
    }
  }
)
</script>

<style></style>
