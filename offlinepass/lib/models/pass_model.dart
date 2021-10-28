import 'package:encrypted_shared_preferences/encrypted_shared_preferences.dart';


class PassModel {
  int? id;
  final String? url;
  final String? user;

  //var encodedStr = Base58Encode(utf8.encode('bitcoin'.codeUnits));
  EncryptedSharedPreferences encryptedSharedPreferences =
      EncryptedSharedPreferences();
  PassModel({
    this.id,
    this.url,
    this.user,
  });

  factory PassModel.fromMap(int key, Map<String, dynamic> map) => PassModel(
        id: key,
        url: map['url'],
        user: map['user'],
      );

  Map<String, dynamic> toMap({PassModel? passModel}) => {
        'url': passModel!.url,
        'user': passModel.user,
      };
}
