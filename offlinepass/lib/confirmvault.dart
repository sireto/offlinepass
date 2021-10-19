import 'package:flutter/material.dart';
import 'package:offlinepass/addhost.dart';
import 'package:offlinepass/color.dart';

class Confirmvault extends StatefulWidget {
  const Confirmvault({Key? key}) : super(key: key);

  @override
  _ConfirmvaultState createState() => _ConfirmvaultState();
}

class _ConfirmvaultState extends State<Confirmvault> {
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
      body: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const SizedBox(
            height: 20,
          ),
          Container(
            padding: const EdgeInsets.only(left: 20, right: 20),
            child: const Text(
              "Master Security Key",
              style: TextStyle(fontSize: 20),
            ),
          ),
          const SizedBox(
            height: 10,
          ),
          Container(
            width: MediaQuery.of(context).size.width,
            // height: 40,
            margin: const EdgeInsets.all(10),
            padding: const EdgeInsets.all(10),
            child: TextFormField(
              decoration: InputDecoration(
                  label: const Text("MSK"),
                  border: OutlineInputBorder(
                      borderRadius: BorderRadius.circular(8))),
            ),
          ),
          const SizedBox(
            height: 20,
          ),
          Container(
              height: 50,
              padding: const EdgeInsets.only(left: 20, right: 20),
              width: MediaQuery.of(context).size.width,
              child: ElevatedButton(
                onPressed: () {
                  Navigator.push(context,
                      MaterialPageRoute(builder: (context) => const Addhost()));
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
    );
  }
}
