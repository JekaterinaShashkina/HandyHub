import { Pressable, StyleSheet, Text, View } from 'react-native';

type ProfileActionsProps = {
  isClient: boolean;
  isMaster: boolean;
  hasMasterProfile: boolean;
  onEditProfile: () => void;
  onBecomeMaster: () => void;
  onAddMasterProfile: () => void;
  onEditMasterProfile: () => void;
  onLogout: () => void;
};

export function ProfileActions({
  isClient,
  isMaster,
  hasMasterProfile,
  onEditProfile,
  onBecomeMaster,
  onAddMasterProfile,
  onEditMasterProfile,
  onLogout,
}: ProfileActionsProps) {
  return (
    <View style={styles.actions}>
      <Pressable style={styles.secondaryButton} onPress={onEditProfile}>
        <Text style={styles.secondaryButtonText}>Edit profile</Text>
      </Pressable>

      {isClient && (
        <Pressable style={styles.primaryButton} onPress={onBecomeMaster}>
          <Text style={styles.primaryButtonText}>Become a master</Text>
        </Pressable>
      )}

      {isMaster && !hasMasterProfile && (
        <Pressable style={styles.primaryButton} onPress={onAddMasterProfile}>
          <Text style={styles.primaryButtonText}>Add master profile</Text>
        </Pressable>
      )}

      {isMaster && hasMasterProfile && (
        <>
          <View style={styles.masterNotice}>
            <Text style={styles.masterNoticeText}>
              Your master profile is active.
            </Text>
          </View>

          <Pressable style={styles.primaryButton} onPress={onEditMasterProfile}>
            <Text style={styles.primaryButtonText}>Edit master profile</Text>
          </Pressable>
        </>
      )}

      <Pressable style={styles.logoutButton} onPress={onLogout}>
        <Text style={styles.logoutButtonText}>Log out</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  actions: {
    gap: 12,
  },
  primaryButton: {
    minHeight: 48,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 6,
    backgroundColor: '#FFD51E',
  },
  primaryButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111111',
  },
  secondaryButton: {
    minHeight: 48,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#D8DCE8',
    borderRadius: 6,
    backgroundColor: '#FFFFFF',
  },
  secondaryButtonText: {
    fontSize: 16,
    color: '#111111',
  },
  logoutButton: {
    minHeight: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoutButtonText: {
    fontSize: 16,
    color: '#D04444',
  },
  masterNotice: {
    padding: 14,
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
  },
  masterNoticeText: {
    textAlign: 'center',
    fontSize: 15,
    color: '#111111',
  },
});
