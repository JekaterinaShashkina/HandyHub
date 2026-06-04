package com.example.handyhub.ui.components

import androidx.compose.foundation.clickable
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

@Composable
fun RatingInput(
    rating: Int,
    onRatingChange: (Int) -> Unit,
    modifier: Modifier = Modifier
) {
    Row(modifier = modifier) {
        repeat(5) { index ->
            Icon(
                imageVector = if (index < rating) {
                    Icons.Filled.Star
                } else {
                    Icons.Outlined.StarBorder
                },
                contentDescription = null,
                tint = Color(0xFFFFC400),
                modifier = Modifier
                    .size(Dimens.ProfileIconSize)
                    .clickable {
                        onRatingChange(index + 1)
                    }
            )
        }
    }
}