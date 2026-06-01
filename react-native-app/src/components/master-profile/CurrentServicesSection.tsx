import { StyleSheet, Text, View } from 'react-native';

import { EditServiceForm } from '@/components/master-profile/EditServiceForm';
import { ServiceCard } from '@/components/master-profile/ServiceCard';
import type { MasterService, ServiceFormValues } from '@/components/master-profile/types';
import { HandyHubColors } from '@/constants/theme';
import type { Category } from '@/models';

type CurrentServicesSectionProps = {
  categories: Category[];
  services: MasterService[];
  selectedServiceId: number | null;
  onSelectService: (service: MasterService) => void;
  onToggleService: (service: MasterService) => void;
  onSaveService: (
    service: MasterService,
    values: ServiceFormValues
  ) => { success: boolean; error?: string };
};

export function CurrentServicesSection({
  categories,
  services,
  selectedServiceId,
  onSelectService,
  onToggleService,
  onSaveService,
}: CurrentServicesSectionProps) {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Current services</Text>

      <View style={styles.servicesList}>
        {services.map((service) => (
          <ServiceCard
            key={service.id}
            service={service}
            isSelected={service.id === selectedServiceId}
            onEdit={() => onSelectService(service)}
            onToggleActive={() => onToggleService(service)}
          >
            {service.id === selectedServiceId && (
              <EditServiceForm
                key={service.id}
                categories={categories}
                service={service}
                onSave={(values) => onSaveService(service, values)}
              />
            )}
          </ServiceCard>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    marginBottom: 12,
    fontSize: 18,
    fontWeight: '700',
    color: HandyHubColors.text,
  },
  servicesList: {
    gap: 10,
  },
});
