package com.example.handyhub.ui.components

import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.Card
import androidx.compose.material3.CardDefaults
import androidx.compose.material3.Icon
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.vector.ImageVector
import com.example.handyhub.ui.theme.AppColors
import com.example.handyhub.ui.theme.Dimens

@Composable
fun ProfileInfoCard(
    icon: ImageVector,
    text: String
) {
    Card(
        modifier = Modifier.fillMaxWidth(),
        shape = RoundedCornerShape(Dimens.MediumSpacing),
        colors = CardDefaults.cardColors(
            containerColor = AppColors.SecondaryBackGround
        )
    ){
        Row(
            modifier = Modifier.padding(Dimens.MediumSpacing),
            verticalAlignment = Alignment.CenterVertically,
        ){
            Icon(
                imageVector = icon,
                contentDescription = null,
                tint = AppColors.Primary
            )

            Spacer(modifier = Modifier.width(Dimens.MediumSpacing))

            Text(
                text = text,
                style = MaterialTheme.typography.bodyLarge
            )
        }
    }

}