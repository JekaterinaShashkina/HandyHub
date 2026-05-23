package com.example.handyhub.viewmodel

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.example.handyhub.data.repository.HandyHubRepository
import com.example.handyhub.model.Review
import com.example.handyhub.model.Service
import com.example.handyhub.ui.model.MasterCardUiModel
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.launch

class MasterDetailViewModel(
    private val repository: HandyHubRepository
):ViewModel() {
    private val _master = MutableStateFlow<MasterCardUiModel?>(null)
    val master: StateFlow<MasterCardUiModel?> = _master

    private val _services = MutableStateFlow<List<Service>>(emptyList())
    val services: StateFlow<List<Service>> = _services

    private val _reviews = MutableStateFlow<List<Review>>(emptyList())
    val reviews: StateFlow<List<Review>> = _reviews

    fun loadMaster(masterId: Int) {
        viewModelScope.launch {
            val masterProfile = repository.getMasterProfileById(masterId) ?: return@launch
            val user = repository.getUserById(masterProfile.userId) ?: return@launch
            val services = repository.getServicesByMaster(masterId)
            val firstService = services.firstOrNull()
            val category = firstService?.let {
                repository.getCategoryById(it.categoryId)
            }
            _master.value = MasterCardUiModel(
                id = masterProfile.id,
                fullName = "${user.name} ${user.surname}",
                description = masterProfile.description,
                expYears = masterProfile.expYears,
                priceFrom = masterProfile.priceFrom,
                ratingAvg = masterProfile.ratingAvg,
                reviewsCount = masterProfile.reviewsCount,
                avatarUrl = user.avatarUrl,
                categoryName = category?.name ?: "Specialist",
            )
            _services.value = services
            _reviews.value = repository.getReviewsByMaster(masterId)
        }


    }
}