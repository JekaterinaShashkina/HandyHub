import { Pressable, StyleSheet, Text, View } from 'react-native';

import { HandyHubColors } from '@/constants/theme';

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
    backgroundColor: HandyHubColors.primary,
  },
  primaryButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: HandyHubColors.text,
  },
  secondaryButton: {
    minHeight: 48,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: HandyHubColors.border,
    borderRadius: 6,
    backgroundColor: HandyHubColors.surface,
  },
  secondaryButtonText: {
    fontSize: 16,
    color: HandyHubColors.text,
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
    backgroundColor: HandyHubColors.surface,
  },
  masterNoticeText: {
    textAlign: 'center',
    fontSize: 15,
    color: HandyHubColors.text,
  },
});
