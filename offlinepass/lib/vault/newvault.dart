import 'dart:math';

import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:offlinepass/themes.dart';
import 'package:offlinepass/vault/confirmvault.dart';

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
          padding: const EdgeInsets.all(20.0),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              RichText(
                  text: const TextSpan(
                      style: TextStyle(
                          fontSize: 14,
                          fontFamily: 'TitilliumWeb',
                          color: ktextcolor),
                      children: [
                    TextSpan(text: "App has generated a "),
                    TextSpan(
                        text: "Master Security Key (MSK)",
                        style: TextStyle(fontWeight: FontWeight.bold)),
                    TextSpan(text: " for you .")
                  ])),
              heightspace(25),
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Container(
                    width: MediaQuery.of(context).size.width * 0.6,
                    padding: const EdgeInsets.only(top: 12, bottom: 12),
                    child: Center(
                      child: Text(
                        msk,
                        style: const TextStyle(
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
              const Text(
                "This is the only time the Master Security Key (MSK) is shown so copy the key and store it safely. You’ll need the key on the next screen..",
                style: TextStyle(
                  fontFamily: 'TitilliumWeb',
                  fontSize: 14,
                ),
              ),
              heightspace(10),
              const Text(
                "Note: Without this key, the app can not recover your passwords later so please keep it safe and secure.",
                style: TextStyle(
                  fontFamily: 'TitilliumWeb',
                  fontSize: 14,
                ),
              ),
              heightspace(25),
              Container(
                  height: 45,
                  width: MediaQuery.of(context).size.width,
                  child: ElevatedButton(
                    onPressed: () {
                      Navigator.push(
                          context,
                          MaterialPageRoute(
                              builder: (context) => const Confirmvault()));
                    },
                    child: const Text(
                      "MSK saved, Confirm Vault now",
                      textAlign: TextAlign.center,
                      style: TextStyle(
                        color: Colors.white,
                        fontSize: 16,
                        fontFamily: 'TitilliumWeb',
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
    const length = 20;
    const letterslowercase = "abcdefghijklmnopqrstuvwxyz";
    const lettersuppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const numbers = "0123456789";
    const special = "@#=+!£\$%&/)(*><-.^][^~";
    String chars = "$lettersuppercase$letterslowercase$numbers$special";
    return List.generate(length, (index) {
      int intRandom = Random.secure().nextInt(chars.length);
      return chars[intRandom];
    }).join('');
  }
}
