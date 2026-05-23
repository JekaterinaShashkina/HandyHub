package com.example.handyhub.navigation

import androidx.compose.runtime.Composable
import androidx.navigation.NavType
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import androidx.navigation.compose.rememberNavController
import androidx.navigation.navArgument
import com.example.handyhub.ui.screens.HomeScreen
import com.example.handyhub.ui.screens.MasterDetailScreen
import com.example.handyhub.viewmodel.HomeViewModel
import com.example.handyhub.viewmodel.MasterDetailViewModel

@Composable
fun AppNavigation(
    homeViewModel: HomeViewModel,
    masterDetailViewModel: MasterDetailViewModel
) {
    val navController = rememberNavController()

    NavHost(navController = navController, startDestination = Routes.HOME) {
        composable(Routes.HOME) {
            HomeScreen(
                viewModel = homeViewModel,
                onMasterClick = { masterId ->
                    navController.navigate(Routes.masterDetail(masterId))
                }
            )
        }
        composable(
            route = Routes.MASTER_DETAIL,
            arguments = listOf(
                    navArgument("masterId") {
                        type = NavType.IntType
                    }
            )

        ) { backStackEntry ->
            val masterId = backStackEntry.arguments?.getInt("masterId") ?: 0
            MasterDetailScreen(
                viewModel = masterDetailViewModel,
                masterId = masterId,
                onBackClick = { navController.popBackStack() }
            )

        }
    }
}