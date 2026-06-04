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
import com.example.handyhub.ui.theme.Dimens

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
        shape = RoundedCornerShape(Dimens.ExtraLargeRadiusCorner),
        colors = CardDefaults.cardColors(
        containerColor = Color(0xFFF4F4F8)
        )
    ){
        Row (
            modifier = Modifier
                .fillMaxWidth()
                .padding(Dimens.MediumSpacing)

        ){
            Column(
                horizontalAlignment = Alignment.CenterHorizontally,
                ) {
                AsyncImage(
                    model = master.avatarUrl ?: master.avatarUri,
                    contentDescription = "Avatar",
                    modifier = Modifier
                        .size(Dimens.AvatarSize)
                        .clip(CircleShape),
                    contentScale = ContentScale.Crop
                )
                Spacer(modifier = Modifier.height(Dimens.MediumSpacing))

                Text(
                    text = master.categoryName,
                    style = MaterialTheme.typography.titleMedium
                )
                Spacer(modifier = Modifier.height(Dimens.ExtraSmallSpacing))
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
                // modifier = Modifier.height(140.dp)

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
                    Spacer(modifier = Modifier.width(Dimens.SmallWidth))
                    Icon(
                        imageVector = Icons.Outlined.ChatBubble,
                        contentDescription = null,
                        modifier = Modifier.size(Dimens.SmallIconSize)
                    )
                    Spacer(modifier = Modifier.width(Dimens.ExtraSmallWidth))

                    Text(text = master.reviewsCount.toString())
                }

            }
        }
    }
}