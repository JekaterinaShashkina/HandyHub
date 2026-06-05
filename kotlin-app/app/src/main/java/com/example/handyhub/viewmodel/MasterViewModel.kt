package com.example.handyhub.viewmodel

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.example.handyhub.data.repository.HandyHubRepository
import com.example.handyhub.model.MasterProfile
import com.example.handyhub.model.Service
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.launch

class MasterViewModel(
    private val repository: HandyHubRepository
) : ViewModel() {
    private val _services = MutableStateFlow<List<Service>>(emptyList())
    val services = _services.asStateFlow()

    private val _currentMasterId = MutableStateFlow<Int?>(null)
    val currentMasterId = _currentMasterId.asStateFlow()

    fun becomeMaster(
        userId: Int,
        categoryId: Int?,
        // priceFrom: String,
        expYears: String,
        description: String,
        serviceTitle: String,
        servicePrice: String,
        onSuccess: () -> Unit,
        onError: (String) -> Unit
    ) {
        viewModelScope.launch {
            if (categoryId == null) {
                onError("Please select category")
                return@launch
            }

            if (
                // priceFrom.isBlank() ||
                expYears.isBlank() ||
                description.isBlank() ||
                serviceTitle.isBlank() ||
                servicePrice.isBlank()
            ) {
                onError("Please fill all fields")
                return@launch
            }

           // val priceFromDouble = priceFrom.toDoubleOrNull()
            val servicePriceDouble = servicePrice.toDoubleOrNull()
            val expYearsInt = expYears.toIntOrNull()

            if (
                // priceFromDouble == null ||
                servicePriceDouble == null || expYearsInt == null) {
                onError("Price and experience must be numbers")
                return@launch
            }

            val masterId = repository.insertMasterProfile(
                MasterProfile(
                    id = 0,
                    userId = userId,
                    description = description.trim(),
                    expYears = expYearsInt,
                    priceFrom = servicePriceDouble,
                    createdAt = System.currentTimeMillis(),
                    updatedAt = System.currentTimeMillis(),
                    isActive = true
                )
            ).toInt()

            repository.insertService(
                Service(
                    id = 0,
                    masterProfileId = masterId,
                    categoryId = categoryId,
                    title = serviceTitle.trim(),
                    price = servicePriceDouble,
                    createdAt = System.currentTimeMillis(),
                    updatedAt = System.currentTimeMillis()
                )
            )

            repository.updateUserRole(
                userId = userId,
                roleId = 2
            )

            onSuccess()
        }
    }
    fun loadServicesForUser(userId: Int) {
        viewModelScope.launch {
            val masterProfile = repository.getMasterProfileByUserId(userId)

            if (masterProfile == null) {
                _services.value = emptyList()
                _currentMasterId.value = null
                return@launch
            }

            _currentMasterId.value = masterProfile.id
            _services.value = repository.getServicesByMaster(masterProfile.id)
        }
    }

    fun loadServicesByMaster(masterProfileId: Int) {
        viewModelScope.launch {
            _currentMasterId.value = masterProfileId
            _services.value = repository.getServicesByMaster(masterProfileId)
        }
    }

    private val _selectedService = MutableStateFlow<Service?>(null)
    val selectedService = _selectedService.asStateFlow()

    fun loadServiceById(serviceId: Int) {
        viewModelScope.launch {
            _selectedService.value = repository.getServiceById(serviceId)
        }
    }

    fun addService(
        masterProfileId: Int,
        categoryId: Int,
        title: String,
        price: String,
        onSuccess: () -> Unit,
        onError: (String) -> Unit
    ) {
        viewModelScope.launch {
            if (title.isBlank() || price.isBlank()) {
                onError("Please fill all fields")
                return@launch
            }
            val priceDouble = price.toDoubleOrNull()
            if (priceDouble == null) {
                onError("Price must be a number")
                return@launch
            }
            repository.insertService(
                Service(
                    id = 0,
                    masterProfileId = masterProfileId,
                    categoryId = categoryId,
                    title = title.trim(),
                    price = priceDouble,
                    createdAt = System.currentTimeMillis(),
                    updatedAt = System.currentTimeMillis()
                )
            )
            loadServicesByMaster(masterProfileId)
            onSuccess()
        }
    }

    fun updateService(
        service: Service,
        title: String,
        price: String,
        onSuccess: () -> Unit,
        onError: (String) -> Unit
    ) {
        viewModelScope.launch {
            if (title.isBlank() || price.isBlank()) {
                onError("Please fill all fields")
                return@launch
            }

            val priceDouble = price.toDoubleOrNull()

            if (priceDouble == null) {
                onError("Price must be a number")
                return@launch
            }

            repository.updateService(
                service.copy(
                    title = title.trim(),
                    price = priceDouble,
                    updatedAt = System.currentTimeMillis()
                )
            )

            _services.value = repository.getServicesByMaster(service.masterProfileId)
            onSuccess()
        }
    }
    fun deleteService(
        service: Service,
        currentServicesCount: Int,
        onSuccess: () -> Unit,
        onError: (String) -> Unit
    ) {
        viewModelScope.launch {
            if (currentServicesCount <= 1) {
                onError("At least one service is required")
                return@launch
            }

            val masterId = service.masterProfileId

            repository.deleteService(service)

            _currentMasterId.value = masterId
            _services.value = repository.getServicesByMaster(masterId)

            onSuccess()
        }
    }
}