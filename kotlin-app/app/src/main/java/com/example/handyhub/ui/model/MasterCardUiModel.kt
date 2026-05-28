package com.example.handyhub.ui.model

data class MasterCardUiModel(
    val id: Int,
    val fullName: String,
    val phone: String,
    val email: String,
    val categoryId: Int?,
    val categoryName: String,
    val description: String,
    val expYears: Int,
    val priceFrom: Double,
    val ratingAvg: Double,
    val reviewsCount: Int,
    val avatarUrl: Int,
)
