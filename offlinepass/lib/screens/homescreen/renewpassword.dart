import 'package:flutter/material.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';
import 'package:offlinepass/components/datas.dart';

class RenewPassword extends StatefulWidget {
  String url;
  String email;
  String password;
  RenewPassword(
      {Key? key,
      required this.url,
      required this.email,
      required this.password})
      : super(key: key);

  @override
  _RenewPasswordState createState() => _RenewPasswordState();
}

class _RenewPasswordState extends State<RenewPassword> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        iconTheme: const IconThemeData(color: Colors.black),
        centerTitle: false,
        automaticallyImplyLeading: false,
        leading: IconButton(
            onPressed: () {
              Navigator.pop(context, datas);
            },
            icon: const Icon(
              Icons.arrow_back,
            )),
        title: Text(
          widget.url,
        ),
        actions: [
          IconButton(
              onPressed: () {}, icon: const Icon(FontAwesomeIcons.ellipsisV))
        ],
      ),
    );
  }
}
