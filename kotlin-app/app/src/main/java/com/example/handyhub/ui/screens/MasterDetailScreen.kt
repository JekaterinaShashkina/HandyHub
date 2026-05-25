package com.example.handyhub.ui.screens

import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.outlined.ArrowBack
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.getValue
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import com.example.handyhub.ui.components.AppHeader
import com.example.handyhub.ui.components.MasterInfoCard
import com.example.handyhub.ui.components.MasterProfileCard
import com.example.handyhub.ui.components.MasterReviewSection
import com.example.handyhub.viewmodel.MasterDetailViewModel

@Composable
fun MasterDetailScreen(
    masterId: Int,
    viewModel: MasterDetailViewModel,
    onBackClick: () -> Unit,
    onAddReviewClick: () -> Unit,
    onLoginClick: () -> Unit
) {
    LaunchedEffect(masterId) {
        viewModel.loadMaster(masterId)
    }

    val master by viewModel.master.collectAsState()
    val services by viewModel.services.collectAsState()
    val reviews by viewModel.reviews.collectAsState()
    val reviewsWithUsers by viewModel.reviewsWithUsers.collectAsState()

    LazyColumn(
        modifier = Modifier
            .fillMaxSize()
            .padding(24.dp, 32.dp)
    ) {
        item {
            AppHeader(
                title = "Master details",
                showBack = true,
                isLoggedIn = false,
                onBackClick = onBackClick,
                onLoginClick = onLoginClick,
                onProfileClick = { TODO() }
            )
        }
        master?.let { item ->
            item {
                MasterProfileCard(
                    item = item,
                    reviews = reviews,
                    reviewsCount = reviews.size
                )
            }

            item {
                Spacer(modifier = Modifier.height(16.dp))
            }

            item {
                MasterInfoCard(
                    description = item.description,
                    services = services
                )
            }

            item {
                Spacer(modifier = Modifier.height(16.dp))
            }

            item{
                MasterReviewSection(
                    reviews = reviewsWithUsers,
                    onAddReviewClick = onAddReviewClick

                )
            }


        }
    }
}