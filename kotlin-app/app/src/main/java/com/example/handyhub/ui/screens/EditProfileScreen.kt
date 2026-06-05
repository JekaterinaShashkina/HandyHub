package com.example.handyhub.ui.screens

import android.content.Intent
import androidx.activity.compose.rememberLauncherForActivityResult
import androidx.activity.result.contract.ActivityResultContracts
import androidx.compose.foundation.BorderStroke
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
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
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.layout.ContentScale
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.unit.dp
import coil.compose.AsyncImage
import com.example.handyhub.model.User
import com.example.handyhub.ui.components.AppButton
import com.example.handyhub.ui.components.AppHeader
import com.example.handyhub.ui.components.AppTextField
import com.example.handyhub.ui.theme.AppColors
import com.example.handyhub.ui.theme.Dimens

@Composable
fun EditProfileScreen(
    currentUser: User?,
    onBackClick: () -> Unit,
    onSaveClick: (
        name: String,
        surname: String,
        email: String,
        phone: String,
        avatarUri: String?
    ) -> Unit
) {
    if (currentUser == null) {
        return
    }
    var name by remember { mutableStateOf(currentUser.name) }
    var surname by remember { mutableStateOf(currentUser.surname) }
    var email by remember { mutableStateOf(currentUser.email) }
    var phone by remember { mutableStateOf(currentUser.phone) }
    var avatarUri by remember { mutableStateOf(currentUser.avatarUri) }

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

    Column (
        modifier = Modifier
            .fillMaxSize()
            .background(AppColors.Background)
            .padding(Dimens.LargeSpacing, Dimens.ExtraLargeSpacing)
    ){
        AppHeader(
            title = "Edit profile",
            showBack = true,
            showAuthActions = false,
            onBackClick = onBackClick
        )

        Spacer(modifier = Modifier.height(Dimens.LargeSpacing))

        AppTextField(
            label = "Name",
            value = name,
            onValueChange = { name = it }
        )

        AppTextField(
            label = "Surname",
            value = surname,
            onValueChange = { surname = it }
        )

        AppTextField(
            label = "E-mail",
            value = email,
            onValueChange = { email = it }
        )

        AppTextField(
            label = "Phone",
            value = phone,
            onValueChange = { phone = it }
        )

        Spacer(modifier = Modifier.height(Dimens.MediumHeight))
        avatarUri?.let { uri ->
            Spacer(modifier = Modifier.height(Dimens.MediumSpacing))

            AsyncImage(
                model = uri,
                contentDescription = "Avatar preview",
                modifier = Modifier
                    .size(90.dp)
                    .clip(CircleShape)
                    .align(Alignment.CenterHorizontally),
                contentScale = ContentScale.Crop
            )
        }
        Spacer(modifier = Modifier.height(Dimens.MediumSpacing))
        OutlinedButton(
            onClick = {
                imagePicker.launch(arrayOf("image/*"))
            },
            shape = RoundedCornerShape(Dimens.RadiusCorner),
            modifier = Modifier.align(Alignment.CenterHorizontally),
            border = BorderStroke(
                1.dp,
                AppColors.ButtonBorder
            ),
            colors = androidx.compose.material3.ButtonDefaults.outlinedButtonColors(
                containerColor = AppColors.ButtonBackground
            ),
        ) {
            Text(
                text = "Change avatar",
                color = AppColors.TextPrimary,
                style = MaterialTheme.typography.titleMedium)
        }
        Spacer(modifier = Modifier.height(Dimens.MediumSpacing))
        AppButton(
            text = "Save",
            onClick = {
                onSaveClick(
                    name,
                    surname,
                    email,
                    phone,
                    avatarUri
                )
            },
            modifier = Modifier.align(Alignment.End)
        )
    }
}