import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';
import 'package:offlinepass/components/datas.dart';
import 'package:offlinepass/constants.dart';
import 'package:offlinepass/themes.dart';

class RenewPassword extends StatefulWidget {
  // final String url;
  // final String email;
  // final String password;
  final Map data;
  const RenewPassword({
    Key? key,
    required this.data,
    // required this.url,
    // required this.email,
    // required this.password
  }) : super(key: key);

  @override
  _RenewPasswordState createState() => _RenewPasswordState();
}

class _RenewPasswordState extends State<RenewPassword> {
  late TextEditingController password =
      TextEditingController(text: widget.data["password"]);
  bool visibletext = true;
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
          widget.data["url"],
        ),
        actions: [
          PopupMenuButton(
              onSelected: (value) async {
                if (value == 0) {
                  datas.remove(widget.data);
                  Navigator.pop(context, datas);
                }
              },
              padding: const EdgeInsets.all(4.0),
              icon: const Icon(
                Icons.more_vert,
                color: Colors.black,
              ),
              iconSize: 30,
              itemBuilder: (BuildContext context) => [
                    const PopupMenuItem(
                      value: 0,
                      child: Text(
                        "Delete Facebook",
                        style: TextStyle(
                            fontSize: 16,
                            fontFamily: 'TitilliumWeb',
                            fontWeight: FontWeight.bold),
                      ),
                    ),
                    const PopupMenuItem(
                      value: 1,
                      child: Text(
                        "Old Passwords",
                        style: TextStyle(
                            fontSize: 16,
                            fontFamily: 'TitilliumWeb',
                            fontWeight: FontWeight.bold),
                      ),
                    ),
                    const PopupMenuItem(
                      value: 2,
                      child: Text(
                        "Password Summary",
                        style: TextStyle(
                            fontSize: 16,
                            fontFamily: 'TitilliumWeb',
                            fontWeight: FontWeight.bold),
                      ),
                    ),
                  ])

          //   IconButton(onPressed: () {}, icon: const Icon(Icons.more_vert))
        ],
      ),
      body: Padding(
        padding: const EdgeInsets.all(20.0),
        child: SingleChildScrollView(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                widget.data["email"],
                style: const TextStyle(
                    fontSize: 14,
                    fontFamily: 'TitilliumWeb',
                    fontWeight: FontWeight.bold),
              ),
              heightspace(20),
              const Text(
                "Password",
                style: TextStyle(
                    fontSize: 14,
                    fontFamily: 'TitilliumWeb',
                    fontWeight: FontWeight.bold),
              ),
              heightspace(10),
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Container(
                    width: screenWidth * 0.6,
                    child: TextFormField(
                      obscureText: visibletext,
                      controller: password,
                      decoration: InputDecoration(
                          label: const Text("password"),
                          suffixIcon: visibletext
                              ? IconButton(
                                  onPressed: () {
                                    setState(() {
                                      visibility();
                                    });
                                  },
                                  icon: const Icon(Icons.visibility))
                              : IconButton(
                                  onPressed: () {
                                    setState(() {
                                      visibility();
                                    });
                                  },
                                  icon: const Icon(Icons.visibility_off)),
                          border: OutlineInputBorder(
                            borderRadius: BorderRadius.circular(8),
                          )),
                    ),
                  ),
                  widthspace(5),
                  ElevatedButton(
                    onPressed: () {
                      Clipboard.setData(ClipboardData(text: password.text));
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
              heightspace(10),
              const Text("Expires in 70 days"),
              heightspace(20),
              const Text(
                "Help",
                style: TextStyle(
                    fontSize: 14,
                    fontFamily: 'TitilliumWeb',
                    fontWeight: FontWeight.bold),
              ),
              heightspace(10),
              const Text("Password compromised or needs change?"),
              heightspace(10),
              ElevatedButton(
                onPressed: () {},
                child: const Text(
                  "New Password",
                  style: TextStyle(
                    color: Colors.white,
                    fontSize: 16,
                    fontFamily: 'TitilliumWeb',
                  ),
                ),
                style: ElevatedButton.styleFrom(
                    padding: const EdgeInsets.symmetric(
                        vertical: 10, horizontal: 30),
                    primary: Colors.grey.shade500),
              ),
            ],
          ),
        ),
      ),
    );
  }

  void visibility() {
    setState(() {
      visibletext = !visibletext;
    });
  }
}
