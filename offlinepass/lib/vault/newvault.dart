import 'package:flutter/material.dart';
import 'package:offlinepass/color.dart';
import 'package:offlinepass/vault/confirmvault.dart';

class NewVault extends StatefulWidget {
  const NewVault({Key? key}) : super(key: key);

  @override
  _NewVaultState createState() => _NewVaultState();
}

class _NewVaultState extends State<NewVault> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        iconTheme: const IconThemeData(color: Colors.black),
        backgroundColor: Colors.grey,
        title: const Text(
          "New Vault",
          style: TextStyle(color: Colors.black),
        ),
      ),
      body: SingleChildScrollView(
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const SizedBox(
              height: 20,
            ),
            Container(
              padding: const EdgeInsets.only(left: 20, right: 20),
              child: const Text(
                "App has generated a Master Security Key (MSK) for you .",
                style: TextStyle(fontSize: 20),
              ),
            ),
            const SizedBox(
              height: 40,
            ),
            Container(
              padding: const EdgeInsets.only(left: 20, right: 20),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Container(
                    width: MediaQuery.of(context).size.width / 2 + 30,
                    height: 50,
                    padding: const EdgeInsets.all(15),
                    child: const Text(
                      "1#baHMjhpPMSBNuLvP",
                      style: TextStyle(fontSize: 16),
                    ),
                    decoration: BoxDecoration(
                        borderRadius: BorderRadius.circular(8),
                        border: Border.all(color: Colors.black)),
                  ),
                  ElevatedButton(
                    onPressed: () {},
                    child: Text(
                      "Copy",
                      style: TextStyle(color: textcolor, fontSize: 16),
                    ),
                    style: ElevatedButton.styleFrom(
                        padding: const EdgeInsets.symmetric(
                            vertical: 14, horizontal: 30),
                        primary: Colors.grey),
                  ),
                ],
              ),
            ),
            const SizedBox(
              height: 40,
            ),
            Container(
              padding: const EdgeInsets.only(left: 20, right: 20),
              child: const Text(
                "This is the only time the Master Security Key (MSK) is shown. MSK is used to generate and recover your passwords so keep it safe and secure.",
                style: TextStyle(
                  fontSize: 16,
                ),
              ),
            ),
            const SizedBox(
              height: 30,
            ),
            Container(
                height: 50,
                padding: const EdgeInsets.only(left: 20, right: 20),
                width: MediaQuery.of(context).size.width,
                child: ElevatedButton(
                  onPressed: () {
                    Navigator.push(
                        context,
                        MaterialPageRoute(
                            builder: (context) => const Confirmvault()));
                  },
                  child: Text(
                    "Confirm Vault",
                    textAlign: TextAlign.center,
                    style: TextStyle(color: textcolor, fontSize: 16),
                  ),
                  style: ElevatedButton.styleFrom(primary: Colors.grey),
                ))
          ],
        ),
      ),
    );
  }
}
