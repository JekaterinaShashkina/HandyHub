package com.example.handyhub.ui.screens

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.unit.dp
import com.example.handyhub.ui.components.AppButton
import com.example.handyhub.ui.components.AppHeader
import com.example.handyhub.ui.components.AppTextField

@Composable
fun ServiceFormScreen(
    title: String,
    initialTitle: String = "",
    initialPrice: String = "",
    onBackClick: () -> Unit,
    onSaveClick: (serviceTitle: String, servicePrice: String) -> Unit
) {
    var serviceTitle by remember { mutableStateOf(initialTitle) }
    var servicePrice by remember { mutableStateOf(initialPrice) }

    Column(
        modifier = Modifier
            .fillMaxSize()
            .background(Color(0xFFF5F5FA))
            .padding(24.dp)
    ) {
        AppHeader(
            title = title,
            showBack = true,
            showAuthActions = false,
            onBackClick = onBackClick
        )

        Spacer(modifier = Modifier.height(24.dp))

        AppTextField(
            label = "Service title",
            value = serviceTitle,
            onValueChange = { serviceTitle = it }
        )

        AppTextField(
            label = "Price",
            value = servicePrice,
            onValueChange = { servicePrice = it }
        )

        Spacer(modifier = Modifier.height(24.dp))

        AppButton(
            text = "Save",
            onClick = {
                onSaveClick(serviceTitle, servicePrice)
            },
            modifier = Modifier.align(Alignment.End)
        )
    }
}