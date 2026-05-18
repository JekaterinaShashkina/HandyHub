package com.example.handyhub

import android.annotation.SuppressLint
import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.padding
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.tooling.preview.Preview
import com.example.handyhub.data.local.DatabaseProvider
import com.example.handyhub.data.repository.HandyHubRepository
import com.example.handyhub.data.sample.SampleData
import com.example.handyhub.ui.screens.HomeScreen
import com.example.handyhub.ui.theme.HandyHubTheme
import com.example.handyhub.viewmodel.HomeViewModel
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch

class MainActivity : ComponentActivity() {
    @SuppressLint("ViewModelConstructorInComposable")
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        val database = DatabaseProvider.getDatabase(this)
        val repository = HandyHubRepository(database)

        CoroutineScope(Dispatchers.IO).launch {
            SampleData.seedDatabase(repository)
        }

        setContent {
            val homeViewModel = HomeViewModel(repository)
            homeViewModel.loadData()

            HandyHubTheme {
                HomeScreen(viewModel = homeViewModel)
            }

        }
    }
}