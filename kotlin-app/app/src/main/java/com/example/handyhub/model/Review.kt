package com.example.handyhub.model

import androidx.room.Entity
import androidx.room.ForeignKey
import androidx.room.PrimaryKey


@Entity(tableName = "reviews",
    foreignKeys = [
    ForeignKey(
        entity = User::class,
        parentColumns = ["id"],
        childColumns = ["userId"]
    ),
    ForeignKey(
        entity = MasterProfile::class,
        parentColumns = ["id"],
        childColumns = ["masterProfileId"]
    )
    ]
)
data class Review(
    @PrimaryKey(autoGenerate = true)
    val id: Int = 0,
    val userId: Int,
    val masterProfileId: Int,
    val rating: Int,
    val comment: String,
    val createdAt: Long,
)
