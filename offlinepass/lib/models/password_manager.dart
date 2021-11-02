import 'dart:convert';

import 'package:crypto/crypto.dart';

import 'package:fast_base58/fast_base58.dart';
import 'package:intl/intl.dart';
import 'package:offlinepass/models/pass_model.dart';
import 'package:offlinepass/services/notification.dart';
import 'package:shared_preferences/shared_preferences.dart';

class PasswordManager {
  static late final String msk;
  static late final SharedPreferences preferences;
  static int passwordValidity = 2 * 60;
  String generatePassword({
    required PassModel passModel,
    bool newPass = false,
    bool generate = false,
    int? index,
  }) {
    int currentTimeStamp = DateTime.now().millisecondsSinceEpoch ~/ 1000;

    int timeStamp = (currentTimeStamp ~/ passwordValidity) * passwordValidity;
    int oct26timestamp = 1635257614;
    // print("generate password");

    var data = passModel.toMap(passModel: passModel);
    int? storedTimestamp = preferences.getInt('timestamp$data');
    if (index == null) {
      index = preferences.getInt('$data');
    }

    if (newPass) {
      index = index! + 1;
      if (storedTimestamp != timeStamp && storedTimestamp != null) {
        preferences.setInt('timestamp$data', timeStamp);
        index = 0;
      }

      preferences.setInt('$data', index);
    } else if (generate) {
      preferences.setInt('timestamp$data', timeStamp);
      preferences.setInt('$data', index!);
    }

    print("timeStamp: $timeStamp");
    print("storedtimestamp: $storedTimestamp");
    if (!newPass && storedTimestamp != timeStamp && storedTimestamp != null) {
      print("old password");
      timeStamp = storedTimestamp;
    }

    // print(DateTime.fromMillisecondsSinceEpoch(16329600000000));
    var bytes =
        utf8.encode("$timeStamp$index$msk${passModel.url}${passModel.user}");
    var digest = sha256.convert(bytes);
    var pass =
        Base58Encode(utf8.encode(' "$index" + ${Base58Encode(digest.bytes)}'));
    return "$index\$$pass";
  }

  void setNowDate() {
    final DateTime now = DateTime.now();
    int currentTimeStamp = now.millisecondsSinceEpoch ~/ 1000;

    int timeStamp = (currentTimeStamp ~/ passwordValidity) * passwordValidity;
    // final DateFormat formatter = DateFormat('yyyy-MM-dd');
    // preferences.setString('startingDate', formatter.format(now));
    // preferences.setString('startingPoint', formatter.format(now));
    preferences.setString('startingDate', now.toString());
    preferences.setString('startingPoint', now.toString());
    preferences.setInt('timestamp', timeStamp);
    // print(now.toString());
    // print(validDays());
    PushNotification().showNotification(1, 60 * validDays());
  }

  void cancelNotification() {
    PushNotification().cancelNotification();
  }

  int validDays() {
    final DateTime now = DateTime.now();
    // final DateFormat formatter = DateFormat('yyyy-MM-dd');
    // final nowDate = formatter.format(now);
    // final startingDate = preferences.getString('startingPoint');
    final startingTime = preferences.getString('startingPoint');
    Duration difference = now.difference(DateTime.parse(startingTime!));
    // print("time diff:${difference.inMinutes}");
    // print("validity" + (1 - difference.inDays).toString());
    // int remainingDays = 90 - difference.inDays;
    int remainingTime = 2 - difference.inMinutes;
    // if (remainingDays == 0) {
    //   preferences.setString('startingDate', formatter.format(now));
    // }
    // print("remaining time: $remainingTime");
    if (remainingTime <= 0) {
      preferences.setString('startingPoint', now.toString());
      final startingTime = preferences.getString('startingPoint');
      Duration difference = now.difference(DateTime.parse(startingTime!));

      int remainingTime = 2 - difference.inMinutes;
      PushNotification()
          .showNotification(1, remainingTime < 1 ? 2 * 60 : remainingTime * 60);
    }
    return remainingTime;
  }

  bool checkValidity({PassModel? passModel, bool changeValidity = false}) {
    int currentTimeStamp = DateTime.now().millisecondsSinceEpoch ~/ 1000;
    int timeStamp = (currentTimeStamp ~/ passwordValidity) * passwordValidity;
    if (passModel != null) {
      int? storedTimestamp = preferences
          .getInt('timestamp${passModel.toMap(passModel: passModel)}');
      if (storedTimestamp != timeStamp && storedTimestamp != null) {
        return false;
      } else {
        return true;
      }
    } else {
      print("else");
      int? storedTimestamp = preferences.getInt('timestamp');
      if (changeValidity) {
        preferences.setInt('timestamp', timeStamp);
        return true;
      } else {
        if (timeStamp != storedTimestamp && storedTimestamp != null) {
          return false;
        } else {
          return true;
        }
      }
    }
  }
}
