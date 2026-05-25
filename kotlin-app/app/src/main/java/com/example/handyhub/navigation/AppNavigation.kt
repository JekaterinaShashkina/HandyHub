package com.example.handyhub.navigation

import androidx.compose.runtime.Composable
import androidx.navigation.NavType
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import androidx.navigation.compose.rememberNavController
import androidx.navigation.navArgument
import com.example.handyhub.ui.screens.AddReviewScreen
import com.example.handyhub.ui.screens.HomeScreen
import com.example.handyhub.ui.screens.LoginScreen
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
                },
                onLoginClick = {
                    navController.navigate(Routes.LOGIN)
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
                onBackClick = { navController.popBackStack()},
                onAddReviewClick = {
                    navController.navigate(Routes.addReview(masterId))
                },
                onLoginClick = {
                    navController.navigate(Routes.LOGIN)
                }
            )

        }
        composable(
            route = Routes.ADD_REVIEW,
            arguments = listOf(
                navArgument("masterId") {
                    type = NavType.IntType
                }
            )
        ) { backStackEntry ->

            val masterId = backStackEntry
                .arguments
                ?.getInt("masterId")
                ?: 0

            AddReviewScreen(
                masterId = masterId,
                onBackClick = {
                    navController.popBackStack()
                },
                onPublishClick = { comment, rating ->
                    masterDetailViewModel.addReview(
                        masterId = masterId,
                        userId = 1, // временно, пока нет логина
                        rating = rating,
                        comment = comment
                    )
                    navController.popBackStack()
                }
            )
        }
        composable(Routes.LOGIN) {
            LoginScreen(
                onBackClick = {
                    navController.popBackStack()
                },
                onLoginClick = { email, password ->
                    navController.navigate(Routes.HOME)
                },
                onRegisterClick = {
                    navController.navigate(Routes.REGISTER_ROLE)
                },
            )
        }

    }
}