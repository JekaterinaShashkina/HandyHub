package com.example.handyhub.data.sample

import com.example.handyhub.R
import com.example.handyhub.data.repository.HandyHubRepository
import com.example.handyhub.model.Category
import com.example.handyhub.model.MasterProfile
import com.example.handyhub.model.Review
import com.example.handyhub.model.Role
import com.example.handyhub.model.Service
import com.example.handyhub.model.User
import com.example.handyhub.utils.security.PasswordHasher

object SampleData {

    val roles = listOf(
        Role(
            id = 1,
            roleName = "client"
        ),
        Role(
            id = 2,
            roleName = "master"
        ),
        Role(
            id = 3,
            roleName = "admin"
        )
    )

    val categories = listOf(
        Category(
            id = 1,
            name = "Manicure",
            iconUrl = "manicurist"
        ),
        Category(
            id = 2,
            name = "Hairdresser",
            iconUrl = "hairdresser"
        ),
        Category(
            id = 3,
            name = "Electrician",
            iconUrl = "electrician"
        ),
        Category(
            id = 4,
            name = "Plumber",
            iconUrl = "plumber"
        ),
        Category(
            id = 5,
            name = "Cosmetologist",
            iconUrl = "cosmetologist"
        ),
    )
    val salt1 = PasswordHasher.generateSalt()
    val salt2 = PasswordHasher.generateSalt()
    val salt3 = PasswordHasher.generateSalt()

    val users = listOf(
        User(
            id = 1,
            name = "Anna",
            surname = "Petrova",
            email = "anna@example.com",
            phone = "+37255550001",
            passwordHash = PasswordHasher.hashPassword("123456", salt1),
            passwordSalt = salt1,
            roleId = 2,
            avatarUrl = R.drawable.master_photo_1,
            createdAt = System.currentTimeMillis(),
            updatedAt = System.currentTimeMillis(),
        ),
        User(
            id = 2,
            name = "Maksim",
            surname = "Ivanov",
            email = "maksim@example.com",
            phone = "+37255550002",
            passwordHash = PasswordHasher.hashPassword("123456", salt2),
            passwordSalt = salt2,
            roleId = 2,
            avatarUrl = R.drawable.master_photo_2,
            createdAt = System.currentTimeMillis(),
            updatedAt = System.currentTimeMillis(),
        ),
        User(
            id = 3,
            name = "Olga",
            surname = "Smirnova",
            email = "olga@example.com",
            phone = "+37255550003",
            passwordHash = PasswordHasher.hashPassword("123456", salt3),
            passwordSalt = salt3,
            roleId = 1,
            avatarUrl = R.drawable.master_photo_1,
            createdAt = System.currentTimeMillis(),
            updatedAt = System.currentTimeMillis()
        )
    )

    val masterProfiles = listOf(
        MasterProfile(
            id = 1,
            userId = 1,
            description = "Professional manicure master with 5 years of experience. Professional manicure master with 5 years of experience.Professional manicure master with 5 years of experience.Professional manicure master with 5 years of experience.Professional manicure master with 5 years of experience.Professional manicure master with 5 years of experience.Professional manicure master with 5 years of experience.Professional manicure master with 5 years of experience.Professional manicure master with 5 years of experience.",
            expYears = 5,
            priceFrom = 25.0,
            isActive = true,
            createdAt = System.currentTimeMillis(),
            updatedAt = System.currentTimeMillis()
        ),
        MasterProfile(
            id = 2,
            userId = 2,
            description = "Certified electrician for apartments and houses.",
            expYears = 8,
            priceFrom = 40.0,
            isActive = true,
            createdAt = System.currentTimeMillis(),
            updatedAt = System.currentTimeMillis()
        )
    )

    val services = listOf(
        Service(
            id = 1,
            masterProfileId = 1,
            categoryId = 1,
            title = "Gel Polish",
            description = "Long-lasting gel polish manicure.",
            price = 30.0,
            priceType = "fixed",
            duration = 90,
            createdAt = System.currentTimeMillis(),
            updatedAt = System.currentTimeMillis()
        ),
        Service(
            id = 2,
            masterProfileId = 2,
            categoryId = 3,
            title = "Socket Installation",
            description = "Installation and replacement of electrical sockets.",
            price = 45.0,
            priceType = "hourly",
            duration = 60,
            createdAt = System.currentTimeMillis(),
            updatedAt = System.currentTimeMillis()
        ),
        Service(
            id = 3,
            masterProfileId = 1,
            categoryId = 1,
            title = "Gel Removing",
            description = "Gel polish gentle removing of nails.",
            price = 15.0,
            priceType = "fixed",
            duration = 60,
            createdAt = System.currentTimeMillis(),
            updatedAt = System.currentTimeMillis()
        ),
    )

    val reviews = listOf(
        Review(
            id = 1,
            userId = 3,
            masterProfileId = 1,
            rating = 5,
            comment = "Very professional and friendly master.",
            createdAt = System.currentTimeMillis()
        ),
        Review(
            id = 2,
            userId = 3,
            masterProfileId = 2,
            rating = 5,
            comment = "Work was completed quickly and neatly.",
            createdAt = System.currentTimeMillis()
        ),
        Review(
        id = 3,
        userId = 2,
        masterProfileId = 1,
        rating = 3,
        comment = "Work was completed quickly but not very nice.",
        createdAt = System.currentTimeMillis()
    )
    )

    suspend fun seedDatabase(repository: HandyHubRepository) {

        roles.forEach {
            repository.insertRole(it)
        }

        categories.forEach {
            repository.insertCategory(it)
        }

        users.forEach {
            repository.insertUser(it)
        }

        masterProfiles.forEach {
            repository.insertMasterProfile(it)
        }

        services.forEach {
            repository.insertService(it)
        }

        reviews.forEach {
            repository.insertReview(it)
        }
    }
}