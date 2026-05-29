package com.example.handyhub.ui.screens

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.ButtonDefaults
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
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.unit.dp
import com.example.handyhub.ui.components.AppButton
import com.example.handyhub.ui.components.AppHeader
import com.example.handyhub.ui.components.AppTextField

@Composable
fun RegisterScreen(
    onBackClick: () -> Unit,
    onRegisterClick: (
        name: String,
        surname: String,
        email: String,
        phone: String,
        password: String,
        repeatPassword: String
    ) -> Unit
) {
    var name by remember { mutableStateOf("") }
    var surname by remember { mutableStateOf("") }
    var email by remember { mutableStateOf("") }
    var phone by remember { mutableStateOf("") }
    var password by remember { mutableStateOf("") }
    var repeatPassword by remember { mutableStateOf("") }

    Column(
        modifier = Modifier
            .fillMaxSize()
            .background(Color(0xFFF5F5FA))
            .padding(24.dp)
    ) {
        AppHeader(
            title = "Register",
            showBack = true,
            onBackClick = onBackClick
        )
        Spacer(modifier = Modifier.height(24.dp))
        AppTextField(
            "Name", name,
            onValueChange = { name = it },
           )
        AppTextField("Surname", surname, onValueChange = { surname = it })
        AppTextField("Phone", phone, onValueChange = { phone = it })
        AppTextField("E-mail", email, onValueChange = { email = it })
        AppTextField(
            label = "Password",
            value = password,
            onValueChange = { password = it },
            isPassword = true
        )
        AppTextField(
            label = "Repeat password",
            value = repeatPassword,
            onValueChange = { repeatPassword = it },
            isPassword = true
        )
        Spacer(modifier = Modifier.height(24.dp))
        Text(
            text = "Set avatar",
            style = MaterialTheme.typography.bodyMedium
        )
        Spacer(modifier = Modifier.height(8.dp))
        OutlinedButton(
            onClick = {
                // avatar upload later
            },
            shape = RoundedCornerShape(4.dp)
        ) {
            Text("Upload file")
        }
        Spacer(modifier = Modifier.height(24.dp))
        AppButton(
            onClick = {
                onRegisterClick(
                    name,
                    surname,
                    email,
                    phone,
                    password,
                    repeatPassword
                )
            },
            modifier = Modifier
                .align(Alignment.End)
                .height(48.dp),
            text = "Register"
        )
        Spacer(modifier = Modifier.height(12.dp))
    }
}