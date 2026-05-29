import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { HandyHubColors } from '@/constants/theme';
import { ProfileActions } from '@/components/profile/ProfileActions';
import { ProfileInfo } from '@/components/profile/ProfileInfo';
import { UserReviewsSection } from '@/components/profile/UserReviewsSection';
import { useHandyHub } from '@/state/HandyHubContext';

export default function ProfileScreen() {
  const router = useRouter();
  const {
    currentUser,
    logout,
    hasMasterProfile,
    updateUserRole,
    getReviewsByUserId,
  } = useHandyHub();

  if (!currentUser) {
    return (
      <View style={styles.safeArea}>
        <Pressable style={styles.backButton} onPress={() => router.back()}>
          <Feather name="arrow-left" size={24} color={HandyHubColors.text} />
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
  const userHasMasterProfile = hasMasterProfile(currentUser.id);
  const userReviews = getReviewsByUserId(currentUser.id);

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
          <Feather name="arrow-left" size={24} color={HandyHubColors.text} />
        </Pressable>

        <Text style={styles.title}>Profile</Text>

        <ProfileInfo
          user={currentUser}
          roleLabel={isMaster ? 'Master' : 'Client'}
        />

        <ProfileActions
          isClient={isClient}
          isMaster={isMaster}
          hasMasterProfile={userHasMasterProfile}
          onEditProfile={() => router.push('/edit-profile' as never)}
          onBecomeMaster={handleBecomeMaster}
          onAddMasterProfile={() => router.push('/add-master' as never)}
          onEditMasterProfile={() => router.push('/edit-master-profile' as never)}
          onLogout={handleLogout}
        />

        <UserReviewsSection
          reviews={userReviews}
          onOpenMaster={(masterId) =>
            router.push({
              pathname: '/master/[id]',
              params: { id: String(masterId) },
            })
          }
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: HandyHubColors.background,
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
    color: HandyHubColors.text,
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
    color: HandyHubColors.muted,
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
});
