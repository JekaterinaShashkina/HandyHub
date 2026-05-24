package com.example.handyhub.viewmodel

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.example.handyhub.data.repository.HandyHubRepository
import com.example.handyhub.model.Review
import com.example.handyhub.model.Service
import com.example.handyhub.model.User
import com.example.handyhub.ui.model.MasterCardUiModel
import com.example.handyhub.ui.model.ReviewWithUser
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
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

    private val _reviewsWithUsers = MutableStateFlow<List<ReviewWithUser>>(emptyList())
    val reviewsWithUsers = _reviewsWithUsers.asStateFlow()


    fun loadMaster(masterId: Int) {
        viewModelScope.launch {
            val masterProfile = repository.getMasterProfileById(masterId) ?: return@launch
            val user = repository.getUserById(masterProfile.userId) ?: return@launch
            val services = repository.getServicesByMaster(masterId)
            val firstService = services.firstOrNull()
            val category = firstService?.let {
                repository.getCategoryById(it.categoryId)
            }
            val reviewList = repository.getReviewsByMaster(masterId)
            _reviews.value = reviewList
            _reviewsWithUsers.value = reviewList.mapNotNull { review ->
                val user = repository.getUserById(review.userId)
                if (user != null) {
                    ReviewWithUser(
                        review = review,
                        user = user
                    )
                } else {
                    null
                }
            }
            val reviewsCount = reviewList.size
            val ratingAvg = if (reviewList.isNotEmpty()) {
                reviewList.map { it.rating }.average()
            } else {
                0.0
            }

            _master.value = MasterCardUiModel(
                id = masterProfile.id,
                fullName = "${user.name} ${user.surname}",
                phone = user.phone,
                email = user.email,
                description = masterProfile.description,
                expYears = masterProfile.expYears,
                priceFrom = masterProfile.priceFrom,
                ratingAvg = ratingAvg,
                reviewsCount = reviewsCount,
                avatarUrl = user.avatarUrl,
                categoryId = category?.id,
                categoryName = category?.name ?: "Specialist",
            )
            _services.value = services
            _reviews.value = repository.getReviewsByMaster(masterId)
        }


    }
}