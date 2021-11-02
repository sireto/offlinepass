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
  static const int passwordValidity = 86400 * 90;
  String generatePassword({
    required PassModel passModel,
    bool newPass = false,
    bool generate = false,
    int? index,
  }) {
    var data = passModel.toMap(passModel: passModel);
    if (index == null) {
      index = preferences.getInt('$data');
    }

    print("index $index");
    // if (!customIndex) {
    if (newPass) {
      // if (index == null || index == '') {
      //   print("index null");
      //   preferences.setInt('$data', 0);
      // } else {
      print("index not null");
      index = index! + 1;

      preferences.setInt('$data', index);
      //index--;
      // }
    } else if (generate) {
      preferences.setInt('$data', index!);
    }
    print("index $index");

    //}
    int currentTimeStamp = DateTime.now().millisecondsSinceEpoch;
    print(currentTimeStamp);
    int timeStamp = (currentTimeStamp ~/ passwordValidity) * passwordValidity;
    print("timeStamp: $timeStamp");
    print("$msk");
    var bytes =
        utf8.encode("$timeStamp$index$msk${passModel.url}${passModel.user}");
    var digest = sha256.convert(bytes);
    var pass =
        Base58Encode(utf8.encode(' "$index" + ${Base58Encode(digest.bytes)}'));
    print(pass.length);
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

    //}
    print(currentTimeStamp);
    int timeStamp = (currentTimeStamp ~/ passwordValidity) * passwordValidity;
    print("timeStamp: $timeStamp");
    print("$rmsk");
    var bytes =
        utf8.encode("$timeStamp$index$rmsk${passModel.url}${passModel.user}");
    var digest = sha256.convert(bytes);
    var pass =
        Base58Encode(utf8.encode(' "$index" + ${Base58Encode(digest.bytes)}'));
    print(pass.length);
    return "$index\$$pass";
  }

  void setNowDate() {
    final DateTime now = DateTime.now();
    final DateFormat formatter = DateFormat('yyyy-MM-dd');
    preferences.setString('startingDate', formatter.format(now));
    preferences.setString('startingPoint', formatter.format(now));
    PushNotification().showNotification(1, 86400 * validDays());
  }

  void cancelNotification() {
    PushNotification().cancelNotification();
  }

  int validDays() {
    final DateTime now = DateTime.now();
    final DateFormat formatter = DateFormat('yyyy-MM-dd');
    final nowDate = formatter.format(now);
    final startingDate = preferences.getString('startingPoint');
    Duration difference =
        DateTime.parse(nowDate).difference(DateTime.parse(startingDate!));
    // print("validity" + (1 - difference.inDays).toString());
    int remainingDays = 90 - difference.inDays;
    if (remainingDays == 0) {
      preferences.setString('startingDate', formatter.format(now));
    }
    return 90 - difference.inDays;
  }
}
