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

    suspend fun getMasterProfileById(masterId: Int): MasterProfile? {
        return database.masterProfileDao().getMasterProfileById(masterId)
    }
    suspend fun getMasterProfileByUserId(userId: Int): MasterProfile? {
        return database.masterProfileDao().getMasterProfileByUserId(userId)
    }
    suspend fun getServicesByMaster(masterProfileId: Int): List<Service> {
        return database.serviceDao().getServicesByMaster(masterProfileId)
    }
    suspend fun getServiceById(serviceId: Int): Service? {
        return database.serviceDao().getServiceById(serviceId)
    }
    suspend fun getCategoryById(categoryId: Int): Category? {
        return database.categoryDao().getCategoryById(categoryId)
    }
    suspend fun getUserById(userId: Int): User? {
        return database.userDao().getUserById(userId)
    }
    suspend fun getUserByEmail(email: String): User? {
        return database.userDao().getUserByEmail(email)
    }
    suspend fun getReviewsByMaster(masterProfileId: Int): List<Review> {
        return database.reviewDao().getReviewsByMaster(masterProfileId)
    }

    suspend fun insertCategory(category: Category) {
        database.categoryDao().insertCategory(category)
    }
    suspend fun insertMasterProfile(master: MasterProfile) : Long {
       return database.masterProfileDao().insertMasterProfile(master)
    }
    suspend fun insertService(service: Service) : Long {
       return database.serviceDao().insertService(service)
    }
    suspend fun insertReview(review: Review) {
        database.reviewDao().insertReview(review)
    }
    suspend fun insertUser(user: User): Long{
       return database.userDao().insertUser(user)
    }
    suspend fun insertRole(role: Role) {
        database.roleDao().insertRole(role)
    }

    suspend fun updateUser(user: User) {
        database.userDao().updateUser(user)
    }

    suspend fun updateUserRole(userId: Int, roleId: Int) {
        database.userDao().updateUserRole(
            userId = userId,
            roleId = roleId,
            updatedAt = System.currentTimeMillis()
        )
    }
    suspend fun updateService(service: Service) {
        database.serviceDao().updateService(service)
    }
    suspend fun deleteService(service: Service) {
        database.serviceDao().deleteService(service)
    }

}