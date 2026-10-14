# Flutter Proguard Rules for Apex Chess Master

# Flutter Engine & Plugins
-keep class io.flutter.app.** { *; }
-keep class io.flutter.plugin.** { *; }
-keep class io.flutter.util.** { *; }
-keep class io.flutter.view.** { *; }
-keep class io.flutter.** { *; }
-keep class io.flutter.plugins.** { *; }

# Flutter Local Notifications
-keep class com.dexterous.flutterlocalnotifications.** { *; }

# Google Play Core / Deferred Components warnings suppression
-dontwarn com.google.android.play.core.**

# Desugaring Warnings
-dontwarn java.awt.**
-dontwarn javax.annotation.**
