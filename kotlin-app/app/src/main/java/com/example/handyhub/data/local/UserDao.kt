package com.example.handyhub.data.local

import androidx.room.Dao
import androidx.room.Insert
import com.example.handyhub.model.User
import androidx.room.OnConflictStrategy
import androidx.room.Query
import androidx.room.Update

@Dao
interface UserDao {
    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insertUser(user: User) : Long

    @Query("SELECT * FROM users")
    suspend fun getAllUser(): List<User>

    @Query("SELECT * FROM users WHERE id = :userId")
    suspend fun getUserById(userId: Int): User?

    @Query("SELECT * FROM users WHERE email = :email LIMIT 1")
    suspend fun getUserByEmail(email: String): User?

    @Query("UPDATE users SET roleId = :roleId, updatedAt = :updatedAt WHERE id = :userId")
    suspend fun updateUserRole(
        userId: Int,
        roleId: Int,
        updatedAt: Long
    )
    @Update
    suspend fun updateUser(user: User)
}
