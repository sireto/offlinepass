import 'dart:convert';
import 'dart:math';

import 'package:encrypted_shared_preferences/encrypted_shared_preferences.dart';
import 'package:fast_base58/fast_base58.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:offlinepass/services/notification.dart';
import 'package:offlinepass/themes.dart';
import 'package:bip39/bip39.dart' as bip39;
import 'package:offlinepass/screens/vault/confirmvault.dart';

import '../../constants.dart';

class NewVaultScreen extends StatefulWidget {
  const NewVaultScreen({Key? key}) : super(key: key);

  @override
  _NewVaultScreenState createState() => _NewVaultScreenState();
}

class _NewVaultScreenState extends State<NewVaultScreen> {
  String msk = "";
  String entropy = "";
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
        // iconTheme: const IconThemeData(color: Colors.black),
        centerTitle: false,
        title: const Text(
          "New Vault",
        ),
      ),
      body: SingleChildScrollView(
        child: Padding(
          padding: const EdgeInsets.all(20.0),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              RichText(
                  text: TextSpan(
                      style: TextStyle(
                          fontSize: 15,
                          // fontFamily: 'TitilliumWeb',
                          color: Colors.grey.shade700),
                      children: [
                    TextSpan(text: "App has generated a "),
                    TextSpan(
                        text: "Master Security Key (MSK)",
                        style: TextStyle(fontWeight: FontWeight.w500)),
                    TextSpan(text: " for you .")
                  ])),
              heightspace(25),
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Container(
                    width: screenWidth * 0.6,
                    padding: const EdgeInsets.all(12),
                    child: Center(
                      child: Text(
                        msk,
                        style: const TextStyle(
                            fontSize: 16,
                            //   fontFamily: 'TitilliumWeb',
                            fontWeight: FontWeight.w400),
                      ),
                    ),
                    decoration: BoxDecoration(
                        borderRadius: BorderRadius.circular(8),
                        border: Border.all(color: Colors.grey)),
                  ),
                  ElevatedButton(
                    onPressed: () {
                      Clipboard.setData(ClipboardData(text: msk));
                      const snackBar =
                          SnackBar(content: Text("Copied to Clipboard"));
                      ScaffoldMessenger.of(context).showSnackBar(snackBar);
                    },
                    child: const Text(
                      "Copy",
                      style: TextStyle(
                          color: Colors.white,
                          fontSize: 14,
                          fontWeight: FontWeight.w400
                          //  fontFamily: 'TitilliumWeb',
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
                "This is the only time the Master Security Key (MSK) is shown so copy the key and store it safely. You’ll need the key on the next screen..",
                style: TextStyle(
                    fontFamily: 'TitilliumWeb',
                    fontSize: 14,
                    color: Colors.grey.shade700),
              ),
              heightspace(10),
              const Text(
                "Note: Without this key, the app can not recover your passwords later so please keep it safe and secure.",
                style: TextStyle(
                  fontSize: 14,
                  fontFamily: 'TitilliumWeb',
                ),
              ),
              heightspace(25),
              Container(
                  height: 45,
                  width: screenWidth,
                  child: ElevatedButton(
                    onPressed: () async {
                      String entropy = bip39.mnemonicToEntropy(msk);
                      print(entropy);
                      Navigator.push(
                          context,
                          MaterialPageRoute(
                              builder: (context) => Confirmvault(
                                    msk: msk,
                                    entropy: entropy,
                                  )));
                    },
                    child: const Text(
                      "MSK saved, Confirm Vault now",
                      textAlign: TextAlign.center,
                      style: TextStyle(
                        color: Colors.white,
                        fontSize: 14,

                        // fontFamily: 'TitilliumWeb',
                      ),
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
    String randomMnemonic = bip39.generateMnemonic();
    print(randomMnemonic);
    String entropy = bip39.mnemonicToEntropy(randomMnemonic);
    print(entropy);
    // String seed = bip39.mnemonicToSeedHex(randomMnemonic);
    // print(seed);
    //  print(Base58Encode(utf8.encode(randomMnemonic)));
    // String mnemonic = bip39.entropyToMnemonic(entropy);
    // print(mnemonic);
    // var ss = bip39.mnemonicToSeed(mnemonic);
    // print(ss);

    // isValid = bip39.validateMnemonic('abandon');
    // print(isValid);
    // const length = 10;
    // // final letterslowercase = "abcdefghijklmnopqrstuvwxyz";
    // // final lettersuppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    // // final numbers = "0123456789";
    // // final special = "@#=+!£\$%&/)(*><-.^][^~";
    // // String chars = "$lettersuppercase$letterslowercase$numbers$special";

    // var randomIntGen = List.generate(length, (index) {
    //   int intRandom = Random.secure().nextInt(9);

    //   return intRandom;
    // }).join('');
    // //print(randomIntGen);
    // var encodedMsk = Base58Encode(utf8.encode(randomIntGen));
    // print(mskGen);
    // print(mskGen.length);
    // print(encodedMsk);
    // print(encodedMsk.length);
    return randomMnemonic;
  }
}
