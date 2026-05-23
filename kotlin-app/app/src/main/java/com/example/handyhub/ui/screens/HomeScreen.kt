package com.example.handyhub.ui.screens

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
import androidx.compose.ui.unit.dp
import com.example.handyhub.ui.components.AppExpandableCategories
import com.example.handyhub.ui.components.AppHeader
import com.example.handyhub.ui.components.AppSearchBar
import com.example.handyhub.ui.components.MasterCard
import com.example.handyhub.viewmodel.HomeViewModel

@Composable
fun HomeScreen (
    viewModel: HomeViewModel,
    onMasterClick: (Int) -> Unit
){
    val categories by viewModel.categories.collectAsState()

    val masters by viewModel.masters.collectAsState()
    var searchText by remember { mutableStateOf("") }
    val filteredMasters = masters.filter { master ->
        master.fullName.contains(searchText, ignoreCase = true) ||
                master.description.contains(searchText, ignoreCase = true)
    }
    var selectedCategoryId by remember { mutableStateOf<Int?>(null) }

    LazyColumn(
        modifier = Modifier.fillMaxSize(),
        contentPadding = PaddingValues(16.dp)

    ) {
        item {
            AppHeader()
        }
        item {
            AppSearchBar(
                value = searchText,
                onValueChange = { searchText = it },
                placeholder = "Search specialist",
                modifier = Modifier.padding(top = 16.dp)
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
                modifier = Modifier.padding(top = 16.dp)
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
                verticalArrangement = Arrangement.spacedBy(16.dp)
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