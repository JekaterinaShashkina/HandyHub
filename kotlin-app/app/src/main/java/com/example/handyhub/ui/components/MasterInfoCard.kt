package com.example.handyhub.ui.components

import androidx.compose.foundation.clickable
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
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextOverflow
import androidx.compose.ui.unit.dp
import com.example.handyhub.model.Service
import com.example.handyhub.ui.theme.AppColors
import com.example.handyhub.ui.theme.Dimens

@Composable
fun MasterInfoCard(
    description: String,
    services: List<Service>,
    modifier: Modifier = Modifier
) {
    var expanded by remember { mutableStateOf(false) }

    Card(
        modifier = modifier.fillMaxWidth(),
        shape = RoundedCornerShape(Dimens.ExtraLargeRadiusCorner),
        colors = CardDefaults.cardColors(
            containerColor = AppColors.SecondaryBackGround
        )
    ) {
        Column(
            modifier = Modifier.padding(Dimens.MediumHeight)
        ) {
            Text(
                text = "About",
                style = MaterialTheme.typography.headlineSmall
            )

            Spacer(modifier = Modifier.height(Dimens.SmallSpacing))

            Text(
                text = description,
                maxLines = if (expanded) Int.MAX_VALUE else 5,
                overflow = TextOverflow.Ellipsis,
                style = MaterialTheme.typography.bodyMedium
            )

            if (description.length > 160) {
                Text(
                    text = if (expanded) "Show less" else "Show more",
                    modifier = Modifier
                        .padding(top = Dimens.SmallSpacing)
                        .clickable { expanded = !expanded },
                    color = MaterialTheme.colorScheme.primary,
                    style = MaterialTheme.typography.bodyMedium,
                    fontWeight = FontWeight.SemiBold
                )
            }
            Spacer(modifier = Modifier.height(Dimens.MediumSpacing))

            Text(
                text = "Services",
                style = MaterialTheme.typography.headlineSmall
            )
            services.forEach { service ->
                Row(
                    modifier = Modifier
                        .fillMaxWidth()
                        .padding(vertical = Dimens.SmallSpacing),
                    horizontalArrangement = Arrangement.SpaceBetween
                ) {
                    Text(
                        text = service.title,
                        style = MaterialTheme.typography.bodyMedium
                    )
                    Text(
                        text = "${service.price.toInt()} €",
                        style = MaterialTheme.typography.bodyMedium,
                        color = Color.Gray
                    )
                }
            }
        }
    }
}