import PlayerBar from '@/components/player/PlayerBar'
import { useEffect, useRef } from 'react'
// import { getWindowSise, onDimensionChange } from '@/utils/tools'
import DrawerNav from './DrawerNav'
import Header from './Header'
import Main from './Main'
import { useSettingValue } from '@/store/setting/hook'
import { COMPONENT_IDS } from '@/config/constant'
import DrawerLayoutFixed, { type DrawerLayoutFixedType } from '@/components/common/DrawerLayoutFixed'
import { scaleSizeW } from '@/utils/pixelRatio'
import BottomNav from '@/screens/Home/Vertical/BottomNav'

const MAX_WIDTH = scaleSizeW(300)

const Content = ({ isHorizontalMode = false }: { isHorizontalMode?: boolean }) => {
  const drawer = useRef<DrawerLayoutFixedType>(null)

  useEffect(() => {
    const changeVisible = (visible: boolean) => {
      if (visible) {
        drawer.current?.openDrawer()
      } else {
        drawer.current?.closeDrawer()
      }
    }

    global.app_event.on('changeMenuVisible', changeVisible)

    return () => {
      global.app_event.off('changeMenuVisible', changeVisible)
    }
  }, [])

  const navigationView = () => <DrawerNav />
  // console.log('render drawer content')

  return (
    <DrawerLayoutFixed
      ref={drawer}
      widthPercentage={0.7}
      widthPercentageMax={MAX_WIDTH}
      visibleNavNames={[COMPONENT_IDS.home]}
      swipeEnabled={true}
      renderNavigationView={navigationView}>
      <Header />
      <Main />
      <PlayerBar isHome isHorizontalMode />
      <BottomNav></BottomNav>
      {/* <View style={styles.container}>
      </View> */}
    </DrawerLayoutFixed>
  )
}

// const styles = createStyle({
//   container: {
//     flex: 1,
//   },
// })

export default Content


