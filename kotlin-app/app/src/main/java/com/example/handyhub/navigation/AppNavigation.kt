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
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.platform.LocalContext
import com.example.handyhub.ui.components.ConfirmDialog
import com.example.handyhub.ui.screens.BecomeMasterScreen
import com.example.handyhub.ui.screens.MyServicesScreen
import com.example.handyhub.ui.screens.ProfileScreen
import com.example.handyhub.ui.screens.RegisterScreen
import com.example.handyhub.ui.screens.ServiceFormScreen
import com.example.handyhub.viewmodel.MasterViewModel

@Composable
fun AppNavigation(
    homeViewModel: HomeViewModel,
    masterDetailViewModel: MasterDetailViewModel,
    authViewModel: AuthViewModel,
    masterViewModel: MasterViewModel
) {
    val navController = rememberNavController()
    val currentUser by authViewModel.currentUser.collectAsState()
    var showLogoutDialog by remember {
        mutableStateOf(false)
    }

    NavHost(navController = navController, startDestination = Routes.HOME) {

        // Navigation HOME
        composable(Routes.HOME) {
            HomeScreen(
                viewModel = homeViewModel,
                isLoggedIn = currentUser != null,
                avatarUrl = currentUser?.avatarUrl,
                avatarUri = currentUser?.avatarUri,
                onMasterClick = { masterId ->
                    navController.navigate(Routes.masterDetail(masterId))
                },
                onLoginClick = {
                    navController.navigate(Routes.LOGIN)
                },
                onLogoutClick = {
                        showLogoutDialog = true
                },
                onProfileClick = {
                    navController.navigate(Routes.PROFILE)
                }
            )
        }

        // Navigation MASTER DETAIL
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
                avatarUrl = currentUser?.avatarUrl,
                avatarUri = currentUser?.avatarUri,
                isLoggedIn = currentUser != null,
                onBackClick = { navController.popBackStack()},
                onAddReviewClick = {
                    navController.navigate(Routes.addReview(masterId))
                },
                onLoginClick = {
                    navController.navigate(Routes.LOGIN)
                }
                ,
                onLogoutClick = {
                    showLogoutDialog = true
                },
                onProfileClick = {
                    navController.navigate(Routes.PROFILE)
                }
            )

        }
        // Navigation ADD REVIEW
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
            val context = LocalContext.current

            AddReviewScreen(
                masterId = masterId,
                onBackClick = {
                    navController.popBackStack()
                },
                onPublishClick = { comment, rating ->
                    val user = currentUser
                    if (user == null) {
                        Toast.makeText(
                            context,
                            "Please login first",
                            Toast.LENGTH_SHORT
                        ).show()
                        navController.navigate(Routes.LOGIN)
                    } else {
                        masterDetailViewModel.addReview(
                            masterId = masterId,
                            userId = user.id,
                            rating = rating,
                            comment = comment
                        )
                        homeViewModel.loadData()
                        masterDetailViewModel.loadMaster(masterId)
                        navController.popBackStack()
                    }
                }
            )
        }
        // Navigation LOGIN
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
        // Navigation REGISTER USER
        composable(Routes.REGISTER_USER) {
            val context = LocalContext.current

            RegisterScreen(
                onBackClick = {
                    navController.popBackStack()
                },
                onRegisterClick = { name, surname, phone, email, password, repeatPassword, avatarUri ->
                    authViewModel.register(
                        name = name,
                        surname = surname,
                        phone = phone,
                        email = email,
                        password = password,
                        repeatPassword = repeatPassword,
                        avatarUri = avatarUri,
                        onSuccess = {
                            Toast.makeText(context, "Account created", Toast.LENGTH_SHORT).show()
                            navController.popBackStack()
                        },
                        onError = { message ->
                            Toast.makeText(context, message, Toast.LENGTH_SHORT).show()
                        },

                    )
                }
            )
        }
        // Navigation PROFILE
        composable(Routes.PROFILE) {
            ProfileScreen(
                currentUser = currentUser,
                isMaster = currentUser?.roleId == 2,
                avatarUrl = currentUser?.avatarUrl,
                avatarUri = currentUser?.avatarUri,
                isLoggedIn = currentUser != null,
                onBackClick = {
                    navController.popBackStack()
                },
                onBecomeMasterClick = {
                    navController.navigate(Routes.BECOME_MASTER)
                },
                onLogoutClick = {
                    showLogoutDialog = true
                },
                onLoginClick = {
                    navController.navigate(Routes.LOGIN)
                },
                onProfileClick = {
                    navController.navigate(Routes.PROFILE)
                },
                onMyServicesClick = {
                    navController.navigate(Routes.MY_SERVICES)
                }
            )
        }

        composable(Routes.BECOME_MASTER) {
            val context = LocalContext.current

            BecomeMasterScreen(
                onBackClick = {
                    navController.popBackStack()
                },
                onRegisterMasterClick = { categoryId, expYears, description, serviceTitle, servicePrice ->

                    val userId = currentUser?.id

                    if (userId == null) {
                        Toast.makeText(context, "Please login first", Toast.LENGTH_SHORT).show()
                        navController.navigate(Routes.LOGIN)
                        return@BecomeMasterScreen
                    } else {

                        masterViewModel.becomeMaster(
                            userId = userId,
                            categoryId = categoryId,
                            // priceFrom = priceFrom,
                            expYears = expYears,
                            description = description,
                            serviceTitle = serviceTitle,
                            servicePrice = servicePrice,
                            onSuccess = {
                                Toast.makeText(
                                    context,
                                    "Master profile created",
                                    Toast.LENGTH_SHORT
                                ).show()
                                homeViewModel.loadData()
                                authViewModel.refreshCurrentUser()
                                navController.popBackStack()
                            },
                            onError = { message ->
                                Toast.makeText(context, message, Toast.LENGTH_SHORT).show()
                            }
                        )
                    }
                }
            )
        }
        composable(Routes.MY_SERVICES) {
            val services by masterViewModel.services.collectAsState()
            val context = LocalContext.current

            LaunchedEffect(currentUser?.id) {
                currentUser?.id?.let {
                    masterViewModel.loadServicesForUser(it)
                }
            }

            MyServicesScreen(
                services = services,
                onBackClick = {
                    navController.popBackStack()
                },
                onAddServiceClick = {
                    navController.navigate(Routes.ADD_SERVICE)
                },
                onEditServiceClick = { service ->
                    navController.navigate(Routes.editService(service.id))
                },
                onDeleteServiceClick = { service ->
                    masterViewModel.deleteService(
                        service = service,
                        currentServicesCount = services.size,
                        onSuccess = {
                            Toast.makeText(context, "Service deleted", Toast.LENGTH_SHORT).show()

                        },
                        onError = { message ->
                            Toast.makeText(context, message, Toast.LENGTH_SHORT).show()
                        }
                    )
                }
            )
        }
        composable(Routes.ADD_SERVICE) {
            val context = LocalContext.current
            val masterId by masterViewModel.currentMasterId.collectAsState()

            ServiceFormScreen(
                title = "Add service",
                onBackClick = {
                    navController.popBackStack()
                },
                onSaveClick = { serviceTitle, servicePrice ->
                    val id = masterId

                    if (id == null) {
                        Toast.makeText(context, "Master profile not found", Toast.LENGTH_SHORT).show()
                    } else {
                        masterViewModel.addService(
                            masterProfileId = id,
                            categoryId = 1, // временно, ниже поправим
                            title = serviceTitle,
                            price = servicePrice,
                            onSuccess = {
                                Toast.makeText(context, "Service added", Toast.LENGTH_SHORT).show()
                                homeViewModel.loadData()
                                masterViewModel.loadServicesByMaster(id)
                                navController.popBackStack()
                            },
                            onError = { message ->
                                Toast.makeText(context, message, Toast.LENGTH_SHORT).show()
                            }
                        )
                    }
                }
            )
        }
        composable(
            route = Routes.EDIT_SERVICE,
            arguments = listOf(
                navArgument("serviceId") {
                    type = NavType.IntType
                }
            )
        ) { backStackEntry ->

            val context = LocalContext.current

            val serviceId = backStackEntry.arguments?.getInt("serviceId") ?: 0

            LaunchedEffect(serviceId) {
                masterViewModel.loadServiceById(serviceId)
            }

            val selectedService by masterViewModel.selectedService.collectAsState()

            selectedService?.let { service ->
                ServiceFormScreen(
                    title = "Edit service",
                    initialTitle = service.title,
                    initialPrice = service.price.toString(),
                    onBackClick = {
                        navController.popBackStack()
                    },
                    onSaveClick = { serviceTitle, servicePrice ->
                        masterViewModel.updateService(
                            service = service,
                            title = serviceTitle,
                            price = servicePrice,
                            onSuccess = {
                                Toast.makeText(context, "Service updated", Toast.LENGTH_SHORT).show()
                                homeViewModel.loadData()
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
    if (showLogoutDialog) {
        ConfirmDialog(
            title = "Logout",
            message = "Are you sure you want to sign out?",
            confirmText = "Logout",
            dismissText = "Cancel",
            onConfirm = {
                showLogoutDialog = false
                authViewModel.logout()
            },
            onDismiss = {
                showLogoutDialog = false
            }
        )
    }

}