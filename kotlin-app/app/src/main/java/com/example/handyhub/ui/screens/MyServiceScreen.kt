package com.example.handyhub.ui.screens

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import com.example.handyhub.model.Service
import com.example.handyhub.ui.components.AppButton
import com.example.handyhub.ui.components.AppHeader
import com.example.handyhub.ui.components.ServiceManageCard
import com.example.handyhub.ui.theme.AppColors
import com.example.handyhub.ui.theme.Dimens

@Composable
fun MyServicesScreen (
    services: List<Service>,
    onBackClick: () -> Unit,
    onAddServiceClick: () -> Unit,
    onEditServiceClick: (Service) -> Unit,
    onDeleteServiceClick: (Service) -> Unit
) {
    LazyColumn(
        modifier = Modifier
            .fillMaxSize()
            .background(AppColors.Background)
            .padding(Dimens.LargeSpacing, Dimens.ExtraLargeSpacing)

    ) {
        item {
            AppHeader(
                title = "My Services",
                showBack = true,
                showAuthActions = false,
                onBackClick = onBackClick
            )
        }

        item {
            Spacer(modifier = Modifier.height(Dimens.MediumSpacing))
        }

        items(
            items = services,
            key = { it.id }
        ) { service ->

            ServiceManageCard(
                service = service,
                canDelete = services.size > 1,
                onEditClick = {
                    onEditServiceClick(service)
                },
                onDeleteClick = {
                    onDeleteServiceClick(service)
                }
            )
            Spacer(modifier = Modifier.height(Dimens.MediumHeight))
        }
        item {
            Spacer(modifier = Modifier.height(Dimens.LargeSpacing))
        }
        item {
            Box(
                modifier = Modifier.fillMaxWidth()
            ) {
                AppButton(
                    text = "Add service",
                    onClick = onAddServiceClick,
                    modifier = Modifier.align(Alignment.CenterEnd)
                )
            }
        }

    }
}
