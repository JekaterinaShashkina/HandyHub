package com.example.handyhub.navigation

object Routes {
    const val HOME = "home"
    const val  MASTER_DETAIL = "master_detail/{masterId}"
    const val ADD_REVIEW = "add_review/{masterId}"

    fun masterDetail(masterId: Int): String {
        return "master_detail/$masterId"
    }
    fun addReview(masterId: Int): String {
        return "add_review/$masterId"
    }
}