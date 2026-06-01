import { Pressable, StyleSheet, Text, View } from 'react-native';

import type { MasterService } from '@/components/master-profile/types';
import { HandyHubColors } from '@/constants/theme';

type ServiceCardProps = {
  service: MasterService;
  isSelected: boolean;
  onEdit: () => void;
  onToggleActive: () => void;
  children?: React.ReactNode;
};

export function ServiceCard({
  service,
  isSelected,
  onEdit,
  onToggleActive,
  children,
}: ServiceCardProps) {
  return (
    <View
      style={[
        styles.card,
        isSelected && styles.selectedCard,
        !service.isActive && styles.inactiveCard,
      ]}
    >
      <View style={styles.header}>
        <Text style={styles.title}>{service.title}</Text>
        <Text style={styles.price}>
          {service.priceType} {service.price} EUR
        </Text>
      </View>

      <View style={styles.metaRow}>
        <Text style={styles.category}>{service.categoryName}</Text>
        {!service.isActive && <Text style={styles.hiddenBadge}>Hidden</Text>}
      </View>

      <Text style={styles.description}>{service.description}</Text>
      <Text style={styles.duration}>{service.durationMin} min</Text>

      <View style={styles.actions}>
        <Pressable style={styles.actionButton} onPress={onEdit}>
          <Text style={styles.actionText}>Edit</Text>
        </Pressable>

        <Pressable style={styles.actionButton} onPress={onToggleActive}>
          <Text style={styles.actionText}>
            {service.isActive ? 'Hide' : 'Restore'}
          </Text>
        </Pressable>
      </View>

      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 14,
    borderRadius: 6,
    backgroundColor: HandyHubColors.surface,
  },
  selectedCard: {
    borderWidth: 1,
    borderColor: HandyHubColors.border,
  },
  inactiveCard: {
    opacity: 0.65,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: 12,
    marginBottom: 6,
  },
  title: {
    flex: 1,
    fontSize: 15,
    fontWeight: '700',
    color: HandyHubColors.text,
  },
  price: {
    fontSize: 14,
    fontWeight: '700',
    color: HandyHubColors.text,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 6,
  },
  category: {
    fontSize: 13,
    color: HandyHubColors.accent,
  },
  hiddenBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
    backgroundColor: HandyHubColors.badgeBackground,
    fontSize: 12,
    color: HandyHubColors.muted,
  },
  description: {
    fontSize: 13,
    lineHeight: 19,
    color: HandyHubColors.textSecondary,
  },
  duration: {
    marginTop: 8,
    fontSize: 13,
    color: HandyHubColors.muted,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 14,
    marginTop: 10,
  },
  actionButton: {},
  actionText: {
    fontSize: 13,
    color: HandyHubColors.text,
    textDecorationLine: 'underline',
  },
});
