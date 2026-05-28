package com.example.handyhub.ui.screens

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.material3.Text
import androidx.compose.material3.TextButton
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.unit.dp
import com.example.handyhub.ui.components.AppButton
import com.example.handyhub.ui.components.AppHeader
import com.example.handyhub.ui.components.AppTextField

@Composable
fun LoginScreen(
    onBackClick: () -> Unit,
    onLoginClick: (email: String, password: String) -> Unit,
    onRegisterClick: () -> Unit
) {
    var email by remember { mutableStateOf("") }
    var password by remember { mutableStateOf("") }

    Column(
        modifier = Modifier
            .fillMaxSize()
            .background(Color(0xFFF5F5FA))
            .padding(24.dp, 32.dp),
        verticalArrangement = Arrangement.Top
    ) {
        AppHeader(
            title = "Sign In",
            showBack = true,
            onBackClick = onBackClick
        )

        Spacer(modifier = Modifier.height(24.dp))

        AppTextField(
            label = "Email",
            value = email,
            onValueChange = { email = it }
        )

        Spacer(modifier = Modifier.height(16.dp))

        AppTextField(
            label = "Password",
            value = password,
            onValueChange = { password = it },
            isPassword = true
        )

        Spacer(modifier = Modifier.height(28.dp))

        AppButton(
            text = "Sign In",
            onClick = {
                onLoginClick(email, password)
            },
            modifier = Modifier.align(Alignment.End)
        )
        Spacer(modifier = Modifier.height(12.dp))

        TextButton(
            onClick = onRegisterClick,
            modifier = Modifier.align(Alignment.End)
        ) {
            Text("Create account")
        }
    }

}