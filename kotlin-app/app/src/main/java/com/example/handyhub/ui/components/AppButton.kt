package com.example.handyhub.ui.components

import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.Button
import androidx.compose.material3.ButtonDefaults
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import com.example.handyhub.ui.theme.AppColors
import com.example.handyhub.ui.theme.Dimens

@Composable
fun AppButton(
    text: String,
    onClick: () -> Unit,
    modifier: Modifier = Modifier,
    enabled: Boolean = true,
    fillMaxWidth: Boolean = false
) {
    Button(
        onClick = onClick,
        modifier = if (fillMaxWidth) {
            modifier
                .fillMaxWidth()
                .height(Dimens.ButtonHeight)

        } else {
            modifier.height(Dimens.ButtonHeight)
        },
        enabled = enabled,
        shape = RoundedCornerShape(Dimens.RadiusCorner),
        colors = ButtonDefaults.buttonColors(
            containerColor = AppColors.Primary,
            contentColor = AppColors.Secondary,
            disabledContainerColor = AppColors.disabledContainerColor,
            disabledContentColor = AppColors.TextSecondary
        )
    ) {
        Text(
            text = text,
            style = MaterialTheme.typography.headlineSmall
        )
    }
}