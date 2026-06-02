package com.example.handyhub.ui.components

import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.outlined.ChatBubble
import androidx.compose.material3.Card
import androidx.compose.material3.CardDefaults
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Icon
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.*
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.layout.ContentScale
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import coil.compose.AsyncImage
import com.example.handyhub.ui.model.MasterCardUiModel

@Composable
fun MasterCard(
    master: MasterCardUiModel,
    modifier: Modifier = Modifier,
    onClick: (Int) -> Unit = {}
) {
    Card (
        modifier = modifier
            .fillMaxWidth()
            .clickable { onClick(master.id) },
        shape = RoundedCornerShape(20.dp),
        colors = CardDefaults.cardColors(
        containerColor = Color(0xFFF4F4F8)
        )
    ){
        Row (
            modifier = Modifier
                .fillMaxWidth()
                .padding(16.dp)

        ){
            Column(
                horizontalAlignment = Alignment.CenterHorizontally,
                ) {
                AsyncImage(
                    model = master.avatarUrl ?: master.avatarUri,
                    contentDescription = "Avatar",
                    modifier = Modifier
                        .size(84.dp)
                        .clip(CircleShape),
                    contentScale = ContentScale.Crop
                )
                Spacer(modifier = Modifier.height(12.dp))

                Text(
                    text = master.categoryName,
                    style = MaterialTheme.typography.titleMedium
                )
                Spacer(modifier = Modifier.height(4.dp))
                Text(
                    text = master.fullName,
                    style = MaterialTheme.typography.bodyMedium,
                    color = Color.Gray
                )

            }
            Spacer(modifier = Modifier.weight(1f))
            Column(
                horizontalAlignment = Alignment.End,
                verticalArrangement = Arrangement.SpaceBetween,
                modifier = Modifier.height(140.dp)

            ) {
                Text(
                    text = "from ${master.priceFrom.toInt()} €",
                    style = MaterialTheme.typography.headlineSmall,
                    fontWeight = FontWeight.Medium
                )
                Row(
                    verticalAlignment = Alignment.CenterVertically
                ) {

                    RatingBar(rating = master.ratingAvg)
                    Spacer(modifier = Modifier.width(8.dp))
                    Icon(
                        imageVector = Icons.Outlined.ChatBubble,
                        contentDescription = null,
                        modifier = Modifier.size(18.dp)
                    )
                    Spacer(modifier = Modifier.width(4.dp))

                    Text(text = master.reviewsCount.toString())
                }

            }
        }
    }
}