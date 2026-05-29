import { StyleSheet, Text, View } from 'react-native';

import type { MasterDetails } from '@/data/handyhub-data';

type MasterService = MasterDetails['services'][number];

type MasterServicesSectionProps = {
  services: MasterService[];
};

export function MasterServicesSection({ services }: MasterServicesSectionProps) {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Services</Text>

      <View style={styles.servicesList}>
        {services.map((service) => (
          <View key={service.id} style={styles.serviceCard}>
            <View style={styles.serviceHeader}>
              <Text style={styles.serviceTitle}>{service.title}</Text>
              <Text style={styles.servicePrice}>
                {service.priceType} {service.price} EUR
              </Text>
            </View>

            <Text style={styles.serviceCategory}>{service.categoryName}</Text>
            <Text style={styles.serviceDescription}>{service.description}</Text>
            <Text style={styles.serviceDuration}>{service.durationMin} min</Text>
          </View>
        ))}

        {services.length === 0 && (
          <Text style={styles.emptyText}>No active services</Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    marginBottom: 22,
  },
  sectionTitle: {
    fontSize: 18,
    color: '#111111',
    marginBottom: 12,
  },
  servicesList: {
    gap: 10,
  },
  serviceCard: {
    padding: 14,
    borderRadius: 6,
    backgroundColor: '#FFFFFF',
  },
  serviceHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: 12,
    marginBottom: 6,
  },
  serviceTitle: {
    flex: 1,
    fontSize: 15,
    fontWeight: '700',
    color: '#111111',
  },
  servicePrice: {
    fontSize: 14,
    fontWeight: '700',
    color: '#111111',
  },
  serviceCategory: {
    marginBottom: 6,
    fontSize: 13,
    color: '#5368C9',
  },
  serviceDescription: {
    fontSize: 13,
    lineHeight: 19,
    color: '#3F3F3F',
  },
  serviceDuration: {
    marginTop: 8,
    fontSize: 13,
    color: '#6B6B6B',
  },
  emptyText: {
    paddingVertical: 12,
    color: '#6B6B6B',
  },
});
