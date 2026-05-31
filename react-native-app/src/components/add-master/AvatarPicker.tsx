import { Feather } from '@expo/vector-icons';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

import { HandyHubColors } from '@/constants/theme';

type AvatarPickerProps = {
  avatarUri: string;
  onPickAvatar: () => void;
  mode?: 'compact' | 'large';
  uploadText?: string;
  changeText?: string;
};

export function AvatarPicker({
  avatarUri,
  onPickAvatar,
  mode = 'compact',
  uploadText,
  changeText,
}: AvatarPickerProps) {
  const isLarge = mode === 'large';

  return (
    <>
      {!isLarge && <Text style={styles.label}>Set avatar</Text>}

      <View style={[styles.avatarRow, isLarge && styles.largeAvatarBlock]}>
        {avatarUri ? (
          <Image
            source={{ uri: avatarUri }}
            style={isLarge ? styles.largeAvatarPreview : styles.avatarPreview}
          />
        ) : isLarge ? (
          <View style={styles.largeAvatarFallback}>
            <Feather name="user" size={34} color={HandyHubColors.text} />
          </View>
        ) : null}

        <Pressable style={styles.uploadButton} onPress={onPickAvatar}>
          <Text style={styles.uploadButtonText}>
            {avatarUri
              ? changeText ?? 'Change file'
              : uploadText ?? 'Upload file'}
          </Text>
        </Pressable>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  label: {
    fontSize: 13,
    color: HandyHubColors.textSecondary,
    marginBottom: 5,
  },
  avatarRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginTop: 8,
    marginBottom: 28,
  },
  avatarPreview: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: HandyHubColors.avatarBackground,
  },
  largeAvatarBlock: {
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 0,
    marginBottom: 24,
  },
  largeAvatarPreview: {
    width: 92,
    height: 92,
    borderRadius: 46,
    backgroundColor: HandyHubColors.avatarBackground,
    marginBottom: 12,
  },
  largeAvatarFallback: {
    width: 92,
    height: 92,
    borderRadius: 46,
    backgroundColor: HandyHubColors.avatarBackground,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  uploadButton: {
    alignSelf: 'flex-start',
    minHeight: 34,
    paddingHorizontal: 18,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#16D83E',
    backgroundColor: HandyHubColors.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  uploadButtonText: {
    fontSize: 14,
    color: HandyHubColors.text,
  },
});
