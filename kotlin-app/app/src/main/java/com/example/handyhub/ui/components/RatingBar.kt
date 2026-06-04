package com.example.handyhub.ui.components

import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.size
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Star
import androidx.compose.material.icons.outlined.StarBorder
import androidx.compose.material3.Icon
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.unit.dp
import com.example.handyhub.ui.theme.Dimens
import kotlin.math.roundToInt

@Composable
fun RatingBar(
    rating: Double,
    modifier: Modifier = Modifier,
    maxRating: Int = 5
) {
    val filledStars = rating.roundToInt().coerceIn(0, maxRating)

    Row(modifier = modifier) {
        repeat(maxRating) { index ->
            Icon(
                imageVector = if (index < filledStars) {
                    Icons.Filled.Star
                } else {
                    Icons.Outlined.StarBorder
                },
                contentDescription = null,
                tint = Color(0xFFFFC107),
                modifier = Modifier.size(Dimens.SmallIconSize)
            )
        }
    }
}