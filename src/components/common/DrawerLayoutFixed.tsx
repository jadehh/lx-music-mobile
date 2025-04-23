import React, {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useRef,
  useState,
  useEffect
} from 'react'
import {usePageVisible} from '@/store/common/hook'
import {type COMPONENT_IDS} from '@/config/constant'
import {Drawer} from "react-native-drawer-layout";
import {Dimensions, StyleProp, View, ViewStyle} from "react-native";
import {useSettingValue} from "@/store/setting/hook.ts";

export interface Size{
  width: number
  height: number
}

interface Props {
  visibleNavNames: COMPONENT_IDS[]
  widthPercentage: number
  widthPercentageMax?: number
  children: React.ReactNode
  drawerBackgroundColor?:string
  style?: StyleProp<ViewStyle>
  swipeEnabled?: boolean
  renderNavigationView: () => React.JSX.Element

}



export interface DrawerLayoutFixedType {
  openDrawer: () => void
  closeDrawer: () => void
  fixWidth: () => void
}


const DrawerLayoutFixed = forwardRef<DrawerLayoutFixedType, Props>(({
                                                                      visibleNavNames,
                                                                      widthPercentage,
                                                                      widthPercentageMax,
                                                                      children,
                                                                      drawerBackgroundColor,
                                                                      swipeEnabled,
                                                                      style,
                                                                      ...props
                                                                    }, ref) => {
  // Android 原有逻辑保持不变
  const iosDrawerRef = useRef<{ open: () => void; close: () => void }>(null)
  const [w, setW] = useState<number | `${number}%`>('100%')
  const changedRef = useRef({width: 0, changed: false})
  const [open, setOpen] = useState(false);
  let size:Size = {width:Dimensions.get("window").width*widthPercentage, height:0}
  // // 通用方法
  const fixDrawerWidth = useCallback(() => {
    if (!changedRef.current.width) return
    changedRef.current.changed = true
    setW(changedRef.current.width - 1)
    console.log("Width",w)
  }, [])

  // 平台特定方法
  const openDrawer = useCallback(() => {
    setOpen(true);

  }, [])

  const closeDrawer = useCallback(() => {
    setOpen(false);
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

  const drawerLayoutPosition = useSettingValue('common.drawerLayoutPosition')

  return (
    <Drawer
      style={style}
      drawerStyle={{backgroundColor: drawerBackgroundColor}}
      layout = {size}
      swipeEnabled={swipeEnabled ?? false}
      // swipeEdgeWidth={w}
      // swipeEnabled={false}
      drawerPosition = {drawerLayoutPosition}
      open={open}
      onOpen={() => setOpen(true)}
      onClose={() => setOpen(false)}
      renderDrawerContent={() => {
        return props.renderNavigationView();
      }
      }
    >{children}
    </Drawer>
  )
})


export default DrawerLayoutFixed
