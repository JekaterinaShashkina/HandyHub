package com.example.handyhub.viewmodel

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.example.handyhub.data.repository.HandyHubRepository
import com.example.handyhub.model.Category
import com.example.handyhub.ui.model.MasterCardUiModel
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.launch

class HomeViewModel(
    private val repository: HandyHubRepository
): ViewModel() {
    private val _categories = MutableStateFlow<List<Category>>(emptyList())
    val categories: StateFlow<List<Category>> = _categories

    private val _masters = MutableStateFlow<List<MasterCardUiModel>>(emptyList())
    val masters: StateFlow<List<MasterCardUiModel>> = _masters


    fun loadData() {
        viewModelScope.launch {
            _categories.value = repository.getAllCategories()
            val masterProfiles = repository.getAllMasterProfiles()
            _masters.value = masterProfiles.mapNotNull { master ->
                val user = repository.getUserById(master.userId)
                val services = repository.getServicesByMaster(master.id)
                val firstService = services.firstOrNull()
                val category = firstService?.let {
                    repository.getCategoryById(it.categoryId)
                }
                val reviews = repository.getReviewsByMaster(master.id)
                val reviewsCount = reviews.size
                val ratingAvg = if (reviews.isNotEmpty()) {
                    reviews.map { it.rating }.average()
                } else {
                    0.0
                }

                user?.let {
                    MasterCardUiModel(
                        id = master.id,
                        fullName = "${user.name} ${user.surname}",
                        phone = user.phone,
                        email = user.email,
                        categoryId = category?.id,
                        categoryName = category?.name ?: "Specialist",
                        description = master.description,
                        expYears = master.expYears,
                        priceFrom = master.priceFrom,
                        ratingAvg = ratingAvg,
                        reviewsCount = reviewsCount,
                        avatarUrl = user.avatarUrl
                    )
                }

            }
        }
    }

}