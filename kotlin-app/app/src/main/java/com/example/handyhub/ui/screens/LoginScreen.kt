package com.example.handyhub.ui.screens

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.material3.MaterialTheme
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
import com.example.handyhub.ui.components.AppButton
import com.example.handyhub.ui.components.AppHeader
import com.example.handyhub.ui.components.AppTextField
import com.example.handyhub.ui.theme.AppColors
import com.example.handyhub.ui.theme.Dimens

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
            .background(AppColors.Background)
            .padding(Dimens.LargeSpacing, Dimens.ExtraLargeSpacing),
        verticalArrangement = Arrangement.Top
    ) {
        AppHeader(
            title = "Sign In",
            showBack = true,
            onBackClick = onBackClick
        )

        Spacer(modifier = Modifier.height(Dimens.LargeSpacing))

        AppTextField(
            label = "Email",
            value = email,
            onValueChange = { email = it }
        )

        Spacer(modifier = Modifier.height(Dimens.MediumSpacing))

        AppTextField(
            label = "Password",
            value = password,
            onValueChange = { password = it },
            isPassword = true
        )

        Spacer(modifier = Modifier.height(Dimens.LargeSpacing))

        AppButton(
            text = "Sign In",
            onClick = {
                onLoginClick(email, password)
            },
            modifier = Modifier.align(Alignment.End)
        )
        Spacer(modifier = Modifier.height(Dimens.MediumSpacing))

        TextButton(
            onClick = onRegisterClick,
            modifier = Modifier.align(Alignment.End)
        ) {
            Text(
                text = "Create account",
                style = MaterialTheme.typography.bodyLarge
            )
        }
    }

}