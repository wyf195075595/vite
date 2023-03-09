/*
 * @Description: 处理瀑布流时的工具函数
 * @Author:  
 * @Date: 2022-12-20 13:45:19
 * @LastEditTime: 2022-12-22 10:58:21
 * @LastEditors:  
 */
/**
 * 从 itemElement 中抽离出所有的 imgElements
 */
export const getImgElements = (itemElements) => {
    const imgElements = []
    itemElements.forEach((el) => {
        imgElements.push(...el.getElementsByTagName('img'))
    })
    return imgElements
}

/**
 * 生成所有的图片链接数组
 */
export const getAllImg = (imgElements) => {
    return imgElements.map((imgElement) => {
        return imgElement.src
    })
}

/**
 * 监听图片数组加载完成（通过 promise 完成）
 */
export const onComplateImgs = (imgs) => {
    // promise 集合
    const promiseAll = []
    // 循环构建 promiseAll
    imgs.forEach((img, index) => {
        promiseAll[index] = new Promise((resolve, reject) => {
            const imageObj = new Image()
            imageObj.src = img
            imageObj.onload = () => {
                console.log('图片onload:');
                resolve({
                    img,
                    index
                })
            }
            imageObj.onerror = () => {
                console.log('图片onerror:');
                resolve({
                    img,
                    index
                })
            }
        })
    })
    return Promise.all(promiseAll)
}

/**
 * 返回列高对象中的最小高度所在的列,一个数字
 */
export const getMinHeightColumn = (columnHeightObj) => {
    const minHeight = getMinHeight(columnHeightObj)
    let rs = Object.keys(columnHeightObj).find((key) => {
        return columnHeightObj[key] === minHeight
    })
    return rs
}

/**
 * 返回列高对象中的最小的高度,一个数字
 */
export const getMinHeight = (columnHeightObj) => {
    const columnHeightArr = Object.values(columnHeightObj)
    return Math.min(...columnHeightArr)
}

/**
 * 返回列高对象中的最大的高度,一个数字
 */
export const getMaxHeight = (columnHeightObj) => {
    const columnHeightArr = Object.values(columnHeightObj)
    return Math.max(...columnHeightArr)
}