import { useRouter } from 'expo-router';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useState } from 'react';

import { BackButton } from '@/components/common/BackButton';
import { ScreenHeader } from '@/components/common/ScreenHeader';
import { AddServiceForm } from '@/components/master-profile/AddServiceForm';
import { CurrentServicesSection } from '@/components/master-profile/CurrentServicesSection';
import { HandyHubColors } from '@/constants/theme';
import type {
  MasterService,
  ServiceFormValues,
} from '@/components/master-profile/types';
import { useHandyHub } from '@/state/HandyHubContext';

export default function EditMasterProfileScreen() {
  const router = useRouter();
  const {
    categories,
    currentUser,
    addService,
    getMasterDetailsByUserId,
    setServiceActive,
    updateMasterProfile,
  } = useHandyHub();
  const [selectedServiceId, setSelectedServiceId] = useState<number | null>(null);
  const [statusMessage, setStatusMessage] = useState('');

  const master = currentUser
    ? getMasterDetailsByUserId(currentUser.id)
    : undefined;

  function handleSelectService(service: MasterService) {
    setStatusMessage('');
    setSelectedServiceId((currentId) =>
      currentId === service.id ? null : service.id
    );
  }

  function handleSaveService(service: MasterService, values: ServiceFormValues) {
    if (!master) {
      return {
        success: false,
        error: 'Master profile not found.',
      };
    }

    const result = updateMasterProfile({
      masterId: master.id,
      serviceId: service.id,
      categoryId: values.categoryId,
      title: values.title,
      priceType: values.priceType,
      price: values.price,
      durationMin: values.durationMin,
      description: values.description,
    });

    if (result.success) {
      setStatusMessage('Service saved.');
    }

    return result;
  }

  function handleAddService(values: ServiceFormValues) {
    if (!master) {
      return {
        success: false,
        error: 'Master profile not found.',
      };
    }

    const result = addService({
      masterId: master.id,
      categoryId: values.categoryId,
      title: values.title,
      description: values.description,
      priceType: values.priceType,
      price: values.price,
      durationMin: values.durationMin,
    });

    if (result.success) {
      setSelectedServiceId(null);
      setStatusMessage('Service added.');
    }

    return result;
  }

  function handleToggleService(service: MasterService) {
    const result = setServiceActive({
      serviceId: service.id,
      isActive: !service.isActive,
    });

    if (!result.success) {
      setStatusMessage(result.error ?? 'Service update failed.');
      return;
    }

    setStatusMessage(service.isActive ? 'Service hidden.' : 'Service restored.');
  }

  if (!currentUser || !master) {
    return (
      <View style={styles.safeArea}>
        <BackButton onPress={() => router.back()} />

        <Text style={styles.title}>Edit master profile</Text>
        <Text style={styles.noticeText}>Master profile not found.</Text>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={styles.safeArea}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="interactive"
        showsVerticalScrollIndicator={false}
      >
        <ScreenHeader
          title="Edit master profile"
          onBack={() => router.back()}
        />

        <CurrentServicesSection
          categories={categories}
          services={master.services}
          selectedServiceId={selectedServiceId}
          onSelectService={handleSelectService}
          onToggleService={handleToggleService}
          onSaveService={handleSaveService}
        />

        <AddServiceForm categories={categories} onAdd={handleAddService} />

        {statusMessage ? (
          <Text style={styles.statusText}>{statusMessage}</Text>
        ) : null}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: HandyHubColors.background,
    paddingTop: 40,
  },
  content: {
    paddingHorizontal: 13,
    paddingBottom: 32,
  },
  title: {
    flex: 1,
    fontSize: 18,
    color: HandyHubColors.text,
    textAlign: 'center',
  },
  noticeText: {
    paddingHorizontal: 16,
    textAlign: 'center',
    fontSize: 16,
    color: HandyHubColors.muted,
  },
  statusText: {
    fontSize: 13,
    color: HandyHubColors.success,
    marginTop: 4,
  },
});
