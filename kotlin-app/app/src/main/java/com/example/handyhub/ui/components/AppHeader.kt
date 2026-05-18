package com.example.handyhub.ui.components

import androidx.compose.foundation.Image
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.size
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.outlined.Login
import androidx.compose.material.icons.outlined.Person
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.unit.dp
import com.example.handyhub.R

@Composable
fun AppHeader(
    onLoginClick: () -> Unit = {},
    onProfileClick: () -> Unit = {},
) {
    Row(
        modifier = Modifier.fillMaxSize(),
        horizontalArrangement = Arrangement.SpaceBetween,
        verticalAlignment = Alignment.CenterVertically
    ) {
        Image(
            painter = painterResource(id = R.drawable.handyhub_logo2),
            contentDescription = "HandyHub Logo",
            modifier = Modifier.height(46.dp)
        )

        Row {
            IconButton(onClick = onLoginClick) {
                Icon(
                    imageVector = Icons.Outlined.Login,
                    contentDescription = "Login",
                    modifier = Modifier.size(32.dp)
                )
            }
            IconButton(onClick = onProfileClick) {
                Icon(
                    imageVector = Icons.Outlined.Person,
                    contentDescription = "Profile" ,
                    modifier = Modifier.size(32.dp)
                )
            }
        }
    }
}

