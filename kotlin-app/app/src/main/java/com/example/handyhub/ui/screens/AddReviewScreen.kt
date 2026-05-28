package com.example.handyhub.ui.screens

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
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
import com.example.handyhub.ui.components.RatingInput
import com.example.handyhub.ui.components.ReviewInput

@Composable
fun AddReviewScreen(
    masterId: Int,
    onBackClick: () -> Unit,
    onPublishClick: (
        comment: String,
        rating: Int
    ) -> Unit
) {
    var name by remember { mutableStateOf("") }
    var phone by remember { mutableStateOf("") }
    var comment by remember { mutableStateOf("") }
    var rating by remember { mutableIntStateOf(0) }

    Box (
        modifier = Modifier
            .fillMaxSize()
            .background(Color.Black.copy(alpha = 0.5f))
            .padding(24.dp,32.dp),
        contentAlignment = Alignment.Center
    ) {
        Card(
            modifier = Modifier.fillMaxWidth()
                .padding(top = 24.dp),
            shape = RoundedCornerShape(24.dp),
            colors = CardDefaults.cardColors(
                containerColor = Color(0xFFF4F5FC)
            )
        ) {
            Column(
                modifier = Modifier.padding(24.dp)
            ) {
                Row (
                    verticalAlignment = Alignment.CenterVertically,
                    horizontalArrangement = Arrangement.spacedBy(24.dp)
                ){
                    IconButton(onClick = onBackClick) {
                        Icon(
                            imageVector = Icons.Outlined.ArrowBack,
                            contentDescription = "Back"
                        )
                    }
                    Text(
                        text = "Add review",
                        style = MaterialTheme.typography.headlineMedium
                    )
                }
                ReviewInput(
                    label = "Name",
                    value = name,
                    onValueChange = { name = it }
                )

                ReviewInput(
                    label = "Phone",
                    value = phone,
                    onValueChange = { phone = it }
                )

                ReviewInput(
                    label = "Comment",
                    value = comment,
                    onValueChange = { comment = it },
                    minLines = 4
                )

                Spacer(modifier = Modifier.height(28.dp))

                Button(
                    onClick = {
                        onPublishClick( comment, rating)
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
                    Text(
                        text = "Add review",
                        style = MaterialTheme.typography.headlineSmall
                    )
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