package com.example.handyhub.ui.components

import androidx.compose.material3.AlertDialog
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.material3.TextButton
import androidx.compose.runtime.Composable

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
            AppButton(
                text = confirmText,
                onClick = onConfirm
            )
        },
        dismissButton = {
            TextButton(onClick = onDismiss) {
                Text(dismissText, style = MaterialTheme.typography.headlineSmall)
            }
        }
    )
}