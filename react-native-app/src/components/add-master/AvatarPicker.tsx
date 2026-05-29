import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

type AvatarPickerProps = {
  avatarUri: string;
  onPickAvatar: () => void;
};

export function AvatarPicker({ avatarUri, onPickAvatar }: AvatarPickerProps) {
  return (
    <>
      <Text style={styles.label}>Set avatar</Text>
      <View style={styles.avatarRow}>
        {avatarUri ? (
          <Image source={{ uri: avatarUri }} style={styles.avatarPreview} />
        ) : null}

        <Pressable style={styles.uploadButton} onPress={onPickAvatar}>
          <Text style={styles.uploadButtonText}>
            {avatarUri ? 'Change file' : 'Upload file'}
          </Text>
        </Pressable>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  label: {
    fontSize: 13,
    color: '#3F3F3F',
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
    backgroundColor: '#D9DCE5',
  },
  uploadButton: {
    alignSelf: 'flex-start',
    minHeight: 34,
    paddingHorizontal: 18,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#16D83E',
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  uploadButtonText: {
    fontSize: 14,
    color: '#111111',
  },
});
