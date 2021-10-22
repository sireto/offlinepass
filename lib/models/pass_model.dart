import 'package:encrypted_shared_preferences/encrypted_shared_preferences.dart';
import 'package:fast_base58/fast_base58.dart';

class PassModel {
  late final int? id;
  late final String? url;
  late final icon;
  late final String? user;
  late final String? pass;
  //var encodedStr = Base58Encode(utf8.encode('bitcoin'.codeUnits));
  EncryptedSharedPreferences encryptedSharedPreferences =
      EncryptedSharedPreferences();
  PassModel({this.id, this.url, this.user, this.pass, this.icon});

  factory PassModel.fromMap(int key, Map<String, dynamic> map) => PassModel(
      id: key,
      icon: map['icon'],
      url: map['url'],
      user: map['user'],
      pass: Base58Decode(map['pass']).toString());

  Map<String, dynamic> toMap({PassModel? passModel}) => {
        'url': passModel!.url,
        'icon': passModel.icon,
        'user': passModel.user,
        'pass': Base58Encode(passModel.pass.toString().codeUnits.toList())
      };
}
