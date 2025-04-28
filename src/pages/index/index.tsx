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
      <Button color='primary' onClick={() => console.log("hello")}>Hello world!</Button>
    </View>
  )
}
