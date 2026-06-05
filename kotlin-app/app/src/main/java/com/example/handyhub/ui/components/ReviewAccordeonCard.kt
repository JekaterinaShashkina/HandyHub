package com.example.handyhub.ui.components

import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.outlined.KeyboardArrowDown
import androidx.compose.material.icons.outlined.KeyboardArrowUp
import androidx.compose.material3.Card
import androidx.compose.material3.CardDefaults
import androidx.compose.material3.Icon
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import com.example.handyhub.ui.model.ReviewWithUser
import com.example.handyhub.ui.theme.AppColors
import com.example.handyhub.ui.theme.Dimens

@Composable
fun ReviewAccordeonCard(
    review: ReviewWithUser,
    modifier: Modifier = Modifier
) {
    var expanded by remember { mutableStateOf(false) }

        Card(
            modifier = modifier.fillMaxWidth()
                //.padding(Dimens.SmallSpacing)
                .clickable { expanded = !expanded },
            shape = RoundedCornerShape(Dimens.RadiusCorner),
            colors = CardDefaults.cardColors(
                containerColor = AppColors.SecondaryBackGround
            )
            ) {
            Column (
                modifier = Modifier.padding(Dimens.MediumSpacing)
            ) {
                Row(
                    modifier = Modifier.fillMaxWidth(),
                    verticalAlignment = Alignment.CenterVertically,
                    horizontalArrangement = Arrangement.SpaceBetween
                ) {
                    Row(
                        verticalAlignment = Alignment.CenterVertically,
                        horizontalArrangement = Arrangement.SpaceBetween

                    ) {
                        Text(
                            text = review.user.name,
                            style = MaterialTheme.typography.titleMedium
                        )
                        Spacer(modifier = Modifier.width(Dimens.SmallWidth))
                        Text(
                            text = review.user.surname,
                            style = MaterialTheme.typography.titleMedium
                        )
                        Spacer(modifier = Modifier.width(Dimens.SmallWidth))
                        RatingBar(
                            rating = review.review.rating.toDouble()
                        )
                    }

                    Icon(
                        imageVector = if (expanded) {
                            Icons.Outlined.KeyboardArrowUp
                        } else {
                            Icons.Outlined.KeyboardArrowDown
                        },
                        contentDescription = null
                    )

                }
                if (expanded) {
                    Spacer(modifier = Modifier.height(Dimens.MediumHeight))

                    Text(
                        text = review.review.comment,
                        style = MaterialTheme.typography.bodyMedium
                    )
                }
            }
        }
    }

