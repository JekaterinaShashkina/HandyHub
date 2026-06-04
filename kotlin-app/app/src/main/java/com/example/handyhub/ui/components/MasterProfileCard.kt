package com.example.handyhub.ui.components

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.automirrored.filled.Comment
import androidx.compose.material.icons.filled.Comment
import androidx.compose.material.icons.filled.PhoneIphone
import androidx.compose.material.icons.outlined.Email
import androidx.compose.material3.Card
import androidx.compose.material3.CardDefaults
import androidx.compose.material3.Icon
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.layout.ContentScale
import androidx.compose.ui.unit.dp
import coil.compose.AsyncImage
import com.example.handyhub.model.Review
import com.example.handyhub.ui.model.MasterCardUiModel
import com.example.handyhub.ui.theme.Dimens

@Composable
fun MasterProfileCard(
    item: MasterCardUiModel,
    reviews: List<Review>,
    reviewsCount: Int,
    modifier: Modifier = Modifier
){
    Card (
        modifier = modifier
            .fillMaxWidth()
            .padding(bottom = Dimens.MediumSpacing),
        shape = RoundedCornerShape(Dimens.ExtraLargeRadiusCorner),
        colors = CardDefaults.cardColors(
            containerColor = Color(0xFFF4F4F8)
        )
    ){
        Column (
            modifier = Modifier.padding(Dimens.LargeSpacing)
        ){
            Row(
                modifier = Modifier.fillMaxWidth(),
                verticalAlignment = Alignment.Top,
                horizontalArrangement = Arrangement.SpaceBetween
            ) {
                AsyncImage(
                    model = item.avatarUrl ?: item.avatarUri,
                    contentDescription = null,
                    modifier = Modifier
                        .size(Dimens.MediumAvatarSize)
                        .clip(CircleShape),
                    contentScale = ContentScale.Crop
                )
                Spacer(modifier = Modifier.width(Dimens.MediumSpacing))
                Text(
                    text = "from ${item.priceFrom.toInt()} €",
                    style = MaterialTheme.typography.titleLarge
                )
            }
            Spacer(modifier = Modifier.height(Dimens.MediumSpacing))
            Text(
                text = item.categoryName,
                style = MaterialTheme.typography.headlineSmall
            )
            Spacer(modifier = Modifier.height(Dimens.MediumSpacing))
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.SpaceBetween
            ) {
                Text(
                    text = item.fullName,
                    style = MaterialTheme.typography.bodyLarge
                )
                Spacer(modifier = Modifier.height(Dimens.MediumHeight))

                Row(
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    RatingBar(rating = item.ratingAvg)

                    Spacer(modifier = Modifier.width(Dimens.ExtraSmallWidth))
                    Icon(
                        imageVector = Icons.AutoMirrored.Filled.Comment,
                        contentDescription = null,
                        modifier = Modifier.size(Dimens.SmallIconSize),
                        tint = Color.Black
                    )
                    Spacer(modifier = Modifier.width(Dimens.ExtraSmallWidth))
                    Text(
                        text = reviews.size.toString(),
                        style = MaterialTheme.typography.bodyMedium
                    )
                }
            }
            Spacer(modifier = Modifier.height(Dimens.LargeSpacing))
            Row(
                verticalAlignment = Alignment.CenterVertically,
                horizontalArrangement = Arrangement.spacedBy(Dimens.MediumSpacing)
            ) {
                Icon(
                    imageVector = Icons.Filled.PhoneIphone,
                    contentDescription = null,
                    tint = Color(0xFF4267B2),
                    modifier = Modifier.size(Dimens.IconSize)
                )

                Text(
                    text = item.phone,
                    style = MaterialTheme.typography.bodyMedium
                )
            }
            Spacer(modifier = Modifier.height(Dimens.MediumSpacing))
            Row(
                verticalAlignment = Alignment.CenterVertically,
                horizontalArrangement = Arrangement.spacedBy(Dimens.MediumSpacing)
            ) {
                Icon(
                    imageVector = Icons.Outlined.Email,
                    contentDescription = null,
                    tint = Color(0xFF4267B2),
                    modifier = Modifier.size(Dimens.IconSize)
                )

                Text(
                    text = item.email,
                    style = MaterialTheme.typography.bodyMedium
                )

            }

        }
    }
}