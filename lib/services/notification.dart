import 'package:flutter_local_notifications/flutter_local_notifications.dart';
import 'package:timezone/timezone.dart' as tz;
import 'package:timezone/data/latest.dart' as tz;

class PushNotification {
  FlutterLocalNotificationsPlugin fltrNotification =
      FlutterLocalNotificationsPlugin();
  Future<void> initialize() async {
    var androidInitialize =
        const AndroidInitializationSettings('launch_background');
    var initializationSettings =
        InitializationSettings(android: androidInitialize);

    tz.initializeTimeZones();
    await fltrNotification.initialize(initializationSettings,
        onSelectNotification: onNotificationSelected);
  }

  Future onNotificationSelected(String? payload) async {
    // return null;fl
  }
  void showNotification(id, timeSec) async {
    var androidDetails = const AndroidNotificationDetails(
        'Channel ID', 'Password',
        priority: Priority.high, importance: Importance.max);
    var scheduledTime = Duration(seconds: timeSec);
    var notificationDetails = NotificationDetails(android: androidDetails);

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
