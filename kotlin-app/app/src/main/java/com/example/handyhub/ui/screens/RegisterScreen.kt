package com.example.handyhub.ui.screens

import android.content.Intent
import androidx.activity.compose.rememberLauncherForActivityResult
import androidx.activity.result.contract.ActivityResultContracts
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
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
import androidx.compose.ui.layout.ContentScale
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.unit.dp
import coil.compose.AsyncImage
import com.example.handyhub.ui.components.AppButton
import com.example.handyhub.ui.components.AppHeader
import com.example.handyhub.ui.components.AppTextField
import com.example.handyhub.ui.theme.AppColors
import com.example.handyhub.ui.theme.Dimens

@Composable
fun RegisterScreen(
    onBackClick: () -> Unit,
    onRegisterClick: (
        name: String,
        surname: String,
        email: String,
        phone: String,
        password: String,
        repeatPassword: String,
        avatarUri: String?
    ) -> Unit
) {
    var name by remember { mutableStateOf("") }
    var surname by remember { mutableStateOf("") }
    var email by remember { mutableStateOf("") }
    var phone by remember { mutableStateOf("") }
    var password by remember { mutableStateOf("") }
    var repeatPassword by remember { mutableStateOf("") }
    var avatarUri by remember { mutableStateOf<String?>(null) }
    val context = LocalContext.current
    val imagePicker = rememberLauncherForActivityResult(
        contract = ActivityResultContracts.OpenDocument()
    ) { uri ->
        uri?.let {
            context.contentResolver.takePersistableUriPermission(
                it,
                Intent.FLAG_GRANT_READ_URI_PERMISSION
            )

            avatarUri = it.toString()
        }
    }

    Column(
        modifier = Modifier
            .fillMaxSize()
            .background(AppColors.Background)
            .padding(Dimens.LargeSpacing, Dimens.ExtraLargeSpacing)
    ) {
        AppHeader(
            title = "Register",
            showBack = true,
            onBackClick = onBackClick
        )
        Spacer(modifier = Modifier.height(Dimens.LargeSpacing))
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
        Spacer(modifier = Modifier.height(Dimens.MediumSpacing))
        Row(
            modifier = Modifier.fillMaxWidth(),
            verticalAlignment = Alignment.CenterVertically,

            ) {
            avatarUri?.let { uri ->
                Spacer(modifier = Modifier.height(Dimens.MediumSpacing))
                AsyncImage(
                    model = uri,
                    contentDescription = "Avatar preview",
                    modifier = Modifier
                        .size(90.dp)
                        .clip(CircleShape),

                    contentScale = ContentScale.Crop
                )
            }
            Spacer(modifier = Modifier.width(Dimens.MediumSpacing))
            Column {
                Text(
                    text = "Set avatar",
                    style = MaterialTheme.typography.bodyMedium
                )
                Spacer(modifier = Modifier.height(Dimens.SmallSpacing))
                OutlinedButton(
                    onClick = {
                        imagePicker.launch(arrayOf("image/*"))
                    },
                    shape = RoundedCornerShape(Dimens.SmallRadiusCorner)
                ) {
                    Text("Upload file")
                }
            }

        }

        Spacer(modifier = Modifier.height(Dimens.MediumSpacing))
        AppButton(
            onClick = {
                onRegisterClick(
                    name,
                    surname,
                    phone,
                    email,
                    password,
                    repeatPassword,
                    avatarUri
                )
            },
            modifier = Modifier
                .align(Alignment.End)
                .height(Dimens.ButtonHeight),
            text = "Register"
        )
        Spacer(modifier = Modifier.height(Dimens.MediumSpacing))
    }
}