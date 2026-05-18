package com.example.handyhub.data.local

import androidx.room.Database
import androidx.room.RoomDatabase
import com.example.handyhub.model.Category
import com.example.handyhub.model.MasterProfile
import com.example.handyhub.model.Review
import com.example.handyhub.model.Role
import com.example.handyhub.model.Service
import com.example.handyhub.model.User

@Database(entities = [
    User::class,
    Role::class,
    Category::class,
    MasterProfile::class,
    Service::class,
    Review::class
   ],
    version = 1
)


abstract class AppDatabase:RoomDatabase() {
    abstract fun userDao(): UserDao
    abstract fun roleDao(): RoleDao
    abstract fun categoryDao(): CategoryDao
    abstract fun masterProfileDao(): MasterProfileDao
    abstract fun serviceDao(): ServiceDao
    abstract fun reviewDao(): ReviewDao
}
