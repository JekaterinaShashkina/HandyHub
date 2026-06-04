package com.example.handyhub.ui.components

import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.outlined.Search
import androidx.compose.material3.Icon
import androidx.compose.material3.OutlinedTextField
import androidx.compose.material3.OutlinedTextFieldDefaults
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import com.example.handyhub.ui.theme.Dimens

@Composable
fun AppSearchBar (
    value: String,
    onValueChange: (String) -> Unit,
    modifier: Modifier = Modifier,
    placeholder: String = "Search specialist"
) {
    OutlinedTextField(
        value = value,
        onValueChange = onValueChange,
        modifier = modifier
            .fillMaxWidth()
            .height(Dimens.ButtonHeight),
        placeholder = {
            Text(text = placeholder)
        },
        trailingIcon = {
            Icon(
                imageVector = Icons.Outlined.Search,
                contentDescription = "Search"
            )
        },
        singleLine = true,
        shape = RoundedCornerShape(Dimens.LargeRadiusCorner),
        colors = OutlinedTextFieldDefaults.colors(
            unfocusedBorderColor = androidx.compose.ui.graphics.Color.Transparent,
            focusedBorderColor = androidx.compose.ui.graphics.Color.Transparent
        )
    )
}