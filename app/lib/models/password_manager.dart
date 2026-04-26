import 'dart:convert';

import 'package:crypto/crypto.dart';

import 'package:fast_base58/fast_base58.dart';
import 'package:offlinepass/models/pass_model.dart';
import 'package:shared_preferences/shared_preferences.dart';

class PasswordManager {
  static String? msk;
  static late final SharedPreferences preferences;
  static int passwordValidity = 86400 * 90;

  static String _hostName(String? url) {
    if (url == null || url.isEmpty) return '';
    final lower = url.toLowerCase().replaceFirst('www.', '');
    final withScheme = lower.startsWith('http://') || lower.startsWith('https://')
        ? lower
        : 'http://$lower';
    final parsed = Uri.tryParse(withScheme);
    final host = parsed?.host ?? '';
    return host.isEmpty ? lower : host;
  }

  static String _hmacPassword({
    required String key,
    required String? url,
    required String? user,
    required String date,
    required int retries,
  }) {
    final keyBytes = utf8.encode(key);
    final msg = utf8.encode(
      '${_hostName(url)}|${(user ?? '').toLowerCase()}|$date|$retries',
    );
    final mac = Hmac(sha256, keyBytes).convert(msg);
    final encoded = Base58Encode(mac.bytes);
    final truncated = encoded.length >= 16 ? encoded.substring(0, 16) : encoded;
    return '$retries\$$truncated';
  }

  String generatePassword({
    required PassModel passModel,
    bool newPass = false,
    bool generate = false,
    int? index,
    required int currentTimeStamp,
    int? timeStamp,
  }) {
    timeStamp ??= (currentTimeStamp ~/ passwordValidity) * passwordValidity;

    var data = passModel.toMap(passModel: passModel);
    int? storedTimestamp = preferences.getInt('timestamp$data');
    int? mainTimeStamp = preferences.getInt('maintimestamp');

    if (mainTimeStamp == null) {
      preferences.setInt('maintimestamp', timeStamp);
    }
    index ??= preferences.getInt('$data');
    if (newPass) {
      index = index! + 1;
      if (storedTimestamp != timeStamp && storedTimestamp != null) {
        preferences.setInt('timestamp$data', timeStamp);
        index = 0;
      }

      preferences.setInt('$data', index);
    } else if (generate) {
      int? startTimeStamp = preferences.getInt('starttimestamp$data');
      if (startTimeStamp == null) {
        preferences.setInt('starttimestamp$data', timeStamp);
      }
      preferences.setInt('timestamp$data', timeStamp);
      preferences.setInt('$data', index!);
    }

    if (!newPass && storedTimestamp != timeStamp && storedTimestamp != null) {
      timeStamp = storedTimestamp;
    }

    return _hmacPassword(
      key: msk ?? '',
      url: passModel.url,
      user: passModel.user,
      date: timeStamp.toString(),
      retries: index ?? 0,
    );
  }

  String recoverPassword({
    required PassModel passModel,
    int? index,
    required String rmsk,
    required int currentTimeStamp,
  }) {
    int timeStamp = (currentTimeStamp ~/ passwordValidity) * passwordValidity;

    return _hmacPassword(
      key: rmsk,
      url: passModel.url,
      user: passModel.user,
      date: timeStamp.toString(),
      retries: index ?? 0,
    );
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
    if (currentTimeStamp == storedtimeStamp) {
      int diff = (storedtimeStamp! - startTimeStamp!) ~/ 86400;
      for (int i = 0; i <= diff; i = i + 90) {
        timeStamp = storedtimeStamp - i * 86400;
        timeStamps.add(timeStamp);
        if (i == 270) {
          break;
        }
      }
      return timeStamps;
    } else {
      int diff = (currentTimeStamp - storedtimeStamp!) ~/ 86400;
      if (diff > 270) {
        return timeStamps;
      } else {
        for (int i = 0; i <= 270 - diff; i = i + 90) {
          timeStamp = storedtimeStamp - i * 86400;
          timeStamps.add(timeStamp);
          if (timeStamp == startTimeStamp) {
            break;
          }
        }
        return timeStamps;
      }
    }
  }
}
