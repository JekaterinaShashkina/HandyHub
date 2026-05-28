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
import com.example.handyhub.viewmodel.AuthViewModel
import com.example.handyhub.viewmodel.HomeViewModel
import com.example.handyhub.viewmodel.MasterDetailViewModel
import android.widget.Toast
import androidx.compose.ui.platform.LocalContext
import com.example.handyhub.ui.screens.RegisterScreen

@Composable
fun AppNavigation(
    homeViewModel: HomeViewModel,
    masterDetailViewModel: MasterDetailViewModel,
    authViewModel: AuthViewModel
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
            val context = LocalContext.current

            LoginScreen(
                onBackClick = {
                    navController.popBackStack()
                },
                onLoginClick = { email, password ->
                    authViewModel.login(
                        email = email,
                        password = password,
                        onSuccess = {
                            Toast.makeText(
                                context,
                                "Login success",
                                Toast.LENGTH_SHORT
                            ).show()
                            navController.popBackStack()
                        },
                        onError = {
                            Toast.makeText(
                                context,
                                "Invalid email or password",
                                Toast.LENGTH_SHORT
                            ).show()
                        }
                    )
                },
                onRegisterClick = {
                    navController.navigate(Routes.REGISTER_USER)
                },
            )
        }
        composable(Routes.REGISTER_USER) {
            val context = LocalContext.current

            RegisterScreen(
                onBackClick = {
                    navController.popBackStack()
                },
                onRegisterClick = { name, surname, phone, email, password, repeatPassword ->
                    authViewModel.register(
                        name = name,
                        surname = surname,
                        phone = phone,
                        email = email,
                        password = password,
                        repeatPassword = repeatPassword,
                        onSuccess = {
                            Toast.makeText(context, "Account created", Toast.LENGTH_SHORT).show()
                            navController.popBackStack()
                        },
                        onError = { message ->
                            Toast.makeText(context, message, Toast.LENGTH_SHORT).show()
                        }
                    )
                }
            )
        }

    }
}