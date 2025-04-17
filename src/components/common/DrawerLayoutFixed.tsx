import {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useRef,
  useState,
  useEffect
} from 'react'
import {
  DrawerLayoutAndroid,
  type DrawerLayoutAndroidProps,
  View,
  type LayoutChangeEvent,
  Platform,
  Animated,
  Modal,
  TouchableWithoutFeedback,
  SafeAreaView
} from 'react-native'
import {usePageVisible} from '@/store/common/hook'
import {type COMPONENT_IDS} from '@/config/constant'

import {log} from "@/utils/log.ts";

interface Props extends DrawerLayoutAndroidProps {
  visibleNavNames: COMPONENT_IDS[]
  widthPercentage: number
  widthPercentageMax?: number
}

export interface DrawerLayoutFixedType {
  openDrawer: () => void
  closeDrawer: () => void
  fixWidth: () => void
}

const IOSDrawer = ({visible, drawerWidth, onClose, children}: {
  visible: boolean
  drawerWidth: number
  onClose: () => void
  children: React.ReactNode
}) => {
  const translateX = useRef(new Animated.Value(-drawerWidth)).current
  useEffect(() => {
    Animated.timing(translateX, {
      toValue: visible ? 0 : -drawerWidth,
      duration: 300,
      useNativeDriver: true
    }).start()
  }, [visible])

  return (
    <Modal transparent visible={visible} onRequestClose={onClose}>
      <TouchableWithoutFeedback onPress={onClose}>
        <Animated.View
          style={[
            styles.iosDrawer,
            {
              transform: [{translateX}]
            }
          ]}
        >
          <SafeAreaView style={[styles.iosContent, {width: drawerWidth}]}>
            {children}
          </SafeAreaView>

        </Animated.View>
      </TouchableWithoutFeedback>
    </Modal>
  )
}

const DrawerLayoutFixed = forwardRef<DrawerLayoutFixedType, Props>(({
                                                                      visibleNavNames,
                                                                      widthPercentage,
                                                                      widthPercentageMax,
                                                                      children,
                                                                      ...props
                                                                    }, ref) => {
  // Android 原有逻辑保持不变
  const drawerLayoutRef = useRef<DrawerLayoutAndroid>(null)
  const iosDrawerRef = useRef<{ open: () => void; close: () => void }>(null)
  const [w, setW] = useState<number | `${number}%`>('100%')
  const [drawerWidth, setDrawerWidth] = useState(0)
  const [iosVisible, setIosVisible] = useState(false)
  const changedRef = useRef({width: 0, changed: false})

  // 通用方法
  const fixDrawerWidth = useCallback(() => {
    if (!changedRef.current.width) return
    changedRef.current.changed = true
    setW(changedRef.current.width - 1)
  }, [])

  // 平台特定方法
  const openDrawer = useCallback(() => {
    if (Platform.OS === 'ios') {
      drawerLayoutRef.current?.openDrawer()
    } else {
      setIosVisible(true)
    }
  }, [])

  const closeDrawer = useCallback(() => {
    if (Platform.OS === 'ios') {
      drawerLayoutRef.current?.closeDrawer()
    } else {
      setIosVisible(false)
    }
  }, [])

  usePageVisible(visibleNavNames, useCallback((visible) => {
    if (!visible || !changedRef.current.width) return
    fixDrawerWidth()
  }, [fixDrawerWidth]))

  useImperativeHandle(ref, () => ({
    openDrawer,
    closeDrawer,
    fixWidth: fixDrawerWidth,
  }), [fixDrawerWidth, openDrawer, closeDrawer])

  const handleLayout = useCallback((e: LayoutChangeEvent) => {
    if (changedRef.current.changed) {
      setW('100%')
      changedRef.current.changed = false
    } else {
      const width = e.nativeEvent.layout.width
      if (changedRef.current.width === width) return
      changedRef.current.width = width

      const wp = Math.floor(width * widthPercentage)
      setDrawerWidth(widthPercentageMax ? Math.min(wp, widthPercentageMax) : wp)
      changedRef.current.changed = true
      setW(width - 1)
    }
  }, [widthPercentage, widthPercentageMax])

  return (
    <View onLayout={handleLayout} style={{width: w, flex: 1}}>
      {Platform.select({
        ios: (
          <DrawerLayoutAndroid
            ref={drawerLayoutRef}
            keyboardDismissMode="on-drag"
            drawerWidth={drawerWidth}
            {...props}
          >
            <View style={{marginRight: w === '100%' ? 0 : -1, flex: 1}}>
              {children}
            </View>
          </DrawerLayoutAndroid>
        ),
        android: (
          <>
            <View style={{marginRight: w === '100%' ? 0 : -1, flex: 1}}>
              {children}
            </View>
            <IOSDrawer
              visible={iosVisible}
              drawerWidth={drawerWidth}
              onClose={closeDrawer}
              children={props.renderNavigationView()}
            >
            </IOSDrawer>
          </>
        )
      })}
    </View>
  )
})

const styles = {
  iosDrawer: {
    flex: 1,
  },
  iosContent: {
    flex: 1,
    paddingTop: 30
  }
}

export default DrawerLayoutFixed
