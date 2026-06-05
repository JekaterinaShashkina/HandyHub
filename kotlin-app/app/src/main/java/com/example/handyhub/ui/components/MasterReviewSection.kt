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
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import com.example.handyhub.ui.model.ReviewWithUser
import com.example.handyhub.ui.theme.AppColors
import com.example.handyhub.ui.theme.Dimens

@Composable
fun MasterReviewSection(
    reviews: List<ReviewWithUser>,
    onAddReviewClick: () -> Unit,
    modifier: Modifier = Modifier
) {
    Card(
        modifier = modifier.fillMaxWidth(),
        shape = RoundedCornerShape(Dimens.RadiusCorner),
        colors = CardDefaults.cardColors(
            containerColor = AppColors.Background
        )
    ) {
        Column(
            modifier = Modifier.padding(Dimens.MediumSpacing)
        ) {
            Row(
                modifier = Modifier.fillMaxWidth(),
                verticalAlignment = Alignment.CenterVertically,
                horizontalArrangement = Arrangement.SpaceBetween
            ) {

                Text(
                    text = "Reviews",
                    style = MaterialTheme.typography.headlineSmall
                )
                TextButton(
                    onClick = onAddReviewClick
                ) {
                    Text("Add review")
                }
            }

            Spacer(modifier = Modifier.height(Dimens.SmallSpacing))

            reviews.forEach { review ->
                ReviewAccordeonCard(
                    modifier = Modifier.fillMaxWidth(),
                    review = review
                )
                Spacer(modifier = Modifier.height(Dimens.SmallSpacing))
            }
        }
    }
}