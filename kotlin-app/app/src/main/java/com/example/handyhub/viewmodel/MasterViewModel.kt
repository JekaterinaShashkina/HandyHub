package com.example.handyhub.viewmodel

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.example.handyhub.data.repository.HandyHubRepository
import com.example.handyhub.model.MasterProfile
import com.example.handyhub.model.Service
import kotlinx.coroutines.launch

class MasterViewModel(
    private val repository: HandyHubRepository
) : ViewModel() {

    fun becomeMaster(
        userId: Int,
        categoryId: Int?,
        priceFrom: String,
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
                priceFrom.isBlank() ||
                expYears.isBlank() ||
                description.isBlank() ||
                serviceTitle.isBlank() ||
                servicePrice.isBlank()
            ) {
                onError("Please fill all fields")
                return@launch
            }

            val priceFromDouble = priceFrom.toDoubleOrNull()
            val servicePriceDouble = servicePrice.toDoubleOrNull()
            val expYearsInt = expYears.toIntOrNull()

            if (priceFromDouble == null || servicePriceDouble == null || expYearsInt == null) {
                onError("Price and experience must be numbers")
                return@launch
            }

            val masterId = repository.insertMasterProfile(
                MasterProfile(
                    id = 0,
                    userId = userId,
                    description = description.trim(),
                    expYears = expYearsInt,
                    priceFrom = priceFromDouble,
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
}