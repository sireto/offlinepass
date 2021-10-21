import 'dart:math';
import 'dart:convert' show utf8;
import 'package:encrypted_shared_preferences/encrypted_shared_preferences.dart';
import 'package:fast_base58/fast_base58.dart';
import 'package:flutter/material.dart';
import 'package:offline_pass/components/notification.dart';
import 'package:offline_pass/themes.dart';
import 'package:shared_preferences/shared_preferences.dart';

import '../../constants.dart';

class NewVaultScreen extends StatefulWidget {
  const NewVaultScreen({Key? key}) : super(key: key);

  @override
  _NewVaultScreenState createState() => _NewVaultScreenState();
}

class _NewVaultScreenState extends State<NewVaultScreen> {
  String msk = "";
  @override
  void initState() {
    // TODO: implement initState
    super.initState();

    msk = generateMsk();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        iconTheme: const IconThemeData(color: Colors.black),
        title: const Text(
          "New Vault",
        ),
      ),
      body: SingleChildScrollView(
        child: Padding(
          padding: const EdgeInsets.all(15.0),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              heightspace(8),
              Text(
                "App has generated a Master Security Key (MSK) for you.",
                style: TextStyle(
                  fontSize: 16,
                  fontFamily: 'TitilliumWeb',
                ),
              ),
              heightspace(25),
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Container(
                    width: screenWidth * 0.7,
                    padding: const EdgeInsets.all(12),
                    child: Center(
                      child: Text(
                        msk,
                        style: TextStyle(
                          fontSize: 16,
                          fontFamily: 'TitilliumWeb',
                        ),
                      ),
                    ),
                    decoration: BoxDecoration(
                        borderRadius: BorderRadius.circular(8),
                        border: Border.all(color: Colors.black)),
                  ),
                  ElevatedButton(
                    onPressed: () {},
                    child: Text(
                      "Copy",
                      style: TextStyle(
                        color: Colors.white,
                        fontSize: 16,
                        fontFamily: 'TitilliumWeb',
                      ),
                    ),
                    style: ElevatedButton.styleFrom(
                        padding: const EdgeInsets.symmetric(
                            vertical: 10, horizontal: 20),
                        primary: Colors.grey.shade500),
                  ),
                ],
              ),
              heightspace(25),
              Text(
                "This is the only time the Master Security Key (MSK) is shown. MSK is used to generate and recover your passwords so keep it safe and secure.",
                style: TextStyle(
                  fontFamily: 'TitilliumWeb',
                  fontWeight: FontWeight.w500,
                  fontSize: 15,
                ),
              ),
              heightspace(25),
              Container(
                  height: 45,
                  width: screenWidth,
                  child: ElevatedButton(
                    onPressed: () async {
                      EncryptedSharedPreferences encryptedSharedPreferences =
                          EncryptedSharedPreferences();
                      encryptedSharedPreferences.setString('msk', msk);
                      PushNotification().showNotification(1, 10);
                    },
                    child: Text(
                      "Confirm Vault",
                      textAlign: TextAlign.center,
                      style: TextStyle(
                          color: Colors.white,
                          fontSize: 16,
                          fontFamily: 'TitilliumWeb',
                          fontWeight: FontWeight.bold),
                    ),
                    style: ElevatedButton.styleFrom(primary: kprimarycolor),
                  ))
            ],
          ),
        ),
      ),
    );
  }

  String generateMsk() {
    final length = 15;
    // final letterslowercase = "abcdefghijklmnopqrstuvwxyz";
    // final lettersuppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    // final numbers = "0123456789";
    // final special = "@#=+!£\$%&/)(*><-.^][^~";
    // String chars = "$lettersuppercase$letterslowercase$numbers$special";

    var randomIntGen = List.generate(length, (index) {
      int intRandom = Random.secure().nextInt(9);

      return intRandom;
    }).join('');
    var encodedMsk = Base58Encode(utf8.encode(randomIntGen));
    // print(mskGen);
    // print(mskGen.length);
    // print(encodedMsk);
    // print(encodedMsk.length);
    return encodedMsk;
  }
}
