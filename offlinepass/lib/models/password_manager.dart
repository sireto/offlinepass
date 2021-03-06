import 'dart:convert';

import 'package:crypto/crypto.dart';

import 'package:fast_base58/fast_base58.dart';
import 'package:offlinepass/models/pass_model.dart';
import 'package:sembast/timestamp.dart';
import 'package:shared_preferences/shared_preferences.dart';

class PasswordManager {
  static String? msk;
  static late final SharedPreferences preferences;
  static int passwordValidity = 86400 * 90;
  String generatePassword({
    required PassModel passModel,
    bool newPass = false,
    bool generate = false,
    int? index,
    required int currentTimeStamp,
    int? timeStamp,
  }) {
    if (timeStamp == null) {
      //  int currentTimeStamp = DateTime.now().millisecondsSinceEpoch ~/ 1000;
      timeStamp = (currentTimeStamp ~/ passwordValidity) * passwordValidity;
    }

    var data = passModel.toMap(passModel: passModel);
    int? storedTimestamp = preferences.getInt('timestamp$data');
    int? mainTimeStamp = preferences.getInt('maintimestamp');
    print("storrdTimeStamp: $storedTimestamp!");

    if (mainTimeStamp == null) {
      preferences.setInt('maintimestamp', timeStamp);
    }
    // ignore: prefer_conditional_assignment
    if (index == null) {
      index = preferences.getInt('$data');
      print("index $index");
    }
    if (newPass) {
      index = index! + 1;
      if (storedTimestamp != timeStamp && storedTimestamp != null) {
        preferences.setInt('timestamp$data', timeStamp);
        index = 0;
        print("reset");
      }

      preferences.setInt('$data', index);
    } else if (generate) {
      int? startTimeStamp = preferences.getInt('starttimestamp$data');
      // print("starttimestamp: $startTimeStamp");
      if (startTimeStamp == null) {
        print("starttimeset");

        preferences.setInt('starttimestamp$data', timeStamp);
      }
      print("timestamp: $timeStamp");
      preferences.setInt('timestamp$data', timeStamp);
      preferences.setInt('$data', index!);
    }

    if (!newPass && storedTimestamp != timeStamp && storedTimestamp != null) {
      timeStamp = storedTimestamp;
    }

    var bytes =
        utf8.encode("$timeStamp$index$msk${passModel.url}${passModel.user}");
    var digest = sha256.convert(bytes);
    var pass =
        Base58Encode(utf8.encode(' "$index" + ${Base58Encode(digest.bytes)}'));

    return "$index\$$pass";
  }

  String recoverPassword({
    required PassModel passModel,
    int? index,
    required String rmsk,
    required int currentTimeStamp,
  }) {
    var data = passModel.toMap(passModel: passModel);

    print("index $index");

    int timeStamp = (currentTimeStamp ~/ passwordValidity) * passwordValidity;

    var bytes =
        utf8.encode("$timeStamp$index$rmsk${passModel.url}${passModel.user}");
    var digest = sha256.convert(bytes);
    var pass =
        Base58Encode(utf8.encode(' "$index" + ${Base58Encode(digest.bytes)}'));

    return "$index\$$pass";
  }

// for next version
  // void cancelNotification() {
  //   PushNotification().cancelNotification();
  // }

  int validDays() {
    int currentTimeStamp = DateTime.now().millisecondsSinceEpoch ~/ 1000;
    int baseTimeStamp =
        (currentTimeStamp ~/ passwordValidity) * passwordValidity;
    int diff = currentTimeStamp - baseTimeStamp;
    int remainingTime = 86400 * 90 - diff;
    return remainingTime ~/ 86400;
  }

  int getCurrentTimeStamp() {
    int currentTimeStamp = DateTime.now().millisecondsSinceEpoch ~/ 1000;
    return (currentTimeStamp ~/ passwordValidity) * passwordValidity;
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
      int? storedTimestamp = preferences.getInt('maintimestamp');
      if (changeValidity) {
        preferences.setInt('maintimestamp', timeStamp);
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

  List getLast1yrpswds({required PassModel passModel}) {
    List timeStamps = [];
    int timeStamp;
    var data = passModel.toMap(passModel: passModel);
    int? startTimeStamp = preferences.getInt('starttimestamp$data');
    int? storedtimeStamp = preferences.getInt('timestamp$data');
    int currentTimeStamp = getCurrentTimeStamp();
    print("startTimeStamp: $startTimeStamp");
    print("storedTimeStamp: $storedtimeStamp");
    print("currrentTimeStamp: $currentTimeStamp");
    if (currentTimeStamp == storedtimeStamp) {
      print("same");
      int diff = (storedtimeStamp! - startTimeStamp!) ~/ 86400;
      print(diff);
      for (int i = 0; i <= diff; i = i + 90) {
        timeStamp = storedtimeStamp - i * 86400;
        timeStamps.add(timeStamp);
        if (i == 270) {
          break;
        }
      }
      print(timeStamps);
      return timeStamps;
    } else {
      print("different");
      int diff = (currentTimeStamp - storedtimeStamp!) ~/ 86400;
      print(diff);
      if (diff > 270) {
        return timeStamps;
      } else {
        for (int i = 0; i <= 270 - diff; i = i + 90) {
          //   print(i);

          timeStamp = storedtimeStamp - i * 86400;
          timeStamps.add(timeStamp);
          if (timeStamp == startTimeStamp) {
            break;
          }
        }
        print(timeStamps);
        return timeStamps;
      }
    }
  }
}
