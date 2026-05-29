import { Feather } from '@expo/vector-icons';
import { Image, StyleSheet, Text, View } from 'react-native';

import type { User } from '@/data/handyhub-data';

type ProfileInfoProps = {
  user: User;
  roleLabel: string;
};

export function ProfileInfo({ user, roleLabel }: ProfileInfoProps) {
  const initials = `${user.name[0] ?? ''}${user.surname[0] ?? ''}`;

  return (
    <>
      <View style={styles.profileHeader}>
        {user.avatarUrl ? (
          <Image source={{ uri: user.avatarUrl }} style={styles.avatar} />
        ) : (
          <View style={styles.avatarFallback}>
            <Text style={styles.avatarText}>{initials.toUpperCase()}</Text>
          </View>
        )}

        <Text style={styles.name}>
          {user.name} {user.surname}
        </Text>
        <Text style={styles.role}>{roleLabel}</Text>
      </View>

      <View style={styles.infoBlock}>
        <InfoRow icon="mail" label="E-mail" value={user.email} />
        <InfoRow icon="phone" label="Phone" value={user.phone} />
      </View>
    </>
  );
}

function InfoRow({
  icon,
  label,
  value,
}: {
  icon: keyof typeof Feather.glyphMap;
  label: string;
  value: string;
}) {
  return (
    <View style={styles.infoRow}>
      <Feather name={icon} size={20} color="#4F64B8" />
      <View>
        <Text style={styles.infoLabel}>{label}</Text>
        <Text style={styles.infoValue}>{value}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  profileHeader: {
    alignItems: 'center',
    marginBottom: 24,
  },
  avatar: {
    width: 92,
    height: 92,
    borderRadius: 46,
    marginBottom: 12,
    backgroundColor: '#D9DCE5',
  },
  avatarFallback: {
    width: 92,
    height: 92,
    borderRadius: 46,
    marginBottom: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#D9DCE5',
  },
  avatarText: {
    fontSize: 28,
    fontWeight: '700',
    color: '#111111',
  },
  name: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111111',
  },
  role: {
    marginTop: 4,
    fontSize: 15,
    color: '#6B6B6B',
  },
  infoBlock: {
    gap: 14,
    marginBottom: 24,
  },
  infoRow: {
    minHeight: 64,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
  },
  infoLabel: {
    marginBottom: 2,
    fontSize: 13,
    color: '#6B6B6B',
  },
  infoValue: {
    fontSize: 16,
    color: '#111111',
  },
});
