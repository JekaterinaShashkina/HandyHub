package com.example.handyhub.data.repository

import com.example.handyhub.data.local.AppDatabase
import com.example.handyhub.model.Category
import com.example.handyhub.model.MasterProfile
import com.example.handyhub.model.Review
import com.example.handyhub.model.Role
import com.example.handyhub.model.Service
import com.example.handyhub.model.User

class HandyHubRepository(
    private val database: AppDatabase
) {
    suspend fun getAllCategories(): List<Category> {
        return database.categoryDao().getAllCategories()
    }
    suspend fun getAllMasterProfiles(): List<MasterProfile> {
        return database.masterProfileDao().getAllMasterProfiles()
    }
    suspend fun getAllServices(): List<Service> {
        return database.serviceDao().getAllServices()
    }
    suspend fun getMasterProfileById(masterId: Int): MasterProfile? {
        return database.masterProfileDao().getMasterProfileById(masterId)
    }
    suspend fun getServicesByMaster(masterProfileId: Int): List<Service> {
        return database.serviceDao().getServicesByMaster(masterProfileId)
    }
    suspend fun getCategoryById(categoryId: Int): Category? {
        return database.categoryDao().getCategoryById(categoryId)
    }
    suspend fun getUserById(userId: Int): User? {
        return database.userDao().getUserById(userId)
    }
    suspend fun insertCategory(category: Category) {
        database.categoryDao().insertCategory(category)
    }
    suspend fun insertMasterProfile(master: MasterProfile) {
        database.masterProfileDao().insertMasterProfile(master)
    }
    suspend fun insertService(service: Service) {
        database.serviceDao().insertService(service)
    }
    suspend fun insertReview(review: Review) {
        database.reviewDao().insertReview(review)
    }
    suspend fun insertUser(user: User) {
        database.userDao().insertUser(user)
    }
    suspend fun insertRole(role: Role) {
        database.roleDao().insertRole(role)
    }
}