package com.example.handyhub.ui.components

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.Card
import androidx.compose.material3.CardDefaults
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.material3.TextButton
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.unit.dp
import com.example.handyhub.model.Service
import com.example.handyhub.ui.theme.Dimens

@Composable
fun ServiceManageCard (
    service: Service,
    canDelete: Boolean,
    onEditClick: () -> Unit,
    onDeleteClick: () -> Unit
){
    Card(
        modifier = Modifier.fillMaxWidth(),
        shape = RoundedCornerShape(Dimens.MediumSpacing),
        colors = CardDefaults.cardColors(
            containerColor = Color.White
        )
    ) {
            Column(
                modifier = Modifier.padding(Dimens.MediumSpacing)
            ) {
                Row(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalArrangement = Arrangement.SpaceBetween
                ){
                Text(
                    text = service.title,
                    style = MaterialTheme.typography.titleLarge
                )

                Spacer(modifier = Modifier.height(Dimens.ExtraSmallSpacing))

                Text(
                    text = "from ${service.price.toInt()} €",
                    style = MaterialTheme.typography.bodyLarge
                )
                    }
                Spacer(modifier = Modifier.height(Dimens.ExtraSmallSpacing))
                Row(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalArrangement = Arrangement.End

                ) {
                    TextButton(onClick = onEditClick) {
                        Text(
                            text = "Edit",
                            style = MaterialTheme.typography.bodyMedium
                        )
                    }

                    TextButton(
                        onClick = onDeleteClick,
                        enabled = canDelete
                    ) {
                        Text(
                            text = "Delete",
                            style = MaterialTheme.typography.bodyMedium
                        )
                    }
                }
                if (!canDelete) {
                    Text(
                        text = "At least one service is required",
                        style = MaterialTheme.typography.bodySmall,
                        color = Color.Gray
                    )
                }
            }

        }

}