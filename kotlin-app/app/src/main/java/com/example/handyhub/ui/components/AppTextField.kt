package com.example.handyhub.ui.components

import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.outlined.Visibility
import androidx.compose.material.icons.outlined.VisibilityOff
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.OutlinedTextField
import androidx.compose.material3.OutlinedTextFieldDefaults
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.input.PasswordVisualTransformation
import androidx.compose.ui.text.input.VisualTransformation
import androidx.compose.ui.unit.dp
import com.example.handyhub.ui.theme.AppColors
import com.example.handyhub.ui.theme.Dimens

@Composable
fun AppTextField(
    label: String,
    value: String,
    onValueChange: (String) -> Unit,
    modifier: Modifier = Modifier,
    isPassword: Boolean = false,
    minLines: Int = 1,
    singleLine: Boolean = true
) {
    var passwordVisible by remember {
        mutableStateOf(false)
    }

    Text(
        text = label,
        style = MaterialTheme.typography.bodyMedium
    )

    Spacer(modifier = Modifier.height(Dimens.ExtraSmallSpacing))

    OutlinedTextField(
        value = value,
        onValueChange = onValueChange,
        modifier = modifier.fillMaxWidth(),
        shape = RoundedCornerShape(Dimens.RadiusCorner),
        minLines = minLines,
        singleLine = singleLine,
        visualTransformation =
            if (isPassword && !passwordVisible)
                PasswordVisualTransformation()
            else
                VisualTransformation.None,
        colors = OutlinedTextFieldDefaults.colors(
            focusedContainerColor = AppColors.CardBackground,
            unfocusedContainerColor = AppColors.CardBackground,,
            focusedBorderColor = AppColors.Transparent,
            unfocusedBorderColor = AppColors.Transparent
        ),
        trailingIcon =
            if (isPassword) {
                {
                    IconButton(
                        onClick = {
                            passwordVisible = !passwordVisible
                        }
                    ) {
                        Icon(
                            imageVector =
                                if (passwordVisible)
                                    Icons.Outlined.Visibility
                                else
                                    Icons.Outlined.VisibilityOff,
                            contentDescription = null
                        )
                    }
                }
            } else null
    )

    Spacer(modifier = Modifier.height(Dimens.MediumHeight))
}