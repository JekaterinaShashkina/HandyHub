import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { useHandyHub } from '@/state/HandyHubContext';

export default function ProfileScreen() {
  const router = useRouter();
  const {
    currentUser,
    logout,
    hasMasterProfile,
    updateUserRole,
  } = useHandyHub();

  if (!currentUser) {
    return (
      <View style={styles.safeArea}>
        <Pressable style={styles.backButton} onPress={() => router.back()}>
          <Feather name="arrow-left" size={24} color="#111111" />
        </Pressable>

        <View style={styles.emptyBlock}>
          <Text style={styles.title}>Profile</Text>
          <Text style={styles.text}>You are not signed in.</Text>

          <Pressable
            style={styles.primaryButton}
            onPress={() => router.push('/login' as never)}
          >
            <Text style={styles.primaryButtonText}>Sign in</Text>
          </Pressable>
        </View>
      </View>
    );
  }

  const isClient = currentUser.roleId === 1;
  const isMaster = currentUser.roleId === 2;
  const hasProfile = hasMasterProfile(currentUser.id);
  const initials = `${currentUser.name[0] ?? ''}${currentUser.surname[0] ?? ''}`;

  function handleLogout() {
    logout();
    router.replace('/' as never);
  }

    function handleBecomeMaster() {
        if (!currentUser) {
            return;
        }

        updateUserRole(currentUser.id, 2);
        router.push('/add-master' as never);
    }

  return (
    <View style={styles.safeArea}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Pressable style={styles.backButton} onPress={() => router.back()}>
          <Feather name="arrow-left" size={24} color="#111111" />
        </Pressable>

        <Text style={styles.title}>Profile</Text>

        <View style={styles.profileHeader}>
          {currentUser.avatarUrl ? (
            <Image source={{ uri: currentUser.avatarUrl }} style={styles.avatar} />
          ) : (
            <View style={styles.avatarFallback}>
              <Text style={styles.avatarText}>{initials.toUpperCase()}</Text>
            </View>
          )}

          <Text style={styles.name}>
            {currentUser.name} {currentUser.surname}
          </Text>
          <Text style={styles.role}>
            {isMaster ? 'Master' : 'Client'}
          </Text>
        </View>

        <View style={styles.infoBlock}>
          <InfoRow icon="mail" label="E-mail" value={currentUser.email} />
          <InfoRow icon="phone" label="Phone" value={currentUser.phone} />
        </View>

        <View style={styles.actions}>
            <Pressable
            style={styles.secondaryButton}
            onPress={() => router.push('/edit-profile' as never)}
            >
            <Text style={styles.secondaryButtonText}>Edit profile</Text>
            </Pressable>

          {isClient && (
            <Pressable style={styles.primaryButton} onPress={handleBecomeMaster}>
              <Text style={styles.primaryButtonText}>Become a master</Text>
            </Pressable>
          )}

          {isMaster && !hasProfile && (
            <Pressable
              style={styles.primaryButton}
              onPress={() => router.push('/add-master' as never)}
            >
              <Text style={styles.primaryButtonText}>Add master profile</Text>
            </Pressable>
          )}

          {isMaster && hasProfile && (
            <>
                <View style={styles.masterNotice}>
                <Text style={styles.masterNoticeText}>
                    Your master profile is active.
                </Text>
                </View>

                <Pressable
                style={styles.primaryButton}
                onPress={() => router.push('/edit-master-profile' as never)}
                >
                <Text style={styles.primaryButtonText}>Edit master profile</Text>
                </Pressable>
            </>
            )}

          <Pressable style={styles.logoutButton} onPress={handleLogout}>
            <Text style={styles.logoutButtonText}>Log out</Text>
          </Pressable>
        </View>
      </ScrollView>
    </View>
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
  safeArea: {
    flex: 1,
    backgroundColor: '#F4F4F8',
    paddingTop: 40,
  },
  container: {
    flex: 1,
  },
  content: {
    padding: 16,
    paddingBottom: 32,
  },
  backButton: {
    width: 42,
    height: 42,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  title: {
    marginBottom: 24,
    textAlign: 'center',
    fontSize: 22,
    fontWeight: '700',
    color: '#111111',
  },
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
  emptyBlock: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  text: {
    marginBottom: 18,
    textAlign: 'center',
    fontSize: 16,
    color: '#6B6B6B',
  },
});