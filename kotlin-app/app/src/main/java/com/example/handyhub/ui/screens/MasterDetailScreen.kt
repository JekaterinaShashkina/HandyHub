package com.example.handyhub.ui.screens

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.PaddingValues
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.lazy.LazyColumn
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
import com.example.handyhub.ui.theme.AppColors
import com.example.handyhub.ui.theme.Dimens
import com.example.handyhub.viewmodel.MasterDetailViewModel

@Composable
fun MasterDetailScreen(
    masterId: Int,
    avatarUrl: Int?,
    avatarUri: String?,
    isLoggedIn: Boolean,
    viewModel: MasterDetailViewModel,
    onBackClick: () -> Unit,
    onAddReviewClick: () -> Unit,
    onLoginClick: () -> Unit,
    onLogoutClick: () -> Unit,
    onProfileClick: () -> Unit
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
            .background(AppColors.Background),
        contentPadding = PaddingValues(Dimens.LargeSpacing, Dimens.ExtraLargeSpacing)

    ) {
        item {
            AppHeader(
                title = "Master details",
                avatarUrl = avatarUrl,
                avatarUri = avatarUri,
                showBack = true,
                isLoggedIn = isLoggedIn,
                showAuthActions = true,
                onBackClick = onBackClick,
                onLoginClick = onLoginClick,
                onLogoutClick = onLogoutClick,
                onProfileClick = onProfileClick
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
                Spacer(modifier = Modifier.height(Dimens.MediumSpacing))
            }

            item {
                MasterInfoCard(
                    description = item.description,
                    services = services
                )
            }

            item {
                Spacer(modifier = Modifier.height(Dimens.MediumSpacing))
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