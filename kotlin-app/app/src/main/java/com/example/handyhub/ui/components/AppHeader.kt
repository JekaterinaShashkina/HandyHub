package com.example.handyhub.ui.components

import androidx.compose.foundation.Image
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.automirrored.outlined.ArrowBack
import androidx.compose.material.icons.automirrored.outlined.Login
import androidx.compose.material.icons.automirrored.outlined.Logout
import androidx.compose.material.icons.outlined.ArrowBack
import androidx.compose.material.icons.outlined.Login
import androidx.compose.material.icons.outlined.Logout
import androidx.compose.material.icons.outlined.Person
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.layout.ContentScale
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.unit.dp
import coil.compose.AsyncImage
import com.example.handyhub.R
import com.example.handyhub.ui.theme.Dimens

@Composable
fun AppHeader(
    modifier: Modifier = Modifier,
    title: String? = null,
    avatarUrl: Int? = null,
    avatarUri: String? = null,
    showLogo: Boolean = false,
    showBack: Boolean = false,
    isLoggedIn: Boolean = false,
    showAuthActions: Boolean = false,
    onBackClick: () -> Unit = {},
    onLoginClick: () -> Unit = {},
    onLogoutClick: () -> Unit = {},
    onProfileClick: () -> Unit = {},

) {
    Row(
        modifier = modifier
            .fillMaxWidth()
            .height(Dimens.HeaderNavHeight),
        horizontalArrangement = Arrangement.SpaceBetween,
        verticalAlignment = Alignment.CenterVertically
    ) {
        Row(
            verticalAlignment = Alignment.CenterVertically
        ) {
            if (showBack) {
                IconButton(onClick = onBackClick) {
                    Icon(
                        imageVector = Icons.AutoMirrored.Outlined.ArrowBack,
                        contentDescription = "Back"
                    )
                }
            }
            if (showLogo) {
                Image(
                    painter = painterResource(id = R.drawable.handyhub_logo2),
                    contentDescription = "HandyHub Logo",
                    modifier = Modifier.height(Dimens.HeaderAvatarSize)
                )
            }
            title?.let {
                Text(
                    text = it,
                    style = MaterialTheme.typography.headlineSmall
                )
            }
        }
        if (showAuthActions) {
            Row {
                IconButton(
                    onClick = if (isLoggedIn) onLogoutClick else onLoginClick
                ) {
                    Icon(
                        imageVector = if (isLoggedIn) {
                            Icons.AutoMirrored.Outlined.Logout
                        } else {
                            Icons.AutoMirrored.Outlined.Login
                        },
                        contentDescription = if (isLoggedIn) "Logout" else "Login",
                        modifier = Modifier.size(Dimens.IconSize)
                    )

                }
                if (isLoggedIn && avatarUrl != null || avatarUri != null) {
                    IconButton(
                        onClick = onProfileClick
                    ) {
                        AsyncImage(
                            model = avatarUri ?: avatarUrl,
                            contentDescription = "Profile",
                            modifier = Modifier
                                .size(Dimens.ProfileIconSize)
                                .clip(CircleShape),
                            contentScale = ContentScale.Crop
                        )
                    }

                } else {
                    IconButton(onClick = onProfileClick) {
                        Icon(
                            imageVector = Icons.Outlined.Person,
                            contentDescription = "Profile",
                            modifier = Modifier.size(Dimens.ProfileIconSize)
                        )
                    }
                }
            }
        }
    }
}

