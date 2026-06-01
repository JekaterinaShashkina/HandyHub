package com.example.handyhub

import android.annotation.SuppressLint
import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import com.example.handyhub.data.local.DatabaseProvider
import com.example.handyhub.data.repository.HandyHubRepository
import com.example.handyhub.data.sample.SampleData
import com.example.handyhub.navigation.AppNavigation
import com.example.handyhub.viewmodel.AuthViewModel
import com.example.handyhub.viewmodel.HomeViewModel
import com.example.handyhub.viewmodel.MasterDetailViewModel
import com.example.handyhub.viewmodel.MasterViewModel
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
            val masterDetailViewModel = MasterDetailViewModel(repository)
            val authViewModel = AuthViewModel(repository)
            val masterViewModel = MasterViewModel(repository)

            homeViewModel.loadData()

            AppNavigation(
                homeViewModel = homeViewModel,
                masterDetailViewModel = masterDetailViewModel,
                authViewModel = authViewModel,
                masterViewModel = masterViewModel
            )

        }
    }
}