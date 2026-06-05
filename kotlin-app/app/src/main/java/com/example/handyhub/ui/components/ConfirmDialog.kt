package com.example.handyhub.ui.components

import androidx.compose.foundation.BorderStroke
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.AlertDialog
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.OutlinedButton
import androidx.compose.material3.Text
import androidx.compose.material3.TextButton
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import com.example.handyhub.ui.theme.AppColors
import com.example.handyhub.ui.theme.Dimens

@Composable
fun ConfirmDialog(
    title: String,
    message: String,
    confirmText: String = "Yes",
    dismissText: String = "No",
    onConfirm: () -> Unit,
    onDismiss: () -> Unit
) {
    AlertDialog(
        onDismissRequest = onDismiss,

        title = {
            Text(text = title, style = MaterialTheme.typography.headlineSmall)
        },
        text = {
            Text(text = message, style = MaterialTheme.typography.bodyLarge)
        },

            confirmButton = {

                OutlinedButton(
                    modifier = Modifier
                        .height(Dimens.ButtonHeight),
                    onClick = onConfirm,
                    border = BorderStroke(
                        1.dp,
                        AppColors.Primary
                    ),
                    colors = androidx.compose.material3.ButtonDefaults.outlinedButtonColors(
                        containerColor = AppColors.Primary
                    ),
                    shape = RoundedCornerShape(Dimens.RadiusCorner)
                ) {
                    Text(
                        confirmText,
                        color = AppColors.TextPrimary,
                        style = MaterialTheme.typography.titleMedium
                    )
                }
            },

            dismissButton = {
                OutlinedButton(
                    modifier = Modifier
                        .height(Dimens.ButtonHeight),
                    onClick = onDismiss,
                    border = BorderStroke(
                        1.dp,
                        AppColors.ButtonBorder
                    ),
                    colors = androidx.compose.material3.ButtonDefaults.outlinedButtonColors(
                        containerColor = AppColors.ButtonBackground
                    ),
                    shape = RoundedCornerShape(Dimens.RadiusCorner)
                ) {
                    Text(
                        dismissText,
                        color = AppColors.TextPrimary,
                        style = MaterialTheme.typography.titleMedium
                    )
                }
            }

        )

}