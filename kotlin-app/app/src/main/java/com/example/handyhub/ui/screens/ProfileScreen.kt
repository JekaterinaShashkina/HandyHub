package com.example.handyhub.ui.screens

import androidx.compose.foundation.Image
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.outlined.Email
import androidx.compose.material.icons.outlined.Person
import androidx.compose.material.icons.outlined.Phone
import androidx.compose.material.icons.outlined.Work
import androidx.compose.material3.Icon
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.OutlinedButton
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.layout.ContentScale
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.unit.dp
import coil.compose.AsyncImage
import com.example.handyhub.model.User
import com.example.handyhub.ui.components.AppButton
import com.example.handyhub.ui.components.AppHeader
import com.example.handyhub.ui.components.ConfirmDialog
import com.example.handyhub.ui.components.ProfileInfoCard

@Composable
fun ProfileScreen(
    currentUser: User?,
    isMaster: Boolean,
    isLoggedIn: Boolean,
    avatarUrl: Int?,
    avatarUri: String?,
    onBackClick: () -> Unit,
    onBecomeMasterClick: () -> Unit,
    onLoginClick: () -> Unit,
    onProfileClick: () -> Unit,
    onLogoutClick: () -> Unit
) {
    var showLogoutDialog by remember { mutableStateOf(false) }

    Column (
        modifier = Modifier
            .fillMaxSize()
            .background(Color(0xFFF5F5FA))
            .padding(24.dp, 32.dp)
    ){
        AppHeader(
            title = "Profile",
            avatarUrl = avatarUrl,
            avatarUri = avatarUri,
            showBack = true,
            isLoggedIn = isLoggedIn,
            showAuthActions = true,
            onBackClick = onBackClick,
            onLoginClick = onLoginClick,
            onLogoutClick = onLogoutClick,
            onProfileClick = onProfileClick
        )
        Spacer(modifier = Modifier.height(32.dp))
        if (currentUser == null) {
            Text("You are not logged in")
            return
        }

        if (currentUser.avatarUrl != null || currentUser.avatarUri != null) {
            AsyncImage(
                model = currentUser.avatarUri ?: currentUser.avatarUrl,
                contentDescription = "Avatar",
                modifier = Modifier
                    .size(96.dp)
                    .clip(CircleShape)
                    .align(Alignment.CenterHorizontally),
                contentScale = ContentScale.Crop
            )
        } else {
            Box(
                modifier = Modifier
                    .size(96.dp)
                    .clip(CircleShape)
                    .background(Color(0xFFFFC800))
                    .align(Alignment.CenterHorizontally),
                contentAlignment = Alignment.Center
            ) {
                Icon(
                    imageVector = Icons.Outlined.Person,
                    contentDescription = null,
                    modifier = Modifier.size(48.dp)
                )

            }
        }
        Spacer(modifier = Modifier.height(16.dp))

        Text(
            text = "${currentUser.name} ${currentUser.surname}",
            style = MaterialTheme.typography.headlineSmall,
            modifier = Modifier.align(Alignment.CenterHorizontally)
        )
        Text(
            text = if (isMaster) "Master" else "Client",
            style = MaterialTheme.typography.bodyMedium,
            color = Color.Gray,
            modifier = Modifier.align(Alignment.CenterHorizontally)
        )

        Spacer(modifier = Modifier.height(32.dp))
        ProfileInfoCard(
            icon = Icons.Outlined.Email,
            text = currentUser.email
        )
        Spacer(modifier = Modifier.height(12.dp))
        ProfileInfoCard(
            icon = Icons.Outlined.Phone,
            text = currentUser.phone
        )
        Spacer(modifier = Modifier.height(24.dp))

        if (isMaster) {
            ProfileInfoCard(
                icon = Icons.Outlined.Work,
                text = "Your master profile is active"
            )
        } else {
            AppButton(
                text = "Become a master",
                onClick = onBecomeMasterClick,
                modifier = Modifier.align(Alignment.CenterHorizontally)
            )
        }

        Spacer(modifier = Modifier.weight(1f))

        OutlinedButton(
            onClick = { showLogoutDialog = true },
            modifier = Modifier.align(Alignment.CenterHorizontally),
            shape = RoundedCornerShape(10.dp)
        ) {
            Text("Logout")
        }
        if (showLogoutDialog) {
            ConfirmDialog(
                title = "Logout",
                message = "Are you sure you want to sign out?",
                confirmText = "Logout",
                dismissText = "Cancel",
                onConfirm = {
                    showLogoutDialog = false
                    onLogoutClick()
                },
                onDismiss = {
                    showLogoutDialog = false
                }
            )
        }

    }

}