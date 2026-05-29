import { Feather } from '@expo/vector-icons';
import { Image, Pressable, StyleSheet, View } from 'react-native';

import { HandyHubColors } from '@/constants/theme';
import { useHandyHub } from '@/state/HandyHubContext';

type AppHeaderProps = {
  onLoginPress?: () => void;
  onProfilePress?: () => void;
};

export function AppHeader({
  onLoginPress,
  onProfilePress,
}: AppHeaderProps) {
  const { currentUser, logout } = useHandyHub();

  return (
    <View style={styles.header}>
      <Image
        source={require('../../../assets/images/HandyHubTransparent.png')}
        style={styles.logo}
        resizeMode="contain"
      />

      <View style={styles.headerActions}>
        {currentUser ? (
          <>
            <Pressable style={styles.iconButton} onPress={logout}>
              <Feather name="log-out" size={28} color={HandyHubColors.text} />
            </Pressable>

            <Pressable style={styles.iconButton} onPress={onProfilePress}>
              {currentUser.avatarUrl ? (
                <Image
                  source={{ uri: currentUser.avatarUrl }}
                  style={styles.userAvatar}
                />
              ) : (
                <Feather name="user" size={28} color={HandyHubColors.text} />
              )}
            </Pressable>
          </>
        ) : (
          <Pressable style={styles.iconButton} onPress={onLoginPress}>
            <Feather name="log-in" size={28} color={HandyHubColors.text} />
          </Pressable>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    minHeight: 56,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  logo: {
    width: 150,
    height: 46,
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  iconButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  userAvatar: {
  width: 32,
  height: 32,
  borderRadius: 16,
  backgroundColor: HandyHubColors.avatarBackground,
},
});
