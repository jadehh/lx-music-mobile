
/**
 * @File     : BottomNav.ts
 * @Author   : jade
 * @Date     : 2025/4/24 14:48
 * @Email    : jadehh@1ive.com
 * @Software : Samples
 * @Desc     : BottomNav.ts
 """
 */
import {StyleSheet, TouchableOpacity, View} from "react-native";
import {confirmDialog, createStyle, exitApp as backHome} from "@/utils/tools.ts";
import {exitApp, setNavActiveId} from "@/core/common.ts";
import {NAV_MENUS} from "@/config/constant.ts";
import {useI18n} from "@/lang";
import {useNavActiveId} from "@/store/common/hook.ts";
import {useTheme} from "@/store/theme/hook.ts";
import {Icon} from "@/components/common/Icon.tsx";
import {InitState} from "@/store/common/state.ts";
import Text from '@/components/common/Text'


type IdType = InitState['navActiveId'] | 'nav_exit' | 'back_home'


const MenuItem = ({ id, icon, onPress }: {
  id: IdType
  icon: string
  onPress: (id: IdType) => void
}) => {
  const t = useI18n()
  const activeId = useNavActiveId()
  const theme = useTheme()

  return activeId == id
    ? <View style={styles.menuItem}>
        <View style={styles.iconContent}>
          <Icon name={icon} size={20} color={theme['c-primary-font-active']} />
        </View>
        <Text style={styles.text} color={theme['c-primary-font']}>{t(id)}</Text>
      </View>
    : <TouchableOpacity style={styles.menuItem} onPress={() => { onPress(id) }}>
        <View style={styles.iconContent}>
          <Icon name={icon} size={20} color={theme['c-font-label']} />
        </View>
        <Text style={styles.text}>{t(id)}</Text>
      </TouchableOpacity>

}

const BottomNavs = () => {
    const theme = useTheme()
  const handlePress = (id: IdType) => {
    switch (id) {
      case 'nav_exit':
        void confirmDialog({
          message: global.i18n.t('exit_app_tip'),
          confirmButtonText: global.i18n.t('list_remove_tip_button'),
        }).then(isExit => {
          if (!isExit) return
          exitApp('Exit Btn')
        })
        return
      case 'back_home':
        backHome()
        return
    }
    global.app_event.changeMenuVisible(false)
    setNavActiveId(id)
  }
  console.log(theme['c-content-background'])
  return (
      <View style={{ ...styles.tabBar,backgroundColor:theme['c-content-background']}}>
      {NAV_MENUS.map(menu => <MenuItem key={menu.id} id={menu.id} icon={menu.icon} onPress={handlePress} />)}
      </View>
  );
};


const styles = createStyle({
  tabBar: {
    position: 'absolute',
    flexDirection:"row",
    right: 0,
    left:0,
    bottom: 0,
    height: 60,
    borderTopLeftRadius: 30,
    borderTopRightRadius:30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 10, // Android阴影
    shadowColor: '#000', // iOS阴影
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
   // backgroundImage: 'linear-gradient(rgba(0,0,0,0), rgba(0,0,0,1))'
   //  backgroundImage: 'linear-gradient(rgba(255,255,255,0), rgba(255,0,0,1))'
  },
  menuItem: {
    flexDirection: 'column',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'rgba(0, 0, 0, 0.2)',
  },
 iconContent: {
    paddingTop:10,
    alignItems: 'center',
  },
    text: {
       alignItems: 'center',
      paddingBottom:10,
    // fontWeight: '500',
  },
});

export default BottomNavs;
