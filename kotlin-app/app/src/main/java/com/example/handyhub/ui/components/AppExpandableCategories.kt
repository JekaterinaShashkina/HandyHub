package com.example.handyhub.ui.components

import androidx.compose.animation.AnimatedVisibility
import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.outlined.ExpandLess
import androidx.compose.material.icons.outlined.ExpandMore
import androidx.compose.material3.Icon
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.res.painterResource
import com.example.handyhub.R
import com.example.handyhub.model.Category
import com.example.handyhub.ui.theme.AppColors
import com.example.handyhub.ui.theme.Dimens

@Composable
fun AppExpandableCategories(
    categories: List<Category>,
    selectedCategoryId: Int?,
    onCategoryClick: (Category) -> Unit,
    modifier: Modifier = Modifier
) {
    var expanded by remember { mutableStateOf(false) }

    Column(
        modifier = modifier.fillMaxWidth()
    ) {
        Row(
            modifier = Modifier
                .fillMaxWidth()
                .clickable { expanded = !expanded }
                .padding(vertical = Dimens.MediumHeight),
            verticalAlignment = Alignment.CenterVertically
        ) {
            Text(
                text = "Categories",
                style = MaterialTheme.typography.headlineSmall
            )

            Spacer(modifier = Modifier.weight(1f))

            Icon(
                imageVector = if (expanded) Icons.Outlined.ExpandLess else Icons.Outlined.ExpandMore,
                contentDescription = null
            )
        }

        AnimatedVisibility(visible = expanded) {
            Column(
                verticalArrangement = Arrangement.spacedBy(Dimens.MediumHeight),
                modifier = Modifier.padding(bottom = Dimens.MediumHeight),

            ) {
                categories.forEach { category ->
                    val isSelected = selectedCategoryId == category.id

                    Row(
                        modifier = Modifier
                            .fillMaxWidth()
                            .clip(RoundedCornerShape(Dimens.MediumHeight))
                            .background(
                                if (isSelected) AppColors.SelectedCategory else Color.Transparent
                            )
                            .clickable { onCategoryClick(category) }
                            .padding(horizontal = Dimens.SmallSpacing, vertical = Dimens.ExtraSmallSpacing),
                        verticalAlignment = Alignment.CenterVertically,

                    ) {
                        Icon(
                            painter = painterResource(id = getCategoryIcon(category.name)),
                            contentDescription = null,
                            tint = Color.Unspecified,
                            modifier = Modifier.size(Dimens.SmallAvatarSize)
                        )

                        Spacer(modifier = Modifier.width(Dimens.MediumSpacing))

                        Text(
                            text = category.name,
                            style = MaterialTheme.typography.bodyLarge
                        )
                    }
                }
            }
        }
    }
}

private fun getCategoryIcon(categoryName: String): Int {
    return when (categoryName.lowercase()) {
        "photographer" -> R.drawable.photographer
        "visagist" -> R.drawable.makeup
        "massage therapist" -> R.drawable.masseure
        "handyman" -> R.drawable.handyman
        "cosmetologist" -> R.drawable.cosmetologist
        "electrician" -> R.drawable.electrician
        "manicure" -> R.drawable.manicurist
        "plumber" -> R.drawable.plumber
        "hairdresser" -> R.drawable.makeup
        else -> R.drawable.handyman
    }
}