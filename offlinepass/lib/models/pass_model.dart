import 'package:encrypted_shared_preferences/encrypted_shared_preferences.dart';
import 'package:flutter/material.dart';

class PassModel {
  int? id;
  final String? url;
  final String? user;
  final Color? color;

  //var encodedStr = Base58Encode(utf8.encode('bitcoin'.codeUnits));
  EncryptedSharedPreferences encryptedSharedPreferences =
      EncryptedSharedPreferences();
  PassModel({
    this.id,
    this.url,
    this.user,
    this.color,
  });

  factory PassModel.fromMap(int key, Map<String, dynamic> map) => PassModel(
        id: key,
        url: map['url'],
        user: map['user'],
        color: map['color'],
      );

  Map<String, dynamic> toMap({PassModel? passModel}) => {
        'url': passModel!.url,
        'user': passModel.user,
        'color': passModel.color,
      };
}
