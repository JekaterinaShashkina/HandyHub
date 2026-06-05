package com.example.handyhub.data.local

import androidx.room.Dao
import androidx.room.Delete
import androidx.room.Insert
import androidx.room.OnConflictStrategy
import androidx.room.Query
import androidx.room.Update
import com.example.handyhub.model.Service

@Dao
interface ServiceDao {
    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insertService(service: Service): Long

    @Query("SELECT * FROM services")
    suspend fun getAllServices(): List<Service>

    @Query("SELECT * FROM services WHERE masterProfileId = :masterProfileId")
    suspend fun getServicesByMaster(masterProfileId: Int): List<Service>

    @Query("SELECT * FROM services WHERE id = :serviceId LIMIT 1")
    suspend fun getServiceById(serviceId: Int): Service?

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insertServices(services: Service) : Long

    @Update
    suspend fun updateService(service: Service)

    @Delete
    suspend fun deleteService(service: Service)

}