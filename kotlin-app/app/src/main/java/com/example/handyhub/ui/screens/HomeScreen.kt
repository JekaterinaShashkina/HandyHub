package com.example.handyhub.ui.screens

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.PaddingValues
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.lazy.*
import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Modifier
import com.example.handyhub.ui.components.AppExpandableCategories
import com.example.handyhub.ui.components.AppHeader
import com.example.handyhub.ui.components.AppSearchBar
import com.example.handyhub.ui.components.MasterCard
import com.example.handyhub.ui.theme.AppColors
import com.example.handyhub.ui.theme.Dimens
import com.example.handyhub.viewmodel.HomeViewModel

@Composable
fun HomeScreen (
    viewModel: HomeViewModel,
    onMasterClick: (Int) -> Unit,
    onLoginClick: () -> Unit,
    onLogoutClick: () -> Unit,
    onProfileClick: () -> Unit,
    isLoggedIn: Boolean,
    avatarUrl: Int?,
    avatarUri: String?
){
    val categories by viewModel.categories.collectAsState()

    val masters by viewModel.masters.collectAsState()
    var searchText by remember { mutableStateOf("") }
    var selectedCategoryId by remember { mutableStateOf<Int?>(null) }

    val filteredMasters = masters.filter { master ->
        val matchesSearch = master.fullName.contains(searchText, ignoreCase = true) ||
                master.description.contains(searchText, ignoreCase = true)||
                master.categoryName.contains(searchText, ignoreCase = true)

        val matchesCategory =
            selectedCategoryId == null ||
                    master.categoryId == selectedCategoryId

        matchesSearch && matchesCategory

    }
    LazyColumn(
        modifier = Modifier.fillMaxSize()
            .background(AppColors.Background),
        contentPadding = PaddingValues(Dimens.LargeSpacing, Dimens.ExtraLargeSpacing)

    ) {
        item {
            AppHeader(
                avatarUrl = avatarUrl,
                avatarUri = avatarUri,
                showLogo = true,
                isLoggedIn = isLoggedIn,
                showAuthActions = true,
                onLoginClick = onLoginClick ,
                onLogoutClick = onLogoutClick,
                onProfileClick = onProfileClick
            )
        }
        item {
            AppSearchBar(
                value = searchText,
                onValueChange = { searchText = it },
                placeholder = "Search specialist",
                modifier = Modifier.padding(top = Dimens.MediumSpacing)
            )
        }
        item {
            AppExpandableCategories(
                categories = categories,
                selectedCategoryId = selectedCategoryId,
                onCategoryClick = { category ->
                    selectedCategoryId =
                        if (selectedCategoryId == category.id) null else category.id
                },
                modifier = Modifier.padding(top = Dimens.MediumSpacing)
            )
        }
        item {
            Text(
                text = "Masters",
                style = MaterialTheme.typography.headlineSmall
            )
        }
        item {
            Column(
                verticalArrangement = Arrangement.spacedBy(Dimens.MediumSpacing)
            ) {
                filteredMasters.forEach { master ->
                    MasterCard(master = master, onClick = { masterId ->
                        onMasterClick(masterId)
                    })
                }
            }
        }
    }
}