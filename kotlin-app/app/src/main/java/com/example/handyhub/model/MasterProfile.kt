package com.example.handyhub.model

import androidx.room.Entity
import androidx.room.ForeignKey
import androidx.room.PrimaryKey


@Entity(
    tableName = "master_profile",
    foreignKeys = [
        ForeignKey(
            entity = User::class,
            parentColumns = ["id"],
            childColumns = ["userId"]
        )
    ]
)

data class MasterProfile(
    @PrimaryKey(autoGenerate = true)
    val id: Int = 0,
    val userId: Int,
    val description: String,
    val expYears: Int,
    val priceFrom: Double,
    val isActive: Boolean,
    val createdAt: Long,
    val updatedAt: Long
)
