package com.example.handyhub

import android.annotation.SuppressLint
import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.remember
import com.example.handyhub.data.local.DatabaseProvider
import com.example.handyhub.data.repository.HandyHubRepository
import com.example.handyhub.data.sample.SampleData
import com.example.handyhub.navigation.AppNavigation
import com.example.handyhub.session.SessionManager
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
        val sessionManager = SessionManager(this)

        CoroutineScope(Dispatchers.IO).launch {
            SampleData.seedDatabase(repository)
        }
        

        setContent {
            val homeViewModel = remember { HomeViewModel(repository) }
            val masterDetailViewModel = remember {
                MasterDetailViewModel(repository)
            }

            val authViewModel = remember {
                AuthViewModel(
                    repository,
                    sessionManager = sessionManager
                )
            }

            val masterViewModel = remember { MasterViewModel(repository) }

            LaunchedEffect(Unit) {
                authViewModel.loadSavedUser()
                homeViewModel.loadData()
            }

            AppNavigation(
                homeViewModel = homeViewModel,
                masterDetailViewModel = masterDetailViewModel,
                authViewModel = authViewModel,
                masterViewModel = masterViewModel
            )

        }
    }
}