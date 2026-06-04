package com.example.handyhub.ui.screens

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.Button
import androidx.compose.material3.ButtonDefaults
import androidx.compose.material3.Card
import androidx.compose.material3.CardDefaults
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableIntStateOf
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.unit.dp
import com.example.handyhub.ui.components.AppHeader
import com.example.handyhub.ui.components.AppTextField
import com.example.handyhub.ui.components.RatingInput
import com.example.handyhub.ui.theme.AppColors
import com.example.handyhub.ui.theme.Dimens

@Composable
fun AddReviewScreen(
    masterId: Int,
    onBackClick: () -> Unit,
    onPublishClick: (
        comment: String,
        rating: Int
    ) -> Unit
) {
    var comment by remember { mutableStateOf("") }
    var rating by remember { mutableIntStateOf(0) }

    Box(
        modifier = Modifier
            .fillMaxSize()
            .background(AppColors.Secondary.copy(alpha = 0.5f))
            .padding(Dimens.LargeSpacing, Dimens.ExtraLargeSpacing),
        contentAlignment = Alignment.Center
    ) {
        Card(
            modifier = Modifier
                .fillMaxWidth()
                .padding(top = Dimens.ScreenPadding),
            shape = RoundedCornerShape(Dimens.ScreenPadding),
            colors = CardDefaults.cardColors(
                containerColor = AppColors.Background
            )
        ) {
            Column(
                modifier = Modifier.padding(Dimens.LargeSpacing)
            ) {
                AppHeader(
                    title = "Add review",
                    showBack = true,
                    onBackClick = onBackClick
                )

                AppTextField(
                    label = "Comment",
                    value = comment,
                    onValueChange = { comment = it },
                    minLines = 6,
                    singleLine = false
                )

                Spacer(modifier = Modifier.height(Dimens.LargeSpacing))

                Button(
                    onClick = {
                        onPublishClick(comment, rating)
                    },
                    modifier = Modifier
                        .align(Alignment.End)
                        .height(Dimens.ButtonHeight),
                    shape = RoundedCornerShape(Dimens.RadiusCorner),
                    colors = ButtonDefaults.buttonColors(
                        containerColor = AppColors.Primary,
                        contentColor = Color.Black
                    )
                ) {
                    Text(
                        text = "Add review",
                        style = MaterialTheme.typography.headlineSmall
                    )
                }
                Spacer(modifier = Modifier.height(Dimens.ScreenPadding))
                RatingInput(
                    rating = rating,
                    onRatingChange = { rating = it },
                    modifier = Modifier.align(Alignment.End)
                )
            }
        }
    }
}