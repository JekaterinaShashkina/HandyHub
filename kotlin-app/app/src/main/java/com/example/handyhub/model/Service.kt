package com.example.handyhub.model

import androidx.room.Entity
import androidx.room.ForeignKey
import androidx.room.PrimaryKey

@Entity(tableName = "services",
    foreignKeys = [
    ForeignKey(
        entity = MasterProfile::class,
        parentColumns = ["id"],
        childColumns = ["masterProfileId"]
    ),
    ForeignKey(
        entity = Category::class,
        parentColumns = ["id"],
        childColumns = ["categoryId"]
    )
]
)

data class Service(
    @PrimaryKey(autoGenerate = true)
    val id: Int = 0,
    val masterProfileId: Int,
    val categoryId: Int,
    val title: String,
    val price: Double,
    val createdAt: Long,
    val updatedAt: Long
)
