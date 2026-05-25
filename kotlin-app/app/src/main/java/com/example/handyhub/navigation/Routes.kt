package com.example.handyhub.navigation

object Routes {
    const val HOME = "home"
    const val  MASTER_DETAIL = "master_detail/{masterId}"
    const val ADD_REVIEW = "add_review/{masterId}"
    const val LOGIN = "login"
    const val REGISTER_ROLE = "register_role"
    const val REGISTER_USER = "register_user"
    const val REGISTER_MASTER = "register_master"
    const val PROFILE = "profile"

    fun masterDetail(masterId: Int): String {
        return "master_detail/$masterId"
    }
    fun addReview(masterId: Int): String {
        return "add_review/$masterId"
    }
}