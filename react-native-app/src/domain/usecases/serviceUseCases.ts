import type { MasterProfile, Service } from '@/models';

type ServiceInput = {
  categoryId: Service['categoryId'];
  title: Service['title'];
  description: Service['description'];
  price: Service['price'];
  priceType: Service['priceType'];
  durationMin: Service['durationMin'];
};

type UpdateMasterServiceInput = {
  master: MasterProfile;
  service: Service;
  services: Service[];
  serviceInput: ServiceInput;
  timestamp: string;
};

type AddServiceInput = {
  master: MasterProfile;
  services: Service[];
  serviceInput: ServiceInput;
  timestamp: string;
};

type SetServiceActiveInput = {
  master: MasterProfile;
  service: Service;
  services: Service[];
  isActive: boolean;
  timestamp: string;
};

type ServiceChangeResult = {
  updatedMaster: MasterProfile;
  updatedService: Service;
  services: Service[];
};

type AddServiceResult = {
  updatedMaster: MasterProfile;
  newService: Service;
  services: Service[];
};

type SetServiceActiveResult =
  | {
      success: true;
      updatedMaster: MasterProfile;
      updatedService: Service;
      services: Service[];
    }
  | {
      success: false;
      error: string;
    };

function getActiveServicePrices(services: Service[], masterId: number) {
  return services
    .filter((service) => service.masterId === masterId && service.isActive)
    .map((service) => service.price);
}

function getPriceFrom(services: Service[], master: MasterProfile) {
  const activePrices = getActiveServicePrices(services, master.id);

  if (activePrices.length === 0) {
    return master.priceFrom;
  }

  return Math.min(...activePrices);
}

export function updateMasterService({
  master,
  service,
  services,
  serviceInput,
  timestamp,
}: UpdateMasterServiceInput): ServiceChangeResult {
  const updatedService: Service = {
    ...service,
    categoryId: serviceInput.categoryId,
    title: serviceInput.title,
    description: serviceInput.description,
    price: serviceInput.price,
    priceType: serviceInput.priceType,
    durationMin: serviceInput.durationMin,
    updatedAt: timestamp,
  };

  const nextServices = services.map((item) =>
    item.id === updatedService.id ? updatedService : item
  );

  const updatedMaster: MasterProfile = {
    ...master,
    description: serviceInput.description,
    priceFrom: getPriceFrom(nextServices, master),
    updatedAt: timestamp,
  };

  return {
    updatedMaster,
    updatedService,
    services: nextServices,
  };
}

export function addServiceToMaster({
  master,
  services,
  serviceInput,
  timestamp,
}: AddServiceInput): AddServiceResult {
  const newService: Service = {
    id: Date.now(),
    masterId: master.id,
    categoryId: serviceInput.categoryId,
    title: serviceInput.title,
    description: serviceInput.description,
    price: serviceInput.price,
    priceType: serviceInput.priceType,
    durationMin: serviceInput.durationMin,
    isActive: true,
    createdAt: timestamp,
    updatedAt: timestamp,
  };

  const nextServices = [...services, newService];
  const updatedMaster: MasterProfile = {
    ...master,
    priceFrom: getPriceFrom(nextServices, master),
    updatedAt: timestamp,
  };

  return {
    updatedMaster,
    newService,
    services: nextServices,
  };
}

export function setServiceActiveForMaster({
  master,
  service,
  services,
  isActive,
  timestamp,
}: SetServiceActiveInput): SetServiceActiveResult {
  const activeServices = services.filter(
    (item) => item.masterId === service.masterId && item.isActive
  );

  if (!isActive && activeServices.length <= 1 && service.isActive) {
    return {
      success: false,
      error: 'At least one active service is required.',
    };
  }

  const updatedService: Service = {
    ...service,
    isActive,
    updatedAt: timestamp,
  };

  const nextServices = services.map((item) =>
    item.id === updatedService.id ? updatedService : item
  );

  const updatedMaster: MasterProfile = {
    ...master,
    priceFrom: getPriceFrom(nextServices, master),
    updatedAt: timestamp,
  };

  return {
    success: true,
    updatedMaster,
    updatedService,
    services: nextServices,
  };
}
