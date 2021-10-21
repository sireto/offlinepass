import 'package:flutter_local_notifications/flutter_local_notifications.dart';
import 'package:timezone/timezone.dart' as tz;
import 'package:timezone/data/latest.dart' as tz;

class PushNotification {
  static Future<void> initialize() async {
    var androidInitialize = new AndroidInitializationSettings('launch_background');
    var initializationSettings =
        new InitializationSettings(android: androidInitialize);
    FlutterLocalNotificationsPlugin fltrNotification;
    fltrNotification = FlutterLocalNotificationsPlugin();
    tz.initializeTimeZones();
    await fltrNotification.initialize(initializationSettings,
        onSelectNotification: onNotificationSelected);
  }

  static Future onNotificationSelected(String? payload) async {
    // return null;fl
  }
  void showNotification(id, timeSec) async {
    var androidDetails = new AndroidNotificationDetails(
        'Channel ID', 'Password',
        priority: Priority.high, importance: Importance.max);
    var scheduledTime = Duration(seconds: timeSec);
    var notificationDetails = new NotificationDetails(android: androidDetails);
    FlutterLocalNotificationsPlugin fltrNotification;
    fltrNotification = FlutterLocalNotificationsPlugin();
    await fltrNotification.zonedSchedule(
        id,
        "Passwords expired",
        "Please change your passwords",
        tz.TZDateTime.now(tz.local).add(scheduledTime),
        notificationDetails,
        uiLocalNotificationDateInterpretation:
            UILocalNotificationDateInterpretation.absoluteTime,
        androidAllowWhileIdle: true);
  }
}
