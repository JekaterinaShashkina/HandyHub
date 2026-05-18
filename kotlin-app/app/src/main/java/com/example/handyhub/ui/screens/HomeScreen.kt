package com.example.handyhub.ui.screens

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
import com.example.handyhub.viewmodel.HomeViewModel

@Composable
fun HomeScreen (
    viewModel: HomeViewModel
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
        items(filteredMasters) { master ->
            Card(
                modifier = Modifier.padding(vertical = 8.dp)
            ) {
                Column(
                    modifier = Modifier.padding(16.dp)
                ) {
                    Text(
                        text = master.fullName
                    )
                    Text(
                        text = master.categoryName
                    )
                    Text(
                        text = master.description
                    )

                    Text(
                        text = "Experience: ${master.expYears} years"
                    )

                    Text(
                        text = "From ${master.priceFrom} €"
                    )
                }
            }
        }
    }
}