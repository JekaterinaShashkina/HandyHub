package com.example.handyhub.ui.model

import com.example.handyhub.model.Review
import com.example.handyhub.model.User

data class ReviewWithUser(
    val review: Review,
    val user: User
)
