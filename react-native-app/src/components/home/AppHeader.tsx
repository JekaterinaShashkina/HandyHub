import { Feather } from '@expo/vector-icons';
import { Image, Pressable, StyleSheet, View } from 'react-native';
import { canAddMaster } from '@/data/handyhub-data';
import { useHandyHub } from '@/state/HandyHubContext';

type AppHeaderProps = {
  onAddMasterPress?: () => void;
};

export function AppHeader({ onAddMasterPress }: AppHeaderProps) {
  const { currentUser } = useHandyHub();
  const showAddMaster = canAddMaster(currentUser);

  return (
    <View style={styles.header}>
      <Image
        source={require('../../../assets/images/HandyHubTransparent.png')}
        style={styles.logo}
        resizeMode="contain"
      />

      <View style={styles.headerActions}>
        {showAddMaster && (
          <Pressable style={styles.iconButton} onPress={onAddMasterPress}>
            <Feather name="plus-circle" size={28} color="#111111" />
          </Pressable>
        )}

        <Pressable style={styles.iconButton}>
          <Feather name="log-in" size={28} color="#111111" />
        </Pressable>

        <Pressable style={styles.iconButton}>
          <Feather name="user" size={28} color="#111111" />
        </Pressable>
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
});