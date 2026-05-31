import { Pressable, StyleSheet, Text, View } from 'react-native';

import { PrimaryButton } from '@/components/common/PrimaryButton';
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
        <PrimaryButton
          title="Become a master"
          onPress={onBecomeMaster}
          fullWidth
          size="large"
        />
      )}

      {isMaster && !hasMasterProfile && (
        <PrimaryButton
          title="Add master profile"
          onPress={onAddMasterProfile}
          fullWidth
          size="large"
        />
      )}

      {isMaster && hasMasterProfile && (
        <>
          <View style={styles.masterNotice}>
            <Text style={styles.masterNoticeText}>
              Your master profile is active.
            </Text>
          </View>

          <PrimaryButton
            title="Edit master profile"
            onPress={onEditMasterProfile}
            fullWidth
            size="large"
          />
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
