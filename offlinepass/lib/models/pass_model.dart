import 'package:encrypted_shared_preferences/encrypted_shared_preferences.dart';
import 'package:flutter/material.dart';

class PassModel {
  int? id;
  int? colorIndex;
  final String? url;
  final String? user;

  //var encodedStr = Base58Encode(utf8.encode('bitcoin'.codeUnits));
  EncryptedSharedPreferences encryptedSharedPreferences =
      EncryptedSharedPreferences();
  PassModel({
    this.id,
    this.colorIndex,
    this.url,
    this.user,
  });

  factory PassModel.fromMap(int key, Map<String, dynamic> map) => PassModel(
        id: key,
        url: map['url'],
        colorIndex:map['colorIndex'],
        user: map['user'],
      );

  Map<String, dynamic> toMap({PassModel? passModel}) => {
    'colorIndex':passModel!.colorIndex,
        'url': passModel.url,
        'user': passModel.user,
      };
}
