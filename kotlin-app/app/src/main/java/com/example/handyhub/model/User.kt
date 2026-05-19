package com.example.handyhub.model

import androidx.room.Entity
import androidx.room.ForeignKey
import androidx.room.PrimaryKey

@Entity(
    tableName = "users",
    foreignKeys = [
        ForeignKey(
            entity = Role::class,
            parentColumns = ["id"],
            childColumns = ["roleId"]
        )
    ]
)
data class User(
    @PrimaryKey
    val id: Int,
    val name: String,
    val surname: String,
    val email: String,
    val phone: String,
    val passwordHash: String,
    val roleId: Int,
    val avatarUrl: Int,
    val createdAt: Long,
    val updatedAt: Long
)