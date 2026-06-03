package com.example.handyhub.ui.screens

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.unit.dp
import com.example.handyhub.model.Service
import com.example.handyhub.ui.components.AppButton
import com.example.handyhub.ui.components.AppHeader
import com.example.handyhub.ui.components.ServiceManageCard



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
            .background(Color(0xFFF5F5FA))
            .padding(24.dp, 32.dp)

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
            Spacer(modifier = Modifier.height(16.dp))
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


            Spacer(modifier = Modifier.height(12.dp))
        }
        item {
            Spacer(modifier = Modifier.height(24.dp))
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
