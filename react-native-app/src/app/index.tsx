import { useMemo, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { useRouter } from 'expo-router';

import { AppHeader } from '@/components/home/AppHeader';
import { ExpandableCategories } from '@/components/home/ExpandableCategories';
import { MasterCard } from '@/components/home/MasterCard';
import { SearchBar } from '@/components/home/SearchBar';
import { AppFooter } from '@/components/home/AppFooter';

import { HandyHubColors } from '@/constants/theme';
import type { MasterCardItem } from '@/data/handyhub-data';
import { useHandyHub } from '@/state/HandyHubContext';

export default function HomeScreen() {
  const router = useRouter();
  const { categories, getMasterCards } = useHandyHub();
  const [searchText, setSearchText] = useState('');
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);

  const masters: MasterCardItem[] = useMemo(
      () => getMasterCards(),
      [getMasterCards]
    );

  const filteredMasters: MasterCardItem[] = useMemo(() => {
    const query = searchText.trim().toLowerCase();
    return masters.filter((master: MasterCardItem) => {
      const matchesSearch =
        master.fullName.toLowerCase().includes(query) ||
        master.description.toLowerCase().includes(query) ||
        master.categoryName.toLowerCase().includes(query) ||
        master.searchText.toLowerCase().includes(query);

      const matchesCategory =
        selectedCategoryId === null ||
        master.categoryIds.includes(selectedCategoryId);

      return matchesSearch && matchesCategory;
    });
  }, [masters, searchText, selectedCategoryId]);

  return (
    <View style={styles.safeArea}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
      <AppHeader
        onLoginPress={() => {
          router.push('/login' as never);
        }}
        onProfilePress={() => {
          router.push('/profile' as never);
        }}
      />

        <SearchBar value={searchText} onChangeText={setSearchText} />

        <ExpandableCategories
          categories={categories}
          selectedCategoryId={selectedCategoryId}
          onShowAllPress={() => setSelectedCategoryId(null)}
          onCategoryPress={(category) =>
            setSelectedCategoryId(
              selectedCategoryId === category.id ? null : category.id
            )
          }
        />

        <Text style={styles.sectionTitle}>Masters</Text>

        <View style={styles.masterList}>
          {filteredMasters.map((master) => (
            <MasterCard
              key={master.id}
              master={master}
              onPress={() =>
                router.push({
                  pathname: '/master/[id]',
                  params: { id: String(master.id) },
                })
              }
/>
          ))}

          {filteredMasters.length === 0 && (
            <Text style={styles.emptyText}>No specialists found</Text>
          )}
        </View>

        <AppFooter />
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
  sectionTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: HandyHubColors.text,
    marginBottom: 12,
  },

  masterList: {
    gap: 14,
  },
  emptyText: {
    paddingVertical: 24,
    textAlign: 'center',
    color: HandyHubColors.muted,
  },
});
