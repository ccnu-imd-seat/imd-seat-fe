import { View } from '@tarojs/components'
import { useLoad } from '@tarojs/taro'
import './index.scss'
import { Button } from "@taroify/core"

export default function Index () {
  useLoad(() => {
    console.log('Page loaded.')
  })

  return (
    <View className='index'>
      <View className="bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 text-white font-bold text-xl p-6 rounded-xl shadow-2xl mb-6 text-center border-4 border-dashed border-yellow-400">
        TailwindCSS 测试：渐变背景、白色大号粗体字、圆角、阴影、虚线边框、内边距、居中
      </View>
      <Button color='primary' onClick={() => console.log("hello")}>Hello world!</Button>
    </View>
  )
}
