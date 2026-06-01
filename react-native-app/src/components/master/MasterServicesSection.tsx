import { StyleSheet, Text, View } from 'react-native';

import { HandyHubColors } from '@/constants/theme';
import type { MasterDetails } from '@/ui/models';

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
    color: HandyHubColors.text,
    marginBottom: 12,
  },
  servicesList: {
    gap: 10,
  },
  serviceCard: {
    padding: 14,
    borderRadius: 6,
    backgroundColor: HandyHubColors.surface,
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
    color: HandyHubColors.text,
  },
  servicePrice: {
    fontSize: 14,
    fontWeight: '700',
    color: HandyHubColors.text,
  },
  serviceCategory: {
    marginBottom: 6,
    fontSize: 13,
    color: HandyHubColors.accent,
  },
  serviceDescription: {
    fontSize: 13,
    lineHeight: 19,
    color: HandyHubColors.textSecondary,
  },
  serviceDuration: {
    marginTop: 8,
    fontSize: 13,
    color: HandyHubColors.muted,
  },
  emptyText: {
    paddingVertical: 12,
    color: HandyHubColors.muted,
  },
});
