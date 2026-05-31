package com.example.handyhub.ui.screens

import androidx.compose.animation.fadeIn
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.Card
import androidx.compose.material3.CardDefaults
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.unit.dp
import com.example.handyhub.data.sample.SampleData.categories
import com.example.handyhub.ui.components.AppButton
import com.example.handyhub.ui.components.AppHeader
import com.example.handyhub.ui.components.AppTextField
import com.example.handyhub.ui.components.CategoryDropdown

@Composable
fun BecomeMasterScreen(
    onBackClick: () -> Unit,
    onRegisterMasterClick: (
        categoryId: Int?,
        priceFrom: String,
        expYears: String,
        description: String,
        serviceTitle: String,
        servicePrice: String
    ) -> Unit
){
    var selectedCategoryId by remember { mutableStateOf<Int?>(null) }
    var priceFrom by remember { mutableStateOf("") }
    var expYears by remember { mutableStateOf("") }
    var description by remember { mutableStateOf("") }
    var serviceTitle by remember { mutableStateOf("") }
    var servicePrice by remember { mutableStateOf("") }

    Column (
        modifier = Modifier
            .fillMaxSize()
            .background(Color(0xFFF5F5FA))
            .padding(24.dp, 32.dp)

    ){
        AppHeader(
            title = "Specialist registration",
            showBack = true,
            showAuthActions = false,
            onBackClick = onBackClick
        )
        Spacer(modifier = Modifier.height(24.dp))

        CategoryDropdown(
            categories = categories,
            selectedCategoryId = selectedCategoryId,
            onCategorySelected = { categoryId ->
                selectedCategoryId = categoryId
            }
        )
        Spacer(modifier = Modifier.height(24.dp))
        AppTextField(
            label = "Price from",
            value = priceFrom,
            onValueChange = { priceFrom = it }
        )
        Spacer(modifier = Modifier.height(16.dp))
        AppTextField(
            label = "Experience years",
            value = expYears,
            onValueChange = { expYears = it }
        )
        Spacer(modifier = Modifier.height(16.dp))
        AppTextField(
            label = "Description",
            value = description,
            onValueChange = { description = it }
        )
        Spacer(modifier = Modifier.height(16.dp))
        AppTextField(
            label = "Service title",
            value = serviceTitle,
            onValueChange = { serviceTitle = it }
        )
        AppTextField(
            label = "Service price",
            value = servicePrice,
            onValueChange = { servicePrice = it }
        )
        Spacer(modifier = Modifier.weight(1f))

        AppButton(
            text = "Register",
            onClick = {
                onRegisterMasterClick(
                    selectedCategoryId,
                    priceFrom,
                    expYears,
                    description,
                    serviceTitle,
                    servicePrice
                )
            },
                modifier = Modifier.align(Alignment.End)
        )

    }
}