package com.example.handyhub.data.local

import androidx.room.Dao
import androidx.room.Insert
import androidx.room.OnConflictStrategy
import androidx.room.Query
import com.example.handyhub.model.MasterProfile

@Dao
interface MasterProfileDao {
    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insertMasterProfile(master: MasterProfile): Long

    @Query("SELECT * FROM master_profile")
    suspend fun getAllMasterProfiles(): List<MasterProfile>

    @Query("Select * FROM master_profile WHERE id = :masterId")
    suspend fun getMasterProfileById(masterId: Int): MasterProfile?
}