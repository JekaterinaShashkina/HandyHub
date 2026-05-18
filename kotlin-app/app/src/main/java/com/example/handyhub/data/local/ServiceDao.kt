package com.example.handyhub.data.local

import androidx.room.Dao
import androidx.room.Insert
import androidx.room.OnConflictStrategy
import androidx.room.Query
import com.example.handyhub.model.Service

@Dao
interface ServiceDao {
    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insertService(service: Service)

    @Query("SELECT * FROM services")
    suspend fun getAllServices(): List<Service>

    @Query("SELECT * FROM services WHERE masterProfileId = :masterProfileId")
    suspend fun getServicesByMaster(masterProfileId: Int): List<Service>
}