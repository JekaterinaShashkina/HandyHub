package com.example.handyhub.ui.screens

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.outlined.ArrowBack
import androidx.compose.material3.Button
import androidx.compose.material3.ButtonDefaults
import androidx.compose.material3.Card
import androidx.compose.material3.CardDefaults
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
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
import com.example.handyhub.ui.components.RatingInput
import com.example.handyhub.ui.components.ReviewInput

@Composable
fun AddReviewScreen(
    onBackClick: () -> Unit,
    onPublishClick: (
        name: String,
        phone: String,
        comment: String,
        rating: Int
    ) -> Unit
) {
    var name by remember { mutableStateOf("") }
    var phone by remember { mutableStateOf("") }
    var comment by remember { mutableStateOf("") }
    var rating by remember { mutableIntStateOf(0) }

    Column(
        modifier = Modifier
            .fillMaxSize()
            .background(Color(0xFFAAA3DD))
            .padding(24.dp)
    ) {
        IconButton(onClick = onBackClick) {
            Icon(
                imageVector = Icons.Outlined.ArrowBack,
                contentDescription = "Back"
            )
        }

        Card(
            modifier = Modifier.fillMaxWidth(),
            shape = RoundedCornerShape(24.dp),
            colors = CardDefaults.cardColors(
                containerColor = Color(0xFFF4F5FC)
            )
        ) {
            Column(
                modifier = Modifier.padding(24.dp)
            ) {
                ReviewInput(
                    label = "Имя",
                    value = name,
                    onValueChange = { name = it }
                )

                ReviewInput(
                    label = "Телефон",
                    value = phone,
                    onValueChange = { phone = it }
                )

                ReviewInput(
                    label = "Комментарий",
                    value = comment,
                    onValueChange = { comment = it },
                    minLines = 4
                )

                Spacer(modifier = Modifier.height(28.dp))

                Button(
                    onClick = {
                        onPublishClick(name, phone, comment, rating)
                    },
                    modifier = Modifier
                        .align(Alignment.End)
                        .height(54.dp),
                    shape = RoundedCornerShape(8.dp),
                    colors = ButtonDefaults.buttonColors(
                        containerColor = Color(0xFFFFC800),
                        contentColor = Color.Black
                    )
                ) {
                    Text("Опубликовать отзыв")
                }

                Spacer(modifier = Modifier.height(24.dp))

                RatingInput(
                    rating = rating,
                    onRatingChange = { rating = it },
                    modifier = Modifier.align(Alignment.End)
                )
            }
        }
    }
}