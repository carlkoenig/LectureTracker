package com.example.lecturetracker

import android.app.Application
import com.google.android.material.color.DynamicColors

class LectureTrackerApplication: Application() {
    override fun onCreate() {
        super.onCreate()
        DynamicColors.applyToActivitiesIfAvailable(this)
    }
}